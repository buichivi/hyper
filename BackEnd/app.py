import config
from admin.models import *
from database import db
from flask import Flask, redirect
from flask_admin import Admin
from flask_cors import CORS
from flask_login import LoginManager
from flask_mail import Mail, Message
from flask_restful import Api
from models.slider import Slider
from services.brand import *
from services.cart import *
from services.order import *
from services.product import *
from services.product_image import *
from services.review import *
from services.shoe_type import *
from services.slider import *
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

admin = Admin(app, template_mode="bootstrap4")

admin.add_view(UserView(User, db.session))
admin.add_view(BrandView(Brand, db.session))
admin.add_view(ShoeTypeView(ShoeType, db.session))
admin.add_view(ProductView(Product, db.session))
admin.add_view(ProductImageView(ProductImage, db.session))
admin.add_view(ProductSizeView(ProductSize, db.session))
admin.add_view(OrderView(Order, db.session))
admin.add_view(SliderView(Slider, db.session))
admin.add_view(LogoutAdmin(name="Log out"))


@app.route("/login-admin", methods=["POST", "GET"])
def login_admin():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password) and user.role == "ADMIN":
            login_user(user)
    return redirect("/admin")


# Fix cors problem
@app.after_request
def after_request(response):
    if not "Access-Control-Allow-Credentials" in response.headers:
        response.headers.add("Access-Control-Allow-Credentials", "true")
    if not "Access-Control-Allow-Origin" in response.headers:
        response.headers.add("Access-Control-Allow-Origin", "*")
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


# @app.route("/email")
# def index():
#     return render_template("order_detail.html", sub_total=0, total=0, message="Hello")


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
api.add_resource(ChangeUserInfoResource, "/change-infomation")

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
api.add_resource(GetFeaturedProductResource, "/featured")
api.add_resource(GetOtherProductOfBrandResource, "/recommended")


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
api.add_resource(GetAllOrderResource, "/me/order/all")

# Slider
api.add_resource(SliderResource, "/slider")


@app.template_global()
def round_up(number):
    return math.ceil(number)


def send_email(subject, sender, recipients, body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.html = body
    mail.send(msg)


def insert_order_statuses():
    # Thêm các trạng thái cho đơn hàng vào cơ sở dữ liệu
    order_statuses = [
        {"name": "Pending"},
        {"name": "Processing"},
        {"name": "Shipped"},
        {"name": "Delivered"},
    ]

    for status in order_statuses:
        existing_status = OrderStatus.query.filter_by(status=status["name"]).first()
        if existing_status is None:
            new_status = OrderStatus(status=status["name"])
            db.session.add(new_status)

    # Lưu các thay đổi vào cơ sở dữ liệu
    db.session.commit()


def insert_admin_user():
    user = User("Bui Chi", "Vi", "admin@gmail.com", "admin", role="ADMIN")
    if not User.query.filter_by(email=user.email).first():
        db.session.add(user)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        insert_admin_user()
        insert_order_statuses()
    app.run(debug=True)
