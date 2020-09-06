#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "master" ] || [ "${TRAVIS_BRANCH}" = "dev" ]; then
    docker build -t "${DOCKER_IMAGE_NAME}" .
    docker images
fi

