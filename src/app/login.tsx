import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#FDF8F8",
  white: "#FFFFFF",
  primary: "#722F37",
  dark: "#542329",
  text: "#1B0D0F",
  muted: "#8E6F73",
  soft: "#F8F0F1",
  border: "#F0E4E5",
};

export default function LoginScreen() {
  const [role, setRole] = React.useState<"user" | "driver">("user");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const submit = () =>
    email && password
      ? role === "driver"
        ? router.replace("/driver")
        : Alert.alert("Bienvenido", "Sesión iniciada en UtBer.")
      : Alert.alert(
          "Datos incompletos",
          "Ingresa tu correo o teléfono y contraseña.",
        );
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>U</Text>
        </View>
        <View style={styles.pill}>
          <View style={styles.dot} />
          <Text style={styles.pillText}>TRANSPORTE URBANO</Text>
        </View>
        <Text style={styles.brand}>UtBer Movilidad Urbana</Text>
        <Text style={styles.title}>¡Hola de nuevo!</Text>
        <Text style={styles.subtitle}>
          Consulta rutas, paradas y combis en la ciudad.
        </Text>
        <View style={styles.roles}>
          <Role
            active={role === "user"}
            icon="person-outline"
            label="Estudiante"
            onPress={() => setRole("user")}
          />
          <Role
            active={role === "driver"}
            icon="bus-outline"
            label="Chofer"
            onPress={() => setRole("driver")}
          />
        </View>
        <Text style={styles.label}>CORREO O TELÉFONO</Text>
        <Field icon="person-outline">
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com o 249 123 4567"
            placeholderTextColor="#C8AEB1"
            style={styles.input}
            value={email}
          />
        </Field>
        <View style={styles.labelRow}>
          <Text style={styles.label}>CONTRASEÑA</Text>
          <Pressable>
            <Text style={styles.link}>¿La olvidaste?</Text>
          </Pressable>
        </View>
        <Field icon="lock-closed-outline">
          <TextInput
            onChangeText={setPassword}
            placeholder="••••••••••••"
            placeholderTextColor="#C8AEB1"
            secureTextEntry={!visible}
            style={styles.input}
            value={password}
          />
          <Pressable onPress={() => setVisible(!visible)}>
            <Ionicons
              color={colors.primary}
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={19}
            />
          </Pressable>
        </Field>
        <View style={styles.notice}>
          <View style={styles.noticeIcon}>
            <Ionicons
              color={colors.primary}
              name="shield-checkmark-outline"
              size={16}
            />
          </View>
          <Text style={styles.noticeText}>
            <Text style={styles.bold}>Validación automática</Text>
            {"\n"}Ubica tu combi y consulta su llegada en tiempo real.
          </Text>
        </View>
        <Pressable
          onPress={submit}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : null,
          ]}
        >
          <Text style={styles.buttonText}>Iniciar sesión →</Text>
        </Pressable>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>O ACCEDE CON TU</Text>
          <View style={styles.line} />
        </View>
        <Pressable style={styles.sso}>
          <Ionicons color={colors.primary} name="qr-code-outline" size={17} />
          <Text style={styles.ssoText}>Acceso rápido con tu cuenta UtBer</Text>
        </Pressable>
        <View style={styles.status}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>
            14 unidades activas en Tecamachalco
          </Text>
        </View>
        <View style={styles.register}>
          <Text style={styles.muted}>¿No tienes cuenta?</Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.link}> Regístrate aquí ›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Role({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: "person-outline" | "bus-outline";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.role, active ? styles.activeRole : null]}
    >
      <Ionicons
        color={active ? "#FFF" : colors.primary}
        name={icon}
        size={16}
      />
      <Text style={[styles.roleText, active ? styles.activeRoleText : null]}>
        {label}
      </Text>
    </Pressable>
  );
}
function Field({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: "person-outline" | "lock-closed-outline";
}) {
  return (
    <View style={styles.field}>
      <Ionicons color={colors.muted} name={icon} size={17} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    maxWidth: 360,
    width: "100%",
    alignSelf: "center",
  },
  content: { flexGrow: 1, padding: 18, paddingTop: 20 },
  logo: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  logoText: { color: "#FFF", fontSize: 26, fontWeight: "700" },
  pill: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.soft,
    borderRadius: 16,
    flexDirection: "row",
    gap: 5,
    marginTop: 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 7,
    width: 7,
  },
  pillText: { color: colors.primary, fontSize: 9, fontWeight: "700" },
  brand: {
    color: colors.primary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: "700",
    marginTop: 18,
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
  roles: {
    backgroundColor: colors.soft,
    borderRadius: 6,
    flexDirection: "row",
    marginTop: 17,
    padding: 3,
  },
  role: {
    alignItems: "center",
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 34,
  },
  activeRole: { backgroundColor: colors.primary },
  roleText: { color: colors.primary, fontSize: 12 },
  activeRoleText: { color: "#FFF", fontWeight: "700" },
  label: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 6,
    marginTop: 17,
  },
  labelRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: { color: colors.primary, fontSize: 10, fontWeight: "700" },
  field: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    minHeight: 42,
    paddingHorizontal: 11,
  },
  input: { color: colors.text, flex: 1, fontSize: 12, minHeight: 40 },
  notice: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 7,
    flexDirection: "row",
    gap: 9,
    marginTop: 15,
    padding: 10,
  },
  noticeIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 12,
    height: 25,
    justifyContent: "center",
    width: 25,
  },
  noticeText: { color: colors.muted, flex: 1, fontSize: 9, lineHeight: 13 },
  bold: { color: colors.primary, fontWeight: "700" },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 16,
    minHeight: 42,
  },
  pressed: { backgroundColor: colors.dark },
  buttonText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  divider: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginVertical: 15,
  },
  line: { backgroundColor: colors.border, flex: 1, height: 1 },
  dividerText: { color: colors.primary, fontSize: 9, fontWeight: "700" },
  sso: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    minHeight: 42,
  },
  ssoText: { color: colors.text, fontSize: 11, fontWeight: "600" },
  status: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 6,
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
    padding: 8,
  },
  statusText: { color: colors.primary, fontSize: 10 },
  muted: { color: colors.muted, fontSize: 11 },
  register: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 23,
  },
});
