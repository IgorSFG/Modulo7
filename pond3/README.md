# Projeto Predição Acidente Fatal
O projeto tem como objetivo a criação de um container com todo o conteúdo necessário para execução de um modelo preditivo previamente processado e treinado. A ideia, é que utilizando do dataset [Brazil: Total highway crashes 2010 - 2023](https://www.kaggle.com/datasets/liamarguedas/brazil-total-highway-crashes-2010-2023) seja possível prever se um acidente fatal ocorrerá em circunstâncias específicas.

# Desenvolvimento do Predição Acidente Fatal

## Colab Notebok
- Responsável pela análise e limpeza dos dados: Aqui, o dataset sera analisado e transformado de forma a garantir uma boa performace do modelo.

- Responsável pela criação do modelo preditivo: Utilizando Auto ML, foi possível a escolha do melhor modelo preditivo com base o dataset já transformado. O modelo escolhido foi o `LGBMRegressor` devido a sua alta acurácidade.

- Responsável por salvar o modelo: Após a escolha do melhor modelo, ele é salvo e utilizado nas próximas etapas do projeto.

link do Colab: https://colab.research.google.com/drive/1RU2hxklvHV51zTKbbugGzcwUaYo3LdCb?usp=sharing

## API
- Desenvolvida em python utilizando o framework fastapi, ela tem o objetivo de receber as requisições de predição e então responde-las.

- O processo de predição é feito através do arquivo `crashes.pkl`, o modelo salvo na etapa anterior, enquanto as funções e definições da API estão presentes no arquivo `main.py`.

## Docker
- Para a aplicação funcionar em qualquer dispositivo, foi pensado uma aplicação containerizada, com todos os requisitos e funções para o funcionamento do Predição Acidente Fatal.

- Os requisitos estão presentes no arquivo `requirements.txt`, enquanto o responsável pela criação da imagem a ser containerizada e suas funções está no `Dockerfile`.


# Predição Acidente Fatal em Ação!

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
