# from database import db


# class Payment(db.Model):
#     __tablename__ = "tb_payment"
#     id = db.Column(db.Integer, primary_key=True)
#     payment_method = db.Column(db.String(255), nullable=False)

#     # Foreignkey
#     order_id = db.Column(db.Integer, db.ForeignKey("tb_order.id"), nullable=False)

#     def __repr__(self) -> str:
#         return f"<Order {self.id}> {self.total_amount} {self.status} {self.order_date}"
