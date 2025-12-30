<h1 align="center">🇮🇳 Bharat E-Vote</h1>
<h3 align="center">Secure Digital Voting System</h3>

 <p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2500&pause=800&color=1E90FF&center=true&vCenter=true&width=900&lines=🇮🇳+Bharat+E-+Vote;Hey!+I'm+Tanusree+Roy" />
</p>
<p align="center">
  A production-oriented <b>secure e-voting platform</b> focused on authentication, correctness, and vote integrity.
</p>

---

## 🎨 UI Preview – Secure Voter Login

<p align="center">
  <i>Glassmorphism-inspired Aadhaar-based voter authentication interface</i>
</p>

---

## 🧩 Problem Statement

Design a digital voting system that:
- Prevents duplicate voting
- Guarantees one-person-one-vote
- Secures voting routes behind authentication
- Maintains correctness even under repeated or malicious requests

---

## ✨ Key Features

- 🔐 **Secure Authentication** – Aadhaar-based voter login with encrypted passwords  
- 🗳️ **One Person → One Vote** – Enforced at backend, not UI  
- 🎚️ **Interactive Voting UI** – Party logos, candidate cards, toggle-based voting  
- ⚡ **Atomic Vote Casting** – Prevents race conditions and double voting  
- 🍪 **Protected Sessions** – Auth middleware for sensitive routes  
- 🎨 **Modern UI** – Clean, responsive, trust-focused design  

---

## 🧠 Voting Invariants (Backend-Enforced)

✔ A voter can vote **only once**  
✔ No voting for multiple candidates  
✔ No repeat vote for same candidate  
✔ All invalid requests rejected server-side  

> Critical invariants are enforced **independent of frontend behavior**

---

## 🛠️ Languages & Tools

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,mongodb,tailwind" />
</p>

---

## 🏗️ System Design Overview

**Frontend**
- Stateless UI using Fetch API
- Defensive UI (disable voting after success)
- No trust placed on client logic

**Backend**
- RESTful APIs using Express
- Auth middleware protecting vote routes
- Server-side validation for vote integrity

**Database**
- MongoDB collections for Users & Candidates
- Vote history tracked per user
- Atomic updates to avoid race conditions

---

## 📂 Project Architecture
```
VOTING/
├── middleware/
│ └── auth.js
├── models/
│ ├── User.js
│ └── Candidate.js
├── routes/
│ ├── authRoutes.js
│ └── voteRoutes.js
├── public/
│ ├── index.html
│ ├── style.css
│ └── app.js
├── server.js
├── package.json
└── README.md
```
---
## 📈 Performance & Scalability
- **Cloud-Powered**: Leverages MongoDB Atlas for distributed data storage.
- **Optimized Queries**: Uses indexed Aadhaar numbers for O(1) lookups during registration.
- **Stateless**: JWT-based auth allows the backend to scale horizontally without session sync issues.
---
## 🚀 Live Demo
🔗 https://e-vote-44h4.onrender.com/
---
## 🚀 Installation & Setup
1. **Clone & Install**:
  ```
   npm install
   ```
Seed the Cloud Data: Push candidates to your Atlas cluster:
```
node seed.js
```
Run Server:
```
node server.js
```
---
