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

    def __repr__(self):
        return f"Username: {self.username}"
