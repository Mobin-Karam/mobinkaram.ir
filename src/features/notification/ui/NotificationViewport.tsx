"use client";

import { motion, AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { useState } from "react";
import { useNotification } from "../NotificationContext";

export default function NotificationViewport() {
  const { notifications } = useNotification();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed top-4 left-4 z-9999 w-80"
      onClick={() => setExpanded((v) => !v)}
    >
      <AnimatePresence>
        {notifications.map((n, index) => {
          const isCollapsed = !expanded;

          return (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: isCollapsed ? index * 8 : index * 80,
                scale: isCollapsed ? 1 - index * 0.05 : 1,
                zIndex: 9999 - index,
              }}
              exit={{ opacity: 0, x: -120, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="absolute left-0"
              style={{
                top: 0,
              }}
            >
              <NotificationItem notification={n} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
