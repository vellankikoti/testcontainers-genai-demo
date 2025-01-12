# Use a lightweight Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install required system dependencies in a single step
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
 && rm -rf /var/lib/apt/lists/*

# Upgrade pip to the latest version
RUN pip install --no-cache-dir --upgrade pip

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code into the container
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x /app/wait-for-it.sh

# Use ENTRYPOINT to ensure database readiness before starting the backend
ENTRYPOINT ["sh", "-c", "/app/wait-for-it.sh postgres-db -- python app.py"]
