from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.models.order import WalletTransaction, PaymentDetails
from datetime import datetime

wallet_bp = Blueprint('wallet', __name__)

@wallet_bp.route('/wallet/<int:user_id>/balance', methods=['GET'])
def get_wallet_balance(user_id):
    """Get user's wallet balance"""
    try:
        user = User.query.get_or_404(user_id)
        return jsonify({
            'success': True,
            'balance': user.gpo_points,
            'user_id': user_id
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/wallet/<int:user_id>/transactions', methods=['GET'])
def get_wallet_transactions(user_id):
    """Get user's wallet transaction history"""
    try:
        transactions = WalletTransaction.query.filter_by(user_id=user_id).order_by(WalletTransaction.created_at.desc()).all()
        return jsonify({
            'success': True,
            'transactions': [transaction.to_dict() for transaction in transactions]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/wallet/purchase-points', methods=['POST'])
def purchase_points():
    """Purchase points for wallet"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['user_id', 'amount', 'payment_method']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        user = User.query.get_or_404(data['user_id'])
        
        # Create transaction record
        transaction = WalletTransaction(
            user_id=data['user_id'],
            transaction_type='purchase',
            amount=data['amount'],
            description=f"Purchased {data['amount']} points via {data['payment_method']}",
            payment_method=data['payment_method'],
            payment_reference=data.get('payment_reference', ''),
            status='completed'  # In real app, this would be 'pending' until payment confirmed
        )
        
        # Update user's points
        user.gpo_points += data['amount']
        user.updated_at = datetime.utcnow()
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Points purchased successfully',
            'new_balance': user.gpo_points,
            'transaction': transaction.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/wallet/deduct-points', methods=['POST'])
def deduct_points():
    """Deduct points from wallet (for offer creation)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['user_id', 'amount', 'reference_id', 'description']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        user = User.query.get_or_404(data['user_id'])
        
        # Check if user has enough points
        if user.gpo_points < data['amount']:
            return jsonify({
                'success': False,
                'message': 'Insufficient points'
            }), 400
        
        # Create transaction record
        transaction = WalletTransaction(
            user_id=data['user_id'],
            transaction_type='deduction',
            amount=data['amount'],
            description=data['description'],
            reference_id=data['reference_id'],
            status='completed'
        )
        
        # Update user's points
        user.gpo_points -= data['amount']
        user.updated_at = datetime.utcnow()
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Points deducted successfully',
            'new_balance': user.gpo_points,
            'transaction': transaction.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/payment-details/<int:user_id>', methods=['GET'])
def get_payment_details(user_id):
    """Get user's payment details"""
    try:
        payment_details = PaymentDetails.query.filter_by(user_id=user_id, is_active=True).all()
        return jsonify({
            'success': True,
            'payment_details': [detail.to_dict() for detail in payment_details]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/payment-details', methods=['POST'])
def add_payment_details():
    """Add payment details for user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['user_id', 'payment_type']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Deactivate existing payment details of same type
        existing_details = PaymentDetails.query.filter_by(
            user_id=data['user_id'],
            payment_type=data['payment_type']
        ).all()
        
        for detail in existing_details:
            detail.is_active = False
        
        # Create new payment details
        new_payment_details = PaymentDetails(
            user_id=data['user_id'],
            payment_type=data['payment_type'],
            paypal_client_id=data.get('paypal_client_id'),
            paypal_client_secret=data.get('paypal_client_secret'),
            crypto_wallet_address=data.get('crypto_wallet_address'),
            crypto_type=data.get('crypto_type')
        )
        
        db.session.add(new_payment_details)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Payment details added successfully',
            'payment_details': new_payment_details.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/payment-details/<int:detail_id>', methods=['PUT'])
def update_payment_details(detail_id):
    """Update payment details"""
    try:
        payment_details = PaymentDetails.query.get_or_404(detail_id)
        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = ['paypal_client_id', 'paypal_client_secret', 'crypto_wallet_address', 'crypto_type']
        for field in allowed_fields:
            if field in data:
                setattr(payment_details, field, data[field])
        
        payment_details.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Payment details updated successfully',
            'payment_details': payment_details.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/admin/platform-wallet', methods=['GET'])
def get_platform_wallet():
    """Admin: Get platform wallet details"""
    try:
        # In a real app, this would be stored in a settings table
        platform_wallet = {
            'paypal_client_id': 'platform_paypal_id',
            'crypto_wallet_address': 'platform_crypto_address',
            'total_points_sold': 50000,
            'total_revenue': 5000.00
        }
        
        return jsonify({
            'success': True,
            'platform_wallet': platform_wallet
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@wallet_bp.route('/admin/platform-wallet', methods=['PUT'])
def update_platform_wallet():
    """Admin: Update platform wallet details"""
    try:
        data = request.get_json()
        
        # In a real app, this would update a settings table
        # For now, just return success
        
        return jsonify({
            'success': True,
            'message': 'Platform wallet updated successfully',
            'platform_wallet': data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

