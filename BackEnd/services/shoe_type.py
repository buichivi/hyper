from flask_cors import cross_origin
from flask_restful import Resource

from models.shoe_type import ShoeType


class ShoeTypeResource(Resource):
    @cross_origin()
    def get(self):

        return {"brand": "Hello"}
