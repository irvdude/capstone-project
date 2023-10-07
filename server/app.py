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
        data = request.get_json()
        new_ticket = Ticket(
            title=data["title"],
            body=data["body"],
        )

        db.session.add(new_ticket)
        db.session.commit()

        response_dict = new_ticket.to_dict()

        response = make_response(response_dict, 201)

        return response


api.add_resource(Tickets, "/tickets", endpoint="tickets")


# Ticket by ID
class TicketsbyID(Resource):
    def get(self, id):
        response_dict = Ticket.query.filter_by(id=id).first().to_dict()

        response = make_response(jsonify(response_dict), 200)

        return response

    def patch(self, id):
        ticket = Ticket.query.filter(Ticket.id == id).first()

        for attr in request.json:
            setattr(ticket, attr, request.json[attr])

        db.session.add(ticket)
        db.session.commit()

        response_dict = ticket.to_dict()

        response = make_response(response_dict, 200)

        return response

    def delete(self, id):
        ticket = Ticket.query.filter(Ticket.id == id).first()

        db.session.delete(ticket)
        db.session.commit()

        response_dict = ""

        response = make_response(jsonify(response_dict), 204)

        return response


api.add_resource(TicketsbyID, "/tickets/<int:id>")


# List Tickets by user
class TicketsByUser(Resource):
    def get(self, id):
        response_dict_list = [
            t.to_dict() for t in Ticket.query.filter(Ticket.user_id == id).all()
        ]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )

        return response


api.add_resource(TicketsByUser, "/users/<int:id>/tickets")


# Clear Session
class ClearSession(Resource):
    def delete(self):
        session["user_id"] = None

        return {}, 204


# Signup
class Signup(Resource):
    def post(self):
        json = request.get_json()
        user = User(username=json["username"], _password_hash=json["password"])
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return user.to_dict(), 201


api.add_resource(Signup, "/signup")


# Login
class Login(Resource):
    def get(self):
        response_dict_list = [u.to_dict() for u in User.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )

        return response

    def post(self):
        user = User.query.filter(
            User.username == request.get_json()["username"]
        ).first()
        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200

        return {"error": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


# Check Session
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return jsonify(user.to_dict())
        else:
            return jsonify({"message": "401: Not Authorized"}), 401


api.add_resource(CheckSession, "/check_session")


# Logout
class Logout(Resource):
    def logout(self):
        session["user_id"] = None
        return jsonify({"message": "204: No Content"}), 204


api.add_resource(Logout, "/logout")

# COMMENTS


if __name__ == "__main__":
    app.run(port=5555, debug=True)
