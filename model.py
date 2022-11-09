"""Models for road trip app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

#Q: how do you decide which attributes to list in the repr?

class User(db.Model):
    """A User."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    phone_num = db.Column(db.Integer, nullable=False)

    routes = db.relationship("Route", back_populates="user")
    spots = db.relationship("Spot", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    favorite_spots = db.relationship("Favorite_spot", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Route(db.Model):
    """A Route."""

    __tablename__ = "routes"

    route_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    num_spots = db.Column(db.Integer, nullable=False)
    total_miles = db.Column(db.Integer, nullable=False)
    total_time = db.Column(db.DateTime, nullable=False)
    start_lat = db.Column(db.Float, nullable=False)
    start_lng = db.Column(db.Float, nullable=False)
    end_lat = db.Column(db.Float, nullable=False)
    end_lng = db.Column(db.Float, nullable=False)
    miles_from_path = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    reviews = db.relationship("Review", back_populates="route")
    spot_on_route = db.relationship("Spot_on_route", back_populates="route")

    def __repr__(self):
        return f'<User user_id={self.route_id}>'


class Spot_on_route(db.Model):
    """A Spot On a Route."""

    __tablename__ = "spot_on_route"

    spot_on_route_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.spot_id"))

    routes = db.relationship("Route", back_populates="spot_on_route")
    spots = db.relationship("Spot", back_populates="spot_on_route")

    def __repr__(self):
        return f'<Spot_on_route spot_on_route_id={self.spot_on_route_id}>'


class Spot(db.Model):
    """A Spot."""

    __tablename__ = "spots"

    spot_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    miles_from_path = db.Column(db.Integer, nullable=False)
    time_from_path = db.Column(db.DateTime, nullable=False)
    spot_lat = db.Column(db.Float, nullable=False)
    spot_lng= db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    spot_category_id = db.Column(db.Integer, db.ForeignKey("spot_category.spot_category_id"))

    users = db.relationship("User", back_populates="spot")
    spot_categories = db.relationship("Spot_category", back_populates="spot")

    def __repr__(self):
        return f'<Spot_on_route spot_on_route_id={self.spot_on_route_id}>'


class Spot_category(db.Model):
    """A spot category."""

    __tablename__ = "spot_categories"

    spot_category_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    category_name = db.Column(db.String, nullable=False)

    spots = db.relationship("Spot", back_populates="spot_category")

    def __repr__(self):
        return f'<Spot_category_id={self.spot_category_id}>'


class Review(db.Model):
    """A review."""

    __tablename__ = "reviews"

    review_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review_content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.spot_id"))

    users = db.relationship("User", back_populates="review")
    routes = db.relationship("Route", back_populates="review")
    spots = db.relationship("Spot", back_populates="review")

    def __repr__(self):
        return f'<Review review_id={self.review_id}>'


class Favorite_spot(db.Model):
    """A user's favorite spot."""

    __tablename__ = "favorite_spots"

    favorite_spot_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.spot_id"))

    users = db.relationship("User", back_populates="favorite_spot")
    spots = db.relationship("Spot", back_populates="favorite_spot")

    def __repr__(self):
        return f'<favorite_spot_id={self.favorite_spot_id}>'



def connect_to_db(flask_app, db_uri="postgresql:///roadtrip_database", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)

