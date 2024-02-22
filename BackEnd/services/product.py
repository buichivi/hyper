from flask import request
from flask_cors import cross_origin
from flask_restful import Resource

from database import db
from models.brand import Brand
from models.product import Product
from models.product_size import ProductSize
from models.review import Review
from models.shoe_type import ShoeType


class ProductResource(Resource):
    @cross_origin()
    def get(self):
        brand_code = request.args.get("brand_code")
        shoe_type_code = request.args.get("shoe_type_code")
        if not brand_code:
            return {"message": "brand_code is not provided!"}, 400
        brand = Brand.query.filter_by(code=brand_code).first()
        shoe_type = ShoeType.query.filter_by(code=shoe_type_code).first()
        if not brand:
            return {"message": "No brand is match with brand_code!"}, 400
        products = None
        result = None
        if not shoe_type_code:
            products = Product.query.filter_by(brand_id=brand.id).all()
            result = [product.to_json() for product in products]
            return {"products": result}, 200
        products = Product.query.filter_by(
            brand_id=brand.id, shoe_type_id=shoe_type.id
        ).all()
        result = [product.to_json() for product in products]
        return {"products": result}, 200

    @cross_origin()
    def post(self):
        data = request.get_json()
        name = data.get("name")
        detail = data.get("detail")
        price = data.get("price")
        discount = data.get("discount")
        featured = data.get("featured")
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
        if featured:
            product.set_featured(featured)

        db.session.add(product)
        db.session.commit()

        return {"message": "Add a product successfully!", "product": product.to_json()}


class GetProductResource(Resource):
    @cross_origin()
    def get(self, product_id):
        if not product_id:
            return {"message": "No product_id is not provided"}, 400
        product = Product.query.get(product_id)
        if not product:
            return {
                "message": "No products were found with the provided product_id!"
            }, 200
        return {"product": product.to_json()}, 200


class CheckingProductIsInStockResource(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        product_carts = data.get("product_carts")
        if not product_carts:
            return {"message": "No product_carts is provided!"}, 400
        for product_cart in product_carts:
            product_size = ProductSize.query.filter_by(
                product_id=product_cart["product_id"], size=product_cart["size"]
            ).first()
            if product_size.quantity_in_stock < product_cart["quantity"]:
                return {
                    "message": f"The product named {product_cart['product_name']} with size {product_cart["size"]} is no longer in stock",
                    "cart_id": product_cart['cart_id']
                }, 400
        return {"message": "All product are still in stock"}, 200


class SearchProductResource(Resource):
    @cross_origin()
    def get(self):
        query = request.args.get('query')
        products = Product.query.filter(Product.name.ilike(f"%{query}%")).all()
        products_json = [product.to_json() for product in products]
        return {
            "products": products_json
        }
