from flask import Blueprint, jsonify, request
from app.models import Update, db, Comment


bp = Blueprint('updates', __name__)


@bp.route('/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update (id):
  # Get Specific Update Based On Id
    response = Update.query.filter(Update.id == id).one()
    return response.to_dict()

def edit_update(id):
  #Edit Specific Update
  if request.method == 'PATCH':
    response = Update.query.filter(Update.id == id).one()
    data = request.data
    response.current = data.current
    db.session.commit()
    return {'current': response.current}

def delete_update(id):
  #Delete Specific Update
  response = Update.query.filter(Update.id == id).one()
  response.delete
  db.session.commit()

@bp.route('/<int:id>/comments', methods=['GET', 'POST'])
#Get Comments From Specific Update
def get_comments(id):
    comments = Comment.query.filter(
               Comment.update_id == id).all()
    return {str(comment.id): comment.to_dict() for comment in comments}

def add_comment(id):
    # Write Comment On Specific Update
    if request.method == 'POST':
      form = Comment(request.form)
      comment = Comment(form.update_id.data, 
                          form.body.data,
                          form.user_id.data)
      db_session.add(comment)
      db.session.add(comment)
      db.session.commit()
      return comment.to_dict()


