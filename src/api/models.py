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

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    description = db.Column(db.String())
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Product: {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'description': self.description,
                'price': self.price}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to'))

    
    
class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    user_to = db.relationship('Users', backref=db.backref('comments'))
    post_to = db.relationship('Post', backref=db.backref('comments'))

class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=True)
    url = db.Column(db.String(100), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_to = db.relationship('Post', backref=db.backref('medias'))

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=True)
    description = db.Column(db.String(200), nullable=True)
    body = db.Column(db.String(100), nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    image_url = db.Column(db.String(100), unique=True, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', backref=db.backref('posts'))


class CharactersFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    user_to = db.relationship('Users', backref=db.backref('characters_favorites'))
    character_to = db.relationship('Characters', backref=db.backref('favorited_by'))
    def __repr__(self):
        return f'<CharactersFavorite: {self.id} - {self.character_id}>'

    def serialize(self):
        return {'id': self.id,
                'character_id': self.character_id,
                'user_id': self.user_id}



class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=True)
    height = db.Column(db.String(100), nullable=True)
    mass = db.Column(db.String(20), nullable=True)
    hair_color = db.Column(db.String(10), nullable=True)
    skin_color = db.Column(db.String(30), nullable=True)
    birth_year = db.Column(db.String(30), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    def __repr__(self):
        return f'<Character: {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'height': self.height,
                'mass': self.mass,
                'skin color': self.skin_color,
                'birth date': self.birth_year,
                'gender': self.gender}



class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    user_to = db.relationship('Users', backref=db.backref('planet_favorites'))
    planet_to = db.relationship('Planets', backref=db.backref('favorited_by'))
    def __repr__(self):
        return f'<PlanetFavorite: {self.id} - {self.planet_id}>'

    def serialize(self):
        return {'id': self.id,
                'planet id': self.planet_id,
                'user id': self.user_id}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    diameter = db.Column(db.String(20), nullable=False)
    rotation_period = db.Column(db.String(10), nullable=False)
    orbital_period = db.Column(db.String(10), nullable=False)
    gravity = db.Column(db.String(30), nullable=False)
    def __repr__(self):
            return f'<Character: {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter,
                'rotation period': self.rotation_period,
                'orbital period': self.orbital_period,
                'gravity ': self.gravity}
