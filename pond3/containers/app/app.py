import os
import requests
from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
dirname = os.path.dirname(__file__)
app.mount("/assets", StaticFiles(directory=os.path.join(dirname, 'assets')), name="assets")
templates = Jinja2Templates(directory=os.path.join(dirname, 'templates'))
api_url = "http://"

@app.get("/crash-predict")
def crash_predict():
    vehicle = Form(...)
    local = Form(...)
    way = Form(...)
    time = Form(...)
    response = requests.get(api_url)
    data = response.json()
    results = data['results']

@app.get("/")
async def get_html(request: Request):
    return templates.TemplateResponse("crash.html", {"request": request, "title": "Crash"})
