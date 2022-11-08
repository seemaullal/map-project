"""Models for road trip app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

#Q: what is "user" in back_populates referring to? (ie table is users)
#Q: how do you decide which attributes to list in the repr?

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    phone_num = db.Column(db.Integer)

    routes = db.relationship("Route", back_populates="user")
    spots = db.relationship("Spot", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    favorite_spots = db.relationship("Favorite_spots", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Route(db.Model):
    """A route."""

    __tablename__ = "routes"

    route_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    num_spots = db.Column(db.Integer)
    total_miles = db.Column(db.Integer)
    total_time = db.Column(db.datetime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    reviews = db.relationship("Review", back_populates="route")
    spot_on_route = db.relationship("Spot_on_route", back_populates="route")

    def __repr__(self):
        return f'<User user_id={self.route_id}>'


class Spot_on_route(db.Model):
    """A Spot on a route."""

    __tablename__ = "spot_on_route"

    spot_on_route_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.user_id"))

    route = db.relationship("Route", back_populates="spot_on_route")
    spot= db.relationship("Spot_on_route", back_populates="spot_on_route")

    def __repr__(self):
        return f'<Spot_on_route spot_on_route_id={self.spot_on_route_id}>'


class Spot(db.Model):
    """A Spot."""

    __tablename__ = "spots"

    spot_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    miles_from_path = db.Column(db.Integer)
    time_from_path = db.Column(db.datetime)
    coordinates = db.Column(db.string)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    category_id = db.Column(db.Integer, db.ForeignKey("spot_category.spot_category_id"))

    user = db.relationship("Route", back_populates="spot")
    spot_category= db.relationship("Spot_category", back_populates="spot")

    def __repr__(self):
        return f'<Spot_on_route spot_on_route_id={self.spot_on_route_id}>'


class Spot_category(db.Model):
    """A spot category."""

    __tablename__ = "spot_category"

    spot_category_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    category_name = db.Column(db.String)

    spot= db.relationship("Spot_category", back_populates="spot_category")

    def __repr__(self):
        return f'<Spot_category_id={self.spot_category_id}>'


class Review(db.Model):
    """A review."""

    __tablename__ = "reviews"

    review_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    rating = db.Column(db.Integer)
    review_content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    route_id = db.Column(db.Integer, db.ForeignKey("routes.route_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.spot_id"))

    user = db.relationship("User", back_populates="review")
    route = db.relationship("Route", back_populates="review")
    spot = db.relationship("Spot", back_populates="review")

    def __repr__(self):
        return f'<Review review_id={self.review_id}>'


class Favorite_spot(db.Model):
    """A user's favorite spot."""

    __tablename__ = "favorite_spot"

    favorite_spot_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.spot_id"))

    user = db.relationship("User", back_populates="favorite_spot")
    spot= db.relationship("Spot", back_populates="favorite_spot")

    def __repr__(self):
        return f'<favorite_spot_id={self.favorite_spot_id}>'

