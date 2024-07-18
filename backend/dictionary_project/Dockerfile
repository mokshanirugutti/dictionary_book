FROM python:3.11.4-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY . /app/

RUN apt-get update && \
    apt-get install -y gcc libpq-dev

COPY ./requirements.txt .
RUN pip install -r requirements.txt