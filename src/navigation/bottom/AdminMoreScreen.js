import React from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import { SidebarMenuButton } from "../../components/navigation/RoleSidebar";
import { useAuth } from "../../context/AuthContext";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
  gold: "#E5B93F",
};

const AdminMoreScreen = ({
  navigation,
}) => {
  const { logout } = useAuth();
  const menuItems = [
    {
      id: "master",
      title: "Master Data",
      subtitle:
        "Manage courts, case types and practice areas",
      icon: "library-outline",
      route: "Master",
    },

    {
      id: "reports",
      title: "Reports",
      subtitle:
        "View case, hearing, payment and fee reports",
      icon: "bar-chart-outline",
      route: "Reports",
    },

    {
      id: "settings",
      title: "Settings",
      subtitle:
        "Manage application preferences",
      icon: "settings-outline",
      route: "Settings",
    },
  ];

  const handleNavigation = (
    route
  ) => {
    navigation.getParent()?.navigate(
      route
    );
  };

  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <AppHeader
          title="More"
          subtitle="Admin tools and application settings."
          showNotification={false}
          rightElement={<SidebarMenuButton role="admin" />}
        />

        <View style={styles.content}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                handleNavigation(
                  item.route
                )
              }
              style={({ pressed }) => [
                styles.card,
                pressed &&
                  styles.pressed,
              ]}
            >
              <View style={styles.icon}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={COLORS.navy}
                />
              </View>

              <View style={styles.cardContent}>
                <AppText
                  size="md"
                  weight="semiBold"
                >
                  {item.title}
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                  style={styles.subtitle}
                >
                  {item.subtitle}
                </AppText>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.secondary}
              />
            </Pressable>
          ))}

          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutCard,
              pressed &&
                styles.pressed,
            ]}
          >
            <View
              style={styles.logoutIcon}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#B6423E"
              />
            </View>

            <View
              style={styles.cardContent}
            >
              <AppText
                size="md"
                weight="semiBold"
                style={styles.logoutText}
              >
                Logout
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.subtitle}
              >
                Sign out of your account
              </AppText>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },

  content: {
    paddingHorizontal: 18,
  },

  card: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  subtitle: {
    marginTop: 4,
    lineHeight: 17,
  },

  logoutCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E7C8C5",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginTop: 8,
  },

  logoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F8E3E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutText: {
    color: "#B6423E",
  },
});

export default AdminMoreScreen;
