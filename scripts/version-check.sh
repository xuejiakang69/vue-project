#!/bin/bash

compare_version(){

    if [ "$1" = "$2" ]; then
        return 1
    fi


    if [ "$(printf '%s\n' "$1" "$2" | sort -V | head -n1)" = "$1" ]; then
        return 0
    else
        return 1
    fi

}