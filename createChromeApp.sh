#!/bin/bash

rm -f feastmachine.xpi
rm -f feastmachine.zip

mkdir dist
rsync --exclude dist --exclude .DS_Store --exclude bower_components --exclude .idea --exclude .git --exclude .gitignore --exclude pullSupportedSites.sh --exclude sites.list --exclude *.sh -av . dist

#mv dist RecipeCalCalc
cd dist

zip -r caloriemash.zip *
cp caloriemash.zip ../caloriemash.zip

rm -f caloriemash.zip

sed -i.bak '/^}/d' manifest.json
echo ', "applications": { "gecko": { "id": "john@feastmachine.com"}}' >> manifest.json
echo '}' >> manifest.json

zip -r feastmachine.xpi *
mv feastmachine.xpi ../feastmachine.xpi

cd ../
rm -rf dist
