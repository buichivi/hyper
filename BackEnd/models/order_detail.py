from database import db


class OrderDetail(db.Model):
    __tablename__ = "tb_order_detail"
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey("tb_order.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)

    def __init__(
        self, size, quantity, price, total_price, order_id, product_id
    ) -> None:
        self.size = size
        self.quantity = quantity
        self.price = price
        self.total_price = total_price
        self.order_id = order_id
        self.product_id = product_id

    def __repr__(self) -> str:
        return f"<OrderDetail {self.id}> {self.total_price} {self.price} {self.quantity} {self.product_id}"
