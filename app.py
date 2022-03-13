from flask import Flask, send_from_directory
import json
import http.client

# === HELPERS ===
API_HEADERS = {
    'x-rapidapi-host': "totodunet-decimals-search-v1.p.rapidapi.com",
    'x-rapidapi-key': "8e5362bb61mshc6aec671aef2bb2p16f614jsn75f9c6e54a22"
}

def api_search(value):
    conn = http.client.HTTPSConnection("totodunet-decimals-search-v1.p.rapidapi.com")
    conn.request("GET", f"/inaudi.php?number=pi&search={value}&start=1&end=1000000000", headers=API_HEADERS)
    response = conn.getresponse()
    result = json.loads(response.read().decode("utf-8"))
    print(result)
    return result

def api_decimals(index):
    conn = http.client.HTTPSConnection("totodunet-decimals-search-v1.p.rapidapi.com")
    conn.request("GET", f"/inaudi.php?number=pi&decimal={index-50}&display=100", headers=API_HEADERS)
    response = conn.getresponse()
    result = json.loads(response.read().decode("utf-8"))
    print(result)
    return result

# === FRONTEND ===
app = Flask(
    __name__,
    static_url_path='',
    static_folder='public/')

@app.get("/")
def hello_world():
    return send_from_directory('public', 'index.html')


# === API ===
@app.get("/search/<int:value>")
def search(value):
    result = api_search(value)
    decimals = api_decimals(result["position"])
    response = {**result, **decimals}
    print(response)
    return response




