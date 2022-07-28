export const getStorageValue=(key, defaultValue)=> {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
}

export const setStorageValue=(key, defaultValue)=> {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
}