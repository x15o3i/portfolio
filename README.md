# 🧑‍💻 Raphael Fulfilled — Portfolio Website

Welcome to my personal portfolio! This project showcases my work as a **UI/UX Designer** and **Python Developer**, featuring minimalist design, real projects, and a contact form that sends email directly to me.

---

## 📂 Project Structure

.
├── app.py # Flask backend handling contact form
├── templates/
│ └── index.html # Main HTML file
├── static/
│ ├── style.css # CSS styles
│ └── script.js # JavaScript interactions
├── assets/ # Project images
└── .env # Email config (not committed)

---

## ✨ Features

- 🎨 **Minimalist, responsive design**
- 🛠️ **Built with Flask** for handling contact form submissions
- 📧 **Email integration**: messages sent via secure SMTP
- 🔒 Environment variables used to keep credentials safe
- 📁 Organized file structure: `templates/`, `static/`, `assets/`

---

## 📬 Contact Form Setup (If You’re Cloning This)

To make the contact form work, you'll need to set up a `.env` file with your own email credentials.

Create a `.env` file in the root and add:

FLASK_SECRET_KEY=your_flask_secret
MAIL_SENDER_EMAIL=your_gmail_address@gmail.com
MAIL_SENDER_PASSWORD=your_gmail_app_password
MAIL_RECEIVER_EMAIL=your_real_email_to_receive_messages@gmail.com
Use Gmail App Password for security.
How to create one →

🚀 Running Locally
Make sure Python is installed.

pip install flask flask-mail python-dotenv
python app.py

Then open http://localhost:5001 in your browser.

🌐 Live Demo
Coming soon… 


🧠 Author
Raphael Fulfilled
UI/UX Designer & Python Developer
GitHub @x15o3i

📄 License
MIT — feel free to clone or use the structure for your own portfolio!


