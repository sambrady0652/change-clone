from flask import Blueprint, jsonify
from app.models import User

petition_routes = Blueprint('users', __name__)


@petition_routes.route('/')
def index():
    pass
