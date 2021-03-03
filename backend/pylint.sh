#!/bin/bash

# We're using virtual env only on development
if [[ $ENV =~ ^(test|staging|production)$ ]]
then
    pylint src
else
    source ../venv/bin/activate
    pylint src
fi
