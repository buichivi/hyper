from flask import Flask, render_template
from flask_cors import CORS
from flask_login import LoginManager
from flask_mail import Mail, Message
from flask_restful import Api

import config
from database import db
from services.brand import *
from services.cart import *
from services.order import *
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

# Mailing
mail = Mail(app)


# Fix cors problem
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
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH"
        )

    return response


# flask-login set up
login_manager = LoginManager(app)


@app.route("/email")
def index():
    return render_template("order_detail.html", sub_total=0, total=0, message="Hello")


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
api.add_resource(CheckingEmailSignUpResource, "/check-email")
api.add_resource(ChangePasswordResource, "/change-password")

# Brand
api.add_resource(BrandResource, "/brand")
api.add_resource(GetBrandResource, "/brand/<string:brand_code>")
api.add_resource(ShoeTypeResource, "/shoe_types")

# Product
api.add_resource(ProductResource, "/products")
api.add_resource(GetProductResource, "/products/<int:product_id>")
api.add_resource(ProductImageResource, "/product-image")
api.add_resource(CheckingProductIsInStockResource, "/checking-product")
api.add_resource(SearchProductResource, "/search")


# Review
api.add_resource(CreateReviewResource, "/product-reviews")  # Add a review
api.add_resource(
    ReviewResource, "/product-reviews/<int:product_id>"
)  # Get all review by product_id

# Cart
api.add_resource(CartResource, "/me/cart")
api.add_resource(UpdateCartItemQuantityResource, "/me/cart/update")
api.add_resource(ClearCartResource, "/me/cart/clear")

# Order
api.add_resource(OrderResource, "/me/order")
api.add_resource(UpdateOrderStatusResource, "/me/order/status")


@app.template_global()
def round_up(number):
    return math.ceil(number)


def send_email(subject, sender, recipients, body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.html = body
    mail.send(msg)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
