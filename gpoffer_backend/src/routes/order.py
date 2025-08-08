from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.models.offer import Offer
from src.models.order import Order, Complaint
from datetime import datetime

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders', methods=['POST'])
def create_order():
    """Create a new order"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['offer_id', 'buyer_id', 'quantity', 'payment_method', 'shipping_address', 'buyer_name', 'buyer_phone', 'buyer_email']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Get offer details
        offer = Offer.query.get_or_404(data['offer_id'])
        if offer.status != 'Active':
            return jsonify({
                'success': False,
                'message': 'Offer is not active'
            }), 400
        
        # Calculate pricing based on current participants
        discount_strategy = offer.discount_strategy
        unit_price = offer.base_price
        
        if discount_strategy:
            import json
            strategy = json.loads(discount_strategy) if isinstance(discount_strategy, str) else discount_strategy
            for tier in sorted(strategy, key=lambda x: x.get('participants', 0), reverse=True):
                if offer.current_participants >= tier.get('participants', 0):
                    unit_price = tier.get('price', offer.base_price)
                    break
        
        total_amount = unit_price * data['quantity']
        
        # Create new order
        new_order = Order(
            offer_id=data['offer_id'],
            buyer_id=data['buyer_id'],
            seller_id=offer.supplier_id,
            quantity=data['quantity'],
            unit_price=unit_price,
            total_amount=total_amount,
            payment_method=data['payment_method'],
            shipping_address=data['shipping_address'],
            buyer_name=data['buyer_name'],
            buyer_phone=data['buyer_phone'],
            buyer_email=data['buyer_email'],
            notes=data.get('notes', '')
        )
        
        db.session.add(new_order)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Order created successfully',
            'order': new_order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Get specific order details"""
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify({
            'success': True,
            'order': order.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/orders/buyer/<int:buyer_id>', methods=['GET'])
def get_buyer_orders(buyer_id):
    """Get all orders for a buyer"""
    try:
        orders = Order.query.filter_by(buyer_id=buyer_id).order_by(Order.created_at.desc()).all()
        return jsonify({
            'success': True,
            'orders': [order.to_dict() for order in orders]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/orders/seller/<int:seller_id>', methods=['GET'])
def get_seller_orders(seller_id):
    """Get all orders for a seller"""
    try:
        orders = Order.query.filter_by(seller_id=seller_id).order_by(Order.created_at.desc()).all()
        return jsonify({
            'success': True,
            'orders': [order.to_dict() for order in orders]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Update order status"""
    try:
        order = Order.query.get_or_404(order_id)
        data = request.get_json()
        
        if 'order_status' in data:
            order.order_status = data['order_status']
        if 'payment_status' in data:
            order.payment_status = data['payment_status']
        
        order.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Order status updated successfully',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/complaints', methods=['POST'])
def create_complaint():
    """Create a new complaint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['complainant_id', 'complaint_type', 'subject', 'description']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Create new complaint
        new_complaint = Complaint(
            order_id=data.get('order_id'),
            complainant_id=data['complainant_id'],
            against_user_id=data.get('against_user_id'),
            complaint_type=data['complaint_type'],
            subject=data['subject'],
            description=data['description']
        )
        
        db.session.add(new_complaint)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Complaint created successfully',
            'complaint': new_complaint.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/complaints/<int:complaint_id>', methods=['GET'])
def get_complaint(complaint_id):
    """Get specific complaint details"""
    try:
        complaint = Complaint.query.get_or_404(complaint_id)
        return jsonify({
            'success': True,
            'complaint': complaint.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/complaints/user/<int:user_id>', methods=['GET'])
def get_user_complaints(user_id):
    """Get all complaints filed by a user"""
    try:
        complaints = Complaint.query.filter_by(complainant_id=user_id).order_by(Complaint.created_at.desc()).all()
        return jsonify({
            'success': True,
            'complaints': [complaint.to_dict() for complaint in complaints]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/complaints/against/<int:user_id>', methods=['GET'])
def get_complaints_against_user(user_id):
    """Get all complaints filed against a user"""
    try:
        complaints = Complaint.query.filter_by(against_user_id=user_id).order_by(Complaint.created_at.desc()).all()
        return jsonify({
            'success': True,
            'complaints': [complaint.to_dict() for complaint in complaints]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/admin/complaints', methods=['GET'])
def admin_get_all_complaints():
    """Admin: Get all complaints"""
    try:
        complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
        return jsonify({
            'success': True,
            'complaints': [complaint.to_dict() for complaint in complaints]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@order_bp.route('/admin/complaints/<int:complaint_id>/resolve', methods=['PUT'])
def admin_resolve_complaint(complaint_id):
    """Admin: Resolve a complaint"""
    try:
        complaint = Complaint.query.get_or_404(complaint_id)
        data = request.get_json()
        
        complaint.status = 'resolved'
        complaint.admin_response = data.get('admin_response', '')
        complaint.resolution = data.get('resolution', '')
        complaint.resolved_at = datetime.utcnow()
        complaint.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Complaint resolved successfully',
            'complaint': complaint.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

