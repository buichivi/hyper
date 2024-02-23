import json
from datetime import timedelta

from flask import make_response, request, session
from flask_cors import cross_origin
from flask_login import current_user, login_required, login_user, logout_user
from flask_restful import Resource

from config import REMEMBER_COOKIE_NAME
from database import db
from models.favorite import Favorite
from models.product import Product
from models.user import User


class LoginResource(Resource):
    @cross_origin()
    def get(self):
        data = request.args
        if not data:
            return {"message": "No data provided"}, 400
        print(data)
        email = data.get("email")
        password = data.get("password")
        remember = data.get("remember") or False
        if not email:
            return {"message": "Email is missing"}, 400
        if not password:
            return {"message": "Password is missing"}, 400

        user = User.query.filter_by(email=email).first()
        print(user)
        if user and user.check_password(password):
            if remember == "true":
                login_user(user, True, timedelta(days=1))
            else:
                login_user(user, False)
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
        province = json.dumps((data.get("province") or {'province_id': -1}))
        district = json.dumps(data.get("district") or {'district_id': -1})
        ward = json.dumps(data.get("ward") or {'ward_id': -1})
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
        user.set_detail_info(phoneNb, dob, address, province, district, ward)
        login_user(user, False)
        db.session.add(user)
        db.session.commit()
        return {"message": "Sign up successfully!", "user": user.to_json()}, 200


class CheckingEmailSignUpResource(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        email = data.get("email")
        user = User.query.filter_by(email=email).first()
        if user:
            return {"message": "This email is already being used!"}, 400
        return {"message": "This email is valid"}, 200


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


class FavoriteProductsResource(Resource):
    @cross_origin()
    @login_required
    def get(self):
        favorite_products = current_user.user_favorite_products
        products = []
        for fav in favorite_products:
            product = Product.query.get(fav.product_id)
            products.append(product.to_json())
        return {"favorite_products": products}

    @cross_origin()
    @login_required
    def post(self):
        data = request.get_json()
        product_id = data.get("product_id")
        if not product_id:
            return {"message": "No product_id is provided"}, 400
        product = Product.query.get(product_id)
        if not product:
            return {"message": "No product match product_id"}, 400
        favor = Favorite(product_id, current_user.id)
        db.session.add(favor)
        db.session.commit()
        return {
            "message": "Add favorite product successfully",
            "favor": favor.to_json(),
        }, 200

    @cross_origin()
    @login_required
    def delete(self):
        data = request.args
        product_id = data.get("product_id")
        if not product_id:
            return {"message": "No product_id is provided"}, 400
        product = Product.query.get(product_id)
        if not product:
            return {"message": "No product match product_id"}, 400
        favor = Favorite.query.filter_by(
            product_id=product_id, user_id=current_user.id
        ).first()
        if not favor:
            return {
                "message": "This product has not been added to the user's favorites list"
            }, 400
        db.session.delete(favor)
        db.session.commit()
        return {
            "message": "Remove favorite product successfully",
            "favor": favor.to_json(),
        }, 200


class ChangePasswordResource(Resource):
    @cross_origin()
    @login_required
    def patch(self):
        current_password = str(request.get_json().get("current_password"))
        new_password = str(request.get_json().get("new_password"))
        if not current_password:
            return {"message": "Current password is missing"}, 400
        if not new_password:
            return {"message": "New password is missing"}, 400

        user = User.query.filter_by(email=current_user.email).first()
        if not user.check_password(current_password):
            return {"message": "Your current password is not correct!"}, 400
        if len(new_password) < 6:
            return {"message": "New password need at least 6 characters"}, 400
        user.set_password(new_password)
        db.session.commit()
        return {"message": "Change password successfully"}, 200


class ChangeUserInfoResource(Resource):
    @cross_origin()
    @login_required
    def patch(self):
        data = request.get_json()
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        phone_number = data.get("phone_number")
        date_of_birth = data.get("date_of_birth")
        province = json.dumps(data.get("province"))
        district = json.dumps(data.get("district"))
        ward = json.dumps(data.get("ward"))
        shipping_address = data.get("shipping_address")
        if not first_name:
            return {"message": "first_name is missing"}, 400
        if not last_name:
            return {"message": "last_name is missing"}, 400
        if not phone_number:
            return {"message": "phone_number is missing"}, 400
        if not date_of_birth:
            return {"message": "date_of_birth is missing"}, 400
        if not province:
            return {"message": "province is missing"}, 400
        if not district:
            return {"message": "district is missing"}, 400
        if not ward:
            return {"message": "ward is missing"}, 400
        if not shipping_address:
            return {"message": "shipping_address is missing"}, 400

        user = User.query.get(current_user.id)
        user.set_infomation(
            first_name,
            last_name,
            phone_number,
            date_of_birth,
            shipping_address,
            province,
            district,
            ward,
        )
        db.session.commit()
        return {"message": "Change your infomation successfully"}, 200
