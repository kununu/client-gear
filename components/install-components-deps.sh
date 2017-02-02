#!/usr/bin/env bash

exclude=(
 "./node_modules"
)

for f in ./* ;
  do
    [ -d $f ] && [[ ! " ${exclude[*]}" =~ "$f" ]] && cd "$f" && echo Entering $f and installing npm deps && npm i
  done;

cd ..
