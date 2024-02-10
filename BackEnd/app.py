from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user
from flask_restful import Api

import config
from database import db
# from flask_session import Session
from services.user import *

app = Flask(__name__)
app.config.from_object(config)

# Database
db.init_app(app)

# Flask-restful
api = Api(app)


# Access-Control-Allow-Credentials
@app.after_request
def after_request(response):
    if "Access-Control-Allow-Credentials" not in response.headers:
        response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


# CORS
CORS(app=app, supports_credentials=True)

# Session
# Session(app)

# flask-login set up
login_manager = LoginManager(app)


# flask-login user_loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


api.add_resource(LoginResource, "/login")
api.add_resource(LogOutResource, "/logout")
api.add_resource(SignUpResource, "/signup")
api.add_resource(GetAllEmailResource, "/all-emails")
api.add_resource(CheckingLoginResource, "/checking-login")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
