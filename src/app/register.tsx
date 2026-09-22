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

export default function RegisterScreen() {
  const [role, setRole] = React.useState<"user" | "driver">("user");
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons color={colors.primary} name="arrow-back" size={19} />
          </Pressable>
          <Text style={styles.topTitle}>REGISTRO DE CUENTA</Text>
          <View style={styles.topBadge}>
            <Ionicons color="#FFFFFF" name="person" size={13} />
          </View>
        </View>
        <View style={styles.logo}>
          <Text style={styles.logoText}>U</Text>
        </View>
        <Text style={styles.brand}>UtBer Tecamachalco</Text>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>
          Consulta combis, recorridos y paradas de la ciudad.
        </Text>
        <View style={styles.roles}>
          <Role
            active={role === "user"}
            icon="person-outline"
            label="Estudiante"
            description="Consultar rutas, paradas y cambios en vivo"
            onPress={() => setRole("user")}
          />
          <Role
            active={role === "driver"}
            icon="bus-outline"
            label="Chofer"
            description="Compartir GPS y administrar tu recorrido"
            onPress={() => setRole("driver")}
          />
        </View>
        <Text style={styles.label}>NOMBRE COMPLETO</Text>
        <Field icon="person-outline" placeholder="Ej. Ana Lucía Morales" />
        <Text style={styles.label}>CORREO O TELÉFONO</Text>
        <Field icon="at-outline" placeholder="correo@ejemplo.com" />
        <Text style={styles.label}>ZONA O COLONIA</Text>
        <Pressable style={styles.select}>
          <Ionicons color={colors.muted} name="location-outline" size={17} />
          <Text style={styles.selectText}>Selecciona tu zona o colonia</Text>
          <Ionicons color={colors.primary} name="chevron-down" size={16} />
        </Pressable>
        <Text style={styles.label}>CONTRASEÑA</Text>
        <Field icon="lock-closed-outline" placeholder="Mínimo 8 caracteres" />
        <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
        <Field icon="key-outline" placeholder="Repite tu contraseña" />
        <View style={styles.notice}>
          <Ionicons color={colors.primary} name="map-outline" size={18} />
          <Text style={styles.noticeText}>
            Visualiza recorridos y llegada de combis en Tecamachalco en tiempo
            real.
          </Text>
        </View>
        <Pressable
          onPress={() =>
            Alert.alert(
              "Registro",
              "Revisa tus datos para completar el registro.",
            )
          }
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : null,
          ]}
        >
          <Text style={styles.buttonText}>Completar registro →</Text>
        </Pressable>
        <View style={styles.terms}>
          <View style={styles.box} />
          <Text style={styles.termsText}>
            Acepto los términos de uso de UtBer y el aviso de privacidad.
          </Text>
        </View>
        <View style={styles.login}>
          <Text style={styles.muted}>¿Ya tienes cuenta?</Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.link}> Iniciar sesión ›</Text>
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
  description,
}: {
  active: boolean;
  icon: "person-outline" | "bus-outline";
  label: string;
  onPress: () => void;
  description: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.role, active ? styles.activeRole : null]}
    >
      <View style={[styles.roleIcon, active ? styles.activeRoleIcon : null]}>
        <Ionicons
          color={active ? "#FFF" : colors.primary}
          name={icon}
          size={16}
        />
      </View>
      <Text style={[styles.roleText, active ? styles.activeRoleText : null]}>
        {label}
      </Text>
      <Text
        style={[
          styles.roleDescription,
          active ? styles.activeRoleDescription : null,
        ]}
      >
        {description}
      </Text>
    </Pressable>
  );
}
function Field({
  icon,
  placeholder,
}: {
  icon: "person-outline" | "at-outline" | "lock-closed-outline" | "key-outline";
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <Ionicons color={colors.muted} name={icon} size={17} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#C8AEB1"
        style={styles.input}
      />
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
  content: { padding: 18 },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  topTitle: { color: colors.muted, fontSize: 9, fontWeight: "700" },
  topBadge: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: 25,
    justifyContent: "center",
    width: 25,
  },
  back: { height: 28, justifyContent: "center", width: 28 },
  logo: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  logoText: { color: "#FFF", fontSize: 25, fontWeight: "700" },
  brand: {
    color: colors.primary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
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
    gap: 6,
    marginTop: 17,
    padding: 3,
  },
  role: {
    alignItems: "flex-start",
    backgroundColor: colors.soft,
    borderRadius: 4,
    flex: 1,
    minHeight: 92,
    padding: 9,
  },
  activeRole: { backgroundColor: colors.primary },
  roleIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 5,
    height: 25,
    justifyContent: "center",
    width: 25,
  },
  activeRoleIcon: { backgroundColor: "#8B434B" },
  roleText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
  },
  activeRoleText: { color: "#FFF", fontWeight: "700" },
  roleDescription: {
    color: colors.primary,
    fontSize: 8,
    lineHeight: 11,
    marginTop: 3,
  },
  activeRoleDescription: { color: "#FFF" },
  label: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 6,
    marginTop: 14,
  },
  field: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    minHeight: 40,
    paddingHorizontal: 11,
  },
  input: { color: colors.text, flex: 1, fontSize: 12, minHeight: 38 },
  select: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    minHeight: 40,
    paddingHorizontal: 11,
  },
  selectText: { color: colors.muted, flex: 1, fontSize: 11 },
  notice: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 7,
    flexDirection: "row",
    gap: 9,
    marginTop: 15,
    padding: 10,
  },
  noticeText: { color: colors.primary, flex: 1, fontSize: 10, lineHeight: 14 },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 15,
    minHeight: 42,
  },
  pressed: { backgroundColor: colors.dark },
  buttonText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  terms: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 7,
    marginTop: 13,
  },
  box: { borderColor: colors.muted, borderWidth: 1, height: 12, width: 12 },
  termsText: { color: colors.muted, flex: 1, fontSize: 9 },
  login: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  muted: { color: colors.muted, fontSize: 11 },
  link: { color: colors.primary, fontSize: 11, fontWeight: "700" },
});
