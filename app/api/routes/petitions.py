from flask import Blueprint, request
import boto3
from datetime import datetime

from app.models import Petition, db, Signature, Update, User

bp = Blueprint('petitions', __name__)

s3 = boto3.resource('s3')
bucket = s3.Bucket(name='change-clone')
print(bucket.creation_date)
# print(dir(bucket))

@bp.route('', methods=['GET'])
def get_petitions():
    petitions = Petition.query.all()
    formatted_petitions = {str(petition.id): petition.to_dict()
                           for petition in petitions}
    return formatted_petitions


@bp.route('', methods=['POST'])
def post_petition():
    # print(dir(request.data))
    data = dict(request.form)
    img_url = 'https://change-clone.s3-us-west-1.amazonaws.com/default_petition.png'
    if len(request.files) > 0:
        img = request.files['file']
        key=f'{datetime.now()}{img.filename}'
        bucket.put_object(Key=key, Body=img, ContentType=img.content_type)
        img_url = f'https://change-clone.s3-us-west-1.amazonaws.com/{key}'

    new_petition = Petition(header=data['header'], description=data['description'], goal=int(
        data['goal']), current=1, creator_id=data['creator_id'], topic_id=data['topic_id'], image_url=img_url)
    db.session.add(new_petition)
    db.session.commit()
    return {
        'header': new_petition.header,
        'description': new_petition.description,
        'goal': new_petition.goal,
        'current': new_petition.current,
        'creator_id': new_petition.creator_id,
        'topic_id': new_petition.topic_id
    }

# GET ROUTE USING HEADER INSTEAD OF ID
@bp.route('/<path:header>')
def get_current_petition(header):
    petition = Petition.query.filter(Petition.header == header).one()
    if not petition:
        return {"error": "User not found"}

    return petition.to_dict()


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


@bp.route('/<int:petition_id>/signatures', methods=['GET', 'POST'])
def petiton_signatures(petition_id):
    if request.method == 'GET':
        signatures = Signature.query.filter(
            Signature.petition_id == petition_id).all()
        return {str(signature.id): signature.to_dict() for signature in signatures}
    if request.method == 'POST':
        user_id = request.json.get('user_id')
        message = request.json.get('message')
        new_sig = Signature(user_id=user_id, petition_id=petition_id, message=message)
        db.session.add(new_sig)
        db.session.commit()

        all_sigs_count = Signature.query.filter(Signature.petition_id == petition_id).count()
        
        petition = Petition.query.filter(Petition.id == petition_id).one()
        petition.current = all_sigs_count
        db.session.add(petition)
        db.session.commit()

        return new_sig.to_dict()


@bp.route('/<int:petition_id>/updates', methods=['GET', 'POST'])
def petition_updates(petition_id):
    if request.method == 'GET':
        updates = Update.query.filter(
            Update.petition_id == petition_id).all()
        return {str(update.id): update.to_dict() for update in updates}
    if request.method == 'POST':
        header = request.form.get('header')
        content = request.form.get('content')
        mediaurl = request.form.get('mediaurl')

        newUpdate = Update(petition_id = petition_id, header=header, content=content, mediaurl=mediaurl)
    db.session.add(newUpdate)
    db.session.commit()
    return newUpdate.to_dict()

  

@bp.route('/<int:id>/user_signed_petitions', methods=['GET'])
def user_signed_petitions(id):
    results = Signature.query.filter(Signature.user_id == id).all()
    signatures = {str(signature.id): signature.to_dict() for signature in results}
    petition_ids = []
    for signature in signatures:
        petition_ids.append((signatures[signature]['petition']))
    return {str(identifier): identifier for identifier in petition_ids}
