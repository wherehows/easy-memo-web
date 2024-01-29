declare global {
  interface Window {
    platform?: "ios" | "android";
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
  }
}

export {};
