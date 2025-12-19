import { shimGetUserMedia as chromeShim } from "webrtc-adapter/src/js/chrome/getusermedia";
import { shimGetUserMedia as firefoxShim } from "webrtc-adapter/src/js/firefox/getusermedia";
import { shimGetUserMedia as safariShim } from "webrtc-adapter/src/js/safari/safari_shim";
import adapter from "webrtc-adapter";

import { StreamApiNotSupportedError } from "./errors";
import { indempotent } from "./util";

export default indempotent(() => {
  console.log("adapter.browserDetails.browser", adapter.browserDetails);
  switch (adapter.browserDetails.browser) {
    case "chrome":
      chromeShim(window, adapter.browserDetails);
      break;
    case "firefox":
      firefoxShim(window, adapter.browserDetails);
      break;
    case "safari":
      safariShim(window, adapter.browserDetails);
      break;
    case "edge":
      // Edge now uses Chromium, so use the same shim as Chrome
      chromeShim(window, adapter.browserDetails);
      break;
    default:
      throw new StreamApiNotSupportedError();
  }
});
