from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.models.offer import Offer
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/users', methods=['GET'])
def get_all_users():
    """Admin: Get all users"""
    try:
        users = User.query.all()
        return jsonify({
            'success': True,
            'users': [user.to_dict() for user in users]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/admin/users/<int:user_id>/activate', methods=['POST'])
def activate_user(user_id):
    """Admin: Activate a user"""
    try:
        user = User.query.get_or_404(user_id)
        user.is_active = True
        user.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'User activated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/admin/users/<int:user_id>/deactivate', methods=['POST'])
def deactivate_user(user_id):
    """Admin: Deactivate a user"""
    try:
        user = User.query.get_or_404(user_id)
        user.is_active = False
        user.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'User deactivated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/admin/stats', methods=['GET'])
def get_admin_stats():
    """Admin: Get platform statistics"""
    try:
        total_users = User.query.count()
        active_users = User.query.filter_by(is_active=True).count()
        total_offers = Offer.query.count()
        active_offers = Offer.query.filter_by(status='Active').count()
        pending_offers = Offer.query.filter_by(status='Pending').count()
        pending_kyc = User.query.filter_by(kyc_status='pending').count()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_users': total_users,
                'active_users': active_users,
                'total_offers': total_offers,
                'active_offers': active_offers,
                'pending_offers': pending_offers,
                'pending_kyc': pending_kyc
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/admin/settings', methods=['GET'])
def get_admin_settings():
    """Admin: Get platform settings"""
    try:
        # In a real app, these would be stored in database
        settings = {
            'group_offers_enabled': True,
            'dynamic_discounts_enabled': True,
            'auto_kyc_approval': False,
            'min_gpo_points_for_offer': 15,
            'max_offer_duration_days': 30
        }
        
        return jsonify({
            'success': True,
            'settings': settings
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/admin/settings', methods=['PUT'])
def update_admin_settings():
    """Admin: Update platform settings"""
    try:
        data = request.get_json()
        
        # In a real app, these would be stored in database
        # For now, just return success
        
        return jsonify({
            'success': True,
            'message': 'Settings updated successfully',
            'settings': data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

