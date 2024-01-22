export const isStorageNotAvailable = (
  type: "localStorage" | "sessionStorage"
) => {
  let storage;

  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return false;
  } catch (e) {
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
    if (e instanceof DOMException) {
      if (e.code === 22) {
        return "error code - 22";
      } else if (e.code === 1014) {
        return "error code - 1014";
      } else if (e.name === "QuotaExceededError") {
        return "error name - QuotaExceededError";
      } else if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
        return "error name - NS_ERROR_DOM_QUOTA_REACHED";
      }
    }

    return true;
  }
};

export const checkedLocalStorage = {
  getItem: <T>(key: string, defaultValue: T) => {
    const jsonValue = localStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`There is a problem with the storage space. ${error.message}`);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
} as const;

export const checkedSessionStorage = {
  getItem: <T>(key: string, defaultValue: T) => {
    const jsonValue = sessionStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`There is a problem with the storage space. ${error.message}`);
      sessionStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T>(key: string, value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
} as const;

export type CheckedLocalStorageType = typeof checkedLocalStorage;

export type CheckedSessionStorageType = typeof checkedSessionStorage;
