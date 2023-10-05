#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

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
        Ticket.query.delete()
        Comment.query.delete()
        Role.query.delete()

        # create 3 Roles
        print("Creating roles...")
        roles = ["Admin", "Associate", "Guest"]
        for role_name in roles:
            role = Role(role=role_name)
            db.session.add(role)
        # db.session.commit()

        # create 20 random Comments
        print("Creating Comments...")
        comments = [fake.text() for i in range(20)]
        for comment_text in comments:
            created = fake.date_time_between(start_date="-1y", end_date="now")
            comment = Comment(body=comment_text, created_at=created)
            db.session.add(comment)

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

            # append a random Role
            random_roles = random.sample(roles, min(len(roles), random.randint(1, 3)))
            for role_name in random_roles:
                db.session.add(user)
                role = Role.query.filter_by(role=role_name).first()
                user.roles.append(role)

            # append a random Comment
            random_comments = random.sample(
                comments, min(len(comments), random.randint(1, 3))
            )
            for comment_text in random_comments:
                db.session.add(user)
                comment = Comment.query.filter_by(body=comment_text).first()
                user.comments.append(comment)

            users.append(user)

        db.session.add_all(users)

        # create 10 Tickets
        print("Creating tickets...")
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

            random_comments = random.sample(
                comments, min(len(comments), random.randint(1, 3))
            )
            for comment_text in random_comments:
                db.session.add(ticket)
                comment = Comment.query.filter_by(body=comment_text).first()
                ticket.comments.append(comment)

        db.session.add_all(tickets)

        # create 3 comments

        db.session.commit()
