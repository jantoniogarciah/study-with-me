/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "15501843e927d8b1906b816f0492fb4a"
  }, {
    "url": "pwa-512x512.png",
    "revision": "cacfe977b7b51cf4f13192e93333b402"
  }, {
    "url": "pwa-192x192.png",
    "revision": "7d3e87176b1d1ee7a2199464f636a3f4"
  }, {
    "url": "maskable-512x512.png",
    "revision": "d8f459d40bc962c82c707e52f53482fd"
  }, {
    "url": "index.html",
    "revision": "3c5276266a13062550befa0afcc7b23d"
  }, {
    "url": "favicon.png",
    "revision": "e7fcec8b042a9e46888ea0ae0a29c648"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a910ab0e6a2d9ff342835fefb7e5f147"
  }, {
    "url": "assets/index-TJYiMRKx.js",
    "revision": null
  }, {
    "url": "assets/index-BYtH8WAv.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a910ab0e6a2d9ff342835fefb7e5f147"
  }, {
    "url": "favicon.png",
    "revision": "e7fcec8b042a9e46888ea0ae0a29c648"
  }, {
    "url": "maskable-512x512.png",
    "revision": "d8f459d40bc962c82c707e52f53482fd"
  }, {
    "url": "pwa-192x192.png",
    "revision": "7d3e87176b1d1ee7a2199464f636a3f4"
  }, {
    "url": "pwa-512x512.png",
    "revision": "cacfe977b7b51cf4f13192e93333b402"
  }, {
    "url": "manifest.webmanifest",
    "revision": "233e23b0067085e1486d37151314faff"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(({
    url
  }) => url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com", new workbox.CacheFirst({
    "cacheName": "fonts",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 31104000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    url,
    request
  }) => request.destination === "image" && (url.hostname === "api.openverse.org" || url.hostname.endsWith("wikimedia.org") || url.hostname.endsWith("staticflickr.com")), new workbox.CacheFirst({
    "cacheName": "word-pictures",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 1500,
      maxAgeSeconds: 15552000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
