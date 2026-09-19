import { NotificationType } from "@/features/notification/notifcationType";


type Listener = (message: string, type?: NotificationType) => void;

class AppEventBus {
  private listeners: Listener[] = [];

  emit(message: string, type: NotificationType = "info") {
    this.listeners.forEach((l) => l(message, type));
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const appEventBus = new AppEventBus();