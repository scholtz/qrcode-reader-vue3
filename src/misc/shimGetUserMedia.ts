import { StreamApiNotSupportedError } from "./errors";
import { indempotent } from "./util";
type ShimModule = {
  shimGetUserMedia: (
    targetWindow: Window,
    browserDetails: { browser: string; version?: number }
  ) => void;
};

type AdapterModule = {
  browserDetails: { browser: string; version?: number };
};

const loadShimModules = async (): Promise<{
  adapter: AdapterModule;
  chromeShim: ShimModule["shimGetUserMedia"];
  firefoxShim: ShimModule["shimGetUserMedia"];
  safariShim: ShimModule["shimGetUserMedia"];
}> => {
  const [adapterModule, chromeModule, firefoxModule, safariModule] =
    await Promise.all([
      import("webrtc-adapter"),
      import("webrtc-adapter/src/js/chrome/getusermedia"),
      import("webrtc-adapter/src/js/firefox/getusermedia"),
      import("webrtc-adapter/src/js/safari/safari_shim"),
    ]);

  return {
    adapter: (adapterModule.default ?? adapterModule) as AdapterModule,
    chromeShim: chromeModule.shimGetUserMedia,
    firefoxShim: firefoxModule.shimGetUserMedia,
    safariShim: safariModule.shimGetUserMedia,
  };
};

export default indempotent(async () => {
  if (typeof window === "undefined") {
    return;
  }

  const { adapter, chromeShim, firefoxShim, safariShim } =
    await loadShimModules();

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
      chromeShim(window, adapter.browserDetails);
      break;
    default:
      throw new StreamApiNotSupportedError();
  }
});
