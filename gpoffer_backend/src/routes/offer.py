from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.models.offer import Offer, OfferParticipant
from datetime import datetime
import json

offer_bp = Blueprint('offer', __name__)

@offer_bp.route('/offers', methods=['GET'])
def get_offers():
    """Get all active offers"""
    try:
        offers = Offer.query.filter_by(status='Active').all()
        return jsonify({
            'success': True,
            'offers': [offer.to_dict() for offer in offers]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/offers/<int:offer_id>', methods=['GET'])
def get_offer(offer_id):
    """Get specific offer details"""
    try:
        offer = Offer.query.get_or_404(offer_id)
        return jsonify({
            'success': True,
            'offer': offer.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/offers/create', methods=['POST'])
def create_offer():
    """Create a new offer (requires authentication)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'product_service', 'target_region', 'base_price', 'deadline', 'supplier_id']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Parse deadline
        deadline = datetime.fromisoformat(data['deadline'].replace('Z', '+00:00'))
        
        # Create new offer
        new_offer = Offer(
            title=data['title'],
            product_service=data['product_service'],
            target_region=data['target_region'],
            base_price=float(data['base_price']),
            discount_strategy=json.dumps(data.get('discount_strategy', [])),
            deadline=deadline,
            minimum_joiners=data.get('minimum_joiners', 0),
            terms_conditions=data.get('terms_conditions', ''),
            pdf_file_path=data.get('pdf_file_path', ''),
            visibility=data.get('visibility', 'Public'),
            gpo_points_required=data.get('gpo_points_required', 15),
            supplier_id=data['supplier_id']
        )
        
        db.session.add(new_offer)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Offer created successfully',
            'offer': new_offer.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/offers/join/<int:offer_id>', methods=['POST'])
def join_offer(offer_id):
    """Join an offer (requires authentication)"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({
                'success': False,
                'message': 'User ID is required'
            }), 400
        
        # Check if offer exists and is active
        offer = Offer.query.get_or_404(offer_id)
        if offer.status != 'Active':
            return jsonify({
                'success': False,
                'message': 'Offer is not active'
            }), 400
        
        # Check if user already joined
        existing_participation = OfferParticipant.query.filter_by(
            offer_id=offer_id,
            user_id=user_id,
            status='Committed'
        ).first()
        
        if existing_participation:
            return jsonify({
                'success': False,
                'message': 'User already joined this offer'
            }), 400
        
        # Create participation record
        participation = OfferParticipant(
            offer_id=offer_id,
            user_id=user_id,
            commitment_amount=data.get('commitment_amount', offer.base_price)
        )
        
        db.session.add(participation)
        
        # Update offer participant count
        offer.current_participants += 1
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Successfully joined the offer',
            'participation': participation.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/offers/<int:offer_id>/participants', methods=['GET'])
def get_offer_participants(offer_id):
    """Get participants of an offer"""
    try:
        participants = OfferParticipant.query.filter_by(
            offer_id=offer_id,
            status='Committed'
        ).all()
        
        return jsonify({
            'success': True,
            'participants': [p.to_dict() for p in participants]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/admin/offers', methods=['GET'])
def admin_get_all_offers():
    """Admin: Get all offers regardless of status"""
    try:
        offers = Offer.query.all()
        return jsonify({
            'success': True,
            'offers': [offer.to_dict() for offer in offers]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/admin/offers/<int:offer_id>/approve', methods=['POST'])
def admin_approve_offer(offer_id):
    """Admin: Approve an offer"""
    try:
        offer = Offer.query.get_or_404(offer_id)
        offer.status = 'Active'
        offer.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Offer approved successfully',
            'offer': offer.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@offer_bp.route('/admin/offers/<int:offer_id>/cancel', methods=['POST'])
def admin_cancel_offer(offer_id):
    """Admin: Cancel an offer"""
    try:
        offer = Offer.query.get_or_404(offer_id)
        offer.status = 'Cancelled'
        offer.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Offer cancelled successfully',
            'offer': offer.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

