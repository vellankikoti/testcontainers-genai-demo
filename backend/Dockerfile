FROM python:3.9-slim

WORKDIR /app

# Install postgresql-client for pg_isready and upgrade pip
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x wait-for-it.sh

# Use wait-for-it.sh to delay backend startup until the database is ready
CMD ["./wait-for-it.sh", "db", "--", "python", "app.py"]
