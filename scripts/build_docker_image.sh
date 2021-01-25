#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "master" ] || [ "${TRAVIS_BRANCH}" = "dev" ]; then
    docker build -t "${DOCKER_IMAGE_NAME}" .
    docker images
fi

# By this we are building a docker image
# Where Docker image name is->  test_fairypanda_restapi
