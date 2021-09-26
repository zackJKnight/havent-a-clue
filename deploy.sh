#!/bin/bash

set -e

yarn build

cd build

rm -rf ./.git

echo 'haventaclue.co' > CNAME

git init
git add .
git commit -m "React deploy"

git push -f https://github.com/zackJKnight/haventaclue.git main
cd -
