FROM python:3
WORKDIR /usr/src/app

COPY backend backend/
RUN python -v
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

RUN python3 backend/manage.py migrate
CMD python3 backend/manage.py runserver 0.0.0.0:8000
