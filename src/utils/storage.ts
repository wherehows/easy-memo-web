export const isStorageAvailable = (type: "localStorage" | "sessionStorage") => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
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
