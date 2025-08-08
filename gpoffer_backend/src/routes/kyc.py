from flask import Blueprint, request, jsonify
from src.models.user import db, User
from datetime import datetime

kyc_bp = Blueprint('kyc', __name__)

@kyc_bp.route('/kyc/verify', methods=['POST'])
def verify_kyc():
    """Submit KYC verification request"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({
                'success': False,
                'message': 'User ID is required'
            }), 400
        
        user = User.query.get_or_404(user_id)
        
        # Update KYC status to pending (in real app, this would trigger verification process)
        user.kyc_status = 'pending'
        user.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'KYC verification request submitted successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@kyc_bp.route('/kyc/status/<int:user_id>', methods=['GET'])
def get_kyc_status(user_id):
    """Get KYC status for a user"""
    try:
        user = User.query.get_or_404(user_id)
        return jsonify({
            'success': True,
            'kyc_status': user.kyc_status,
            'kyc_verified_at': user.kyc_verified_at.isoformat() if user.kyc_verified_at else None
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@kyc_bp.route('/admin/kyc/approve/<int:user_id>', methods=['POST'])
def admin_approve_kyc(user_id):
    """Admin: Approve KYC for a user"""
    try:
        user = User.query.get_or_404(user_id)
        user.kyc_status = 'verified'
        user.kyc_verified_at = datetime.utcnow()
        user.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'KYC approved successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@kyc_bp.route('/admin/kyc/reject/<int:user_id>', methods=['POST'])
def admin_reject_kyc(user_id):
    """Admin: Reject KYC for a user"""
    try:
        user = User.query.get_or_404(user_id)
        user.kyc_status = 'rejected'
        user.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'KYC rejected',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@kyc_bp.route('/admin/kyc/pending', methods=['GET'])
def admin_get_pending_kyc():
    """Admin: Get all users with pending KYC"""
    try:
        users = User.query.filter_by(kyc_status='pending').all()
        return jsonify({
            'success': True,
            'users': [user.to_dict() for user in users]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

