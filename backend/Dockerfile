FROM python:3.9-slim

WORKDIR /app

# Upgrade pip to the latest version to avoid dependency issues
RUN pip install --upgrade pip

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port and start the application
CMD ["python", "app.py"]
