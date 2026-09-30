export type NotificationType = "success" | "error" | "info";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  priority?: number; // optional future use
  
};