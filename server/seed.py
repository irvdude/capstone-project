#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, TicketStatus, Ticket, Comment, Role

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting records...")
        User.query.delete()
        # TicketStatus.query.delete()
        # Ticket.query.delete()
        # Comment.query.delete()
        # Role.query.delete()

        # create 10 random Users
        print("Creating Users...")
        users = []
        usernames = []

        for i in range(10):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username, admin=rc([True, False]))

            users.append(user)

        db.session.add_all(users)

        # create 10 Tickets
        print("Creating tickets")
        tickets = []
        for i in range(10):
            created = fake.date_time_between(start_date="-1y", end_date="now")
            updated = fake.date_time_between(start_date=created, end_date="now")
            ticket = Ticket(
                title=fake.sentence(),
                body=fake.paragraph(nb_sentences=2),
                status=rc(list(TicketStatus)),
                created_at=created,
                updated_at=updated,
            )
            tickets.append(ticket)
        db.session.add_all(tickets)

        db.session.commit()
