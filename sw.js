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
define(['./workbox-5a5d9309'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "vp-icons.css",
    "revision": "b48bd2583e99520b89808afc6043b6bb"
  }, {
    "url": "simple-demo.html",
    "revision": "d2e0337bc830c36ac24089933500e897"
  }, {
    "url": "select-camera-demo.html",
    "revision": "caa12e13f97000bc06e565e64bb8bd0f"
  }, {
    "url": "registerSW.js",
    "revision": "7b7630fe27e73996a764aab8969094aa"
  }, {
    "url": "pwa-512x512.png",
    "revision": "bc06a5f2e6fe113524232428b00a9fb8"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d9633ad208ea0bc965a5a379ff30e357"
  }, {
    "url": "logo.png",
    "revision": "bc06a5f2e6fe113524232428b00a9fb8"
  }, {
    "url": "index.html",
    "revision": "8a3dd6ed9709c20839d6eedba511841e"
  }, {
    "url": "fullscreen.svg",
    "revision": "432c44f09de0b4e0f9e236fad9b8c7f9"
  }, {
    "url": "fullscreen-exit.svg",
    "revision": "77f8bddd41a7894d1a00324ed9dcb8f9"
  }, {
    "url": "flash-on.svg",
    "revision": "23580871877110ec5e7dcd41efdbd07b"
  }, {
    "url": "flash-off.svg",
    "revision": "8b05f5dcd6712992a544b34520ec7262"
  }, {
    "url": "debug-memory-leak.html",
    "revision": "baffbefe1bde1d10f0c089b20f0cb9ed"
  }, {
    "url": "checkmark.svg",
    "revision": "398fc16c5cbd6c20b529b76742c33942"
  }, {
    "url": "camera-switch.svg",
    "revision": "c966900237eef848d4aeb18b0ad64371"
  }, {
    "url": "barcode-detector-test.html",
    "revision": "c6ab43ddd912cedd13ceae46427c275d"
  }, {
    "url": "404.html",
    "revision": "033172bf21fc8d2f5774d5fad4a4b7d8"
  }, {
    "url": "demos/Validate.html",
    "revision": "ad84f2ec1b15e8ce61627d9ec2b2591b"
  }, {
    "url": "demos/Upload.html",
    "revision": "da63bae60107fb1b6f5ce52125cd4599"
  }, {
    "url": "demos/Torch.html",
    "revision": "1e142846cb8a805bb823b3777e378d45"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "9055721a29f0d8c869d97eec06d30d5e"
  }, {
    "url": "demos/Simple.html",
    "revision": "e2f1571b2f80ac3cf21f2c160318c9b7"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "1dd33351a9090a13b1711c2e35bba6d6"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "6ecc4e20ba009157569ddeddff3d1fd1"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "0a7c1e17eb535a88bea68e4dd488566d"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "fb4d228375717bdeb398403f355f803a"
  }, {
    "url": "demos/DragDrop.html",
    "revision": "58edc86ce406f71b0c38be296f50d830"
  }, {
    "url": "assets/style.BQkK1Qee.css",
    "revision": null
  }, {
    "url": "assets/inter-roman-vietnamese.BjW4sHH5.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin.Di8DUHzh.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin-ext.4ZJIpNVo.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek.BBVDIX6e.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek-ext.CqjqNYQ-.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic.C5lxZ8CY.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-vietnamese.BSbpV94h.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin.C2AdPX0b.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin-ext.CN1xVJS-.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek.DJ8dCoTZ.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek-ext.1u6EdAuj.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic.By2_1cv3.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic-ext.r48I6akx.woff2",
    "revision": null
  }, {
    "url": "assets/index.md.DErVBZfM.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.DErVBZfM.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CSYwiZCP.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CSYwiZCP.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CqcgkyDx.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CqcgkyDx.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CiQ2xEnM.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CiQ2xEnM.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.Baak3bk3.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.Baak3bk3.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.Bb7H3vBR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.Bb7H3vBR.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DRPr0tJ6.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DRPr0tJ6.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.duSur998.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.duSur998.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.B6MzhIkK.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.B6MzhIkK.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DjdDvIzj.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DjdDvIzj.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BpJdjCKR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BpJdjCKR.js",
    "revision": null
  }, {
    "url": "assets/app.C9QiLSn_.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.DzDKxWHv.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.DzDKxWHv.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Bijv-T76.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Bijv-T76.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.bz5rxo13.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.bz5rxo13.js",
    "revision": null
  }, {
    "url": "assets/chunks/utils.DdGZ3POZ.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.DyeqZkx8.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_shim.tcOtNX9D.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/index.Dd8E0tiC.js",
    "revision": null
  }, {
    "url": "assets/chunks/getusermedia.D7MBqdid.js",
    "revision": null
  }, {
    "url": "assets/chunks/getusermedia.D3hymGKc.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.CYp0bhgW.js",
    "revision": null
  }, {
    "url": "assets/chunks/adapter_core.CEti_sgG.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.DCxi9BCN.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.2CqXi0an.js",
    "revision": null
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "e746b88770536f30b0d175ad9de6b6ba"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "6cf57bde89034c8efca0f57e7ff69e64"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "52392a4ca2103d42c4229d458c0ffe81"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d9633ad208ea0bc965a5a379ff30e357"
  }, {
    "url": "pwa-512x512.png",
    "revision": "bc06a5f2e6fe113524232428b00a9fb8"
  }, {
    "url": "manifest.webmanifest",
    "revision": "c133ffde80822bf976a4541bba3ed42c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
