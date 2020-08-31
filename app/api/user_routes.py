from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity
import bcrypt

user_routes = Blueprint('users', __name__, '')


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

@user_routes.route('/signup', methods=['POST'])
def signup():
    #gather user submitted data
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    #see if email has already been used to sign up previously
    email_found = User.query.filter(User.email == email).first()
    if(email_found is not None):
        error_response = {'error': 'Account already exists with this email address'}
        return jsonify(error_response, 401)

    #hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    #create user in database
    user_to_add = User(email=email, first_name=first_name, last_name=last_name, encrypted_password=hashed_password)
    db.session.add(user_to_add)
    db.session.commit()

    #get id from inserted user
    user1 = User.query.filter(User.email == email).first()
    temp_user = user1.to_dict()

    #create jwt and send back to frontend
    access_token = create_access_token(identity=temp_user['id'])
    return jsonify(access_token=access_token), 200
