export const CUSTOM_GEMINI_KEY_STORAGE = "duy_son_custom_gemini_api_key";

export function getCustomGeminiKey(): string {
  try {
    return localStorage.getItem(CUSTOM_GEMINI_KEY_STORAGE) || "";
  } catch (e) {
    return "";
  }
}

export function setCustomGeminiKey(key: string): void {
  try {
    if (key && key.trim()) {
      localStorage.setItem(CUSTOM_GEMINI_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(CUSTOM_GEMINI_KEY_STORAGE);
    }
  } catch (e) {}
}

export function getGeminiHeaders(): Record<string, string> {
  const customKey = getCustomGeminiKey();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (customKey) {
    headers["x-custom-api-key"] = customKey;
  }
  return headers;
}
