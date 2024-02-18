from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_restful import Api

import config
from database import db
from services.brand import *
from services.product import *
from services.product_image import *
from services.review import *
from services.shoe_type import *
from services.user import *

app = Flask(__name__)
app.config.from_object(config)

# Database
db.init_app(app)

# Flask-restful
api = Api(app)

# CORS
CORS(app=app, supports_credentials=True)


@app.after_request
def after_request(response):
    if not "Access-Control-Allow-Credentials" in response.headers:
        response.headers.add("Access-Control-Allow-Credentials", "true")
    if not "Access-Control-Allow-Origin" in response.headers:
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    if not "Access-Control-Allow-Headers" in response.headers:
        response.headers.add(
            "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, content-type"
        )
    if not "Access-Control-Allow-Methods" in response.headers:
        response.headers.add(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"
        )

    return response


# Session
# Session(app)

# flask-login set up
login_manager = LoginManager(app)


# flask-login user_loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


# User
api.add_resource(LoginResource, "/login")
api.add_resource(LogOutResource, "/logout")
api.add_resource(SignUpResource, "/signup")
api.add_resource(GetAllEmailResource, "/all-emails")
api.add_resource(CheckingLoginResource, "/checking-login")
api.add_resource(FavoriteProductsResource, "/me/favorites")

# Brand
api.add_resource(BrandResource, "/brand")
api.add_resource(GetBrandResource, "/brand/<string:brand_code>")
api.add_resource(ShoeTypeResource, "/shoe_types")

# Product
api.add_resource(ProductResource, "/products")
api.add_resource(GetProductResource, "/products/<int:product_id>")
api.add_resource(ProductImageResource, "/product-image")


# Review
api.add_resource(CreateReviewResource, "/product-reviews") # Add a review
api.add_resource(ReviewResource, "/product-reviews/<int:product_id>") # Get all review by product_id

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
