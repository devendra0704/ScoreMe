import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io
import pandas as pd
import sys

# Set Tesseract path if required (adjust path as needed)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

pdf_path = sys.argv[1]
output_path = sys.argv[2]

doc = fitz.open(pdf_path)
rows = []

for page_number in range(len(doc)):
    page = doc.load_page(page_number)
    pix = page.get_pixmap(dpi=300)
    img = Image.open(io.BytesIO(pix.tobytes("png")))

    raw_text = pytesseract.image_to_string(img)

    for line in raw_text.splitlines():
        if line.strip():
            row = line.split('\t') if '\t' in line else [col for col in line.split("  ") if col.strip()]
            rows.append(row)

max_cols = max(len(r) for r in rows)
normalized = [r + [''] * (max_cols - len(r)) for r in rows]

df = pd.DataFrame(normalized)
df.columns = [f"Column {i+1}" for i in range(max_cols)]
df.to_excel(output_path, index=False)
print("Done.")
