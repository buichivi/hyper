from database import db


class ShoeType(db.Model):
    __tablename__ = "tb_shoe_type"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(100), nullable=False)
    img_url = db.Column(db.Text, nullable=True)

    # ForeignKey
    brand_id = db.Column(db.Integer, db.ForeignKey("tb_brand.id"), nullable=False)

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
        return f"<ShoeType {self.id}> {self.name} {self.code} {self.img_url}"
