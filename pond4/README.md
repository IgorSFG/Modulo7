# Predição Acidente Fatal Final
Predição Acidente Fatal Final é a finalização do projeto que foi sendo construído ao longo do módulo 7. Ele é uma aplicação em containers disponível na AWS e protegida com via verificação de tokens, com o objetivo de prever acidentes fatais em situações específicas.

# Desenvolvimento do Predição Acidente Fatal Final

## Colab Notebok
Responsável pela análise e limpeza dos dados: Aqui, o [dataset](https://www.kaggle.com/datasets/liamarguedas/brazil-total-highway-crashes-2010-2023) foi analisado e transformado de forma a garantir a criação de um modelo com alta performace.

link do Colab: https://colab.research.google.com/drive/1RU2hxklvHV51zTKbbugGzcwUaYo3LdCb?usp=sharing

## Backend
Desenvolvido em python utilizando o framework fastapi, ela tem o objetivo de receber as requisições de predição via a página predições, que utiliza o framework streamlit, para então responde-las.

## Frontend

## Database

## Docker
- Para a aplicação funcionar em qualquer dispositivo, a containerização dos componentes, com todos os requisitos e funções para o funcionamento, fazem com que isso seja possível.

- A imagem do backend do projeto pode ser encontrada em: https://hub.docker.com/repository/docker/igorsfg/paff-back/tags
  
- A imagem do frontend do projeto pode ser encontrada em: https://hub.docker.com/repository/docker/igorsfg/paff-front/tags

- Para baixar as imagens, basta usar os comandos:
```
docker pull igorsfg/paff-back
```
```
docker pull igorsfg/paff-front
```

## Nuvem
Intalação das bases:
```
sudo apt update
sudo apt upgrade
sudo apt install python3 python3-pip -y
```

Instalação do Docker:
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Clonar o Github:
```
git clone https://github.com/IgorSFG/Modulo7.git
cd Modulo7/pond4/containers
```

# Predição Acidente Fatal Final em Ação!

Para a execução containerizada da API na Nuvem, bastou-se usar o comando:
```
sudo docker compose up
```

Após a execução, a API com o modelo de predição estará disponível [AQUI :D](http:127.0.0.1:8000/docs)

Também há um [VÍDEO](https://drive.google.com/file/d/1cDkbf2nLi21AZX7iA-N03MeXWpeqPUW6/view?usp=sharing) que mostra o funcionamento do modelo.
