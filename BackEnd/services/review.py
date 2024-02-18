from flask_cors import cross_origin
from flask_restful import Resource

from models.product import Product
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
