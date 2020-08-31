from flask import Blueprint

from .routes import petitions.bp as petition_routes

bp = Blueprint('api', __name__)

bp.register_blueprint(petition_routes, url_prefix='/petitions')