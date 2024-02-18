from datetime import datetime

from database import db


class Review(db.Model):
    __tablename__ = "tb_review"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False, default=0)
    title = db.Column(db.String(255), nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    comment_on = db.Column(db.String(255), nullable=False)

    # ForeignKey
    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("tb_users.id"), nullable=False)

    def __init__(
        self,
        rating,
        title,
        comment,
        product_id,
        user_id,
        comment_on=datetime.now().strftime("%d/%m/%Y"),
    ) -> None:
        self.rating = rating
        self.title = title
        self.comment = comment
        self.comment_on = comment_on
        self.product_id = product_id
        self.user_id = user_id

    def __repr__(self) -> str:
        return f"<Review {self.id}> {self.title} {self.comment} {self.rating} {self.comment_on}"

    def to_json(self) -> dict:
        return {
            "rating": self.rating,
            "title": self.title,
            "comment": self.comment,
            "comment_on": self.comment_on,
        }
