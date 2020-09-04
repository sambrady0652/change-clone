from app.models import User, Petition, Signature, Update, Topic, Comment
from app import app, db
from dotenv import load_dotenv
import bcrypt
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    default_user = User(
        first_name="Default",
        last_name="User",
        email="default@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
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

    # default_topic = Topic(
    #     topic="Default",
    #     image_url=""
    # )

    local = Topic(
        topic='Local', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/local.png')
    health = Topic(
        topic='Health', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/health.png')
    racial_justice = Topic(
        topic='Racial Justice', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/racial_justice.png')
    human_rights = Topic(
        topic='Human Rights', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/human_rights.png')
    economic_justice = Topic(
        topic='Economic Justice', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/economic_justice.png')
    politics = Topic(
        topic='Politics', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/politics.png')
    animals = Topic(
        topic='Animals', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/animals.png')
    womens_rights = Topic(topic='Women\'s Rights',
                          image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/womens_rights.png')
    environment = Topic(
        topic='Environment', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/environment.png')
    family = Topic(
        topic='Family', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/family.png')
    criminal_justice = Topic(
        topic='Criminal Justice', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/criminal_justice.png')
    entertainment = Topic(
        topic='Entertainment', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/entertainment.png')
    immigration = Topic(
        topic='Immigration', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/immigration.png')
    food = Topic(
        topic='Food', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/food.png')
    education = Topic(
        topic='Education', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/education.png')
    other = Topic(
        topic='Other', image_url='https://change-clone.s3-us-west-1.amazonaws.com/topic_icons/other.png')

    db.session.add(default_user)
    db.session.add(local)
    db.session.add(health)
    db.session.add(racial_justice)
    db.session.add(human_rights)
    db.session.add(economic_justice)
    db.session.add(politics)
    db.session.add(animals)
    db.session.add(womens_rights)
    db.session.add(environment)
    db.session.add(family)
    db.session.add(criminal_justice)
    db.session.add(entertainment)
    db.session.add(immigration)
    db.session.add(food)
    db.session.add(education)
    db.session.add(other)
    db.session.add(default_petition)
    db.session.add(default_signature)
    db.session.add(default_update)
    db.session.add(default_comment)

    db.session.commit()
