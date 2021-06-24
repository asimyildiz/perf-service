#!/bin/bash

export RUNDIR="/usr/src/perf-service"

cd $RUNDIR

./node_modules/.bin/forever start -c "node_modules/.bin/ts-node ./src/index.ts" ./
./node_modules/.bin/forever --fifo logs 0