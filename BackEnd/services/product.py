from flask import request
from flask_cors import cross_origin
from flask_restful import Resource

from database import db
from models.product import Product


class ProductResource(Resource):
    @cross_origin()
    def get(self):
        products = Product.query.all()
        data = [product.to_json() for product in products]
        return {"products": data}

    @cross_origin()
    def post(self):
        data = request.get_json()
        name = data.get("name")
        detail = data.get("detail")
        price = data.get("price")
        discount = data.get("discount")
        featured = data.get("featured")
        imgUrl = data.get("imgUrl")
        brand_id = data.get("brand_id")
        shoe_type_id = data.get("shoe_type_id")
        if not name:
            return {"message": "Product name is missing"}, 400
        if not detail:
            return {"message": "Product detail is missing"}, 400
        if not price:
            return {"message": "Product price is missing"}, 400
        if not brand_id:
            return {"message": "Product brand id is missing"}, 400
        if not shoe_type_id:
            return {"message": "Product shoe type id is missing"}, 400

        product = Product(name, detail, price, brand_id, shoe_type_id)
        if discount:
            product.set_discount(discount)
        if imgUrl:
            product.set_imgUrl(imgUrl)
        if featured:
            product.set_featured(featured)

        db.session.add(product)
        db.session.commit()

        return {"message": "Add a product successfully!", "product": product.to_json()}
