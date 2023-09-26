# Predição Acidente Fatal Final
Predição Acidente Fatal Final é a finalização do projeto que foi sendo construído ao longo do módulo 7. Ele é uma aplicação em containers disponível na AWS e protegida com via verificação de tokens, com o objetivo de prever acidentes fatais em situações específicas.

# Desenvolvimento do Predição Acidente Fatal Final

## Colab Notebok
Responsável pela análise e limpeza dos dados: Aqui, o [dataset](https://www.kaggle.com/datasets/liamarguedas/brazil-total-highway-crashes-2010-2023) foi analisado e transformado de forma a garantir a criação de um modelo com alta performace.

link do Colab: https://colab.research.google.com/drive/1RU2hxklvHV51zTKbbugGzcwUaYo3LdCb?usp=sharing

## API
Desenvolvida em python utilizando o framework fastapi, ela tem o objetivo de receber as requisições de predição via a página predições, que utiliza o framework streamlit, para então responde-las.

## Docker
- Para a aplicação funcionar em qualquer dispositivo, foi pensado uma aplicação containerizada, com todos os requisitos e funções para o funcionamento do Predição Acidente Fatal.

- Os requisitos estão presentes no arquivo `requirements.txt`, enquanto o responsável pela criação da imagem a ser containerizada e suas funções está no `Dockerfile`.


# Predição Acidente Fatal Final em Ação!

A imagem do projeto pode ser encontrada [no meu repositório do Docker Hub](https://hub.docker.com/repository/docker/igorsfg/predicao_acidente_fatal/tags), bastando-se apenas baixar a imagem com:
```
docker pull igorsfg/predicao_acidente_fatal:1.0
```

Para a execução containerizada da API com o modelo preditivo, basta usar o comando:
```
docker run -p 8000:80 igorsfg/predicao_acidente_fatal:1.0
```

Após a execução, a API com o modelo de predição estará disponível [AQUI :D](http:127.0.0.1:8000/docs)

Também há um [VÍDEO](https://drive.google.com/file/d/1cDkbf2nLi21AZX7iA-N03MeXWpeqPUW6/view?usp=sharing) que mostra o funcionamento do modelo.