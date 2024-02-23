from flask_cors import cross_origin
from flask_restful import Resource

from models.slider import Slider


class SliderResource(Resource):
    @cross_origin()
    def get(self):
        sliders = Slider.query.order_by(Slider.order.asc()).all()
        print(sliders)
        return {"sliders": [slider.to_json() for slider in sliders]}, 200
