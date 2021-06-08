#!/bin/bash

[ "$SITE_NAME" == "pharos-storybooks" ] && git diff --quiet HEAD^ HEAD packages/pharos/ .storybook/ package.json yarn.lock netlify.toml || [ "$SITE_NAME" == "pharos" ] && git diff --quiet HEAD^ HEAD packages/pharos-site/ package.json yarn.lock netlify.toml
