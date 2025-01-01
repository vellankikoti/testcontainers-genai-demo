FROM python:3.9-slim

WORKDIR /app

# Install PostgreSQL client and dependencies
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install dependencies
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x wait-for-it.sh

# Use wait-for-it.sh to delay backend startup until the database is ready
CMD ["sh", "-c", "chmod +x /app/wait-for-it.sh && /app/wait-for-it.sh postgres-db -- python app.py"]
