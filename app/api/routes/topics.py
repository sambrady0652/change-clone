from flask import Blueprint

from app.models import Topic

bp = Blueprint('topics', __name__)

@bp.route('')
def get_topics():
    topics = Topic.query.all()
    return {str(topic.id): topic.to_dict() for topic in topics}