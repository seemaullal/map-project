"""Server for movie ratings app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
# from model import connect_to_db, db
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/api/v1/user, METHODS=[POST]")
# notation for making a route that calls an api, to delete this account,
# methods would be DELETE instead of POST
# use javascript to fetch these routes on the frontend
# 1.16.00 is this process outlined




if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
