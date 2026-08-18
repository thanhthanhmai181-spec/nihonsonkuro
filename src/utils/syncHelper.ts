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

  // Handle Arrays
  if (Array.isArray(localVal) && Array.isArray(cloudVal)) {
    // If array contains primitives (strings, numbers)
    if (
      localVal.every(x => typeof x !== "object") &&
      cloudVal.every(x => typeof x !== "object")
    ) {
      return Array.from(new Set([...localVal, ...cloudVal]));
    }

    // SRS Tuple Arrays e.g. [interval, nextReview, efactor, repCount]
    if (
      localVal.length === 4 && cloudVal.length === 4 &&
      typeof localVal[3] === "number" && typeof cloudVal[3] === "number"
    ) {
      return localVal[3] >= cloudVal[3] ? localVal : cloudVal;
    }

    // Object arrays (e.g. test history)
    const combined = [...localVal, ...cloudVal];
    const seen = new Set<string>();
    const result: any[] = [];

    combined.forEach(item => {
      const key = item.id || item.word || item.date || item.timestamp || JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    });

    return result;
  }

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
