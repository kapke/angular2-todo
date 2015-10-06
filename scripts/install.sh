#!/bin/sh

npm install -g http-server typescript jspm node-sass
tsd install
jspm install

sudo DEBIAN_FRONTEND=noninteractive apt-get -y install tmux gem ruby ruby-dev tmux
sudo gem install tmuxinator

mkdir ~/.tmuxinator
path=`pwd`
sed "s,projectPath,$path,g" ./scripts/angular2-todo.yml > ~/.tmuxinator/angular2-todo.yml
