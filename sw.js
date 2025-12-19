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
    "revision": "5e0a4893ebdd02af95cf73c7b7759ddd"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05431c417219f6c247a23488366a2b41"
  }, {
    "url": "logo.png",
    "revision": "5f0c1d6358641bc48207acb9fa0b6182"
  }, {
    "url": "index.html",
    "revision": "12edcb3c3dcab3b998aa914db7e549f3"
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
    "revision": "a78b145aba6bd8622fa69c6f287cea90"
  }, {
    "url": "demos/Validate.html",
    "revision": "bcc5249d0d29381bdb76941eb4dd22b3"
  }, {
    "url": "demos/Upload.html",
    "revision": "a19396da5c77870f2b73a29fa53c4ee5"
  }, {
    "url": "demos/Torch.html",
    "revision": "5c9c4801d3727ad78aeff50110b80234"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "0dc8a4b996360c355f06fa787024ef44"
  }, {
    "url": "demos/Simple.html",
    "revision": "2b36fd833070cb181004131fe1411674"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "f758c0d3adc0282a968bdd5dfe3cd338"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "fb2e0c64cbaab593a75d2c75a9cba328"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "3831f9c851b62bbb6648d6beb765d608"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "e871ff6a94b56c0435ddb1be1f4d5b56"
  }, {
    "url": "demos/DragDrop.html",
    "revision": "d23592c9c6b2ed53265beabae7277045"
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
    "url": "assets/index.md.DiejxtqP.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.DiejxtqP.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.j3tIfqUl.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.j3tIfqUl.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CuQQeJeo.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CuQQeJeo.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.8bpab08V.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.8bpab08V.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BXWcrDyn.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BXWcrDyn.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.B-Ssvwpu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.B-Ssvwpu.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BNfFjfeh.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BNfFjfeh.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BGPso0B5.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BGPso0B5.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.gHI6ocYW.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.gHI6ocYW.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.OeFGETF_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.OeFGETF_.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BFY4cOOj.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BFY4cOOj.js",
    "revision": null
  }, {
    "url": "assets/app.BU4VPeHP.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.B0H-Wjq1.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.B0H-Wjq1.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.COatx7kA.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.COatx7kA.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.DW4W_iYB.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.DW4W_iYB.js",
    "revision": null
  }, {
    "url": "assets/chunks/utils.DdGZ3POZ.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.BQoxLs0V.js",
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
    "url": "assets/chunks/VPLocalSearchBox._yz6i-Vs.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.Cs_l-hc1.js",
    "revision": null
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "9c864de6e899c4abee560a41e0f8af65"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "1f942aa7de99e5691b10ef217814b91d"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "b21e2e0540c549bf440d1018de058b43"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05431c417219f6c247a23488366a2b41"
  }, {
    "url": "pwa-512x512.png",
    "revision": "5e0a4893ebdd02af95cf73c7b7759ddd"
  }, {
    "url": "manifest.webmanifest",
    "revision": "c133ffde80822bf976a4541bba3ed42c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
