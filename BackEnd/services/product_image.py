from flask import request
from flask_cors import cross_origin
from flask_restful import Resource
from models.product import Product
from models.product_image import ProductImage


class ProductImageResource(Resource):
    @cross_origin()
    def get(self):
        product_id = request.args.get("product_id")
        product = Product.query.get(product_id)
        product_imgs = [{"img_url": product.img_preview}]
        product_img_details = ProductImage.query.filter_by(product_id=product_id).all()
        for product_img in product_img_details:
            product_imgs.append(product_img.to_json())
        return {"product_imgs": product_imgs}
