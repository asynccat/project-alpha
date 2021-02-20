# project-alpha

# Installation

Create a new directory to work in, and cd into it:
```
mkdir <folder_name>
cd <folder_name>
```
Clone the project:
```
git clone https://github.com/asynccat/project-alpha.git .
```
Create and activate a virtual environment:
```
python3 -m venv venv
source venv/bin/activate
```
cd into backend folder:
```
cd backend
```
Update pip inside the virtual environment and install project requirements:
```
pip install --upgrade pip
pip install -r requirements.txt
```
Make sure the virtual environment is active (`source venv/bin/activate`) before running any `python manage.py` command.

Run migrations:
```
python manage.py migrate
```
Run dev-server:
```
python manage.py runserver
```