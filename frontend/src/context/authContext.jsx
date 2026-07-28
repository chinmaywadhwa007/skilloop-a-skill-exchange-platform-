import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  clearSession,
  fetchCurrentUser,
  loginUser,
  registerUser,
} from "../services/auth_service";
import { TOKEN_KEY } from "../services/api";
import { hasAtLeastRole } from "../utils/helpers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("currentUser")) || null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

    const persist = useCallback((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
    }, []);

    useEffect(() => {
        if (!localStorage.getItem(TOKEN_KEY)) return;
        fetchCurrentUser()
            .then(persist)
            .catch(() => {
                clearSession();
                setCurrentUser(null);
            })
            .finally(() => setLoading(false));
    }, [persist]);

    const login = useCallback(
        async (credentials) => {
            const { user } = await loginUser(credentials);
            persist(user);
            return user;
        },
        [persist]
    );

    const register = useCallback(
        async (payload) => {
            const { user } = await registerUser(payload);
            persist(user);
            return user;
        },
        [persist]
    );

    const logout = useCallback(() => {
        clearSession();
        setCurrentUser(null);
    }, []);

    const value = useMemo(
        () => ({
            currentUser,
            loading,
            login,
            register,
            logout,
            refreshUser: () => fetchCurrentUser().then(persist),
            hasRole: (minimum) => hasAtLeastRole(currentUser?.role, minimum),
        }),
        [currentUser, loading, login, register, logout, persist]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
