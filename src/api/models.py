from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())

    def __repr__(self):
        return f'<User id: {self.id} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Columna Clave Foranea
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to'), lazy='select')  # La relación
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to'), lazy='select')
    
class Coments (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column (db.String(100), unique = False, nullable = True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to'), lazy='select')
    post_to = db.relationship('Posts',foreign_keys = [post_id], backref=db.backref('post_to'),lazy='select')



class Medias (db.Model):
   id = db.Column(db.Integer, primary_key=True)
   type = db.Column(db.String(40),unique = False ,nullable = True)
   url = db.Column(db.String(100),unique = True ,nullable = False)
   post_id = db.Column(db.Integer)
   post_to = db.relationship('Posts',foreign_keys = [post_id], backref=db.backref('post_to'),lazy='select')


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40),unique = False ,nullable = True)
    description = db.Column(db.String(200), unique = False ,nullable = True)
    body = db.Column (db.String(100), unique = False, nullable = True)
    date = db.Column (db.date, unique = True, nullable = True)
    image_url = db.Column (db.String(100), unique = True, nullable = True)
    user_id = db.Column(db.Integer)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to'), lazy='select')


class  CharactersFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    character_id = db.Column(db.Integer)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to'), lazy='select')
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('character_to'),lazy = 'select')


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String(50), unique = False, nullable = True)
    height = db.Column (db.String(100), unique = False, nullable = True)
    mass = db.Column (db.String(20), unique = False, nullable = True)
    hair_color = db.Column (db.String(10), unique = False, nullable = True)
    skin_color = db.Column (db.String(30), unique = False, nullable = True)
    birth_year = db.Column (db.String(30), unique = False, nullable = True)
    gender = db.Column (db.String(10), unique = False, nullable = True)
    id_to = db.relationship('CharactersFavorites', foreign_keys=[id], backref=db.backref('id_to'), lazy='select')


class  PlanetFavorites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    planet_id = db.Column(db.Integer)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to'), lazy='select')
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_to'))

class planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String(100), unique = True, nullable = False)
    diameter = db.Column (db.String(20), unique = False, nullable = False)
    rotation_period = db.Column (db.String(10), unique = True, nullable = False)
    orbital_period = db.Column (db.String(10), unique = True, nullable = False)
    gravity = db.Column (db.String(30), unique = False, nullable = False)
    id_to = db.relationship('PlanetFavorites', foreign_keys=[id], backref=db.backref('id_to'), lazy='select')








