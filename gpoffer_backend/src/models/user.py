from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(20), default='buyer')  # buyer, seller, office (admin)
    kyc_status = db.Column(db.String(20), default='pending')  # pending, verified, rejected
    kyc_verified_at = db.Column(db.DateTime)
    gpo_points = db.Column(db.Integer, default=0)
    company_name = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    rating = db.Column(db.Float, default=0.0)
    is_active = db.Column(db.Boolean, default=True)
    
    # New fields for enhanced functionality
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    profile_image = db.Column(db.String(500))
    location = db.Column(db.String(200))
    bio = db.Column(db.Text)
    
    # Seller specific fields
    store_name = db.Column(db.String(200))
    store_description = db.Column(db.Text)
    
    # Admin specific fields
    admin_level = db.Column(db.String(20), default='basic')  # basic, super
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)

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
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_image': self.profile_image,
            'location': self.location,
            'bio': self.bio,
            'store_name': self.store_name,
            'store_description': self.store_description,
            'admin_level': self.admin_level,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }
