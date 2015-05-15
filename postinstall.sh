#!/bin/bash
# This script copiesfront-end JS files from node_modules to www/js

SRCFLDR=./node_modules
DEPFLDR=./node_modules/backbone.marionette/node_modules

cp $SRCFLDR/underscore/*min.js ./www/js
cp $SRCFLDR/backbone.marionette/lib/backbone.marionette.min.* ./www/js
cp $DEPFLDR/backbone/backbone-min.* ./www/js


