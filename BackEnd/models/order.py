from datetime import datetime

from sqlalchemy import JSON

from database import db
from models.order_detail import OrderDetail


class Order(db.Model):
    __tablename__ = "tb_order"
    id = db.Column(db.Integer, primary_key=True)
    total_amount = db.Column(db.Float, nullable=False)

    # Customer info
    order_date = db.Column(db.String(255), nullable=False)
    shipping_address = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    customer_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    province = db.Column(JSON, nullable=False)
    district = db.Column(JSON, nullable=False)
    ward = db.Column(JSON, nullable=False)

    is_paid = db.Column(db.Boolean, nullable=False, default=False)
    payment = db.Column(db.String(255), nullable=False, default="COD")

    # Foreigkey
    status_id = db.Column(
        db.Integer, db.ForeignKey("tb_order_status.id"), nullable=False
    )  # Order status
    user_id = db.Column(db.Integer, db.ForeignKey("tb_users.id"), nullable=False)

    order_details = db.relationship("OrderDetail", backref="order_details", lazy=True)

    def __init__(
        self,
        cus_name,
        shipping_address,
        phone_number,
        email,
        user_id,
        total_amount,
        province,
        district,
        ward,
        payment,
        order_date=datetime.now().strftime("%d/%m/%Y"),
        status_id=1,
        is_paid=False,
    ) -> None:
        self.customer_name = cus_name
        self.shipping_address = shipping_address
        self.phone_number = phone_number
        self.email = email
        self.user_id = user_id
        self.total_amount = total_amount
        self.order_date = order_date
        self.status_id = status_id
        self.province = province
        self.district = district
        self.ward = ward
        self.payment = payment
        self.is_paid = is_paid

    def __repr__(self) -> str:
        return f"<Order {self.id}> {self.total_amount} {self.status} {self.order_date}"

    def to_json(self) -> dict:
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "phone_number": self.phone_number,
            "shipping_address": self.shipping_address,
            "email": self.email,
            "province": self.province,
            "district": self.district,
            "ward": self.ward,
            "order_date": self.order_date,
            "total_amount": self.total_amount,
            "is_paid": self.is_paid,
            "payment": self.payment,
        }
