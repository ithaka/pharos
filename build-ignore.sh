#!/bin/bash

echo "Checking for files changed between $CACHED_COMMIT_REF and $COMMIT_REF..."

# Build if the compared commits are identical
if [ "$CACHED_COMMIT_REF" == "$COMMIT_REF" ]; then
  exit 1
fi

if [ "$SITE_NAME" == "pharos-storybooks" ]
then
  git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF packages/pharos/ .storybook/ package.json yarn.lock netlify.toml
elif [ "$SITE_NAME" == "pharos" ]
then
  git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF packages/pharos-site/ package.json yarn.lock netlify.toml
fi
