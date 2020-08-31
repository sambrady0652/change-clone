from flask import Blueprint

from app.models import Petition, db

bp = Blueprint('petitions', __name__)

@bp.route('/', methods=['GET'])
def get_petitions():
    petitions = Petition.query.all()
    formatted_petitions = {str(petition.id): petition.to_dict for petition in petitions}