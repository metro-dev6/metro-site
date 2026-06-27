"use client";

import { useState, useCallback, useEffect } from "react";

export interface EstimateItem {
  name: string;
  price: number;
  type: "package" | "addon";
}

const STORAGE_KEY = "metro-estimate-cart";
const CART_EVENT = "metro-cart-update";

function readStorage(): EstimateItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: EstimateItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CART_EVENT));
  } catch {}
}

export function useEstimateCart() {
  const [items, setItems] = useState<EstimateItem[]>([]);

  useEffect(() => {
    setItems(readStorage());

    function sync() {
      setItems(readStorage());
    }

    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  const toggle = useCallback((item: EstimateItem) => {
    const current = readStorage();
    const exists = current.some((i) => i.name === item.name);
    let next: EstimateItem[];
    if (exists) {
      next = current.filter((i) => i.name !== item.name);
    } else if (item.type === "package") {
      next = [...current.filter((i) => i.type !== "package"), item];
    } else {
      next = [...current, item];
    }
    writeStorage(next);
    setItems(next);
  }, []);

  const remove = useCallback((name: string) => {
    const current = readStorage();
    const next = current.filter((i) => i.name !== name);
    writeStorage(next);
    setItems(next);
  }, []);

  const has = useCallback(
    (name: string) => items.some((i) => i.name === name),
    [items]
  );

  const clear = useCallback(() => {
    writeStorage([]);
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return { items, has, toggle, remove, clear, total };
}
