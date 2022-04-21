#!/bin/sh
set -e

BABEL=node_modules/.bin/babel

build() {
  echo "build: $1"
  $BABEL $1 --extensions ".ts" -d $2
}

# 示例：PACKAGE=queue
# `build "packages/queue/src" "packages/queue/lib"`
if [ "$PACKAGE" ]; then
  build "packages/${PACKAGE}/src" "packages/${PACKAGE}/lib"
  exit 0
fi


PACKAGE_PATH_LIST=packages/*

for PACKAGE_PATH in $PACKAGE_PATH_LIST; do
  build "${PACKAGE_PATH}/src" "${PACKAGE_PATH}/lib"
done

