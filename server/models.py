from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt
from enum import Enum

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    # (20) added as max char length for username
    username = db.Column(db.String(20), unique=True, nullable=False)
    admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)

    comments = db.relationship("Comment", backref="user")
    roles = db.relationship("Role", secondary="role_identifier")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"Username: {self.username}, Admin?: {self.admin}"


class TicketStatus(Enum):
    OPENED = "Opened"
    RESOLVED = "Resolved"


class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(255), nullable=False)  # at least 5 chars
    status = db.Column(
        db.Enum(TicketStatus), default=TicketStatus.OPENED
    )  # either opened or resolved
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    comments = db.relationship("Comment", backref="ticket")

    def __repr__(self):
        return f"Title {self.title}, Status: {self.status}, Created: {self.created_at}"


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"))

    def __repr__(self):
        return f"body: {self.body}"


class Role(db.Model, SerializerMixin):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(10))  # either Admin or Associate

    def __repr__(self):
        return f"role: {self.role}"


role_identifier = db.Table(
    "role_identifier",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("role_id", db.Integer, db.ForeignKey("roles.id")),
)
