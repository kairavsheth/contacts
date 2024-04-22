from flask import Flask
from flask_cors import CORS


from myapp.routes import bp as myapp_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(myapp_bp)


if __name__ == '__main__':
    app.run(debug=True)


# Create a full stack contacts web app having the following page and actions:
#
# - Sign up
# - Login
# - View all contacts (done)
# - View a single contact (done)
# - Create a contact (done)
# - Edit a contact (done)
# - Delete a contact (done)
#
# Authentication should be done using Google OAuth2.0. Access control should be managed where a user has access only to the contacts owned by them. Front-end must be responsive and a fairly decent UI is expected.
#
# A contact should contain the following info:
# - Name
# - Email ID(s) (optional)
# - Phone number(s)(optional)
# - Date of Birth (optional)
#
# Each of the fields must be appropriately validated before being saved/updated.
#
# Create a cron scheduled task which, using Google APIs, sends an email from the user's email ID to all the contacts of the user on their birthdays at midnight.