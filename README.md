tiny-compta
===========

Small node-webkit application with bootstrap &amp; jquery &amp; locallydb and mustache

## To get started:
```
bower install
npm install
cd app/
npm install
cd ..
grunt copy-vendor
nw app/
```
* note tha nw should be a symlink in your ~/bin directory pointing
to the node-webkit executable of your computer.

To be able to build for all platforms from the grunt tasks:
- Download the required node-webkit platform version
see [Node web kit downloads](https://github.com/rogerwang/node-webkit)
- ex : http://dl.node-webkit.org/v0.11.3/node-webkit-v0.xx-linux-ia32.tar.gz
should go into resources/node-webkit/Linux32

