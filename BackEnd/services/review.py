from flask import request
from flask_cors import cross_origin
from flask_login import current_user, login_required
from flask_restful import Resource

from database import db
from models.order import Order
from models.order_detail import OrderDetail
from models.product import Product
from models.review import Review
from models.user import User


class ReviewResource(Resource):
    @cross_origin()
    def get(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            return {"message": "No products found"}, 200
        reviews = product.product_reviews
        product_reviews = []
        total_rating = 0
        for review in reviews:
            total_rating += review.rating
            review_dict = review.to_json()
            review_dict["user_name"] = User.query.get(review.user_id).get_name()
            product_reviews.append(review_dict)
        rating_average = 0
        if len(reviews) > 0:
            rating_average = round(total_rating / len(reviews), 1)
        return {
            "description": product.description,
            "reviews": {
                "rating_average": rating_average,
                "review_details": product_reviews,
            },
        }


class CreateReviewResource(Resource):
    @cross_origin()
    @login_required
    def post(self):
        data = request.get_json()
        print(data)
        title = data.get("title")
        content = data.get("content")
        rating = data.get("rating")
        product_id = data.get("product_id")

        if not title:
            return {"message": "No title review is provided"}, 400
        if not content:
            return {"message": "No content review is provided"}, 400
        if not rating:
            return {"message": "No rating review is provided"}, 400
        if not product_id:
            return {"message": "No product_id is provided"}, 400
        product = Product.query.get(product_id)
        if not product:
            return {"message": "No product match product_id"}, 400

        is_bought = False

        user_orders = Order.query.filter_by(user_id=current_user.id).all()
        for user_order in user_orders:
            if user_order.status_id == 4:
                order_details = user_order.order_details
                for order_detail in order_details:
                    if int(order_detail.product_id) == int(product_id):
                        is_bought = True
                        break
                if is_bought == True:
                    break

        if is_bought == False:
            return {
                "message": "You cannot review if you have not purchased this product!"
            }, 400
        review = Review(rating, title, content, product_id, current_user.id)
        db.session.add(review)
        db.session.commit()
        review_json = review.to_json()
        review_json["user_name"] = current_user.get_name()
        return {
            "message": "Add a review successfully!",
            "review": review_json,
        }, 200
