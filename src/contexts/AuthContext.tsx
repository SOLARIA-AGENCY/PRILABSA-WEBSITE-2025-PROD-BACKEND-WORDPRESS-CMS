import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  username: string;
  name: string;
  role: 'admin' | 'editor';
  password?: string; // Optional in interface, but required for storage
}

interface AuditLog {
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  createUser: (userData: User) => boolean;
  updateUser: (username: string, data: Partial<User>) => boolean;
  deleteUser: (username: string) => boolean;
  loading: boolean;
  logs: AuditLog[];
  logAction: (action: string, details: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Default Credentials
  const DEFAULT_ADMIN: User = {
    username: 'ADMIN-PRILABSA',
    name: 'Administrador Principal',
    role: 'admin',
    password: 'webprilabsa2025' // Initial password
  };

  const STORAGE_KEY_LOGS = 'prilabsa_audit_logs';
  const STORAGE_KEY_USERS = 'prilabsa_users';
  const STORAGE_KEY_AUTH_USER = 'prilabsa_auth_user'; // Store current user username

  useEffect(() => {
    // 1. Load Users or seed default
    let currentUsers: User[] = [];
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      if (savedUsers) {
        currentUsers = JSON.parse(savedUsers);
      } else {
        currentUsers = [DEFAULT_ADMIN];
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(currentUsers));
      }
      setUsers(currentUsers);
    } catch {
      currentUsers = [DEFAULT_ADMIN];
      setUsers(currentUsers);
    }

    // 2. Check Session
    const savedAuth = localStorage.getItem('prilabsa_auth');
    const savedUsername = localStorage.getItem(STORAGE_KEY_AUTH_USER);

    if (savedAuth === 'true' && savedUsername) {
      const foundUser = currentUsers.find(u => u.username === savedUsername);
      if (foundUser) {
        setIsAuthenticated(true);
        setUser(foundUser);
      } else {
        // Invalid session due to user deletion
        logout();
      }
    } else if (savedAuth === 'true') {
      // Legacy session support (if upgrading from previous version)
      setIsAuthenticated(true);
      setUser(DEFAULT_ADMIN);
    }

    // 3. Load Logs
    try {
      const savedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch {
      // Ignore
    }

    setLoading(false);
  }, []);

  const saveLog = (newLog: AuditLog) => {
    setLogs(prev => {
      const updated = [newLog, ...prev].slice(0, 100);
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
      return updated;
    });
  };

  const logAction = (action: string, details: string) => {
    if (!user) return;
    saveLog({
      timestamp: new Date().toISOString(),
      user: user.username,
      action,
      details
    });
  };

  // --- User Management Methods ---

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(newUsers));
  };

  const createUser = (userData: User): boolean => {
    if (users.some(u => u.username === userData.username)) {
      return false; // User exists
    }
    const newUsers = [...users, userData];
    saveUsers(newUsers);
    logAction('CREATE_USER', `Usuario creado: ${userData.username} (${userData.role})`);
    return true;
  };

  const updateUser = (username: string, data: Partial<User>): boolean => {
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) return false;

    const updatedUsers = [...users];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...data };
    saveUsers(updatedUsers);

    // Update current user if it's self-update
    if (user?.username === username) {
      setUser(updatedUsers[userIndex]);
    }

    logAction('UPDATE_USER', `Usuario actualizado: ${username}`);
    return true;
  };

  const deleteUser = (username: string): boolean => {
    if (username === DEFAULT_ADMIN.username) return false; // Cannot delete main admin

    const newUsers = users.filter(u => u.username !== username);
    saveUsers(newUsers);
    logAction('DELETE_USER', `Usuario eliminado: ${username}`);
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem('prilabsa_auth', 'true');
      localStorage.setItem(STORAGE_KEY_AUTH_USER, foundUser.username);

      saveLog({
        timestamp: new Date().toISOString(),
        user: foundUser.username,
        action: 'LOGIN',
        details: 'Inicio de sesión exitoso'
      });

      return true;
    }
    return false;
  };

  const logout = () => {
    if (user) {
      logAction('LOGOUT', 'Cierre de sesión');
    }
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('prilabsa_auth');
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  };

  const value = {
    isAuthenticated,
    user,
    users,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    loading,
    logs,
    logAction
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};