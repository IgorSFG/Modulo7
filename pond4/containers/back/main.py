from fastapi import FastAPI, HTTPException
from pycaret.regression import load_model, predict_model
from pydantic import BaseModel
import pandas as pd
import datetime
import jwt
import db

app = FastAPI()
model = load_model("crashes")
secret_key = "your_secret_key"
algorithm = "HS256"

def create_token(username, userpassword):
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

    payload = {
        "username": username,
        "userpassword": userpassword,
        "exp": expiration_time
    }

    return jwt.encode(payload, secret_key, algorithm=algorithm)

def decode_token():
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        print(payload)
        username = payload['username']
        return {"username": username}
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Signature has expired")
    
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    except Exception as e:
        raise HTTPException(status_code=401, detail="Not authorized")
    

class DataModel(BaseModel):
    sentido: int = 0
    automovel:int = 0
    bicicleta:int = 0
    caminhao:int = 0
    moto:int = 0
    onibus:int = 0
    outros:int = 0
    mortos:int = 0
    H0_4:int = 0
    H4_8:int = 0
    H8_12:int = 0
    H12_16:int = 0
    H16_20:int = 0
    H20_24:int = 0
    BA_526:int = 0
    BR_040_DF:int = 0
    BR_040_GO:int = 0
    BR_040_MG:int = 0
    BR_040_RJ:int = 0
    BR_050_GO:int = 0
    BR_050_MG:int = 0
    BR_060_DF:int = 0
    BR_060_GO:int = 0
    BR_070_MT:int = 0
    BR_101_BA:int = 0
    BR_101_ES:int = 0
    BR_101_RJ:int = 0
    BR_101_RS:int = 0
    BR_101_SC:int = 0
    BR_116_BA:int = 0
    BR_116_CW:int = 0
    BR_116_PR:int = 0
    BR_116_RJ:int = 0
    BR_116_RS:int = 0
    BR_116_SC:int = 0
    BR_116_SP:int = 0
    BR_153_GO:int = 0
    BR_153_MG:int = 0
    BR_153_SP:int = 0
    BR_163_MS:int = 0
    BR_163_MT:int = 0
    BR_163_PA:int = 0
    BR_262_GO:int = 0
    BR_290_RS:int = 0
    BR_293_RS:int = 0
    BR_324_BA:int = 0
    BR_364_MG:int = 0
    BR_364_MT:int = 0
    BR_365_MG:int = 0
    BR_376_PR:int = 0
    BR_376_SC:int = 0
    BR_381_MG:int = 0
    BR_381_SP:int = 0
    BR_386_RS:int = 0
    BR_392_RS:int = 0
    BR_393_RJ:int = 0
    BR_40_MG:int = 0
    BR_414_GO:int = 0
    BR_50_MG:int = 0
    BR_60_GO:int = 0

class DataInput(BaseModel):
    vehicle: str
    local: str
    way: str
    time: int

class DataOutput(BaseModel):
    prediction: float
    result: str

@app.post("/predict", response_model=DataOutput)
def predict(data: DataInput):
    print(data)
    vehicle = data.vehicle
    local = data.local
    way = data.way.lower()
    time = data.time

    dataModel = DataModel().dict()
    dataModel = pd.DataFrame(dataModel, index=[0])
    
    dataModel[vehicle] = dataModel[vehicle].replace(0, 1)
    dataModel[local] = dataModel[local].replace(0, 1)
    
    if way == "norte": dataModel["sentido"] = dataModel["sentido"].replace(0, 1)

    time_columns = ["H0_4", "H4_8", "H8_12", "H12_16", "H16_20", "H20_24"]
    time = round(time/6)
    time = time_columns[time]
    dataModel[time] = dataModel[time].replace(0, 1)

    prediction = predict_model(model, dataModel)
    prediction = prediction["prediction_label"][0]
    
    result = "Vai VIVER! :)"
    if prediction > 0.5: result = "Vai MORRER! :("
    
    return {
        "prediction": prediction,
        "result": result
        }

@app.get("/protection")
def protection():
    return decode_token()

class Credential(BaseModel):
    username: str
    userpassword: str

@app.post("/login")
async def login(credential: Credential):
    username = credential.username
    userpassword = credential.userpassword

    rows = await db.get_user(username, userpassword)

    if len(rows) < 1: raise HTTPException(status_code=401, detail="Invalid credentials")

    print(rows)

    global token
    token = create_token(username, userpassword)
    
    return {
        "token":token,
        "message":"Login successful!"
        }

@app.get("/")
def read_root():
    return {"Hello": "World"}