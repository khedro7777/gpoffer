from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(20), default='buyer')  # buyer, supplier, admin
    kyc_status = db.Column(db.String(20), default='pending')  # pending, verified, rejected
    kyc_verified_at = db.Column(db.DateTime)
    gpo_points = db.Column(db.Integer, default=0)
    company_name = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    rating = db.Column(db.Float, default=0.0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'user_type': self.user_type,
            'kyc_status': self.kyc_status,
            'kyc_verified_at': self.kyc_verified_at.isoformat() if self.kyc_verified_at else None,
            'gpo_points': self.gpo_points,
            'company_name': self.company_name,
            'phone': self.phone,
            'address': self.address,
            'rating': self.rating,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
