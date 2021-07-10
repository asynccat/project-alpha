# project-alpha

## Pre-requisites
 - python3.8
 - python3.8-venv

## Installation

Create a new directory to work in, and cd into it:
```
mkdir <folder_name>
cd <folder_name>
```
Clone the project:
```
git clone https://github.com/asynccat/project-alpha.git .
```
### Backend (Django)
Create and activate a virtual environment:
```
python3.8 -m venv venv
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

### Frontend

To get the project up and running, and view components in the browser, complete the following steps:

* Download and install Node: [nodejs.org](https://nodejs.org/).

Or use the command line to do it:
```sudo apt-get update```
```sudo apt-get install nodejs npm```

To manage node versions:
```sudo npm install -g n```
```sudo n lts```

Check the currently installed version with:
```node -v```

* Go to "frontend" folder
* Copy `.env.sample` to `.env`
* Install project dependencies: `npm install`

* To start using the dev-server run: `npm start`
* To build frontend once to use it with django(backend): `npm run build`
* Please, don't forget to rebuild frontend after any FE-changes.

* Test: `npm test`

## Config manager
We are using the [Dynaconf](https://github.com/rochacbruno/dynaconf) configuration manager
### Directory Structure
```bash
├── backend
│   ├── config
│       ├── dev.yaml        # develpment settings
│       ├── prod.yaml       # production settings
│       ├── test.yaml       # test setting
│       ├── .secrets.yaml   # (required!)store sensitive data such as tokens and passwords
│       ├── dev.local.yaml  # (optional)local development settings. should be in .gitignore
│       ├── .env            # (optional)store ENV variables locally. should be in .gitignore
```
Create a `.secrets.yaml` file in a `config` folder and write Django `SECRET_KEY` value.

For example:
```
default:
  SECRET_KEY: 'some_secret_string'
```
