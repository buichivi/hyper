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
