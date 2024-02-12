from database import db


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
    imgUrl = db.Column(
        db.String(255), nullable=False, default="https://placehold.co/600x600"
    )

    # ForeignKey
    brand_id = db.Column(db.Integer, db.ForeignKey("tb_brand.id"), nullable=False)
    shoe_type_id = db.Column(
        db.Integer, db.ForeignKey("tb_shoetype.id"), nullable=False
    )

    def __init__(
        self,
        name,
        detail,
        price,
        brand_id,
        shoe_type_id,
        discount=0,
        featured=False,
        imgUrl="https://placehold.co/600x600",
    ) -> None:
        self.name = name
        self.detail = detail
        self.price = price
        self.featured = featured
        self.imgUrl = imgUrl
        self.discount = discount
        self.brand_id = brand_id
        self.shoe_type_id = shoe_type_id

    def set_discount(self, discount) -> None:
        self.discount = discount

    def set_imgUrl(self, imgUrl) -> None:
        self.imgUrl = imgUrl

    def set_featured(self, featured) -> None:
        self.featured = featured

    def to_json(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "detail": self.detail,
            "price": self.price,
            "featured": self.featured,
            "imgUrl": self.imgUrl,
        }

    def __repr__(self) -> str:
        return f"<Product {self.id}> {self.name} {self.detail} {self.price} {self.discount} {self.brand_id} {self.shoe_type_id}"
