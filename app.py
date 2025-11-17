from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

# ------------------------------
# 🔐 ÇEVRE DEĞİŞKENLERİ (Render)
# ------------------------------
VALID_USERNAME = os.getenv("ADMIN_USER")
VALID_PASSWORD = os.getenv("ADMIN_PASS")

# Örnek:
# ADMIN_USER = admin
# ADMIN_PASS = 12345

# ------------------------------------------------
# 🔐 LOGIN ENDPOINT (HTML buraya POST isteği atıyor)
# ------------------------------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username", "")
    password = data.get("password", "")

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return jsonify({"success": True})

    return jsonify({"success": False})

# ------------------------------------------------
# 📄 Google Sheet verisini çekmek istersen:
# ------------------------------------------------
@app.route("/sheet")
def get_sheet():
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBWFSVSD6NvBNqC8me1le_unCCLOKIOIS2DfZFXUTji0MHC7SaWNIy4a0Laob9xOiAJyPnp7LuZ1R-/pub?output=csv"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except:
        return "Google Sheet okunamadı", 500

# ------------------------------
# RUN
# ------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
