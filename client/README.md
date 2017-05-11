# Google Next Tokyo 2017 demo application

## Development

Clone project.

```
$ git clone git://github.com/groovenauts/LocMoc.git
$ cd LocMoc/client
```

Setup server.

```
$ ruby -run -e httpd -- --bind=0.0.0.0 --port=8080
[2017-05-09 15:45:56] INFO  WEBrick 1.3.1
[2017-05-09 15:45:56] INFO  ruby 2.3.3 (2016-11-21) [x86_64-linux]
[2017-05-09 15:45:56] INFO  WEBrick::HTTPServer#start: pid=4421 port=8080

```

Setup JavaScript bundle file.

```
$ npm install -g webpack yarn
$ yarn install
$ webpack -w --progress

```

See `http://localhost:8080` on your browser.
