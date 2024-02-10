from datetime import timedelta

from flask import make_response, request, session
from flask_cors import cross_origin
from flask_login import current_user, login_required, login_user, logout_user
from flask_restful import Resource

from config import REMEMBER_COOKIE_NAME
from database import db
from models.user import User


class LoginResource(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No data provided"}, 400
        email = data.get("email")
        password = data.get("password")
        remember = data.get("remember") or False
        if not email:
            return {"message": "Email is missing"}, 400
        if not password:
            return {"message": "Password is missing"}, 400

        print(data)
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user, remember, timedelta(days=1))
            print(session)
            return {"message": "Logged in successfully!", "user": user.to_json()}, 200

        return {"message": "Email or password is incorrect!"}, 400


class LogOutResource(Resource):
    @cross_origin()
    @login_required
    def get(self):
        logout_user()
        if REMEMBER_COOKIE_NAME in request.cookies:
            response = make_response()
            response.set_cookie(
                REMEMBER_COOKIE_NAME,
                "",
                max_age=0,
                expires=0,
                secure=True,
                httponly=True,
                samesite="None",
            )
            return response
        return {"message": "Logged out successfully!"}, 200


class SignUpResource(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        firstName = data.get("firstname")
        lastName = data.get("lastname")
        email = data.get("email")
        password = data.get("password")
        dob = data.get("date_of_birth")
        phoneNb = data.get("phone_number")
        address = data.get("address")
        if not firstName:
            return {"message": "First name is missing"}, 400
        if not lastName:
            return {"message": "Last name is missing"}, 400
        if not email:
            return {"message": "Email is missing"}, 400
        if not password:
            return {"message": "Password is missing"}, 400

        user = User(firstName, lastName, email, password)
        if user.email_exists(email):
            return {"message": "This email is already being used"}, 400
        user.set_detail_info(phoneNb, dob, address)
        db.session.add(user)
        db.session.commit()
        return {"message": "Sign up successfully!", "user": user.to_json()}, 200


class CheckingLoginResource(Resource):
    @cross_origin()
    def get(self):
        if current_user.is_authenticated:
            return {"logged_in": True, "current_user": current_user.to_json()}, 200
        return {"logged_in": False}, 200


class GetAllEmailResource(Resource):
    @cross_origin()
    def get(self):
        emails = User.query.with_entities(User.email).all()
        email_list = [email[0] for email in emails]
        return email_list
