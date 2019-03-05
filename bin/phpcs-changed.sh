#!/bin/bash

FILES=$(git ls-files -om --exclude-standard);
if [ ! -z "$FILES" ]; then
	phpcs $FILES
fi