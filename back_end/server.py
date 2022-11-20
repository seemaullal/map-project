"""Server for movie ratings app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
from model import User
from jinja2 import StrictUndefined
from flask_cors import CORS
import crud

app = Flask(__name__)
CORS(app)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined

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
def create_new_user():
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

    email = request.json['email']
    password = request.json['password']

    user = crud.get_user_by_email(email)

    if not user:
        print(session)
        return jsonify({'message':'Please create an account.'})
    elif user.password != password:
        print(session)
        return jsonify({'message':'Incorrect password entered, please try again.'})
    else:
        session['user_email'] = user.email
        print(session)
        return jsonify({'message': 'Login succesful.'})

@app.route('/api/users')
def all_users():
    """View all users."""

    users = crud.get_users()
    for user in users:
        print(user)

    return jsonify({user.user_id: user.to_dict() for user in users})

@app.route('/api/user/<user_id>')
def a_user(user_id):
    """View a user."""

    user = crud.get_user_by_id(user_id)
    print(type(user))

    return jsonify(user.to_dict())


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
