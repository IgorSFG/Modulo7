import pandas as pd
from fastapi import FastAPI
from pycaret.regression import load_model, predict_model
from pydantic import BaseModel

app = FastAPI()

class DataInput(BaseModel):
    sentido: int
    automovel:int
    bicicleta:int
    caminhao:int
    moto:int
    onibus:int
    outros:int
    mortos:int
    H0_4:int
    H4_8:int
    H8_12:int
    H12_16:int
    H16_20:int
    H20_24:int
    BA_526:int
    BR_040_DF:int
    BR_040_GO:int
    BR_040_MG:int
    BR_040_RJ:int
    BR_050_GO:int
    BR_050_MG:int
    BR_060_DF:int
    BR_060_GO:int
    BR_070_MT:int
    BR_101_BA:int
    BR_101_ES:int
    BR_101_RJ:int
    BR_101_RS:int
    BR_101_SC:int
    BR_116_BA:int
    BR_116_CW:int
    BR_116_PR:int
    BR_116_RJ:int
    BR_116_RS:int
    BR_116_SC:int
    BR_116_SP:int
    BR_153_GO:int
    BR_153_MG:int
    BR_153_SP:int
    BR_163_MS:int
    BR_163_MT:int
    BR_163_PA:int
    BR_262_GO:int
    BR_290_RS:int
    BR_293_RS:int
    BR_324_BA:int
    BR_364_MG:int
    BR_364_MT:int
    BR_365_MG:int
    BR_376_PR:int
    BR_376_SC:int
    BR_381_MG:int
    BR_381_SP:int
    BR_386_RS:int
    BR_392_RS:int
    BR_393_RJ:int
    BR_40_MG:int
    BR_414_GO:int
    BR_50_MG:int
    BR_60_GO:int

class DataOutput(BaseModel):
    prediction: float
    result: str

# Load trained Pipeline
model = load_model("crashes")

# Defines the API
@app.post("/predict", response_model=DataOutput)
def predict(data: DataInput):
    data = data.dict()
    data = pd.DataFrame(data, index=[0])
    prediction = predict_model(model, data=data)
    prediction = prediction["prediction_label"][0]
    result = "Vai VIVER! :)"
    if prediction > 0.5: result = "Vai MORRER! :("
        
    return {
        "prediction": prediction,
        "result": result
            }