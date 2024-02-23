import math

from flask import redirect, render_template, request, url_for
from flask_cors import cross_origin
from flask_login import current_user, login_required
from flask_restful import Resource

from database import db
from models.cart import Cart
from models.order import Order
from models.order_detail import OrderDetail
from models.order_status import OrderStatus
from models.product import Product
from models.product_size import ProductSize


class OrderResource(Resource):
    @cross_origin()
    @login_required
    def get(self):
        order_id = request.args.get("order_id")
        if not order_id:
            return {"message": "order_id is missing"}, 400
        order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
        if not order:
            return {"message": "Order is not exist"}, 400
        order_json = order.to_json()
        order_json["order_details"] = [
            order_detail.to_json() for order_detail in order.order_details
        ]
        return {"order": order_json}, 200

    @cross_origin()
    @login_required
    def post(self):
        data = request.get_json()
        customer_name = data.get("customer_name")
        email = data.get("email")
        phone_number = data.get("phone_number")
        shipping_address = data.get("shipping_address")
        province = data.get("province")
        district = data.get("district")
        ward = data.get("ward")
        payment = data.get("payment")
        if not customer_name:
            return {"message": "No customer_name is provided"}, 400
        if not email:
            return {"message": "No email is provided"}, 400
        if not phone_number:
            return {"message": "No phone_number is provided"}, 400
        if not shipping_address:
            return {"message": "No shipping_address is provided"}, 400
        if not province["province_id"]:
            return {"message": "No province is provided"}, 400
        if not district["district_id"]:
            return {"message": "No district is provided"}, 400
        if not ward["ward_id"]:
            return {"message": "No ward is provided"}, 400
        if not payment:
            return {"message": "No payment is provided"}, 400
        cart = Cart.query.filter_by(user_id=current_user.id).all()

        if len(cart) == 0:
            return {"message": "Your cart is empty"}, 400
        total_amount = sum(
            math.ceil((item.product_price * (100 - item.product_discount) / 100))
            * item.quantity
            for item in cart
        )
        order = None
        if payment == "COD":
            order = Order(
                customer_name,
                shipping_address,
                phone_number,
                email,
                current_user.id,
                total_amount,
                province,
                district,
                ward,
                payment,
                is_paid=False,
            )
        elif payment == "paypal":
            order = Order(
                customer_name,
                shipping_address,
                phone_number,
                email,
                current_user.id,
                total_amount,
                province,
                district,
                ward,
                payment,
                is_paid=True,
            )
            print(order)

        db.session.add(order)
        db.session.commit()

        order_id = order.id

        for cart_item in cart:
            product_size = ProductSize.query.filter_by(
                size=cart_item.size, product_id=cart_item.product_id
            ).first()
            if product_size.quantity_in_stock < cart_item.quantity:
                return {
                    "message": f"The product named {cart_item.product_name} with size {cart_item.size}  is no longer in stock`"
                }, 400
            total_price = (
                math.ceil(
                    (cart_item.product_price * (100 - cart_item.product_discount) / 100)
                )
                * cart_item.quantity
            )
            order_detail = OrderDetail(
                cart_item.size,
                cart_item.quantity,
                cart_item.product_price,
                total_price,
                order_id,
                cart_item.product_id,
            )
            print(order_detail)
            print(cart_item)
            db.session.add(order_detail)
            db.session.commit()

        for cart_item in cart:
            db.session.delete(cart_item)
        db.session.commit()

        sub_total = 0
        for cart_item in cart:
            sub_total += cart_item.product_price * cart_item.quantity

        from app import send_email

        html_content = render_template(
            "order_detail.html",
            order=cart,
            total=total_amount,
            message="Bạn vừa tạo thành công đơn hàng trên hệ thống sau đây là thông tin chi tiết:",
            sub_total=sub_total,
            payment=payment,
            address=f"{ward['ward_name']}, {district['district_name']}, {province['province_name']}",
            address_detail=shipping_address,
            phone_number=phone_number,
        )

        send_email(
            subject="Đơn hàng được tạo thành công",
            sender="buivi04062002@gmail.com",
            recipients=[email],
            body=f"{html_content}",
        )

        return {
            "message": "Created an order successfully!",
            "order": order.to_json(),
        }, 200


class UpdateOrderStatusResource(Resource):
    @cross_origin()
    @login_required
    def patch(self):
        data = request.get_json()
        order_id = data.get("order_id")
        status_id = data.get("status_id")
        if not order_id:
            return {"message": "No order_id is provided"}, 400
        if not status_id:
            return {"message": "No status_id is provided"}, 400
        order = Order.query.get(order_id)
        if not order:
            return {"message": "Order is not exist!"}, 400
        order_details = order.order_details
        order_status = OrderStatus.query.get(status_id)
        if status_id == 2:  # status = confirmed
            for order_detail in order_details:
                product_size = ProductSize.query.filter_by(
                    size=order_detail.size, product_id=order_detail.product_id
                ).first()
                product_size.quantity_in_stock -= order_detail.quantity
                if product_size.quantity_in_stock <= 0:
                    product_size.quantity_in_stock = 0
            db.session.commit()

        if status_id == 6:  # status = cancelled
            for order_detail in order_details:
                product_size = ProductSize.query.filter_by(
                    size=order_detail.size, product_id=order_detail.product_id
                ).first()
                product_size.quantity_in_stock += order_detail.quantity

            db.session.commit()

        return {
            "message": "Updated order status",
            "status": order_status.to_json(),
            "order": order.to_json(),
        }, 200


class GetAllOrderResource(Resource):
    @cross_origin()
    @login_required
    def get(self):
        return {"orders": [order.to_json() for order in current_user.orders]}, 200
