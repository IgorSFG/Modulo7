# Python Image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /front

# Upgrade pip
RUN pip install --upgrade pip

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the content to the working directory
COPY . .

# Run the command
CMD ["python", "-m", "streamlit", "run", "Login.py", "--server.port", "8100", "--server.address", "0.0.0.0"]