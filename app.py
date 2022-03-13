from flask import Flask, send_from_directory
import json
import http.client


# === HELPERS ===
API_HEADERS = {
    'x-rapidapi-host': "totodunet-decimals-search-v1.p.rapidapi.com",
    'x-rapidapi-key': "8e5362bb61mshc6aec671aef2bb2p16f614jsn75f9c6e54a22"
}

def api_call(url):
    conn = http.client.HTTPSConnection("totodunet-decimals-search-v1.p.rapidapi.com")
    conn.request("GET", url, headers=API_HEADERS)
    response = conn.getresponse()
    return json.loads(response.read().decode("utf-8"))

def api_search(value):
    result = api_call(f"/inaudi.php?number=pi&search={value}&start=1&end=1000000000")
    return result

def api_decimals(index):
    result = api_call(f"/inaudi.php?number=pi&decimal={index-50}&display=100")
    return result


# === FRONTEND ===
app = Flask(
    __name__,
    static_url_path='',
    static_folder='public/')

@app.get("/")
def hello_world():
    return send_from_directory('public', 'index.html')


# === BACKEND ===
@app.get("/search/<int:value>")
def search(value):
    print(value)
    if value <= 0 or len(str(value)) != 6:
        return {"error": "invalid"}, 400

    result = api_search(value)
    decimals = api_decimals(result["position"])
    response = {**result, **decimals}
    print(response)
    return response
