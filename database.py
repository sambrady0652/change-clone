from app.models import User, Petition, Signature, Update, Topic, Comment
from app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    default_user = User(
        first_name="Default",
        last_name="User",
        email="default@user.com",
        encrypted_password="pass",
        profile_pic_url="",
        location="Chicago, IL, USA")

    default_petition = Petition(
        image_url="",
        header="This is a Default Petition",
        description='''Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?''',
        goal=500000,
        current=0,
        creator_id=1,
        topic_id=1)

    default_signature = Signature(
        user_id=1,
        petition_id=1,
        message="I am a Default User and I support this Default Petition"
    )

    default_update = Update(
        petition_id=1,
        header="Quick Default Update on our Default Petition!",
        content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    )

    default_comment = Comment(
        update_id=1,
        body="I think this is a great update!",
        user_id=1
    )

    default_topic = Topic(
        topic="Default",
        image_url=""
    )

    db.session.add(default_user)
    db.session.add(default_topic)
    db.session.add(default_petition)
    db.session.add(default_signature)
    db.session.add(default_update)
    db.session.add(default_comment)

    db.session.commit()
