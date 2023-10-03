from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    # (20) added as max char length for username
    username = db.Column(db.String(20), unique=True, nullable=False)
    admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)

    comments = db.relationship("Comment", backref="user")


class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(255), nullable=False)  # at least 5 chars
    status = db.Column(db.String, default="Opened")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255))

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
