from flask_restful import Resource

from models.product_image import ProductImage


class ProductImageResource(Resource):
    def get(self):
        return "hello world"
