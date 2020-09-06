FROM python:3.8.5-slim-buster
ENV PYTHONUNBUFFERRED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./backend/ /code/
