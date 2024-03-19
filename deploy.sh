#!/bin/bash

set -e

yarn build

cd dist

rm -rf ./.git

echo 'clue.zackknight.dev' > CNAME

git init
git add .
git commit -m "React deploy"

git push -f https://github.com/zackJKnight/haventaclue.git main
cd -
