from flask import Blueprint, jsonify
from app.models import Update, db


bp = Blueprint('updates', __name__)


@bp.route('/<update_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_update (id):
  # Get Specific Update Based On Id
    response = Update.query.get(id)
    return {"updates": [update.to_dict() for update in response]}

def edit_update(id):
    update = get_update(id)
    if request.method == 'PATCH':
       petition_id = request.form['title']
       header = request.form['header']
       content = request.form['content']
       error = None 

       if not header:
         error = 'Header is required.'
       if not content:
         error = 'Content is required.'

       if error is not None:
         flash(error)
       else:
         db.execute(
           'UPDATE update SET header = ?, content = ?'
           'WHERE id = ?',
           (title, body, id)
         )
         db.commit()

def delete_update(id):
    get_update(id)
    db.execute('DELETE FROM post WHERE id = ?', (id,))
    db.commit()

@bp.route('/<update_id>/comments', methods=['GET', 'POST'])
#Get Comments From Specific Update
def get_comments(update_id):
  comments_response = Update.comments.query.filter_by(update_id=update_id)
  return {"updates": [update.to_dict() for update in update_response] }

def add_comment():
    # Write Comment On Specific Update
    print(dir(request.data))
    data = request.form
    new_comment = Comment(update_id=data['update_id'], body=data['body'], user_id=data['user_id'])
    db.session.add(new_comment)
    db.session.commit()


