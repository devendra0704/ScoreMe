// backend/server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());

// Multer setup to upload PDF
const upload = multer({ dest: "uploads/" });

// Upload PDF route
app.post("/extract-tables", upload.single("pdf"), (req, res) => {

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // const inputPath = path.join(__dirname, req.file.path);
  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, "extracted_tables.xlsx");

  // Run Python script
  const pythonScript = `python extract.py "${inputPath}" "${outputPath}"`;

  exec(pythonScript, (error, stdout, stderr) => {
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);


    fs.unlinkSync(inputPath); // Delete uploaded PDF after use

    if (error) {
      console.error("Error:", stderr);
      return res.status(500).json({ error: "Table extraction failed" });
    }

    res.download(outputPath, "extracted_tables.xlsx", (err) => {
      if (err) {
        console.error("Download error:", err);
      }
      try {
        fs.unlinkSync(outputPath); // Cleanup output
      } catch (err) {
        console.warn("Failed to delete output file:", err.message);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
