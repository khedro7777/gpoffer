from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import db, User
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Check if user already exists
        existing_user = User.query.filter(
            (User.username == data['username']) | (User.email == data['email'])
        ).first()
        
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'User with this username or email already exists'
            }), 400
        
        # Create new user
        password_hash = generate_password_hash(data['password'])
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=password_hash,
            user_type=data.get('user_type', 'buyer'),
            company_name=data.get('company_name', ''),
            phone=data.get('phone', ''),
            address=data.get('address', '')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'username' not in data or 'password' not in data:
            return jsonify({
                'success': False,
                'message': 'Username and password are required'
            }), 400
        
        # Find user
        user = User.query.filter_by(username=data['username']).first()
        
        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify({
                'success': False,
                'message': 'Invalid username or password'
            }), 401
        
        if not user.is_active:
            return jsonify({
                'success': False,
                'message': 'Account is deactivated'
            }), 401
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@auth_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    """Get user profile"""
    try:
        user = User.query.get_or_404(user_id)
        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@auth_bp.route('/profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    """Update user profile"""
    try:
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = ['company_name', 'phone', 'address']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])
        
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

