"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

import { Notification, NotificationType } from "./notifcationType";
import { appEventBus } from "@/lib/appEventBus";

type Ctx = {
  notifications: Notification[];
  show: (message: string, type?: Notification["type"]) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const NotificationContext = createContext<Ctx | null>(null);

const MAX_VISIBLE = 4;

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const queueRef = useRef<Notification[]>([]);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const processQueue = useCallback(() => {
    setNotifications((prev) => {
      if (prev.length >= MAX_VISIBLE) return prev;

      const next = queueRef.current.shift();
      if (!next) return prev;

      return [...prev, next];
    });
  }, []);

  useEffect(() => {
    if (queueRef.current.length === 0) return;
    if (notifications.length >= MAX_VISIBLE) return;

    const id = setTimeout(processQueue, 100);
    return () => clearTimeout(id);
  }, [notifications, processQueue]);

  const show = useCallback(
    (message: string, type: Notification["type"] = "info") => {
      const id = crypto.randomUUID();

      const notif: Notification = {
        id,
        message,
        type,
        duration: 3000, // default 2s as requested
      };

      queueRef.current.push(notif);

      setTimeout(processQueue, 0);

      // auto remove after duration
      setTimeout(() => {
        remove(id);
      }, notif.duration);
    },
    [processQueue, remove],
  );

  const clear = useCallback(() => {
    setNotifications([]);
    queueRef.current = [];
  }, []);

  // 🔥 CONNECT EVENT BUS
  useEffect(() => {
    const unsub = appEventBus.subscribe(
      (message: string, type?: NotificationType) => {
        show(message, type ?? "info");
      },
    );
    return unsub;
  }, [show]);

  return (
    <NotificationContext.Provider
      value={{ notifications, show, remove, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside provider");
  return ctx;
}
