import streamlit as st
import requests

host = "http://back:8000"
protection_url = f"{host}/protection"
predict_url = f"{host}/predict"

response = requests.get(protection_url)
if response.status_code != 200:
    st.error(response.json())
    st.stop()

# Streamlit UI
st.title(f"Bem vindo {response.json()['username']}!")
st.title("Predição Acidente Fatal")
st.header("Insira os valores para predição")

# Input
vehicle = st.text_input("Veículo:", "automovel")
local = st.text_input("Trecho:", "BR_101_RJ")
way = st.text_input("Sentido:", "norte")
time = st.text_input("Horário:", 12)

# Button to fetch data
if st.button("Predizer"):
    response = requests.post(predict_url, json={"vehicle": vehicle, "local": local, "way": way, "time": time})
    data = response.json()
    if response.status_code == 200:
        st.success(f"Response: {data}")
    else:
        st.error(f"Response: {data}")