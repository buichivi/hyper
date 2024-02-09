from werkzeug.security import check_password_hash, generate_password_hash
from database import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'tb_users'

    id = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.String(50), nullable = False)
    lastName = db.Column(db.String(50), nullable = False)
    email = db.Column(db.String(50), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)
    dateOfBirth = db.Column(db.String(50), nullable = True)
    phoneNumber = db.Column(db.String(10), nullable = True)
    address = db.Column(db.String(255), nullable = True)

    def __init__(self, first, last, email, pwd, dob = None, phoneNb = None, address = None) -> None:
        self.firstName = first
        self.lastName = last
        self.email = email
        self.set_password(pwd)
        self.phoneNumber = phoneNb
        self.dateOfBirth = dob
        self.address = address
    def __repr__(self) -> str:
        return f'<User {self.id}> {self.firstName} {self.lastName} {self.email} {self.password} {self.phoneNumber} {self.dateOfBirth} {self.address}'
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
            "address": self.address
        }
    def set_detail_info(self, phoneNb, dob, address) -> None:
        self.phoneNumber = phoneNb
        self.dateOfBirth = dob
        self.address = address
    def email_exists(self, email) -> bool:
        return User.query.filter_by(email=email).first() is not None