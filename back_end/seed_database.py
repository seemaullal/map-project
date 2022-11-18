"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud as crud
import model as model
import server

os.system("dropdb roadtrip_database")
os.system("createdb roadtrip_database")

model.connect_to_db(server.app)
model.db.create_all()

# Load user data from JSON file
with open("users.json") as f:
    user_data = json.loads(f.read())

# Create users, store them in list so we can use them
# to create fake spots/routes/reviews
users_in_db = []
for user in user_data:
    fname, lname, email, username, password, phone_num = (
        user["fname"],
        user["lname"],
        user["email"],
        user["username"],
        user["password"],
        user["phone_num"],
    )

    db_user = crud.create_user(fname, lname, email, username, password, phone_num)
    users_in_db.append(db_user)

model.db.session.add_all(users_in_db)
model.db.session.commit()

# Create 10 users; each user will make 10 ratings
# for n in range(10):
#     email = f"user{n}@test.com"  # Voila! A unique email!
#     password = "test"

#     user = crud.create_user(email, password)
#     model.db.session.add(user)

#     for _ in range(10):
#         random_movie = choice(movies_in_db)
#         score = randint(1, 5)

#         rating = crud.create_rating(user, random_movie, score)
#         model.db.session.add(rating)

# model.db.session.commit()