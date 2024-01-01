const supports_html5_storage = () => {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
};

class TempMemory {
  private cache: { [key: string]: string | undefined } = {};

  constructor() {
    this.cache = {};
  }
  setItem(cacheKey: string, data: string) {
    this.cache[cacheKey] = data;
  }
  getItem(cacheKey: string) {
    return this.cache[cacheKey];
  }
  removeItem(cacheKey: string) {
    this.cache[cacheKey] = undefined;
  }
}

export type TempMemoryType = TempMemory;

export const checkedLocalStorage = supports_html5_storage()
  ? window.localStorage
  : new TempMemory();

export const checkedSessionStorage = supports_html5_storage()
  ? window.sessionStorage
  : new TempMemory();
