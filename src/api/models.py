from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer)
    following_id = db.Column(db.Integer)


class Coments (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column (db.String(100), unique = False, nullable = True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)


class Medias (db.Model):
   id = db.Column(db.Integer, primary_key=True)
   type = db.Column(db.String(40),unique = False ,nullable = True)
   url = db.Column(db.String(100),unique = True ,nullable = False)
   post_id = db.Column(db.Integer)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40),unique = False ,nullable = True)
    description = db.Column(db.String(200), unique = False ,nullable = True)
    body = db.Column (db.String(100), unique = False, nullable = True)
    date = db.Column (db.String, unique = True, nullable = True)
    image_url = db.Column (db.String(100), unique = False, nullable = True)
    user_id = db.Column(db.Integer)


class  charactersFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    character_id = db.Column(db.Integer)


class character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String(50), unique = False, nullable = True)
    height = db.Column (db.String(100), unique = False, nullable = True)
    mass = db.Column (db.String(20), unique = False, nullable = True)
    hair_color = db.Column (db.String(10), unique = False, nullable = True)
    skin_color = db.Column (db.String(30), unique = False, nullable = True)
    birth_year = db.Column (db.String(30), unique = False, nullable = True)
    gender = db.Column (db.String(10), unique = False, nullable = True)


class  planetFavorites (d.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    planet_id = db.Column(db.Integer)


class planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String(100), unique = True, nullable = False)
    diameter = db.Column (db.String(20), unique = False, nullable = False)
    rotation_period = db.Column (db.String(10), unique = True, nullable = False)
    orbital_period = db.Column (db.String(10), unique = True, nullable = False)
    gravity = db.Column (db.String(30), unique = False, nullable = False)








