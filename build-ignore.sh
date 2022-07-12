#!/bin/bash

echo "Checking for files changed between $CACHED_COMMIT_REF and $COMMIT_REF..."

if [ "$SITE_NAME" == "pharos-storybooks" ]
then
  git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF packages/pharos/ .storybook/ package.json yarn.lock netlify.toml
elif [ "$SITE_NAME" == "pharos" ]
then
  git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF packages/pharos-site/ package.json yarn.lock netlify.toml
fi
