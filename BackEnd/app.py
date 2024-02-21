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

# Brand
api.add_resource(BrandResource, "/brand")
api.add_resource(GetBrandResource, "/brand/<string:brand_code>")
api.add_resource(ShoeTypeResource, "/shoe_types")

# Product
api.add_resource(ProductResource, "/products")
api.add_resource(GetProductResource, "/products/<int:product_id>")
api.add_resource(ProductImageResource, "/product-image")
api.add_resource(CheckingProductIsInStockResource, "/checking-product")


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


shoe_store_app_pwd = "dafojlmacqtyzzvu"
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = "buivi04062002@gmail.com"
app.config["MAIL_PASSWORD"] = shoe_store_app_pwd
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True


mail = Mail(app)


# @app.route("/email")
# def email():
#     order_details = [
#         {
#             "name": "Sản phẩm 1",
#             "quantity": 2,
#             "unit_price": "$50.00",
#             "total_price": "$100.00",
#         },
#         {
#             "name": "Sản phẩm 2",
#             "quantity": 1,
#             "unit_price": "$25.00",
#             "total_price": "$25.00",
#         },
#     ]
#     return render_template("order_detail.html", order=order_details)


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
