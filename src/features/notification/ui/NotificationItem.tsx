"use client";

import { motion } from "framer-motion";
import { Notification } from "../notifcationType";
import { useNotification } from "../NotificationContext";


export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const { remove } = useNotification();

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) {
          remove(notification.id);
        }
      }}
      whileTap={{ scale: 0.97 }}
      className={`
    w-72 px-4 py-3 rounded-xl shadow-lg text-white cursor-grab active:cursor-grabbing
    select-none
    ${
      notification.type === "success"
        ? "bg-green-500"
        : notification.type === "error"
          ? "bg-red-500"
          : "bg-gray-800"
    }
  `}
    >
      <p className="text-sm font-medium">{notification.message}</p>

      <div className="text-[10px] opacity-70 mt-1">swipe left to dismiss</div>
    </motion.div>
  );
}
