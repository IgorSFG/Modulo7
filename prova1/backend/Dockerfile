# base image
FROM python:3.9-alpine

# work directory
WORKDIR /backend

# copy the requirements to workdir
COPY ./requirements.txt /backend/requirements.txt

# intall the dependencies
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

# copy the content to workdir
COPY . /backend

# command that starts the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]