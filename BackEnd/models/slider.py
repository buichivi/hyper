from database import db


class Slider(db.Model):
    __tablename__ = "tb_slider"
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, nullable=False, unique=True)

    def __repr__(self) -> str:
        return f"<Slider {self.id}> {self.img_url} {self.order}"

    def to_json(self) -> dict:
        return {"id": self.id, "img_url": self.img_url, "order": self.order}
