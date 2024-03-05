import os
import os.path as op
from urllib.parse import urlparse

import firebase_admin
from firebase_admin import credentials, storage
from flask import redirect
from flask_admin import BaseView, expose, form
from flask_admin.contrib.sqla import ModelView, fields
from flask_admin.form import ImageUploadField, Select2Field, Select2Widget
from flask_login import current_user, login_required, logout_user
from markupsafe import Markup
from models.brand import Brand, db
from models.order_status import OrderStatus
from models.product import Product
from models.product_image import ProductImage
from models.shoe_type import ShoeType
from models.user import User
from werkzeug.security import generate_password_hash
from wtforms import SelectField
from wtforms.fields import DateField
from wtforms.widgets import DateInput

cred = credentials.Certificate(
    {
        "type": "service_account",
        "project_id": "shoes-store-4cb03",
        "private_key_id": "3dfdfe24fdefbd98f450b704a6cccb5cb2597cb6",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGT09aJwrMEaEe\n4OcPa2gVhD2Lll1T6IdgGbmI73qz3aN0JKbJ3XjLxfqSKDR8RvFDV0BuDBb430Ly\nmhqOj9V2T95VCyu8tA0vS5O9JKpaFxKNf+RWckwfnprWwqzaswTw23QWnwLaT4oC\nayZ4E2jNzcUMN4mJS3J0QlMpgjga6JWqP68bszNVi65ZbGfbeuTvLuLEfn3dR2Aa\nRy99GeB43RewFDXgwlAD1gsXa03rtF9pvlCNE6OPPVlx0huAWaugHVC4mBQO7tnr\nS/pjdQ0yy/5gYtYHxMfzFmfMWzr2pqeId+qTt7AjOh1S4fl9dnbaw5WVpwctHnrm\nSTk0SQyFAgMBAAECggEAOumN4nrumv1+oWdAIrzXjlyPjGtbq4L64nXWMpDszvmA\niWDMQg5hvmwsUTDOeNa7W/DpI3wtFWQE3xomXPMNTFSTLtV0DVUi1WR+vL/Y8yRc\nsHFxLFP9PP9aZqpEnLdaivWPsZ5052JtJEtwt8m3tlI0RPwVWYIdBY7UIIhsaKyK\n0bMvg+zNqPPMe+aiCcnEvQzpiCSH2qlGtc8alSB1Q8q2bedIgDDidAuhWSziLHix\nt0ZUxTsHHt8d5ry2g721oBE67+H8BRkvDpfwOW0SSu2dYEYdg2ZewIsD0V5pCrEi\nmF+SBTIY8JbV6PmtmqoSrsSnXgvWjLci1N02XNZFLwKBgQC56QV8PYwxIVYLr9G+\nD9QCK4D8moQ9Xnd7QVwPUvIp4R3oz5Sx+rUFfrLpM0O4VDBMBP83edog4WfCghbk\necVdcTYH2DkOk8z/aTsdcKtru3CY9pXG6gsiWhlbJ745wbi01U4ExYLPwuqsmV9j\nvVVAaNmeV+ybXgnntx5C7YQZswKBgQC48h0ZKUjgDcUDb6IZjzQbn2o/jBxDBdXI\nFQAoIy6LcHOom9S0mAF3xOmpgT+zm+F5aPVU5ZPDjlaRqUnPmTJERgFkEpgUUjbk\nKLoDtL7Lmi/ePkDnHgLdsHKMhGQzxDUYbp341qb9TcjZHIGtB9yFoQi16Lp91B1f\ngq689ey05wKBgCLmcsgrCbljZ7LT88z5TbSGlDVXkIGwzT9POsgJqzpfb2z4IxLy\nXK9GZLHQlOLyswpiWcMBVgicKA1kvIVxsrJjAWChn7xz1KUSDS3uq8+SpYWhrOZl\no2d0gJQTNuvCyTjxXi8ZIQB9t+5k8HpZ3bo0tL28Bcf49GUShFTOH+FvAoGBALju\ngGI0ggZoPmQdMD3WkAg+84LvmyL5prcXKLz50QTlQQGMMLkUdgNJB0zTTNtQN7mr\nVgW6OnME1VN5r7DCQx050xI59Y/8VZ73imlCRrZYSx0zqrpvq/X5BdG0YG3S+DSi\nB5xXJ0uKiBdxBcn7XmrQh2E+gZxoiaaDii6wyixpAoGACbqnFd+w0NkGTDPPHq20\ncj13DYORtpzR49Lns5obrXnp09D7usoxOZo4PZnf49GOEmckYMnBsVpMp3X5v/1W\njwUnIrKglc+XphKnfkXPx4+vCVJQJYD638mpNfVp/svdigQyFwi3njpn/FfuPktl\n9CyIwkdMFFwt2ZEK+TxOQI8=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-ant4d@shoes-store-4cb03.iam.gserviceaccount.com",
        "client_id": "104783146617463048221",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ant4d%40shoes-store-4cb03.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com",
    }
)
firebase_admin.initialize_app(cred, {"storageBucket": "shoes-store-4cb03.appspot.com"})
bucket = storage.bucket()


def delete_image(image_url):
    try:
        blob = bucket.blob(image_url)
        blob.delete()
        print("Image deleted successfully.")
    except Exception as e:
        print("Error deleting image:", e)


file_path = op.join(op.dirname(__file__), "uploads")
try:
    os.mkdir(file_path)
except OSError:
    pass


class LogoutAdmin(BaseView):
    @expose("/")
    @login_required
    def index(self):
        logout_user()
        return redirect("/admin")

    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"


class UserView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    def on_model_change(self, form, model, is_created):
        # Kiểm tra xem có thực hiện tạo người dùng mới hay không
        if is_created:
            # Lấy mật khẩu từ form và mã hóa
            password = form.password.data
            hashed_password = generate_password_hash(password)
            # Gán mật khẩu đã mã hóa vào model
            model.password = hashed_password

    column_list = ("firstName", "lastName", "email", "role")
    column_labels = dict(firstName="First Name", lastName="Last Name")
    form_extra_fields = {
        "role": SelectField(
            label="Role",
            choices=[
                ("CUSTOMER", "CUSTOMER"),
                ("ADMIN", "ADMIN"),
            ],  # Chỉ định các lựa chọn
            widget=Select2Widget(),
        ),
    }
    form_args = {
        "province": {"default": '{"province_id": -1}'},
        "district": {"default": '{"district": -1}'},
        "ward": {"default": '{"ward": -1}'},
    }


class BrandView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    column_list = ("name", "code", "image logo")
    column_searchable_list = ("name", "code")

    def _get_brand_img(view, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        file = form.img_url.data
        if not isinstance(file, str):
            # Tải lên file vào Firebase Storage
            blob = bucket.blob(file.filename)
            blob.upload_from_file(file, rewind=True, content_type=file.content_type)

            # Lấy đường dẫn URL của file đã tải lên
            blob.make_public()
            url = blob.public_url
            os.remove(op.join(file_path, file.filename))

            # Lưu đường dẫn URL vào trường ImageUploadField
            model.img_url = url
        else:
            model.img_url = file

    def on_model_delete(self, model):
        super().on_model_delete(model)

        # Get the file name want to delete
        parsed_url = urlparse(model.img_url)
        file_name = os.path.basename(parsed_url.path)

        # Xoá ảnh từ Firebase Storage
        delete_image(file_name)

    form_extra_fields = {"img_url": ImageUploadField("Image", base_path=file_path)}

    column_formatters = {"image logo": _get_brand_img}


class ShoeTypeView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    column_hide_backrefs = False
    form_extra_fields = {
        "brand": fields.QuerySelectField(
            label="Brand",
            query_factory=lambda: Brand.query.all(),
            widget=Select2Widget(),
            get_label="name",
        ),
        "img_url": ImageUploadField("Image", base_path=file_path),
    }

    column_list = ("name", "code", "brand_name", "image sample")
    column_searchable_list = ("name", "code")

    def _get_brand_name(view, context, model, name):
        brand = Brand.query.get(model.brand_id)
        return brand.name if brand else None

    def _get_shoe_type_img(view, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        file = form.img_url.data
        brand = form.brand.data
        if not isinstance(file, str):
            # Tải lên file vào Firebase Storage
            blob = bucket.blob(file.filename)
            blob.upload_from_file(file, rewind=True, content_type=file.content_type)

            # Lấy đường dẫn URL của file đã tải lên
            blob.make_public()
            url = blob.public_url
            os.remove(op.join(file_path, file.filename))

            # Lưu đường dẫn URL vào trường ImageUploadField
            model.img_url = url
        else:
            model.img_url = file
        if brand:
            model.brand_id = brand.id

    def on_model_delete(self, model):
        super().on_model_delete(model)

        # Get the file name want to delete
        parsed_url = urlparse(model.img_url)
        file_name = os.path.basename(parsed_url.path)

        # Xoá ảnh từ Firebase Storage
        delete_image(file_name)

    column_formatters = {
        "brand_name": _get_brand_name,
        "image sample": _get_shoe_type_img,
    }
    column_sortable_list = ("brand_id", "id")
    column_default_sort = "brand_id"


class ProductView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    def _get_brand_by_shoe(view, context, model, name):
        brand = Brand.query.get(model.brand_id)
        return brand.name + " - " + model.name

    column_list = (
        "id",
        "name",
        "image preview",
        "brand_name",
        "shoe_type_name",
        "price",
        "discount",
        "featured",
        "manufacture_date",
    )
    column_searchable_list = ("name", "price")
    form_extra_fields = {
        "brand": fields.QuerySelectField(
            label="Brand",
            query_factory=lambda: Brand.query.all(),
            widget=Select2Widget(),
            get_label="name",
        ),
        "shoe_type": fields.QuerySelectField(
            label="Shoe Type",
            query_factory=lambda: ShoeType.query.all(),
            widget=Select2Widget(),
            get_label=lambda item: f"{Brand.query.get(item.brand_id).name} - {item.name}",
        ),
        "img_preview": ImageUploadField("Image", base_path=file_path),
    }

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        brand = form.brand.data
        shoe_type = form.shoe_type.data
        if brand and shoe_type:
            model.brand_id = brand.id
            model.shoe_type_id = shoe_type.id
        file = form.img_preview.data
        if not isinstance(file, str):
            # Tải lên file vào Firebase Storage
            blob = bucket.blob(file.filename)
            blob.upload_from_file(file, rewind=True, content_type=file.content_type)

            # Lấy đường dẫn URL của file đã tải lên
            blob.make_public()
            url = blob.public_url
            os.remove(op.join(file_path, file.filename))

            # Lưu đường dẫn URL vào trường ImageUploadField
            model.img_preview = url
        else:
            model.img_preview = file

    def on_model_delete(self, model):
        super().on_model_delete(model)

        # Get the file name want to delete
        parsed_url = urlparse(model.img_url)
        file_name = os.path.basename(parsed_url.path)

        # Xoá ảnh từ Firebase Storage
        delete_image(file_name)

    def _get_brand_name(view, context, model, name):
        brand = Brand.query.get(model.brand_id)
        return brand.name if brand else None

    def _get_shoe_type_name(view, context, model, name):
        shoe_type = ShoeType.query.get(model.shoe_type_id)
        return shoe_type.name if shoe_type else None

    def _get_product_img(view, context, model, name):
        return Markup(f'<img src="{model.img_preview}" width="100">')

    # Override column_formatters để hiển thị brand name
    def _get_price(view, context, model, name):
        return f"${model.price}"

    column_formatters = {
        "brand_name": _get_brand_name,
        "shoe_type_name": _get_shoe_type_name,
        "image preview": _get_product_img,
        "price": _get_price,
    }


class ProductImageView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    column_list = ("id", "product_name", "product_id", "image")
    column_sortable_list = ["id"]
    column_sortable_list = ("product_id", "id")
    column_default_sort = "product_id"

    def _get_product_name(view, context, model, name):
        product = Product.query.get(model.product_id)
        return product.name if product else None

    def _get_product_img(view, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        file = form.img_url.data
        product = form.product.data
        if not isinstance(file, str):
            # Tải lên file vào Firebase Storage
            blob = bucket.blob(file.filename)
            blob.upload_from_file(file, rewind=True, content_type=file.content_type)

            # Lấy đường dẫn URL của file đã tải lên
            blob.make_public()
            url = blob.public_url

            # Delete image from server
            os.remove(op.join(file_path, file.filename))

            # Lưu đường dẫn URL vào trường ImageUploadField
            model.img_url = url
        else:
            model.img_url = file
        if product:
            model.product_id = product.id

    def on_model_delete(self, model):
        super().on_model_delete(model)

        # Get the file name want to delete
        parsed_url = urlparse(model.img_url)
        file_name = os.path.basename(parsed_url.path)

        # Xoá ảnh từ Firebase Storage
        delete_image(file_name)

    column_formatters = {"product_name": _get_product_name, "image": _get_product_img}
    form_extra_fields = {
        "product": fields.QuerySelectField(
            label="Product",
            query_factory=lambda: Product.query.all(),
            widget=Select2Widget(),
            get_label=lambda item: f"{item.id} - {item.name}",
        ),
        "img_url": ImageUploadField("Image", base_path=file_path),
    }


class ProductSizeView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    def _get_product_name(view, context, model, name):
        product = Product.query.get(model.product_id)
        return product.name if product else None

    def on_model_change(self, form, model, is_created):
        product = form.product.data
        if product:
            model.product_id = product.id

    form_extra_fields = {
        "product": fields.QuerySelectField(
            label="Product",
            query_factory=lambda: Product.query.all(),
            widget=Select2Widget(),
            get_label=lambda item: f"{item.id} - {item.name}",
        )
    }

    column_list = ("id", "product_name", "size", "quantity_in_stock")
    column_formatters = {
        "product_name": _get_product_name,
    }


class OrderView(ModelView):
    column_hide_backrefs = False
    can_create = False

    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    column_list = (
        "id",
        "customer_name",
        "total_amount",
        "payment",
        "order_date",
        "order_details",
        "status_name",
    )

    def _get_status_name(view, context, model, name):
        status = OrderStatus.query.get(model.status_id)
        return status.status if status else None

    def _get_total_amount(view, context, model, name):
        return f"${model.total_amount}"

    def _get_current_order_status_id(view, context, model, name):
        return model.status_id

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        status = form.status.data
        if status:
            model.status_id = status.id

    form_extra_fields = {
        "status": fields.QuerySelectField(
            label="Status",
            query_factory=lambda: OrderStatus.query.all(),
            widget=Select2Widget(),
            get_label="status",
        )
    }
    form_edit_rules = (
        "order_details",
        "customer_name",
        "phone_number",
        "payment",
        "is_paid",
        "status",
    )
    column_formatters = {
        "status_name": _get_status_name,
        "total_amount": _get_total_amount,
    }


class SliderView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == "ADMIN"

    column_list = ("id", "image", "order")

    def _get_slider_img(view, context, model, name):
        return Markup(f'<img src="{model.img_url}" width="100">')

    def on_model_change(self, form, model, is_created):
        # Lấy dữ liệu file từ trường ImageUploadField
        file = form.img_url.data
        if not isinstance(file, str):
            # Tải lên file vào Firebase Storage
            blob = bucket.blob(file.filename)
            blob.upload_from_file(file, rewind=True, content_type=file.content_type)

            # Lấy đường dẫn URL của file đã tải lên
            blob.make_public()
            url = blob.public_url
            os.remove(op.join(file_path, file.filename))

            # Lưu đường dẫn URL vào trường ImageUploadField
            model.img_url = url
        else:
            model.img_url = file

    def on_model_delete(self, model):
        super().on_model_delete(model)

        # Get the file name want to delete
        parsed_url = urlparse(model.img_url)
        file_name = os.path.basename(parsed_url.path)

        # Xoá ảnh từ Firebase Storage
        delete_image(file_name)

    form_extra_fields = {
        "img_url": ImageUploadField("Image", base_path=file_path),
    }

    column_formatters = {
        "image": _get_slider_img,
    }
