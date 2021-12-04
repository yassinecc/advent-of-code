#!/bin/bash

DIRNAME=$(dirname $0)
SESSION_ID=$(<$DIRNAME/sessionId)

curl https://adventofcode.com/$1/day/$2/input -H "Cookie: session=$SESSION_ID" > $DIRNAME/$1/inputs/day$2.txt

