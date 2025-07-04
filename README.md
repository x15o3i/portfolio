# 🧑‍💻 Raphael Fulfilled — Portfolio Website

Welcome to my personal portfolio!  
This project showcases my work as a **UI/UX Designer** and **Frontend Developer**, featuring minimalist design, real projects, and a contact form that sends messages directly to my email — **without any backend setup**.

---

## 📂 Project Structure

.
├── index.html # Main HTML file
├── contact.html # Contact page (if separate)
├── static/
│ ├── style.css # CSS styles
│ └── script.js # JavaScript interactions
├── assets/ # Images and icons
└── README.md # This file right here 😄


## ✨ Features

- 🎨 **Minimalist, responsive design**
- ⚡ **Static website** — no backend or server required
- 📧 **Working contact form** using Formspree or Getform
- 🚀 Easy to host on GitHub Pages, Vercel, or Netlify
- 🗂️ Clean and organized file structure

---

## 📬 Contact Form Setup

This project uses a static form service, so you don't need Python or any server.

To set it up:

1. Create a free account on [Formspree](https://formspree.io) or [Getform](https://getform.io)
2. Copy your form's `action` URL
3. In `index.html`, update the form tag:


<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
Done! You’ll get submissions in your email, no backend code needed.

🚀 Live Demo
Check it out here:
🌐 https://x15o3i.github.io/portfolio/

🧠 Author
Raphael Fulfilled
UI/UX Designer & Frontend Developer
GitHub: @x15o3i

📄 License
MIT License — feel free to clone or use the structure for your own portfolio.
Just don’t forget to sprinkle in your own creativity. 😄