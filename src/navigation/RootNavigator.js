import React, { useEffect } from "react";

import AuthNavigator from "./AuthNavigator";
import AdminNavigator from "./admin/AdminNavigator";
import LawyerNavigator from "./lawyer/LawyerNavigator";
import ClerkNavigator from "./clerk/ClerkNavigator";
import ClientNavigator from "./client/ClientNavigator";
import AppLoader from "../components/common/AppLoader";
import { useAuth } from "../context/AuthContext";

const RootNavigator = () => {
  const { isAuthenticated, isLoading, role, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !["admin", "lawyer", "clerk", "client"].includes(role)) {
      logout();
    }
  }, [isAuthenticated, logout, role]);

  if (isLoading) {
    return <AppLoader fullScreen />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  switch (role) {
    case "admin":
      return <AdminNavigator />;

    case "lawyer":
      return <LawyerNavigator />;

    case "clerk":
      return <ClerkNavigator />;

    case "client":
      return <ClientNavigator />;

    default:
      return <AuthNavigator />;
  }
};

export default RootNavigator;
