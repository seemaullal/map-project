"""Server for movie ratings app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, Response, jsonify)
from model import connect_to_db, db
from model import User, Stop
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import crud
import os 



app = Flask(__name__)
app.secret_key = 'dev'
CORS(app)
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)

@app.route('/')
def home():

    return render_template('index.html')


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')

@app.route('/test')
def test_me():
    """Make sure front and back end servers are connected."""

    return jsonify({'hello': 'im here'})


@app.route('/register', methods = ['POST'])
def create_user():
    """Create a new user."""

    fname = request.json['fname']
    lname = request.json['lname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    phone_num = request.json['phone_num']

    new_user = crud.create_user(fname, lname, email, username, password, phone_num)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict())

@app.route('/login', methods = ['POST'])
def login_user():
    """Log in a user."""

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # if email != "test" or password != "test":
    #     return jsonify({"message":"bad email or password"}), 401

    # access_token = create_access_token(identity=email)

    # return jsonify(access_token=access_token)

    user = crud.get_user_by_email(email)

    if not user:
        # Response.delete_cookie(email)
        return jsonify({'message':'Please create an account.'}), 401
    elif user.password != password:
        # Response.delete_cookie(email)
        return jsonify({'message':'Incorrect password entered, please try again.'}), 401
    else:
        user_id = user.user_id
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token, user_id=user_id)

# @app.route("/logout")
# def logout_user():
#     """Log user out."""

#     del session['user_email']
#     print(session)
    
#     return jsonify({'message': 'Logout succesful.'})

@app.route('/create-stop', methods = ['POST'])
def create_stop():
    """Create a new stop."""

    user_id = request.json['user_id']
    stop_category = request.json['stop_category']
    stop_name = request.json['stop_name']
    stop_lat = request.json['stop_lat']
    stop_lng = request.json['stop_lng']

    new_stop = crud.create_stop(user_id, stop_category, stop_name, stop_lat, stop_lng)

    db.session.add(new_stop)
    db.session.commit()

    return jsonify(new_stop.to_dict())

@app.route('/api/stops')
def view_all_stops():
    """View all stops."""

    stops = crud.get_stops()

    return jsonify({stop.stop_id: stop.to_dict() for stop in stops})

@app.route('/api/stops/map_data')
def view_all_stops_on_map():
    """View all stops."""

    stops = crud.get_stops()

    return jsonify({stop.stop_id: stop.to_dict() for stop in stops})

@app.route('/api/<user_id>/stops')
def stops_by_user(user_id):
    """View a user's stops."""

    user_stops = crud.get_stops_by_user(user_id)

    return jsonify({user_stop.stop_id: user_stop.to_dict() for user_stop in user_stops})

@app.route('/api/stops/<stop_id>', methods= ['GET'])
def view_stop(stop_id):
    """View a stop."""

    # stop = crud.get_stop_by_id(stop_id)
    # reviews = crud.get_reviews_by_stop(stop_id)

    # return jsonify(stop.to_dict(), {review.review_id: review.to_dict() for review in reviews})
    stop = crud.get_stop_by_id(stop_id)

    return jsonify(stop.to_dict())

@app.route('/api/stops/<stop_id>', methods= ['DELETE'])
def delete_stop(stop_id):
    """Delete a stop."""

    stop = crud.get_stop_by_id(stop_id)

    db.session.delete(stop)
    db.session.commit()

    return jsonify({'message': 'Stop has been deleted.'})

@app.route('/api/stops/<stop_id>/reviews')
def view_stop_reviews(stop_id):
    """View a stop's reviews."""

    stop_reviews = crud.get_reviews_by_stop(stop_id)

    return jsonify({review.review_id: review.to_dict() for review in stop_reviews})

@app.route('/api/stops/<stop_id>/review', methods = ['GET', 'POST'])
def create_review(stop_id):
    """Create a new review for a stop."""

    user_id = request.json['user_id']
    # stop_id = request.json['stop_id']
    rating = request.json['rating']
    content = request.json['content']

    new_review = crud.create_review(user_id, stop_id, rating, content)

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict())

@app.route('/api/user/<user_id>')
def a_user(user_id):
    """View a user."""

    user = crud.get_user_by_id(user_id)

    return jsonify(user.to_dict())

@app.route('/api/user/<user_id>/reviews')
def view_user_reviews(user_id):
    """View a user's reviews."""

    user_reviews = crud.get_reviews_by_user(user_id)

    return jsonify({user_review.review_id: user_review.to_dict() for user_review in user_reviews})


# @app.route("/hello", methods=["GET"])
# @jwt_required()
# def get_hello():

#     dictionary = {
#         "message": "hello world"
#     }
    
#     return jsonify(dictionary)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
