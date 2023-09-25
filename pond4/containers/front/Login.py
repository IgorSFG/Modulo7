import streamlit as st
import requests

host = "http://back:8000"
login_url = f"{host}/login"

# Streamlit UI
st.title("LOGIN")
st.header("Insira suas credênciais")

# Input
username = st.text_input("Nome: ", "teste")
userpassword = st.text_input("Senha: ", "teste123")

# Button to fetch data
if st.button("Login"):
        response = requests.post(login_url, json={"username": username, "userpassword": userpassword})
        data = response.json()
        if response.status_code == 200:
                st.success(data)
        else:
                st.error(data)
