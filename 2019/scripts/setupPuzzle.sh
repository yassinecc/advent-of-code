#!/bin/bash

SESSION_ID=$(<../sessionId)

curl https://adventofcode.com/2019/day/$1/input -H "Cookie: session=$SESSION_ID" > ./inputs/day$1.txt

