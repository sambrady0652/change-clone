from flask import Blueprint, request

from app.models import Petition, db, Signature, Update

bp = Blueprint('petitions', __name__)


@bp.route('/', methods=['GET'])
def get_petitions():
    petitions = Petition.query.all()
    formatted_petitions = {str(petition.id): petition.to_dict()
                           for petition in petitions}
    return formatted_petitions


@bp.route('/', methods=['POST'])
def post_petition():
    # print(dir(request.data))
    # print(request.form['files'][0])
    print(request.form.to_dict())
    # print(file)
    return '200', 200
    # new_petition = Petition(header=data['header'], description=data['description'], goal=int(
    #     data['goal']), current=1, creator_id=data['creator_id'], topic_id=data['topic_id'])
    # db.session.add(new_petition)
    # db.session.commit()
    # return {
    #     'header': new_petition.header,
    #     'description': new_petition.description,
    #     'goal': new_petition.goal,
    #     'current': new_petition.current,
    #     'creator_id': new_petition.creator_id,
    #     'topic_id': new_petition.topic_id
    # }


@bp.route('/<int:id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def petition(id):
    petition = Petition.query.filter(Petition.id == id).one()
    if petition == None:
        return {"error": "User not found"}

    if request.method == 'GET':
        return petition.to_dict()
    # Edit petition data
    elif request.method == 'PUT':
        data = request.data
        petition.header = data.header
        petition.description = data.description
        petition.goal = data.goal
        petition.current = data.current
        db.session.commit()
    # Update s
    elif request.method == 'PATCH':
        data = request.data
        petition.current = data.current
        db.session.commit()
        return {'current': petition.current}
    elif request.method == 'DELETE':
        petition.delete()
        db.session.commit()


@bp.route('/<int:id>/signatures', methods=['GET', 'POST'])
def petiton_signatures(petition_id):
    if request.method == 'GET':
        signatures = Signature.query.filter(
            Signature.petition_id == petition_id).all()
        return {str(signature.id): signature.to_dict() for signature in signatures}
    if request.method == 'POST':
        data = request.json
        new_sig = Signature(user_id=data.user_id,
                            petition_id=petition_id, message=data.message)
        db.session.add(new_sig)
        db.session.commit()
        return new_sig.to_dict()


@bp.route('/<int:id>/updates', methods=['GET', 'POST'])
def petition_updates(petition_id):
    if request.method == 'GET':
        updates = Update.query.filter(
            Update.petition_id == petition_id).all()
        return {str(update.id): update.to_dict() for update in updates}
    if request.method == 'POST':
        data = request.json
        new_update = Update(petition_id=petition_id,
                            header=data.header, content=data.content)
        db.session.add(new_update)
        db.session.commit()
        return new_update.to_dict()

@bp.route('/search', methods=['GET'])
def search_petitions():
    #get search term from user
    search_term = request.form.get("search_term")

    #search database for a header that contains search term
    petitions = Petition.query.filter(Petition.header.like('%{0}%'.format(search_term))).all()
    formatted_petitions = {str(petition.id): petition.to_dict()
                           for petition in petitions}
    return formatted_petitions
