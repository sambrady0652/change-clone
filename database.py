from app.models import User, Petition, Signature, Update, Topic, Comment
from app import app, db
from dotenv import load_dotenv
import bcrypt
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    
    miss_monday = User(
        first_name="Miss",
        last_name="Monday",
        email="missmonday@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
        profile_pic_url="https://64.media.tumblr.com/a943ef66b1ba80fd211fb96b333eb011/dece21e92204663a-61/s400x600/6a54f69ade8ffb7a7e98a63f1b0d8e564d7eca19.png",
        location="Chicago, IL, USA")
    miss_wednesday = User(
        first_name="Ms",
        last_name="GoldenWeek",
        email="missgoldenweek@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
        profile_pic_url="https://64.media.tumblr.com/3e0c719e439014c6b222de0b6ba8098c/dece21e92204663a-81/s250x400/a46553bd93b74d926700ea0b81c94a8a97d2d4af.jpg",
        location="Chicago, IL, USA")
     mr_3 = User(
        first_name="Mr",
        last_name="3",
        email="mr3@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
        profile_pic_url="https://64.media.tumblr.com/344fe0498afb2560cc8f09d5099f0bca/dece21e92204663a-10/s400x600/b892908b8c5ce5cea2a1b40c385af1e4ce2d8637.png",
        location="Chicago, IL, USA")
    
    demo_user = User(
        first_name="Demo",
        last_name="User",
        email="default@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
        profile_pic_url="https://64.media.tumblr.com/8f7293582ad27f32775be6c5fd4f3f37/dece21e92204663a-e5/s540x810/199fa988763618b1874a09dd1e668296d2341bd8.png",
        location="Chicago, IL, USA")

    pizzaPetition = Petition(
        image_url="https://64.media.tumblr.com/0819d96f8c887bcf593f9cb28c006f05/f86e7fab64031d0a-5f/s1280x1920/4851237d06b2c2ab3996cf635089fb5c32e82948.jpg",
        header="Save THe Mexican Pizza",
        description='Taco Bell plans to discontinue the Mexican Pizza by Q4 2020. This is an item loved by many, especially the South Asian community. Losing this item would not only be the loss of one of our favorite foods but a piece of our childhood & heritage as Indian Americans. Please band together, show support, and save the Mexican Pizza.'
        goal=5000,
        current=0,
        creator_id=1,
        topic_id=1)

    pokemonPetition = Petition(
        image_url="https://64.media.tumblr.com/b7bee50a1d574847af243427e12e513b/f86e7fab64031d0a-65/s400x600/e9d11302ff4104a03e3cef9e4a685e41b23530cc.png",
        header="Look at this pokemon!",
        description='I SAID LOOK AT IT!'
        goal=5000,
        current=0,
        creator_id=2,
        topic_id=2)


    famousPetition = Petition(
        image_url="https://64.media.tumblr.com/83d3abdc0889629396b383ac6ac39b9c/f86e7fab64031d0a-81/s540x810/55ed9095e7b62213e70d08d8af77619ffafac66b.jpg",
        header="Make Me Famous",
        description='I used to perform a lot of comedy and thought for a second I was going to be famous. In hindsight, that seems silly but you all could make that former dream a reality!'
        goal=5000,
        current=0,
        creator_id=3,
        topic_id=3)

    schoolsPetition = Petition(
        image_url="https://64.media.tumblr.com/06c4752cb3a53b12fa1785043a816d70/f86e7fab64031d0a-cb/s1280x1920/9a94db1d3b369adb05ff1309298c9371b3ee9754.jpg",
        header="Help Chicago's Schools",
        description="Why are the public schools getting taken advantage of when charter schools are being given a lot of incentives? Doesn't seem right to me, especially when considering one has the option of 'selective enrollment' and the other does not."
        goal=5000,
        current=0,
        creator_id=2,
        topic_id=4)

    
     potatoPetition = Petition(
        image_url="https://64.media.tumblr.com/3f3ac7cfd0eeaa1d74dd7e85cf24515d/f86e7fab64031d0a-6f/s540x810/a0e5cf337b69bdbc8785b69c0ec013bf89bc39fe.jpg",
        header="Eat more potatoes",
        description="They're neat!!!"
        goal=5000,
        current=0,
        creator_id=1,
        topic_id=5)

    potatoSignature = Signature(
        user_id=1,
        petition_id=5,
        message="I'm eating them already!"
    )

    schoolsSignature = Signature(
        user_id=2,
        petition_id=4,
        message="Let's do this!"
    )


    default_update = Update(
        petition_id=1,
        mediaurl="https://change-clone.s3-us-west-1.amazonaws.com/default_petition.png",
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

    db.session.add(miss_monday)
    db.session.add(miss_wednesday)
    db.session.add(mr_3)
    db.session.add(demo_user)
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
    db.session.add(pizzaPetition)
    db.session.add(potatoPetition)
    db.session.add(pokemonPetition)
    db.session.add(schoolsPetition)
    db.session.add(famousPetition)
    db.session.add(potatoSignature)
    db.session.add(schoolsSignature)
    db.session.add(default_update)
    db.session.add(default_comment)

    db.session.commit()
