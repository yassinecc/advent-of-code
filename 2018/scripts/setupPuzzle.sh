#!/bin/bash

SESSION_ID=$(<./sessionId)

curl https://adventofcode.com/2018/day/$1/input -H "Cookie: session=$SESSION_ID" > ./inputs/day$1.txt

yarn plop 'new day' $1
