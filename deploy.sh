#!/bin/bash

set -e

yarn build

cd build

rm -rf .git

git init
git add -A
git commit -m "React deploy"

git push -f git@github.com:zackjknight/haventaclue.git main
cd -