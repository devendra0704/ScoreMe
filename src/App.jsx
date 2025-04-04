import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload a PDF first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const { data } = await axios.post("http://localhost:5000/extract-tables", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      setLinks([url]);
    } catch (error) {
      alert("Error extracting tables.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📄 PDF Table Extractor</h1>

        <div className="flex flex-col justify-center items-center gap-2 mb-6">
          <input
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-violet-500 file:text-white hover:file:bg-violet-600"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && (
            <p className="text-sm text-gray-600">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Extract"}
        </button>

        {loading && (
          <p className="text-violet-700 text-sm mt-3 animate-pulse">
            ⏳ Extracting table(s)... please wait.
          </p>
        )}

        {links.length > 0 && (
          <div className="mt-8 text-left">
            <h2 className="font-semibold text-gray-800 mb-2">✅ Download Extracted Tables:</h2>
            <ul className="list-disc list-inside text-violet-700">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link}
                    download={`extracted_table_${i + 1}.xlsx`}
                    className="hover:underline"
                  >
                    Download Table {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
