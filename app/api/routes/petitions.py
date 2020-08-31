from flask import Blueprint, request

from app.models import Petition, db

bp = Blueprint('petitions', __name__)

@bp.route('/', methods=['GET'])
def get_petitions():
    petitions = Petition.query.all()
    formatted_petitions = {str(petition.id): petition.to_dict() for petition in petitions}
    return formatted_petitions

@bp.route('/', methods=['POST'])
def post_petition():
    print(dir(request.data))
    data = request.form
    new_petition = Petition(header=data['header'], description=data['description'], goal=int(data['goal']), current=1, creator_id=data['creator_id'], topic_id=data['topic_id'])
    db.session.add(new_petition)
    db.session.commit()

