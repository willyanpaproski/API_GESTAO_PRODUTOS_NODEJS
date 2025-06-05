import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "info") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }

    return (
        <NotificationContext.Provider value={{ addNotification }}>
        {children}
        <div style={styles.container}>
            {notifications.map((n) => (
            <div key={n.id} style={{ ...styles.notification, ...styles[n.type] }}>
                {n.message}
            </div>
            ))}
        </div>
        </NotificationContext.Provider>
    );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    zIndex: 1000,
  },
  notification: {
    padding: "1rem",
    borderRadius: "0.5rem",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    minWidth: "200px",
  },
  info: { backgroundColor: "#2196f3" },
  success: { backgroundColor: "#4caf50" },
  error: { backgroundColor: "#f44336" },
  warning: { backgroundColor: "#ff9800" },
};