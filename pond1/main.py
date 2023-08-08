# Importação de Bibliotecas
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# Instanciando o FastAPI para a utilização do servidor
app = FastAPI()

# Rota para a utilização de arquivos na página html
app.mount("/static", StaticFiles(directory="static"), name="static")

# Rota para o currículo
@app.get("/")
def render_curriculum():
    return FileResponse("index.html")