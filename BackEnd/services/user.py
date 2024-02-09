from flask_restful import Resource
from flask import request, session
from models.user import User
from flask_cors import cross_origin
from database import db
from flask_login import login_user, logout_user, current_user, login_required

class LoginResource(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        data = request.get_json()
        if not data:
            return { 'message': 'No data provided' }, 400
        email = data.get('email')
        password = data.get('password')
        remember = data.get('remember')
        if not email:
            return { 'message': 'Email is missing' }, 400
        if not password:
            return { 'message': 'Password is missing' }, 400
        
        user = User.query.filter_by(email = email).first()
        if user and user.check_password(password):
            login_user(user, remember)
            print(session)
            print(current_user.is_authenticated)
            return {
                'message': 'Logged in successfully!',
                'user': user.to_json()
            }, 200
        
        return { 'message': 'Email or password is incorrect!' }, 400
    
class LogOutResource(Resource):
    @cross_origin(supports_credentials=True)
    @login_required
    def get(self):
        logout_user()
        return { 'message': 'Logged out successfully!' }, 200

class SignUpResource(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        data = request.get_json()
        firstName = data.get('firstname')
        lastName = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        dob = data.get('date_of_birth') or None
        phoneNb = data.get('phone_number') or None
        address = data.get('address') or None
        if not firstName:
            return { 'message': 'First name is missing' }, 400
        if not lastName:
            return { 'message': 'Last name is missing' }, 400
        if not email:
            return { 'message': 'Email is missing' }, 400
        if not password:
            return { 'message': 'Password is missing' }, 400
        
        user = User(firstName, lastName, email, password)
        if user.email_exists(email):
            return { 'message': 'This email is already being used' }, 400
        user.set_detail_info(phoneNb, dob, address)
        db.session.add(user)
        db.session.commit()
        return { 'message': 'Sign up successfully!', 'user': user.to_json() }, 200


class CheckingLoginResource(Resource):
    @cross_origin(supports_credentials=True)
    def get(self):
        print(session)
        if current_user.is_authenticated:
            return {"logged_in": True, 'current_user': current_user.to_json()}, 200
        return { "logged_in": False }, 200

class GetAllEmailResource(Resource):
    @cross_origin(supports_credentials=True)
    def get(self):
        emails = User.query.with_entities(User.email).all()
        email_list = [email[0] for email in emails]
        return email_list

