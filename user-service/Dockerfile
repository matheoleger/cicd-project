FROM python:latest

WORKDIR /user-service

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 3001

CMD [ "python", "app.py" ]