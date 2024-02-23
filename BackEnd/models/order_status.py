from database import db

class OrderStatus(db.Model):
    __tablename__ = "tb_order_status"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(255), nullable=False, unique=True)

    orders = db.relationship("Order", backref="orders", lazy=True)

    def __init__(self, status) -> None:
        self.status = status

    def __repr__(self) -> str:
        return f"<OrderStatus {self.id}> {self.status}"

    def to_json(self) -> dict:
        return {"id": self.id, "status": self.status}
