from database import db


class ProductImage(db.Model):
    __tablename__ = "tb_product_image"

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(
        db.String(255), nullable=False, default="https://placehold.co/600x600"
    )
    is_preview = db.Column(db.Boolean, nullable=False, default=False)

    # ForeignKey
    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)

    def __repr__(self) -> str:
        return f"<ProductImage {self.id}> {self.img_url} {self.is_preview}"

    def to_json(self) -> dict:
        return {
            "id": self.id,
            "img_url": self.img_url,
            "is_preview": self.is_preview,
        }
