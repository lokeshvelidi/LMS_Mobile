import React, {createContext, useContext} from "react";
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ClientSelect from "./ClientSelect";

const FormContext = createContext(null);
const tokens = value => String(value || "").toLowerCase();
const allowedStyleKeys = /^(align|aspectRatio|backgroundColor|border|bottom|color|elevation|flex|font|gap|height|justify|left|letterSpacing|lineHeight|margin|max|min|opacity|overflow|padding|position|right|shadow|textAlign|textDecoration|textTransform|top|width|zIndex)/;
const safeStyle = value => {
  if (Array.isArray(value)) return value.map(safeStyle);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value)
    .filter(([key, item]) => allowedStyleKeys.test(key) && key !== "border" && !(typeof item === "string" && /^(calc|linear-gradient|conic-gradient)\(/.test(item)))
    .map(([key, item]) => [key, key === "position" && !["absolute", "relative", "static"].includes(item) ? "relative" : typeof item === "string" && /^-?\d+(\.\d+)?px$/.test(item) ? Number.parseFloat(item) : item]));
};

const boxStyle = name => {
  const n = tokens(name);
  const result = [];
  if (n.includes("card") || n.includes("section") || n.includes("panel")) result.push(styles.card);
  if (n.includes("header") || n.includes("top") || n.includes("row") || n.includes("actions")) result.push(styles.row);
  if (n.includes("filter")) result.push(styles.filterRow);
  if (n.includes("grid") || n.includes("list")) result.push(styles.grid);
  if (n.includes("info-box") || n.includes("summary-item")) result.push(styles.infoBox);
  if (n.includes("badge") || n.includes("status")) result.push(styles.badge);
  if (n.includes("pagination")) result.push(styles.pagination);
  if (n.includes("table-wrapper")) result.push(styles.tableWrapper);
  if (n.includes("empty")) result.push(styles.empty);
  return result;
};

const textStyle = name => {
  const n = tokens(name);
  const result = [styles.text];
  if (n.includes("heading") || n.includes("title") || n.includes("name")) result.push(styles.title);
  if (n.includes("label") || n.includes("meta") || n.includes("subtitle") || n.includes("date")) result.push(styles.muted);
  if (n.includes("number") || n.includes("docket") || n.includes("value") || n.includes("amount")) result.push(styles.emphasis);
  if (n.includes("status") || n.includes("badge")) result.push(styles.badgeText);
  return result;
};

const normalize = children => React.Children.map(children, child =>
  typeof child === "string" || typeof child === "number" ? <Text style={styles.text}>{child}</Text> : child
);

export const Div = ({nativeClass, children, style}) => tokens(nativeClass).includes("page") ? (
  <ScrollView style={styles.page} contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
    {normalize(children)}
  </ScrollView>
) : <View style={[...boxStyle(nativeClass), safeStyle(style)]}>{normalize(children)}</View>;

export const Span = ({nativeClass, children, style}) => <Text style={[...textStyle(nativeClass), safeStyle(style)]}>{children}</Text>;
export const Strong = ({children, nativeClass}) => <Text style={[styles.strong, ...textStyle(nativeClass)]}>{children}</Text>;
export const H1 = ({children}) => <Text style={styles.h1}>{children}</Text>;
export const H2 = ({children}) => <Text style={styles.h2}>{children}</Text>;
export const H3 = ({children}) => <Text style={styles.h3}>{children}</Text>;
export const H4 = H3;
export const P = ({children, nativeClass}) => <Text style={[styles.paragraph, ...textStyle(nativeClass)]}>{children}</Text>;
export const Label = ({children}) => <Text style={styles.label}>{children}</Text>;

export const Table = ({children}) => <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableWrapper}><View style={styles.table}>{children}</View></ScrollView>;
export const Thead = ({children}) => <View style={styles.tableHeader}>{children}</View>;
export const Tbody = ({children}) => <View>{children}</View>;
export const Tr = ({children}) => <View style={styles.tableRow}>{normalize(children)}</View>;
export const Th = ({children}) => <Text style={[styles.cell, styles.headerCell]}>{children}</Text>;
export const Td = ({children}) => <View style={styles.cell}>{normalize(children)}</View>;
export const Style = () => null;

export const Input = ({value, onChange, placeholder, type, disabled}) => <TextInput value={value == null ? "" : String(value)} editable={!disabled} placeholder={placeholder} placeholderTextColor="#8797A9" secureTextEntry={type === "password"} keyboardType={type === "number" ? "numeric" : type === "email" ? "email-address" : "default"} onChangeText={text => onChange?.({target: {value: text, files: type === "file" ? [{name: text}] : undefined}})} style={styles.input}/>;
export const Textarea = ({value, onChange, placeholder}) => <TextInput multiline value={value || ""} placeholder={placeholder} placeholderTextColor="#8797A9" onChangeText={text => onChange?.({target: {value: text}})} style={[styles.input, styles.textarea]}/>;
export const Option = () => null;
export const Select = ({value, onChange, children}) => {
  const options = React.Children.toArray(children).map(child => ({value: child.props.value, label: child.props.children}));
  return <ClientSelect value={value} options={options} onChange={next => onChange?.({target: {value: next}})}/>;
};

export const Form = ({onSubmit, children}) => <FormContext.Provider value={onSubmit}><View style={styles.form}>{children}</View></FormContext.Provider>;
export const Button = ({onPress, type, children, disabled, nativeClass}) => {
  const submit = useContext(FormContext);
  const n = tokens(nativeClass);
  return <Pressable disabled={disabled} onPress={event => onPress?.(event) || (type === "submit" && submit?.({preventDefault(){}}))} style={({pressed}) => [styles.button, n.includes("primary") && styles.primary, n.includes("danger") && styles.danger, pressed && styles.pressed, disabled && styles.disabled]}><Text style={[styles.buttonText, n.includes("primary") && styles.primaryText]}>{children}</Text></Pressable>;
};

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: "#D9DEE0"},
  pageContent: {padding: 20, paddingTop: 45, paddingBottom: 110},
  card: {backgroundColor: "#FAF7EF", borderWidth: 1, borderColor: "#E1DDD4", borderRadius: 18, padding: 18, marginBottom: 14},
  row: {flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10},
  filterRow: {flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12, backgroundColor: "#FAF7EF", borderRadius: 18, padding: 16, marginBottom: 18},
  grid: {flexDirection: "row", flexWrap: "wrap", gap: 12},
  infoBox: {flexGrow: 1, flexBasis: 135, minHeight: 62, borderRadius: 12, backgroundColor: "#FCFAF5", borderWidth: 1, borderColor: "#E8E4DC", padding: 12},
  text: {fontSize: 12, lineHeight: 17, color: "#34485E"},
  strong: {fontSize: 12, lineHeight: 17, fontWeight: "700", color: "#263A50"},
  title: {fontSize: 16, lineHeight: 21, fontWeight: "700", color: "#19324D"},
  h1: {fontSize: 34, lineHeight: 41, fontWeight: "700", color: "#19324D", marginBottom: 6},
  h2: {fontSize: 22, lineHeight: 28, fontWeight: "700", color: "#19324D"},
  h3: {fontSize: 18, lineHeight: 24, fontWeight: "700", color: "#19324D"},
  paragraph: {fontSize: 15, lineHeight: 21, color: "#60758E"},
  label: {fontSize: 10, lineHeight: 14, fontWeight: "700", color: "#718197", letterSpacing: 0.5, marginBottom: 6},
  muted: {fontSize: 11, lineHeight: 16, color: "#718197"},
  emphasis: {fontWeight: "700", color: "#246BE3"},
  badge: {alignSelf: "flex-start", minHeight: 28, borderRadius: 15, backgroundColor: "#E1EAF8", paddingHorizontal: 11, paddingVertical: 6},
  badgeText: {fontSize: 10, lineHeight: 14, fontWeight: "700", color: "#2864B5"},
  input: {height: 46, minWidth: 180, flexGrow: 1, borderWidth: 1, borderColor: "#DEE3E8", borderRadius: 15, backgroundColor: "#FFFFFF", paddingHorizontal: 15, color: "#273A50", fontSize: 13, marginBottom: 10},
  textarea: {height: 88, paddingTop: 12, textAlignVertical: "top"},
  form: {gap: 8},
  button: {minHeight: 38, paddingHorizontal: 16, borderWidth: 1, borderColor: "#D8DEE4", borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF"},
  primary: {height: 44, backgroundColor: "#122F4B", borderColor: "#122F4B"},
  danger: {borderColor: "#C97A70"},
  buttonText: {fontSize: 11, fontWeight: "700", color: "#263A50"},
  primaryText: {color: "#FFFFFF"},
  pressed: {opacity: 0.7},
  disabled: {opacity: 0.45},
  tableWrapper: {width: "100%", marginTop: 4},
  table: {minWidth: 900, borderWidth: 1, borderColor: "#E2DED5", borderRadius: 16, overflow: "hidden", backgroundColor: "#FCFAF5"},
  tableHeader: {backgroundColor: "#F2EDDF"},
  tableRow: {minHeight: 62, flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E6E2DA"},
  cell: {width: 170, paddingHorizontal: 14, justifyContent: "center"},
  headerCell: {paddingVertical: 15, fontSize: 10, lineHeight: 14, fontWeight: "700", color: "#61738A", letterSpacing: 0.7},
  pagination: {flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 10, marginTop: 18},
  empty: {minHeight: 180, padding: 30, alignItems: "center", justifyContent: "center"},
});
