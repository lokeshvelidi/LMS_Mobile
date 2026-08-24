import React from "react";
import { StyleSheet, View } from "react-native";
import AppHeader from "../../layout/AppHeader";
export default function SettingsPageHeader({ title, children }) { return <><AppHeader title={title} showNotification={false} /><View style={styles.content}>{children}</View></>; }
const styles = StyleSheet.create({ content: { padding: 18 } });
