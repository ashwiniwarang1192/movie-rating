#!/bin/sh

current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
log_dir=${current_dir}/logs


if [ ! -d "$log_dir" ]; then
  echo "Directory ${log_dir} does not exist. Trying to create..."
  mkdir -p ${log_dir}
fi

make kill-serve && make serve
