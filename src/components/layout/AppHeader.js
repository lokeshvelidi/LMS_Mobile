import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";
import { useRoute } from "@react-navigation/native";
import { SidebarMenuButton } from "../navigation/RoleSidebar";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  gold: "#E5B93F",
};

const AppHeader = ({
  title,
  subtitle,
  rightElement,
  compact = false,
}) => {
  const route = useRoute();
  const sidebarRoles = {
    AdminDashboard: "admin", Cases: "admin", Clients: "admin", Users: "admin", Reports: "admin", More: "admin", Hearings: "admin", Courts: "admin", Settings: "admin",
    ClerkDashboard: "clerk", ClerkClients: "clerk", ClerkCases: "clerk", ClerkSchedule: "clerk", ClerkProfile: "clerk", ClerkDocuments: "clerk", ClerkReports: "clerk", ClerkPaymentDesk: "clerk", ClerkHearingCalendar: "clerk",
    LawyerDashboard: "lawyer", LawyerCases: "lawyer", LawyerHearings: "lawyer", LawyerPetitions: "lawyer", LawyerProfile: "lawyer", LawyerDocuments: "lawyer",
    ClientDashboard: "client", ClientCases: "client", ClientTimeline: "client", ClientNotifications: "client", ClientProfile: "client", ClientDocuments: "client", ClientBilling: "client", ClientHearingSchedule: "client", ClientClosedCases: "client",
  };
  const sidebar = !rightElement && sidebarRoles[route.name] ? <SidebarMenuButton role={sidebarRoles[route.name]} /> : rightElement;
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <View style={styles.titleRow}>
        <View style={styles.titleIndicator} />

        <AppText
          size="xl"
          weight="bold"
        >
          {title}
        </AppText>
        <View style={styles.spacer} />
        {sidebar}
      </View>

      {subtitle ? (
        <AppText
          size="sm"
          color="textSecondary"
          style={styles.subtitle}
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleIndicator: {
    width: 5,
    height: 28,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    marginRight: 10,
  },

  subtitle: {
    marginTop: 7,
    paddingLeft: 15,
  },
  spacer: { flex: 1 },
  compact: { marginTop: 8, paddingTop: 8, paddingBottom: 12 },
});

export default AppHeader;
