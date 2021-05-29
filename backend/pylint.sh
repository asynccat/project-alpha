#!/bin/bash

# We're using virtual env only on development
if [[ $ENV =~ ^(test|staging|production)$ ]]
then
    pylint project_alpha --rcfile .pylintrc --ignore=migrations
else
    source ../venv/bin/activate
    pylint project_alpha --rcfile .pylintrc --ignore=migrations
fi
