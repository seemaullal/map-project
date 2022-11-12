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



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
