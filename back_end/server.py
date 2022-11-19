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
app.secret_key = "dev"
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


@app.route('/create-user', methods = ['POST'])
def new_user():
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


@app.route('/api/users')
def all_users():
    """View all users."""

    users = crud.get_users()
    for user in users:
        print(user)

    return jsonify({user.user_id: user.to_dict() for user in users})

# @app.route('/api/users', methods = ['POST'])
# def register_user():
#     """Create a new user."""

#     fname = request.form['fname']
#     lname = request.form['lname']
#     email = request.form['email']
#     username = request.form['username']
#     password = request.form['password']
#     phone_num = request.form['phone_num']
#     # or email = request.form.get("email")

#     # or user = crud.get_user_by_email(email)
#     # if user: (line 54)
#     if crud.get_user_by_email(email):
#         flash("Cannot create account with provided email. User already exists, try again.")
#     else:
#         new_user = crud.create_user(fname, lname, email, username, password, phone_num)
#         print(new_user)
#         db.session.add(new_user)
#         db.session.commit()
#         flash("Account created succesfully, you may log in.")
    
#     return redirect('/')


@app.route('/api/user/<user_id>')
def a_user(user_id):
    """View a user."""

    user = crud.get_user_by_id(user_id)
    print(type(user))

    return jsonify(user.to_dict())



if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
