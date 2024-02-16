from database import db


class ProductSize(db.Model):
    __tablename__ = "tb_product_size"
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.Integer, nullable=False)
    quantity_in_stock = db.Column(db.Integer, nullable=False, default=0)

    # ForeignKey
    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)

    def __repr__(self) -> str:
        return f"<ProductSize {self.id}> {self.size} {self.quantity_in_stock} {self.product_id}"

    def get_size(self) -> dict:
        return {"size": self.size, "quantity_in_stock": self.quantity_in_stock}
