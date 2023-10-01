# Predição Acidente Fatal Final
Predição Acidente Fatal Final é a finalização do projeto que foi sendo construído ao longo do módulo 7. Ele é uma aplicação em containers disponível na AWS e protegida com via verificação de tokens. Ele tem como objetivo a predição de acidentes fatais.

## Desenvolvimento do Predição Acidente Fatal Final
Aqui serão detalhadas as etapas do desenvolvimento do projeto.

### Colab Notebok
- Responsável pela análise, limpeza dos dados e criação do modelo preditivo.

- Aqui, o [dataset](https://www.kaggle.com/datasets/liamarguedas/brazil-total-highway-crashes-2010-2023) foi analisado e transformado de forma a garantir a criação de um modelo com alta performace.

- link do Colab: https://colab.research.google.com/drive/1RU2hxklvHV51zTKbbugGzcwUaYo3LdCb?usp=sharing

### Backend
- Desenvolvido em python e utilizando o framework fastapi devido sua função assíncrona e sua utilização em produção.

- Ele tem o objetivo de receber as requisições de predição para então responde-las de acordo com o modelo feito na etapa anterior.

- Responsável pela proteção das rotas utilizando json web tokens.

### Frontend
- Desenvolvido em python e utilizando o framework stremlit, devido a sua interface intuitiva e reconhecimento na área de vizualização de dados. 

- Página de Login: Nela, o usuário pode entrar no sistema e ter acesso a utilização do modelo preditivo.

- Página de Predição: Nela, o usuário pode colocar os dados a fim de realizar uma predição.

### Database
- Para o database, foi utilizado a imagem oficial do postgres em sua ultima versão em docker.

- Responsável por armazenas as credencias de login, no qual permitem a entrada do usuário no sistema.

- A imagem do oficial do postgres utilizada no projeto pode ser encontrada em: https://hub.docker.com/_/postgres/tags

### Docker
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

### Nuvem
- Para a finalização do projeto, foi pensada na solução em nuvem utilizando o serviço EC2 da AWS.

- Nesta etapa, foi utilizado ubuntuu como modelo computacional e suas configurações de segurança foram previamente editadas a fim de autorizar o recebimento de requisições externas à AWS.

- Para a configuração do ambiente, foram utilizados os seguintes comandos:

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

## Predição Acidente Fatal Final em Ação!

Para a execução containerizada da API na Nuvem, bastou-se usar o comando:
```
sudo docker compose up
```

O vídeo com a execução do modelo está disponível [AQUI :D](https://drive.google.com/file/d/1u1VuUxDFXzzuEFuzf1IlfFkG-M1Qef2w/view?usp=sharing)
