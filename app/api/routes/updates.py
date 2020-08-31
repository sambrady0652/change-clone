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
