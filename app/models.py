from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    profile_pic_url = db.Column(db.String)
    location = db.Column(db.String)

    signatures = db.relationship("Signature", back_populates="user")
    created_petitions = db.relationship("Petition", back_populates="creator")
    comments = db.relationship("Comment", back_populates="user")

    def to_dict(self):
        created_petition_ids = [
            petition.id for petition in self.created_petitions
        ]
        signed_petitions = [signature.petition.id for signature in self.signatures]
        comments = [comment.id for comment in self.comments]

        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "profile_pic_url": self.profile_pic_url,
            "location": self.location,
            "signed_petitions": signed_petitions,
            "created_petitions": created_petition_ids,
            "comments": comments
        }        


class Topic(db.Model):
    __tablename__ = "topics"

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(50))
    image_url = db.Column(db.String)

    petitions = db.relationship("Petition", back_populates="topic")

    def to_dict(self):
        petitions = [petition.id for petition in self.petitions]

        return {
            "id": self.id,
            'topic': self.topic,
            'image_url': self.image_url,
            'petitions': petitions
        }


class Petition(db.Model):
    __tablename__ = "petitions"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    header = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    goal = db.Column(db.Integer, nullable=False)
    current = db.Column(db.Integer)
    creator_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey(
        "topics.id"), nullable=False)

    updates = db.relationship("Update", back_populates="petition")
    signatures = db.relationship("Signature", back_populates="petition")
    creator = db.relationship("User", back_populates="created_petitions")
    topic = db.relationship("Topic", back_populates="petitions")

    def to_dict(self):
        updates = [update.id for update in self.updates]
        signatures = [signature.id for signature in self.signatures]

        return {
            "id": self.id,
            "image_url": self.image_url,
            "header": self.header,
            "description": self.description,
            "goal": self.goal,
            "current": self.current,
            "creator": self.creator_id,
            "topic": self.topic_id,
            "updates": updates,
            "signatures": signatures,
        }


class Signature(db.Model):
    __tablename__ = "signatures"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    petition_id = db.Column(db.Integer, db.ForeignKey(
        "petitions.id"), nullable=False)
    message = db.Column(db.String(255))

    user = db.relationship("User", back_populates="signatures")
    petition = db.relationship("Petition", back_populates="signatures")

    def to_dict(self):

        return {
            "id": self.id,
            "message": self.message,
            "user": self.user_id,
            "petition": self.petition_id
        }


class Update(db.Model):
    __tablename__ = "updates"

    id = db.Column(db.Integer, primary_key=True)
    petition_id = db.Column(db.Integer, db.ForeignKey(
        "petitions.id"), nullable=False)
    header = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    petition = db.relationship("Petition", back_populates="updates")
    comments = db.relationship("Comment", back_populates="update")

    def to_dict(self):
        return {
            "id": self.id,
            "header": self.header,
            "content": self.content,
            "petition": self.petition_id
        }


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    update_id = db.Column(db.Integer, db.ForeignKey(
        "updates.id"), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="comments")
    update = db.relationship("Update", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "update_id": self.update_id,
            "body": self.body,
            "user_id": self.user_id,
        }
