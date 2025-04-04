import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io
import pandas as pd

# Optional: set Tesseract path if needed
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

doc = fitz.open("sample.pdf")
rows = []

for page_number in range(len(doc)):
    page = doc.load_page(page_number)
    pix = page.get_pixmap(dpi=300)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    
    # OCR text extraction
    raw_text = pytesseract.image_to_string(img)
    
    # Split into lines and then columns (by tabs or multiple spaces)
    for line in raw_text.splitlines():
        if line.strip():  # skip empty lines
            # Try splitting by tab, if not, split by multiple spaces
            if '\t' in line:
                row = line.split('\t')
            else:
                row = [col for col in line.split("  ") if col.strip()]
            rows.append(row)

# Normalize rows to the same length
max_cols = max(len(r) for r in rows)
normalized = [r + [''] * (max_cols - len(r)) for r in rows]

# Convert to DataFrame and export
df = pd.DataFrame(normalized)
df.to_excel("sample_output.xlsx", index=False, header=[f"Column {i+1}" for i in range(max_cols)])

print("✅ Structured data saved to 'structured_output.xlsx'")
