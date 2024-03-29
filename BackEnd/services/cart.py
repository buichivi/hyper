from flask import request
from flask_cors import cross_origin
from flask_login import current_user, login_required
from flask_restful import Resource

from database import db
from models.cart import Cart
from models.product import Product
from models.product_size import ProductSize
from models.user import User


class CartResource(Resource):
    @cross_origin()
    @login_required
    def get(self):
        user_cart = current_user.cart
        user_cart_json = []
        for cart in user_cart:
            product = Product.query.get(cart.product_id)
            cart_json = cart.to_json()
            cart_json["product"] = product.to_json()
            user_cart_json.append(cart_json)
        return {"cart": user_cart_json}, 200

    @cross_origin()
    @login_required
    def post(self):
        data = request.get_json()
        product_id = data.get("product_id")
        size = data.get("size")
        quantity = int(data.get("quantity"))
        if not product_id:
            return {"message": "No product_id is provided!"}, 400
        if not size:
            return {"message": "No size is provided!"}, 400
        if not quantity:
            return {"message": "No quantity is provided!"}, 400
        product = Product.query.get(product_id)
        if not product:
            return {"message": "Product is not exist!"}, 400
        product_size = ProductSize.query.filter_by(
            size=size, product_id=product_id
        ).first()
        if not product_size:
            return {"message": "This size is not exist!"}, 400
        if product_size.quantity_in_stock == 0:
            return {"message": "This product is out of stock"}, 400
        if not product.is_in_stock():
            return {"message": "This product is out of stock"}, 400
        if quantity > product_size.quantity_in_stock:
            return {
                "message": f"This size only has {product_size.quantity_in_stock} products left in stock"
            }, 400

        existed_cart = Cart.query.filter_by(
            user_id=str(current_user.id), product_id=str(product_id), size=str(size)
        ).first()
        print(product.name)
        if not existed_cart:
            new_cart = Cart(
                current_user.id,
                product.name,
                product.price,
                product.discount,
                product_id,
                size,
                quantity,
            )
            db.session.add(new_cart)
            db.session.commit()
            new_cart_json = new_cart.to_json()
            new_cart_json["product"] = product.to_json()
            return {
                "message": "Add product to cart successfully!",
                "cart_item": new_cart_json,
            }, 200
        if existed_cart.quantity + quantity > product_size.quantity_in_stock:
            return {
                "message": "The quantity you added has exceeded the quantity of products in stock"
            }, 400
        existed_cart.quantity += quantity
        db.session.commit()
        existed_cart_json = existed_cart.to_json()
        existed_cart_json["product"] = product.to_json()
        return {
            "message": "Update cart successfully!",
            "cart_item": existed_cart_json,
        }, 200

    @cross_origin()
    @login_required
    def delete(self):
        data = request.args
        cart_item_id = data.get("cart_item_id")
        if not cart_item_id:
            return {"message": "No cart_item_id is provided!"}, 400
        cart_item = Cart.query.get(cart_item_id)
        if not cart_item:
            return {"message": "Cart item is not exist"}, 400
        db.session.delete(cart_item)
        db.session.commit()
        return {
            "message": "Remove cart item successfully!",
            "cart_item": cart_item.to_json(),
        }, 200


class UpdateCartItemQuantityResource(Resource):
    @cross_origin()
    @login_required
    def patch(self):
        data = request.get_json()
        cart_item_id = data.get("cart_item_id")
        quantity = int(data.get("quantity"))
        if not cart_item_id:
            return {"message": "No cart_item_id is provided!"}, 400
        if quantity is None:
            return {"message": "Quantity not is provided!"}, 400
        if quantity < 0:
            return {"message": "Product quantity cannot be negative!"}, 400
        cart_item = Cart.query.get(cart_item_id)
        if not cart_item:
            return {"message": "Cart item is not exist"}, 400
        product = Product.query.get(cart_item.product_id)
        product_size = ProductSize.query.filter_by(
            size=cart_item.size, product_id=cart_item.product_id
        ).first()
        if product_size.quantity_in_stock == 0:
            return {"message": "This product is out of stock"}, 400
        if not product.is_in_stock():
            return {"message": "This product is out of stock"}, 400
        if quantity > product_size.quantity_in_stock:
            return {
                "message": f"This size only has {product_size.quantity_in_stock} products left in stock"
            }, 400

        if quantity == 0:
            cart_item.quantity = 0
            db.session.delete(cart_item)
            db.session.commit()
            return {
                "message": "Removed item from your cart",
                "cart_item": cart_item.to_json(),
            }, 200
        cart_item.quantity = quantity
        db.session.commit()
        return {"message": "Updated quantity!", "cart_item": cart_item.to_json()}, 200


class ClearCartResource(Resource):
    @cross_origin()
    @login_required
    def delete(self):
        try:
            cart = Cart.query.filter_by(user_id=current_user.id)
            cart.delete()
            db.session.commit()
            return {"message": "Your shopping cart has now been cleared!"}, 200
        except:
            return {"message": "Something went wrong"}, 400
