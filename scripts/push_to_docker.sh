#!/bin/bash

set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then

    if [ "${TRAVIS_BRANCH}" = "master" ] || [ "${TRAVIS_BRANCH}" = "dev" ]; then

        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

        TAG_NAME="latest"
        if [ "${TRAVIS_BRANCH}" = "dev" ]; then
            TAG_NAME="dev-latest"
        fi

        docker tag "${DOCKER_IMAGE_NAME}" "vibhu4agarwal/${DOCKER_IMAGE_NAME}:${TAG_NAME}"
        docker push "vibhu4agarwal/${DOCKER_IMAGE_NAME}:${TAG_NAME}"

        if [ "${TRAVIS_BRANCH}" = "master" ]; then
            SHA=$(git rev-parse --short HEAD)
            docker tag "${DOCKER_IMAGE_NAME}" "vibhu4agarwal/${DOCKER_IMAGE_NAME}:${SHA}"
            docker push "vibhu4agarwal/${DOCKER_IMAGE_NAME}:${SHA}"
        fi


    fi

fi

