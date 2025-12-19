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
    "revision": "8d8fb4d4198e094facffdd7df2e254f6"
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
    "revision": "cba7591297d197b78e8c8d72330c6fd1"
  }, {
    "url": "demos/Validate.html",
    "revision": "8f7535d4b220ce0c2dcf12e5495eda70"
  }, {
    "url": "demos/Upload.html",
    "revision": "3a21178315d396f933b2230e84dda6e9"
  }, {
    "url": "demos/Torch.html",
    "revision": "f7d4483cac57cca081c3931786bfc657"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "2ee4a6b387de291fa306641674c5de03"
  }, {
    "url": "demos/Simple.html",
    "revision": "b0c2bbcda63faab21149322f8c2b6de4"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "e85ff4a6a07e27de701d46a3f10f0c7c"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "51f6aafff168bcfa026859159a3e63d3"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "bce7282c4ebcb9eff0181d2eeeb3304b"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "0e83dcbfbae7749c003a568330ebcf3f"
  }, {
    "url": "demos/DragDrop.html",
    "revision": "d2746eb59224fdb1f8b4af4040d0bd9f"
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
    "url": "assets/index.md.BAf4NcoH.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.BAf4NcoH.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CvmknI0F.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CvmknI0F.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DhqzXupi.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DhqzXupi.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.28mX4N_2.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.28mX4N_2.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BHBhGLoO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BHBhGLoO.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.Dyp0-B2x.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.Dyp0-B2x.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.4ze0Uflt.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.4ze0Uflt.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.DgRzqgZp.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.DgRzqgZp.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.C1H6H1Fs.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.C1H6H1Fs.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.C5IXNxTN.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.C5IXNxTN.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BmUK1NkB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BmUK1NkB.js",
    "revision": null
  }, {
    "url": "assets/app.D7fqhhtx.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.BKcDUWL3.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.BKcDUWL3.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.BEGcq3yn.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.BEGcq3yn.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.DO-NKVJ0.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.DO-NKVJ0.js",
    "revision": null
  }, {
    "url": "assets/chunks/utils.DdGZ3POZ.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.Cm8J_bSu.js",
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
    "url": "assets/chunks/VPLocalSearchBox.CVnVSXux.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.D6nkklN0.js",
    "revision": null
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "5cf0084a1b962de12d46cf686aec0119"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "69a1730f9e148833dc674a0e9e6e960c"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "bc4a3d3d62aa0969496f911bb46c4160"
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
