#!/bin/bash

rm -f caloriemash.xpi
rm -f caloriemash.zip

mkdir dist
rsync --exclude dist --exclude .DS_Store --exclude bower_components --exclude .idea --exclude .git --exclude .gitignore --exclude pullSupportedSites.sh --exclude sites.list --exclude *.sh -av . dist

#mv dist RecipeCalCalc
cd dist

zip -r caloriemash.zip *
cp caloriemash.zip ../caloriemash.zip

rm -f caloriemash.zip

sed -i.bak '/^}/d' manifest.json
echo ', "applications": { "gecko": { "id": "john@caloriemash.com"}}' >> manifest.json
echo '}' >> manifest.json

zip -r caloriemash.xpi *
mv caloriemash.xpi ../caloriemash.xpi

cd ../
#rm -rf dist
