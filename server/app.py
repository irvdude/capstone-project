#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api


# Add your model imports
from models import User, TicketStatus, Ticket, Comment, Role

# Views go here!


# @app.route("/")
# def index():
#     return "<h1>Project Server</h1>"


# Landing route
class Landing(Resource):
    def get(self):
        return "Project Server"


api.add_resource(Landing, "/", endpoint="landing")


# Tickets list route
class Tickets(Resource):
    # get list
    def get(self):
        response_dict_list = [
            t.to_dict() for t in Ticket.query.order_by("created_at").all()
        ]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )

        return response

    # post ticket
    def post(self):
        new_ticket = Ticket(
            title=request.form["title"],
            body=request.form["body"],
        )

        db.session.add(new_ticket)
        db.session.commit()

        response_dict = new_ticket.to_dict()

        response = make_response(response_dict, 201)

        return response


api.add_resource(Tickets, "/tickets", endpoint="tickets")


#

if __name__ == "__main__":
    app.run(port=5555, debug=True)
