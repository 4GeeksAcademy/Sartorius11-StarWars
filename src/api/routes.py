from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Characters, CharactersFavorites, Planets, PlanetFavorites
import requests

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


# Listar todos los favoritos de personajes que pertenecen al usuario actual
@api.route('/users/<int:user_id>/favorites-characters', methods=['GET'])
def get_user_favorite_characters(user_id):
    response_body = {}
    rows = db.session.execute(db.select(CharactersFavorites).where(CharactersFavorites.user_id == user_id)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = f'Listado de personajes favoritos del usuario con id {user_id}'
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


# Añadir un nuevo personaje favorito al usuario
@api.route('/users/<int:user_id>/favorite-characters', methods=['POST'])
def add_favorite_character(user_id):
    response_body = {}
    data = request.json
    character_id = data.get('character_id')
    if not character_id:
        response_body['message'] = 'El campo character_id es requerido'
        return response_body, 400
    favorite = CharactersFavorites(user_id=user_id, character_id=character_id)
    db.session.add(favorite)
    db.session.commit()
    response_body['results'] = favorite.serialize()
    response_body['message'] = f'Personaje favorito añadido al usuario con id {user_id}'
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


# Eliminar un personaje favorito del usuario
@api.route('/users/<int:user_id>/favorite-characters/<int:character_id>', methods=['DELETE'])
def delete_favorite_character(user_id, character_id):
    response_body = {}
    favorite = db.session.execute(db.select(CharactersFavorites).where(
        CharactersFavorites.user_id == user_id,
        CharactersFavorites.character_id == character_id
    )).scalar()
    if not favorite:
        response_body['message'] = f'No se encontró el personaje favorito con id {character_id} para el usuario con id {user_id}'
        return response_body, 404
    db.session.delete(favorite)
    db.session.commit()
    response_body['message'] = f'Personaje favorito con id {character_id} eliminado del usuario con id {user_id}'
    return response_body, 200