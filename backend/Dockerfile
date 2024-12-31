FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "db", "--", "python", "app.py"]
