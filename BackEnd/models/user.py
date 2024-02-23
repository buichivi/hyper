from flask import json
from flask_login import UserMixin
from sqlalchemy import JSON
from werkzeug.security import check_password_hash, generate_password_hash

from database import db


class User(db.Model, UserMixin):
    __tablename__ = "tb_users"

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    dateOfBirth = db.Column(db.String(50), nullable=True)
    phoneNumber = db.Column(db.String(10), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    province = db.Column(db.String(255), nullable=True)
    district = db.Column(db.String(255), nullable=True)
    ward = db.Column(db.String(255), nullable=True)

    user_reviews = db.relationship("Review", backref="user_reviews", lazy=True)
    user_favorite_products = db.relationship(
        "Favorite", backref="user_favorite_products", lazy=True
    )
    cart = db.relationship("Cart", backref="cart", lazy=True)
    orders = db.relationship("Order", backref="order", lazy=True)

    def __init__(
        self,
        first,
        last,
        email,
        pwd,
        dob=None,
        phoneNb=None,
        address=None,
        role="CUSTOMER",
        province='{"province_id": -1}',
        district='{"district_id": -1}',
        ward='{"ward_id": -1}',
    ) -> None:
        self.firstName = first
        self.lastName = last
        self.email = email
        self.set_password(pwd)
        self.phoneNumber = phoneNb
        self.dateOfBirth = dob
        self.address = address
        self.province = province
        self.district = district
        self.ward = ward
        self.role = role

    def set_infomation(
        self,
        first,
        last,
        phoneNb=None,
        dob=None,
        address=None,
        province='{"province_id": -1}',
        district='{"district_id": -1}',
        ward='{"ward_id": -1}',
    ) -> None:
        self.firstName = first
        self.lastName = last
        self.phoneNumber = phoneNb
        self.dateOfBirth = dob
        self.address = address
        self.province = province
        self.district = district
        self.ward = ward

    def __repr__(self) -> str:
        return f"<User {self.id}> {self.firstName} {self.lastName} {self.email} {self.phoneNumber} {self.dateOfBirth} {self.address}"

    def set_password(self, password) -> None:
        self.password = generate_password_hash(password)

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def to_json(self) -> object:
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "dateOfBirth": self.dateOfBirth,
            "phoneNumber": self.phoneNumber,
            "address": self.address,
            "province": json.loads(self.province),
            "district": json.loads(self.district),
            "ward": json.loads(self.ward),
        }

    def set_detail_info(self, phoneNb, dob, address, province, district, ward) -> None:
        self.phoneNumber = phoneNb
        self.dateOfBirth = dob
        self.address = address
        self.province = province
        self.district = district
        self.ward = ward

    def email_exists(self, email) -> bool:
        return User.query.filter_by(email=email).first() is not None

    def get_name(self) -> str:
        return self.firstName + " " + self.lastName
