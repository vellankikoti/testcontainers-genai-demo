FROM python:3.9-slim

WORKDIR /app

RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x wait-for-it.sh

# Run the app using wait-for-it.sh to ensure the database is ready
CMD ["./wait-for-it.sh", "db", "--", "python", "app.py"]
