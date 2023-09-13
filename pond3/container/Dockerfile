# Python Image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /predição_de_acidente_fatal

# Upgrade pip
RUN pip install --upgrade pip

# Install libgomp1
RUN apt-get update && apt-get install -y libgomp1

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the content to the working directory
COPY . .

# Run the command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]