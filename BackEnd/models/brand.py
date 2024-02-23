from database import db


class Brand(db.Model):
    __tablename__ = "tb_brand"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(100), nullable=False, unique=True)
    img_url = db.Column(db.Text, nullable=True)

    # Create relationship with table tb_shoetype
    shoe_types = db.relationship("ShoeType", backref="brand", lazy=True)

    def __init__(self, name, code, img_url) -> None:
        self.name = name
        self.code = code
        self.img_url = img_url

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "img_url": self.img_url,
        }

    def __repr__(self) -> str:
        return f"<Brand {self.id}> {self.name} {self.code} {self.img_url}"
