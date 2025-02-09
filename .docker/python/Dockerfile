FROM python:3.9

WORKDIR /var/www/python

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN pip install -U g4f[api]
RUN pip install filelock

CMD ["python", "app.py"]
