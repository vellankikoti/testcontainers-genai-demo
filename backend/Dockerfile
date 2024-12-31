FROM python:3.9-slim

WORKDIR /app

# Install PostgreSQL client and dependencies
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install dependencies
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy application code
COPY . ./

# Set permissions explicitly for wait-for-it.sh inside the container
RUN chmod +x /app/wait-for-it.sh

# Use wait-for-it.sh to delay backend startup until the database is ready
CMD ["/bin/bash", "-c", "until pg_isready -h postgres-db -p 5432; do sleep 1; done && python app.py"]

