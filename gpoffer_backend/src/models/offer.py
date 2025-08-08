from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Offer(db.Model):
    __tablename__ = 'offers'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    product_service = db.Column(db.String(100), nullable=False)
    target_region = db.Column(db.String(50), nullable=False)
    base_price = db.Column(db.Float, nullable=False)
    discount_strategy = db.Column(db.Text)  # JSON string
    deadline = db.Column(db.DateTime, nullable=False)
    minimum_joiners = db.Column(db.Integer, default=0)
    terms_conditions = db.Column(db.Text)
    pdf_file_path = db.Column(db.String(500))
    visibility = db.Column(db.String(20), default='Public')  # Public or Invite Only
    gpo_points_required = db.Column(db.Integer, default=15)
    supplier_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), default='Pending')  # Pending, Active, Cancelled, Expired
    current_participants = db.Column(db.Integer, default=0)
    
    # New fields for enhanced functionality
    images = db.Column(db.Text)  # JSON array of image paths
    category = db.Column(db.String(100))
    tags = db.Column(db.Text)  # JSON array of tags
    featured = db.Column(db.Boolean, default=False)
    
    # Payment method for this offer
    payment_methods = db.Column(db.Text)  # JSON array: ["paypal", "crypto", "cash_on_delivery"]
    
    # Seller payment details for this specific offer
    paypal_client_id = db.Column(db.String(255))
    crypto_wallet_address = db.Column(db.String(255))
    crypto_type = db.Column(db.String(20))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    supplier = db.relationship('User', backref='offers')
    participants = db.relationship('OfferParticipant', backref='offer', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'product_service': self.product_service,
            'target_region': self.target_region,
            'base_price': self.base_price,
            'discount_strategy': json.loads(self.discount_strategy) if self.discount_strategy else [],
            'deadline': self.deadline.isoformat() if self.deadline else None,
            'minimum_joiners': self.minimum_joiners,
            'terms_conditions': self.terms_conditions,
            'pdf_file_path': self.pdf_file_path,
            'visibility': self.visibility,
            'gpo_points_required': self.gpo_points_required,
            'supplier_id': self.supplier_id,
            'status': self.status,
            'current_participants': self.current_participants,
            'images': json.loads(self.images) if self.images else [],
            'category': self.category,
            'tags': json.loads(self.tags) if self.tags else [],
            'featured': self.featured,
            'payment_methods': json.loads(self.payment_methods) if self.payment_methods else [],
            'paypal_client_id': self.paypal_client_id,
            'crypto_wallet_address': self.crypto_wallet_address,
            'crypto_type': self.crypto_type,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class OfferParticipant(db.Model):
    __tablename__ = 'offer_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    commitment_amount = db.Column(db.Float)
    status = db.Column(db.String(20), default='Committed')  # Committed, Cancelled
    
    # Relationships
    user = db.relationship('User', backref='offer_participations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'offer_id': self.offer_id,
            'user_id': self.user_id,
            'joined_at': self.joined_at.isoformat() if self.joined_at else None,
            'commitment_amount': self.commitment_amount,
            'status': self.status
        }

