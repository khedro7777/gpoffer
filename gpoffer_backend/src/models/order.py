from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    unit_price = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # paypal, crypto, cash_on_delivery
    payment_status = db.Column(db.String(20), default='pending')  # pending, paid, failed, refunded
    order_status = db.Column(db.String(20), default='pending')  # pending, confirmed, shipped, delivered, cancelled
    shipping_address = db.Column(db.Text)
    buyer_name = db.Column(db.String(200))
    buyer_phone = db.Column(db.String(20))
    buyer_email = db.Column(db.String(120))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    offer = db.relationship('Offer', backref='orders')
    buyer = db.relationship('User', foreign_keys=[buyer_id], backref='purchases')
    seller = db.relationship('User', foreign_keys=[seller_id], backref='sales')
    
    def to_dict(self):
        return {
            'id': self.id,
            'offer_id': self.offer_id,
            'buyer_id': self.buyer_id,
            'seller_id': self.seller_id,
            'quantity': self.quantity,
            'unit_price': self.unit_price,
            'total_amount': self.total_amount,
            'payment_method': self.payment_method,
            'payment_status': self.payment_status,
            'order_status': self.order_status,
            'shipping_address': self.shipping_address,
            'buyer_name': self.buyer_name,
            'buyer_phone': self.buyer_phone,
            'buyer_email': self.buyer_email,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Complaint(db.Model):
    __tablename__ = 'complaints'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=True)
    complainant_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    against_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    complaint_type = db.Column(db.String(50), nullable=False)  # product_quality, delivery, payment, other
    subject = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='open')  # open, in_progress, resolved, closed
    admin_response = db.Column(db.Text)
    resolution = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_at = db.Column(db.DateTime)
    
    # Relationships
    order = db.relationship('Order', backref='complaints')
    complainant = db.relationship('User', foreign_keys=[complainant_id], backref='filed_complaints')
    against_user = db.relationship('User', foreign_keys=[against_user_id], backref='received_complaints')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'complainant_id': self.complainant_id,
            'against_user_id': self.against_user_id,
            'complaint_type': self.complaint_type,
            'subject': self.subject,
            'description': self.description,
            'status': self.status,
            'admin_response': self.admin_response,
            'resolution': self.resolution,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None
        }

class PaymentDetails(db.Model):
    __tablename__ = 'payment_details'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_type = db.Column(db.String(20), nullable=False)  # paypal, crypto
    paypal_client_id = db.Column(db.String(255))
    paypal_client_secret = db.Column(db.String(255))
    crypto_wallet_address = db.Column(db.String(255))
    crypto_type = db.Column(db.String(20))  # bitcoin, ethereum, etc.
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='payment_details')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'payment_type': self.payment_type,
            'paypal_client_id': self.paypal_client_id,
            'crypto_wallet_address': self.crypto_wallet_address,
            'crypto_type': self.crypto_type,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class WalletTransaction(db.Model):
    __tablename__ = 'wallet_transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    transaction_type = db.Column(db.String(20), nullable=False)  # purchase, deduction, refund
    amount = db.Column(db.Integer, nullable=False)  # points amount
    description = db.Column(db.String(255))
    reference_id = db.Column(db.String(100))  # offer_id, order_id, etc.
    payment_method = db.Column(db.String(50))  # paypal, crypto
    payment_reference = db.Column(db.String(255))  # transaction ID from payment provider
    status = db.Column(db.String(20), default='completed')  # pending, completed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='wallet_transactions')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'transaction_type': self.transaction_type,
            'amount': self.amount,
            'description': self.description,
            'reference_id': self.reference_id,
            'payment_method': self.payment_method,
            'payment_reference': self.payment_reference,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

