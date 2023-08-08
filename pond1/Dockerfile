# Imagem Base
FROM python:3.9-alpine

# Diretório de trabalho
WORKDIR /curriculum

# Copia do conteúdo para o diretório de trabalho
COPY . /curriculum

# Instalação das dependências
RUN pip install --no-cache-dir --upgrade -r /curriculum/requirements.txt

# Comando de execução
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]