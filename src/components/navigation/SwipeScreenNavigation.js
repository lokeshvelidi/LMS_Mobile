import React, { useRef } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";

// These are the visible bottom-tab orders. Secondary stack screens are not
// included and therefore never participate in tab swiping.
const GROUPS = [
  ["AdminDashboard", "Cases", "Users", "Clients", "ReportsTab", "More"],
  ["ClerkDashboard", "ClerkClients", "ClerkCases", "ClerkSchedule", "ClerkProfile"],
  ["LawyerDashboard", "LawyerCases", "LawyerHearings", "LawyerPetitions", "LawyerProfile"],
  ["ClientDashboard", "ClientCases", "ClientTimeline", "ClientNotifications", "ClientProfile"],
];

const findDestination = (routeName, direction) => {
  const group = GROUPS.find((items) => items.includes(routeName));
  if (!group) return null;
  const index = group.indexOf(routeName) + direction;
  return index >= 0 && index < group.length ? group[index] : null;
};

const SwipeScreenNavigation = ({ navigation, route, children }) => {
  const { width } = useWindowDimensions();
  const offset = useRef(new Animated.Value(0)).current;
  const navigating = useRef(false);
  const responder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => (
      Math.abs(gesture.dx) > 24 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.25
    ),
    onPanResponderMove: (_, gesture) => {
      if (!navigating.current) offset.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      if (navigating.current) return;
      const destination = findDestination(route.name, gesture.dx < 0 ? 1 : -1);
      const committed = destination && Math.abs(gesture.dx) >= Math.max(80, width * 0.2);
      if (!committed) {
        Animated.spring(offset, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
        return;
      }

      // Switch before the dragged screen leaves the viewport. Navigating only
      // after an off-screen animation exposes the navigator background and
      // causes a white flash, especially on right swipes.
      navigating.current = true;
      offset.setValue(0);
      // The tab navigator owns the route transition. Do not run a second
      // destination animation here; that caused duplicate-looking swipes.
      navigation.navigate(destination);
      setTimeout(() => { navigating.current = false; }, 350);
    },
  })).current;

  return <Animated.View style={{ flex: 1, transform: [{ translateX: offset }] }} {...responder.panHandlers}>{children}</Animated.View>;
};

export const withSwipeNavigation = (ScreenComponent) => (props) => (
  <SwipeScreenNavigation {...props}>
    <ScreenComponent {...props} />
  </SwipeScreenNavigation>
);

export default SwipeScreenNavigation;
