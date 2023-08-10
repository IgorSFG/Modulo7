# Visão Geral do Currículo em Docker
O projeto tem como objetivo a criação de um container com todo o conteúdo necessário para executar uma aplicação web que apresenta uma página HTML do meu currículo de estudante.

# Processo de Desenvolvimento
Para a criação da aplicação web, foi utilizado Python e o framework "fastapi".
Para o container, foi utilizado a Docker engine, seguindo um processo de alocação de conteúdo e criação de imagem.
- Primeiramente, foi feito a lista de requisitos para a execução do sistema no arquivo "requirements.txt".
- Em seguida, foi feito um "Dockerfile" para configuração das intruções a serem seguidas no momento que a imagem é concebida. Ele contém a lingugem de programação usada, assim como sua versão, o diretório onde serão armazenados os arquivos, a intalação de dependências e o comando para executar a aplicação web.

# Criação do Container!
Com a Docker Engine ativada, foi necessária a criação de uma imagem com:
```
docker build .
```

Após isso, foi feito uma indexação da imagem e seu respectivo repositório:
```
docker tag 6e6a igorsfg/curriculum:1.2.0
```

Assim, foi possível o envio para o Docker Hub com:
```
docker push igorsfg/curriculum:1.2.0
```

Com isso, a imagem pode ser encontrada [no meu repositório](https://hub.docker.com/repository/docker/igorsfg/curriculum/tags), bastando-se agora apenas baixar a imagem:
```
docker pull igorsfg/curriculum:1.2.0
```

Para sua execução containerizada, basta usar o comando:
```
docker run -p 8000:80 6e6a
```

Após a execução, meu currículo irá aparecer [AQUI :D](http:127.0.0.1:8000)
