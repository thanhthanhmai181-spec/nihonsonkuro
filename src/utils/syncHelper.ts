// Production-grade Storage & Sync Helper for Hoc Cung Thay Son
// Guarantees student progress is NEVER lost, overwritten, or reset.

const STATUS_RANK: Record<string, number> = {
  mastered: 4,
  learned: 3,
  learning: 2,
  not_learned: 1,
  new: 1
};

export function getStatusRank(status: any): number {
  if (typeof status !== "string") return 0;
  return STATUS_RANK[status.toLowerCase()] || 0;
}

/**
 * Deep merge two data values (Local and Cloud) prioritizing higher progression & scores.
 */
export function mergeDataValues(localVal: any, cloudVal: any): any {
  if (localVal === undefined || localVal === null) return cloudVal;
  if (cloudVal === undefined || cloudVal === null) return localVal;

  // Handle Primitives
  const typeLocal = typeof localVal;
  const typeCloud = typeof cloudVal;

  if (typeLocal === "number" && typeCloud === "number") {
    return Math.max(localVal, cloudVal);
  }

  if (typeLocal === "boolean" && typeCloud === "boolean") {
    return localVal || cloudVal;
  }

  if (typeLocal === "string" && typeCloud === "string") {
    const rankLocal = getStatusRank(localVal);
    const rankCloud = getStatusRank(cloudVal);

    if (rankLocal > 0 || rankCloud > 0) {
      return rankLocal >= rankCloud ? localVal : cloudVal;
    }

    // Check if numeric strings (e.g. "50" vs "20")
    const numLocal = Number(localVal);
    const numCloud = Number(cloudVal);
    if (!isNaN(numLocal) && !isNaN(numCloud) && localVal.trim() !== "" && cloudVal.trim() !== "") {
      return Math.max(numLocal, numCloud).toString();
    }

    // Prefer non-empty string or local
    return localVal || cloudVal;
  }

  // Detect corrupted status arrays like ["mastered"] or ["mastered", "learning"]
  const isCorruptedStatusArray = (val: any): boolean => {
    if (!Array.isArray(val) || val.length === 0) return false;
    const statusSet = new Set(["mastered", "learning", "not_learned", "new"]);
    return val.every(item => typeof item === "string" && statusSet.has(item.toLowerCase()));
  };

  // If one is a corrupted status array and the other is a valid progress object, discard the corrupt array!
  if (isCorruptedStatusArray(localVal) && cloudVal && typeof cloudVal === "object" && !Array.isArray(cloudVal)) {
    return cloudVal;
  }
  if (isCorruptedStatusArray(cloudVal) && localVal && typeof localVal === "object" && !Array.isArray(localVal)) {
    return localVal;
  }
  if (isCorruptedStatusArray(localVal) && isCorruptedStatusArray(cloudVal)) {
    return {};
  }

  // Check if an object is genuinely an array stored with sequential 0-indexed numeric keys
  const isGenuineArrayObject = (val: any): boolean => {
    if (!val || typeof val !== "object" || Array.isArray(val)) return false;
    const keys = Object.keys(val);
    if (keys.length === 0) return false;

    // Progress status map check: if values are statuses (like "mastered", "learning"), it is a map, NEVER an array!
    const statusSet = new Set(["mastered", "learning", "not_learned", "new"]);
    if (Object.values(val).some(v => typeof v === "string" && statusSet.has(v.toLowerCase()))) {
      return false;
    }

    // Must have strictly 0-indexed contiguous integer keys: "0", "1", ..., "N-1"
    for (let i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(val, String(i))) {
        return false;
      }
    }
    return true;
  };

  const normalizePotentialArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (isGenuineArrayObject(val)) {
      return Object.values(val);
    }
    return val;
  };

  const normLocal = normalizePotentialArray(localVal);
  const normCloud = normalizePotentialArray(cloudVal);

  // Handle Arrays
  if (Array.isArray(normLocal) && Array.isArray(normCloud)) {
    // If array contains primitives (strings, numbers)
    if (
      normLocal.every(x => typeof x !== "object") &&
      normCloud.every(x => typeof x !== "object")
    ) {
      return Array.from(new Set([...normLocal, ...normCloud]));
    }

    // SRS Tuple Arrays e.g. [interval, nextReview, efactor, repCount]
    if (
      normLocal.length === 4 && normCloud.length === 4 &&
      typeof normLocal[3] === "number" && typeof normCloud[3] === "number"
    ) {
      return normLocal[3] >= normCloud[3] ? normLocal : normCloud;
    }

    // Object arrays (e.g. test history)
    const combined = [...normLocal, ...normCloud];
    const seen = new Set<string>();
    const result: any[] = [];

    combined.forEach(item => {
      const key = item.id || item.word || item.date || item.timestamp || JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
      }
      result.push(item);
    });

    return result;
  }

  // If one is array and other is not (and not corrupted status array)
  if (Array.isArray(normLocal) && !isCorruptedStatusArray(normLocal)) return normLocal;
  if (Array.isArray(normCloud) && !isCorruptedStatusArray(normCloud)) return normCloud;

  // Handle Objects
  if (typeof localVal === "object" && typeof cloudVal === "object") {
    const mergedObj: Record<string, any> = {};
    const allKeys = new Set([...Object.keys(localVal), ...Object.keys(cloudVal)]);

    allKeys.forEach(k => {
      const l = localVal[k];
      const c = cloudVal[k];
      if (l !== undefined && c !== undefined) {
        mergedObj[k] = mergeDataValues(l, c);
      } else {
        mergedObj[k] = l !== undefined ? l : c;
      }
    });

    return mergedObj;
  }

  // Fallback: prefer local value
  return localVal;
}

/**
 * Smart merge function for a serialized JSON string from LocalStorage vs Cloud
 */
export function mergeStorageSerialized(localStr: string | null, cloudStr: string | null): string {
  if (!localStr) return cloudStr || "";
  if (!cloudStr) return localStr;

  try {
    const parsedLocal = JSON.parse(localStr);
    const parsedCloud = JSON.parse(cloudStr);

    const merged = mergeDataValues(parsedLocal, parsedCloud);
    return JSON.stringify(merged);
  } catch (e) {
    // If not JSON, check if numeric
    const numLocal = Number(localStr);
    const numCloud = Number(cloudStr);
    if (!isNaN(numLocal) && !isNaN(numCloud)) {
      return Math.max(numLocal, numCloud).toString();
    }
    return localStr || cloudStr;
  }
}
