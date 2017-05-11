# Google Next Tokyo 2017 demo application

## Development

Clone project.

```
$ git clone git://github.com/groovenauts/LocMoc.git
$ cd LocMoc/client
```

Setup Google Client ID

Open `./src/core/google/js`

```
diff --git a/client/src/core/google.js b/client/src/core/google.js
index 7e59ee6..8186a27 100644
--- a/client/src/core/google.js
+++ b/client/src/core/google.js
@@ -8,7 +8,7 @@ import { fn } from './util/function';
  * @const
  * @type {string}
  */
-export const $GOOGLE_CLIENT_ID = "ここにクライアントIDを埋め込む";
+export const $GOOGLE_CLIENT_ID = "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";

 /**
  * Scope for API```

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
