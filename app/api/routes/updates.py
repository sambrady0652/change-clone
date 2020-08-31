<<<<<<< HEAD
from flask import Blueprint, jsonify
from app.models import Update

bp = Blueprint('updates', __name__)


@bp.route('/<update_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update (update_id):
  # Get Specific Update Based On Id
    response = Update.query.get(update_id)
    return {"updates": [update.to_dict() for update in response]}

@bp.route('/<update_id>/comments', methods=['GET', 'POST'])
def get_comments(update_id):
  update_response = Update.comments.query.filter_by(update_id=update_id)
  return {"updates": [update.to_dict() for update in update_response] }

def add_comment():
    print(dir(request.data))
    data = request.form
    new_comment = Comment(update_id=data['update_id'], body=data['body'], user_id=data['user_id'])
    db.session.add(new_comment)
    db.session.commit()


=======
from flask import Blueprint, jsonify
from app.models import Update

bp = Blueprint('updates', __name__)


@bp.route('/<update_id>', methods=('GET', 'PATCH', 'DELETE'))
def get_update (update_id):
    response = Update.query.get(update_id)
    return {"updates": [update.to_dict() for update in response]}

@bp.route('/<update_id>/comments', methods=('GET', 'POST'))
def get_comments():
  response = Update.comments.query.all()
  return {"updates": [update.to_dict() for update in response] }

# def add_comment():
>>>>>>> 29002bf49de32eed3c8c83d86d4f1b5491ecdefb
