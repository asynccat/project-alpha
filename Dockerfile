FROM python:3
WORKDIR /usr/src/app

COPY backend backend/
COPY frontend frontend/
RUN python -v
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

RUN python3 backend/manage.py migrate
EXPOSE 8000/tcp
CMD python3 backend/manage.py runserver 0.0.0.0:8000
