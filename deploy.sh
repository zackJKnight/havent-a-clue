#!.bin/bash

set -e

npm run build

rm -rf .git

git init
git add -A
git commit -m "React deploy"

git push -f git@github.com:zackjknight/haventaclue.git macbinary
cd -