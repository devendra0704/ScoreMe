# 📄 PDF Table Extractor – ScoreMe

Extract tables from system-generated PDFs and download them as Excel files.  
Built with **Vite + React + Tailwind CSS** on the frontend, and **Node.js + Express + Multer + xlsx** on the backend.

---

## 🚀 Features

- Upload a **PDF file**.
- Extract all detectable **tabular data**.
- Download the result in **Excel (.xlsx)** format.
- Clean UI with responsive design.

---

## 🖼️ Demo

- [Demo Video](https://drive.google.com/file/d/1JBwbFkgkLRYpMfLwNLQGqvMGpGqFsAnN/view?usp=drive_link)

---

## 🧱 Tech Stack

### Frontend
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + Multer
- **PDF Processing:** Python (PyMuPDF, pytesseract, PIL, pandas)

---

## ⚙️ How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/devendra0704/ScoreMe
cd ScoreMe
```
### 2.Install Dependencies
**Frontend**
```bash
cd client
npm install
```

**backend**
```bash
cd ../server
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```
---This command starts both the frontend and backend concurrently using concurrently.


### Required Python packages:
- fitz  # PyMuPDF
- pillow
- pytesseract
- pandas


