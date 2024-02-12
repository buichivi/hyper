from database import db


class ShoeType(db.Model):
    __tablename__ = "tb_shoetype"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(100), nullable=False)
    imgUrl = db.Column(db.String(255), nullable=True)

    # ForeignKey
    brand_id = db.Column(db.Integer, db.ForeignKey("tb_brand.id"), nullable=False)

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
        return f"<ShoeType {self.id}> {self.name} {self.code} {self.imgUrl}"
