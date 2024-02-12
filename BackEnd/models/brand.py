from database import db


class Brand(db.Model):
    __tablename__ = "tb_brand"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(100), nullable=False, unique=True)
    imgUrl = db.Column(db.String(255), nullable=True)

    # Create relationship with table tb_shoetype
    shoe_types = db.relationship("ShoeType", backref="brand", lazy=True)

    def __init__(self, name, code, imgUrl) -> None:
        self.name = name
        self.code = code
        self.imgUrl = imgUrl

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "imgUrl": self.imgUrl,
        }

    def __repr__(self) -> str:
        return f"<Brand {self.id}> {self.name} {self.code} {self.imgUrl}"
