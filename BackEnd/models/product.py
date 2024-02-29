from datetime import datetime

from database import db
from models.brand import Brand
from models.favorite import Favorite
from models.product_size import ProductSize
from models.shoe_type import ShoeType


class Product(db.Model):
    __tablename__ = "tb_product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    img_preview = db.Column(db.Text, nullable=False)
    discount = db.Column(db.Integer, nullable=False, default=0)
    featured = db.Column(
        db.Boolean, nullable=False, default=False
    )  # Đánh dấu sản phẩm nổi bật
    manufacture_date = db.Column(
        db.String(255), nullable=False, default=datetime.now().strftime("%d/%m/%Y")
    )

    # ForeignKey
    brand_id = db.Column(db.Integer, db.ForeignKey("tb_brand.id"), nullable=False)
    shoe_type_id = db.Column(
        db.Integer, db.ForeignKey("tb_shoe_type.id"), nullable=False
    )

    # Relationship
    product_images = db.relationship(
        "ProductImage", backref="product_images", lazy=True
    )
    product_sizes = db.relationship("ProductSize", backref="product_sizes", lazy=True)
    product_reviews = db.relationship("Review", backref="product_reviews", lazy=True)

    def __init__(
        self,
        name,
        description,
        price,
        brand_id,
        shoe_type_id,
        img_preview="https://placehold.co/600x400",
        discount=0,
        featured=False,
        manufacture_date=datetime.now().strftime("%d/%m/%Y"),
    ) -> None:
        self.name = name
        self.description = description
        self.price = price
        self.img_preview = img_preview
        self.featured = featured
        self.discount = discount
        self.brand_id = brand_id
        self.shoe_type_id = shoe_type_id
        self.manufacture_date = manufacture_date

    def set_discount(self, discount) -> None:
        self.discount = discount

    def set_featured(self, featured) -> None:
        self.featured = featured

    def set_img_preview(self, img_preview) -> None:
        self.img_preview = img_preview

    def to_json(self) -> dict:
        sizes = self.product_sizes
        total_quantity = 0
        for size in sizes:
            total_quantity += size.quantity_in_stock

        product_sizes = [size.get_size() for size in sizes]
        product_sizes.sort(key=lambda x: x["size"])
        brand = Brand.query.get(self.brand_id)
        shoe_type = ShoeType.query.get(self.shoe_type_id)

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "discount": self.discount,
            "featured": self.featured,
            "sizes": product_sizes,
            "manufacture_date": self.manufacture_date,
            "img_preview": self.img_preview,
            "shoe_type": shoe_type.to_json(),
            "brand": brand.to_json(),
            "total_quantity": total_quantity,
        }

    def is_in_stock(self):
        sizes = self.product_sizes
        total_quantity = 0
        for size in sizes:
            total_quantity += size.quantity_in_stock
        if total_quantity == 0:
            return False
        return True

    def __repr__(self) -> str:
        return f"<Product {self.id}> {self.name} {self.description} {self.price} {self.discount} {self.brand_id} {self.shoe_type_id}"
