#!/bin/sh
set -e

# 支持环境变量
# TEST_DEBUG: 断点调试模式
# CI
# TEST_MATCH

node="yarn node"
jestArgs=""

if [ "$TEST_DEBUG" ]; then
  node="$node --inspect-brk"
  jestArgs="$jestArgs --runInBand"
fi

if [ -n "$CI" ]; then
  jestArgs="$jestArgs --maxWorkers=4"
  jestArgs="$jestArgs --ci"
fi


if [ "$PACKAGE" ]; then
  jestArgs="$jestArgs packages/${PACKAGE}/test"
else
  jestArgs="$jestArgs packages/*/test"
fi

$node $(yarn bin jest) $jestArgs
