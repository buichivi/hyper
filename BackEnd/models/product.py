from database import db
from models.product_image import ProductImage
from models.product_size import ProductSize


class Product(db.Model):
    __tablename__ = "tb_product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    detail = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    discount = db.Column(db.Integer, nullable=False, default=0)
    featured = db.Column(
        db.Boolean, nullable=False, default=False
    )  # Đánh dấu sản phẩm nổi bật

    # ForeignKey
    brand_id = db.Column(db.Integer, db.ForeignKey("tb_brand.id"), nullable=False)
    shoe_type_id = db.Column(
        db.Integer, db.ForeignKey("tb_shoe_type.id"), nullable=False
    )
    product_images = db.relationship(
        "ProductImage", backref="product_images", lazy=True
    )
    product_sizes = db.relationship("ProductSize", backref="product_sizes", lazy=True)

    def __init__(
        self,
        name,
        detail,
        price,
        brand_id,
        shoe_type_id,
        discount=0,
        featured=False,
    ) -> None:
        self.name = name
        self.detail = detail
        self.price = price
        self.featured = featured
        self.discount = discount
        self.brand_id = brand_id
        self.shoe_type_id = shoe_type_id

    def set_discount(self, discount) -> None:
        self.discount = discount

    def set_featured(self, featured) -> None:
        self.featured = featured

    def to_json(self) -> dict:
        sizes = (
            ProductSize.query.filter_by(product_id=self.id)
            .order_by(ProductSize.size.asc())
            .all()
        )
        product_sizes = [size.get_size() for size in sizes]
        img_url = ""

        product_image_preview = ProductImage.query.filter_by(
            product_id=self.id, is_preview=True
        ).first()
        if product_image_preview:
            img_url = product_image_preview.img_url

        return {
            "id": self.id,
            "name": self.name,
            "detail": self.detail,
            "price": self.price,
            "discount": self.discount,
            "featured": self.featured,
            "sizes": product_sizes,
            "img_preview_url": img_url,
            "shoe_type_id": self.shoe_type_id,
            "brand_id": self.brand_id,
        }

    def __repr__(self) -> str:
        return f"<Product {self.id}> {self.name} {self.detail} {self.price} {self.discount} {self.brand_id} {self.shoe_type_id}"
