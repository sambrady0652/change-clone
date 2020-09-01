from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('users', __name__, '')


@bp.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

@bp.route('/signup', methods=['POST'])
def signup():
    #gather user submitted data
    email = request.form.get('email')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    password = request.form.get('password')

    #validations
    errors = validations_signup(email, first_name, last_name, password)
    if len(errors) > 0:
        return {'errors': errors}

    #see if email has already been used to sign up previously
    email_found = User.query.filter(User.email == email).first()
    if(email_found is not None):
        error_response = {'error': 'Account already exists with this email address'}
        return jsonify(error_response, 401)

    #hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))

    #create user in database
    user_to_add = User(email=email, first_name=first_name, last_name=last_name, encrypted_password=hashed_password)
    db.session.add(user_to_add)
    db.session.commit()

    #get id from inserted user
    user1 = User.query.filter(User.email == email).first()
    temp_user = user1.to_dict()

    #create jwt and send back to frontend
    access_token = create_access_token(identity=temp_user['id'])
    return {'access_token': access_token, 'status': 200}

@bp.route('/signin', methods=['POST'])
def signin():
    #gather user submitted data
    email = request.json.get('email')
    password = request.json.get('password')

    #work in progress below
    errors = validations_signin(email, password)
    if len(errors) > 0:
        return {'errors': errors}

    #see if user has already created an account
    user = User.query.filter_by(email=email).first()
    temp_user = user.to_dict()
    if not user:
        return {'error': 'User was not found', 'status': 404}

    #check user entered password vs hashed password
    if bcrypt.checkpw(password.encode('utf-8'), user.encrypted_password):
        access_token = create_access_token(identity=temp_user['id'])
        return {'access_token':access_token, 'status': 200}
    else:
        return {'error': 'password was not correct'}

@bp.route('/<int:id>/', methods=['GET'])
def user_page(id):
    found_user = User.query.filter(User.id == id).first()
    if found_user:
        return {'first_name': found_user.first_name, 'last_name': found_user.last_name, 'location': found_user.location}
    else:
        return {'error': "User not found", 'status': 400}

@bp.route('/<int:id>/', methods=['PATCH'])
@jwt_required
def user_details_patch(id):
    #gather user submitted data
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    location = request.form.get('location')

    #validate user submitted data
    errors = validations_user_details(last_name, first_name)
    if len(errors) > 0:
        return {'errors': errors}

    #get id from json web token
    current_user_id = get_jwt_identity()

    #if user is found in database then update user details. If not, send error to client
    found_user = User.query.filter(User.id == current_user_id).first()
    if(found_user):
        found_user.first_name = first_name
        found_user.last_name = last_name
        found_user.location = location
        db.session.commit()
        return {'message':'Success', 'status': 200}
    else:
        return {'error': 'User was not found', 'status': 400}

@bp.route('/delete_account', methods=['DELETE'])
@jwt_required
def delete_account():
    #get id from json web token
    current_user_id = get_jwt_identity()

    #retrieve user from data to be deleted if exists
    temp_user = User.query.filter(User.id == current_user_id).first()
    if temp_user is None:
        return {'error': 'User with given id does not exist', 'status': 400}

    #delete user from database
    db.session.delete(temp_user)
    db.session.commit()
    return {'status': 200}


def validations_signup(email, first_name, last_name, password):
    regex ='[^@]+@[^@]+\.[^@]+'
    errors = []
    if email is None:
        errors.append('Email is missing')
    if first_name is None:
        errors.append('first name is missing')
    if last_name is None:
        errors.append('last name is missing')
    if password is None:
        errors.append('password is missing')
    if len(errors) > 0:
        return errors
    if not re.search(regex, email):
        errors.append('email is not valid')
    if len(first_name) > 40:
        errors.append('first name is too long')
    if len(last_name) > 40:
        errors.append('last name is too long')
    if len(email) > 255:
        errors.append('email length is too long')
    return errors

def validations_signin(email, password):
    errors = []
    if email is None:
        errors.append('Email is missing')
    if password is None:
        errors.append('password is missing')
    if len(errors) > 0:
        return errors
    if len(email) > 255:
        errors.append('email length is too long')
    return errors

def validations_user_details(last_name, first_name):
    errors = []
    if last_name is None:
        errors.append('first name is missing')
    if first_name is None:
        errors.append('last name is missing')
    if len(errors) > 0:
        return errors
    if len(last_name) > 40:
        errors.append('last name length is too long')
    if len(first_name) > 40:
        errors.append('first name length is too long')
    if len(last_name) < 1:
        errors.append('last name was not provided')
    if len(first_name) < 1:
        errors.append('first name was not provided')
    return errors
