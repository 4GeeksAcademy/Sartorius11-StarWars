from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Characters, CharactersFavorites, Planets, PlanetFavorites
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


# Endpoint de prueba
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Listar todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'Listado de usuarios'
    return response_body, 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = request.json.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email==email,Users.password==password, Users.is_active)).scalar()
    # Si la consulta es exitosa, row tendra algo(por lo tanto es verdadero), sino devuelve NONE
    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)
    access_token = create_access_token(identity=email,additional_claims=claims)
    response_body ['message'] = 'User Logged!'
    response_body ['access_token'] = access_token
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'User logged {current_user}'
    return response_body, 200


# Listar todos los personajes desde SWAPI
@api.route('/characters', methods=['GET'])
def get_characters():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de personajes desde SWAPI'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'Algo salió mal al obtener los personajes'
    return response_body, 400


# Mostrar la información de un solo personaje según su id desde SWAPI
@api.route('/characters/<int:character_id>', methods=['GET'])
def get_character(character_id):
    response_body = {}
    url = f'https://swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = f'Información del personaje con id {character_id} desde SWAPI'
        response_body['results'] = data['result']
        return response_body, 200
    response_body['message'] = f'No se encontró el personaje con id {character_id}'
    return response_body, 404


# Listar todos los planetas desde SWAPI
@api.route('/planets', methods=['GET'])
def get_planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de planetas desde SWAPI'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'Algo salió mal al obtener los planetas'
    return response_body, 400


# Mostrar la información de un solo planeta según su id desde SWAPI
@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    response_body = {}
    url = f'https://swapi.tech/api/planets/{planet_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = f'Información del planeta con id {planet_id} desde SWAPI'
        response_body['results'] = data['result']
        return response_body, 200
    response_body['message'] = f'No se encontró el planeta con id {planet_id}'
    return response_body, 404


# Listar todos los favoritos de planetas que pertenecen al usuario actual
@api.route('/users/<int:user_id>/favorites-planets', methods=['GET'])
def get_user_favorite_planets(user_id):
    response_body = {}
    rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = f'Listado de planetas favoritos del usuario con id {user_id}'
    return response_body, 200



# Añadir un nuevo planeta favorito al usuario
@api.route('/users/<int:user_id>/favorite-planets', methods=['POST'])
def add_favorite_planet(user_id):
    response_body = {}
    data = request.json
    planet_id = data.get('planet_id')
    if not planet_id:
        response_body['message'] = 'El campo planet_id es requerido'
        return response_body, 400
    favorite = PlanetFavorites(user_id=user_id, planet_id=planet_id)
    db.session.add(favorite)
    db.session.commit()
    response_body['results'] = favorite.serialize()
    response_body['message'] = f'Planeta favorito añadido al usuario con id {user_id}'
    return response_body, 201



# Eliminar un planeta favorito del usuario
@api.route('/users/<int:user_id>/favorite-planets/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(user_id, planet_id):
    response_body = {}
    favorite = db.session.execute(db.select(PlanetFavorites).where(
        PlanetFavorites.user_id == user_id,
        PlanetFavorites.planet_id == planet_id
    )).scalar()
    if not favorite:
        response_body['message'] = f'No se encontró el planeta favorito con id {planet_id} para el usuario con id {user_id}'
        return response_body, 404
    db.session.delete(favorite)
    db.session.commit()
    response_body['message'] = f'Planeta favorito con id {planet_id} eliminado del usuario con id {user_id}'
    return response_body, 200


