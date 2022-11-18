"""CRUD operations."""

from model import db, User, Route, Review, Stop, connect_to_db


def create_user(fname, lname, email, username, password, phone_num):
    """Create and return a new user."""

    user = User(
        fname=fname, 
        lname=lname, 
        email=email, 
        username=username, 
        password=password, 
        phone_num=phone_num)

    return user

def get_users():
    """Return all users."""

    return User.query.all()

def get_user_by_id(user_id):
    """Return a user by their id."""

    return User.query.get(user_id)


def create_route(user, num_stops, route_name, total_miles, total_time, 
start_lat, start_lng, end_lat, end_lng):
    """Create and return a new route."""

    route = Route(
        user=user,
        num_stops=num_stops,
        route_name=route_name,
        total_miles=total_miles,
        total_time=total_time,
        start_lat=start_lat,
        start_lng=start_lng,
        end_lat=end_lat,
        end_lng=end_lng
    )

    return route

def create_stop(user, stop_name, miles_from_path, time_from_path, 
stop_lat, stop_lng):
    """Create and return a new stop."""

    stop = Stop(
    user=user, 
    stop_name=stop_name, 
    miles_from_path=miles_from_path, 
    time_from_path=time_from_path,
    stop_lat=stop_lat,
    stop_lng=stop_lng
    )

    return stop

def create_review(user, stop, rating, review_content):
    """Create and return a new rating."""

    review = Review(
    user=user, 
    stop=stop, 
    rating=rating, 
    review_content=review_content)

    return review



if __name__ == "__main__":
    from server import app

    connect_to_db(app)
