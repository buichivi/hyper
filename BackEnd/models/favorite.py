from datetime import datetime

from database import db


class Favorite(db.Model):
    __tablename__ = "tb_favorite"
    id = db.Column(db.Integer, primary_key=True)
    favorite_on = db.Column(db.String(255), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("tb_users.id"), nullable=False)

    def __init__(
        self, product_id, user_id, favor_on=datetime.now().strftime("%d/%m/%Y")
    ) -> None:
        self.product_id = product_id
        self.user_id = user_id
        self.favorite_on = favor_on

    def __repr__(self) -> str:
        return f"<Favorite {self.id}> {self.favorite_on}"

    def to_json(self) -> dict:
        return {"id": self.id, "user_id": self.user_id, "product_id": self.product_id}
