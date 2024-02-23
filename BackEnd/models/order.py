from datetime import datetime

from sqlalchemy import JSON

from database import db
from models.order_detail import OrderDetail
from models.order_status import OrderStatus


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
        is_paid=False,
    ) -> None:
        order_status = OrderStatus.query.filter_by(status="Pending").first()
        self.customer_name = cus_name
        self.shipping_address = shipping_address
        self.phone_number = phone_number
        self.email = email
        self.user_id = user_id
        self.total_amount = total_amount
        self.order_date = order_date
        self.status_id = order_status.id
        self.province = province
        self.district = district
        self.ward = ward
        self.payment = payment
        self.is_paid = is_paid

    def __repr__(self) -> str:
        return f"""<Order {self.id}> {self.total_amount} {self.status_id} {self.order_date}"""

    def to_json(self) -> dict:
        status = OrderStatus.query.get(self.status_id)
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
            "status": status.status,
        }
