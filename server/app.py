#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api


# Add your model imports
from models import User, TicketStatus, Ticket, Comment, Role

# Views go here!


# @app.route("/")
# def index():
#     return "<h1>Project Server</h1>"


class Landing(Resource):
    def get(self):
        return "Project Server"


api.add_resource(Landing, "/", endpoint="landing")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
