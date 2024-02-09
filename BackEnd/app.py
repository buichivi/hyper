from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_login import LoginManager, login_user, logout_user
from flask_session import Session
from database import db
import config
from services.user import *

app = Flask(__name__)

app.config.from_object(config)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
app.secret_key = "shoes_store"
app.config['SESSION_TYPE'] = 'filesystem'


# Database
db.init_app(app) 

# Flask-restful
api = Api(app)
# CORS
CORS(app)

# Session
Session(app)

login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

api.add_resource(LoginResource, '/login')
api.add_resource(LogOutResource, '/logout')
api.add_resource(SignUpResource, '/signup')
api.add_resource(GetAllEmailResource, '/all-emails')
api.add_resource(CheckingLoginResource, '/checking-login')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)