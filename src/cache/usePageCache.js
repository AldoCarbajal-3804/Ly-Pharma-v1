import { useRef, useCallback } from "react";

export function usePageCache() {
    const cache = useRef(new Map());

    const get = useCallback((page) => cache.current.get(page), []);

    const set = useCallback((page, data) => cache.current.set(page, data), []);

    const has = useCallback((page) => cache.current.has(page), []);

    return { get, set, has };
}
