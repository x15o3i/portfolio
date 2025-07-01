from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
import os # For environment variables
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
# It's crucial to set a secret key for Flask session management (used by flash)
# For production, use a strong, randomly generated key and keep it secret.
# You can generate one using: import secrets; secrets.token_hex(16)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev_secret_key_replace_me_in_prod')

# Email Configuration - Best practice is to use environment variables
# These would be set in your deployment environment or a .env file (loaded by a library like python-dotenv)
# For local testing, you can temporarily hardcode them OR set them in your shell
MAIL_SENDER_EMAIL = os.environ.get('MAIL_SENDER_EMAIL') # e.g., your_app_email@gmail.com
MAIL_SENDER_PASSWORD = os.environ.get('MAIL_SENDER_PASSWORD') # e.g., your_gmail_app_password
MAIL_RECEIVER_EMAIL = os.environ.get('MAIL_RECEIVER_EMAIL') # e.g., your_personal_email@example.com
MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com') # Default to Gmail, can be changed
MAIL_PORT = int(os.environ.get('MAIL_PORT', 465)) # Default to Gmail SSL port
MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', 'True').lower() == 'true' # Default to SSL for Gmail

# Route for the main page (index.html)
# This will serve your static HTML. Ensure index.html is in the same directory or specify template_folder.
# For this setup, we assume index.html, style.css, script.js are in a 'static' folder
# or served by a different mechanism if Flask is purely API.
# Let's adjust to serve index.html from the root for simplicity with current file structure.
@app.route('/')
def home():
    # Since index.html is not in a 'templates' folder but at the root,
    # we can serve it using send_from_directory or configure static_folder.
    # However, the user's plan was to have static HTML for project listings.
    # Flask will primarily handle the contact form submission.
    # For a fully Flask-driven site, index.html would be in 'templates'.
    # Let's assume for now the user will open index.html directly in the browser,
    # and the form action will point to this Flask app.
    # A better approach for a cohesive app is to serve index.html via Flask:
    return render_template('index.html') # This expects index.html in a 'templates' folder.

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message_body = request.form.get('message')

        # Basic server-side validation
        if not name or not email or not message_body:
            flash('All fields are required. Please fill out the entire form.', 'error')
            # Redirect back to the contact section on the main page
            # If index.html is served by Flask from templates:
            # return redirect(url_for('home', _anchor='contact'))
            # If index.html is static and opened directly, this redirect might be tricky.
            # For now, let's assume index.html can be re-rendered or we redirect to a path
            # that the user knows is their main page.
            # The simplest is to redirect to '/' and let the #contact anchor work.
            return redirect('/#contact')


        if not MAIL_SENDER_EMAIL or not MAIL_SENDER_PASSWORD or not MAIL_RECEIVER_EMAIL:
            app.logger.error("Mail server not configured. Set MAIL_SENDER_EMAIL, MAIL_SENDER_PASSWORD, and MAIL_RECEIVER_EMAIL environment variables.")
            flash('The contact form is currently not configured. Please contact the administrator.', 'error')
            return redirect('/#contact')

        msg_subject = f"New Portfolio Contact: {name}"
        msg_content = f"You have a new message from your portfolio contact form:\n\n" \
                      f"Name: {name}\n" \
                      f"Email: {email}\n\n" \
                      f"Message:\n{message_body}\n"

        msg = MIMEText(msg_content)
        msg['Subject'] = msg_subject
        msg['From'] = MAIL_SENDER_EMAIL
        msg['To'] = MAIL_RECEIVER_EMAIL

        try:
            app.logger.info(f"Attempting to send email from {MAIL_SENDER_EMAIL} to {MAIL_RECEIVER_EMAIL} via {MAIL_SERVER}:{MAIL_PORT}")
            if MAIL_USE_SSL:
                with smtplib.SMTP_SSL(MAIL_SERVER, MAIL_PORT) as smtp_server:
                    smtp_server.login(MAIL_SENDER_EMAIL, MAIL_SENDER_PASSWORD)
                    smtp_server.sendmail(MAIL_SENDER_EMAIL, MAIL_RECEIVER_EMAIL, msg.as_string())
            else: # For TLS, though port 587 is more common for TLS
                with smtplib.SMTP(MAIL_SERVER, MAIL_PORT) as smtp_server:
                    smtp_server.starttls()
                    smtp_server.login(MAIL_SENDER_EMAIL, MAIL_SENDER_PASSWORD)
                    smtp_server.sendmail(MAIL_SENDER_EMAIL, MAIL_RECEIVER_EMAIL, msg.as_string())
            
            app.logger.info("Email sent successfully.")
            flash('Thank you for your message! I will get back to you soon.', 'success')
        except smtplib.SMTPAuthenticationError:
            app.logger.error("SMTP Authentication Error. Check MAIL_SENDER_EMAIL and MAIL_SENDER_PASSWORD.")
            flash('There was an authentication problem with the mail server. Please try again later.', 'error')
        except smtplib.SMTPServerDisconnected:
            app.logger.error("SMTPServerDisconnected. Server unexpectedly disconnected.")
            flash('The mail server disconnected unexpectedly. Please try again later.', 'error')
        except smtplib.SMTPException as e:
            app.logger.error(f"SMTP Error: {str(e)}")
            flash(f'An error occurred while sending your message. Please try again. Error: {str(e)}', 'error')
        except Exception as e:
            app.logger.error(f"An unexpected error occurred: {str(e)}")
            flash('An unexpected error occurred. Please try again later.', 'error')

        # Redirect back to the main page, to the contact section
        return redirect('/#contact')


# To use Flask's flash messaging, the template displaying the messages needs to be aware of them.
# If index.html is served by Flask and is a Jinja2 template, you'd add something like:
# {% with messages = get_flashed_messages(with_categories=true) %}
#   {% if messages %}
#     <ul class=flashes>
#     {% for category, message in messages %}
#       <li class="{{ category }}">{{ message }}</li>
#     {% endfor %}
#     </ul>
#   {% endif %}
# {% endwith %}
# This needs to be added to index.html for flash messages to appear.

if __name__ == '__main__':
    # For development:
    # 1. Ensure you have a 'templates' folder in the same directory as app.py.
    # 2. Move index.html into the 'templates' folder.
    # 3. Create a 'static' folder and move style.css and script.js into it.
    # 4. Update links in index.html:
    #    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
    #    <script src="{{ url_for('static', filename='script.js') }}"></script>
    # 5. Set Environment Variables for email:
    #    export FLASK_APP=app.py
    #    export FLASK_SECRET_KEY='some_random_secret_key_here'
    #    export MAIL_SENDER_EMAIL='your_gmail_username@gmail.com'
    #    export MAIL_SENDER_PASSWORD='your_gmail_app_password'
    #    export MAIL_RECEIVER_EMAIL='your_personal_email_to_receive_messages@example.com'
    #    (Optionally MAIL_SERVER, MAIL_PORT, MAIL_USE_SSL if not using Gmail defaults)
    #
    # To run: flask run (or python app.py if app.run() is not commented out for execution)
    #
    # For this phase, we are just creating app.py. The file structure adjustments
    # and environment variable setup will be part of the "Integration and Testing" phase.
    app.run(debug=True, port=5001) # Using a different port in case 5000 is in use
