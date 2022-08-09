type StorageKey = 'token';

const TOKEN_SCHEMA_VERSION = 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStorage(_key: StorageKey) {
  return localStorage;
}

function getCacheKeySchema(storageKey: StorageKey) {
  switch (storageKey) {
    case 'token':
      return TOKEN_SCHEMA_VERSION;

    default:
      throw new Error('Invalid storage key');
  }
}

function getStorageName(storageKey: StorageKey) {
  return `${storageKey}_${getCacheKeySchema(storageKey)}`;
}

export async function removefromStorage(key: StorageKey) {
  try {
    await getStorage(key).removeItem(getStorageName(key));
  } catch (error) {
    console.error(`Error clearing ${key} cache`, error);
  }
}

export async function clearCache() {
  try {
    await removefromStorage('token');
  } catch (error) {
    console.error('Error clearing cache', error);
  }
}

export async function getFromStorage<CacheType = any>(key: StorageKey) {
  try {
    const cacheString = await getStorage(key).getItem(getStorageName(key));
    if (cacheString) {
      try {
        return JSON.parse(cacheString) as CacheType;
      } catch (error) {
        console.error('Error parsing API cache JSON', { key, error });
      }
    }
  } catch (error) {
    console.error('Error fetching API cache', { key, error });
  }

  return false;
}

export async function saveToStorage(key: StorageKey, value: object) {
  try {
    const cacheString = JSON.stringify(value);
    if (!cacheString) {
      console.warn('Failed to save API cache', { key });
      return false;
    }
    await getStorage(key).setItem(getStorageName(key), cacheString);
    return true;
  } catch (error) {
    console.error('Error saving API cache', { key, error });
    return false;
  }
}
