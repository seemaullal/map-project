"""Server for movie ratings app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
from model import User
from jinja2 import StrictUndefined
import crud

app = Flask(__name__)
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

@app.route('/users')
def all_users():
    """View all users."""

    users = crud.get_users()

    return jsonify({'hello': 'im here'})

# @app.route('/api/users')
# def all_users():
#    """View all users."""

#     users = crud.get_users()

#     return jsonify({melon.melon_code: melon.to_dict() for melon in melons})





if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
