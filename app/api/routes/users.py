from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('users', __name__, '')


@bp.route('')
def index():
    response = User.query.all()
    return {user.id: user.to_dict() for user in response}

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
        return {'errors': errors}, 401

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
    return {
            'access_token':access_token, 
            'id': temp_user['id'],
            'signed_petitions': temp_user['signed_petitions']
            }, 200

@bp.route('/signin', methods=['POST'])
def signin():
    #gather user submitted data
    email = request.json.get('email')
    password = request.json.get('password')

    #Error Handling Validations
    errors = validations_signin(email, password)
    if len(errors) > 0:
        return {'errors': errors}, 400

    #Pass validations, find user, create jwt, return user data
    user = User.query.filter_by(email=email).first()
    temp_user = user.to_dict()
    access_token = create_access_token(identity=temp_user['id'])
    return {
        'access_token':access_token, 
        'id': temp_user['id'],
        'signed_petitions': temp_user['signed_petitions']
        }, 200


# Use this route to get creator information for petitions
@bp.route('/creator/<int:id>')
def get_creator(id):
    found_user = User.query.filter(User.id == id).first()
    if found_user:
        return found_user.to_dict()
    else:
        return {'error': "User not found"}, 400


@bp.route('/<int:id>', methods=['GET','PATCH'])
@jwt_required()
def user_page(id):
    if request.method == 'GET':
        found_user = User.query.filter(User.id == id).first()
        if found_user:
            return found_user.to_dict()
        else:
            return {'error': "User not found"}, 400
    else:
        #gather user submitted data
        json = request.get_json()
        first_name = json.get('first_name')
        last_name = json.get('last_name')
        location = json.get('location')

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
            return {'message':'Success'}, 200
        else:
            return {'error': 'User was not found'}, 400

@bp.route('/delete_account', methods=['DELETE'])
@jwt_required()
def delete_account():
    #get id from json web token
    current_user_id = get_jwt_identity()

    #retrieve user from data to be deleted if exists
    temp_user = User.query.filter(User.id == current_user_id).first()
    if temp_user is None:
        return {'error': 'User with given id does not exist'}, 400

    #delete user from database
    db.session.delete(temp_user)
    db.session.commit()
    return {'status': 200}


def validations_signup(email, first_name, last_name, password):
    regex ='[^@]+@[^@]+\.[^@]+'
    errors = []
    #Check Email is Unique
    email_found = User.query.filter(User.email == email).first()
    if(email_found):
        errors.append('Account already exists with this email address')
    if not email:
        errors.append('Email is missing')
    if not first_name:
        errors.append('first name is missing')
    if not last_name:
        errors.append('last name is missing')
    if not password:
        errors.append('password is missing')
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
    user = User.query.filter_by(email=email).first()
    if not user:
        errors.append('User was not found')
        return errors
    if user: 
        password_match = bcrypt.checkpw(password.encode('utf-8'), user.encrypted_password)
        if not email:
            errors.append('Email is missing')
        if not password:
            errors.append('Password is missing')
        if not password_match: 
            errors.append('Password is incorrect')
        if len(email) > 255:
            errors.append('email length is too long')
    return errors

def validations_user_details(last_name, first_name):
    errors = []
    if not last_name:
        errors.append('first name is missing')
    if not first_name:
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
