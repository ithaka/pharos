#!/bin/bash

if [ "$SITE_NAME" == "pharos-storybooks" ]
then
  git diff --quiet HEAD^ HEAD packages/pharos/ .storybook/ package.json yarn.lock netlify.toml
elif [ "$SITE_NAME" == "pharos" ]
then
  git diff --quiet HEAD^ HEAD packages/pharos-site/ package.json yarn.lock netlify.toml
fi
