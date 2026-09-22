import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#F8F6F4",
  card: "#FFFFFF",
  white: "#FFFFFF",
  ink: "#241F20",
  muted: "#867B7A",
  line: "#E8E1DE",
  wine: "#722F37",
  dark: "#4F2027",
  soft: "#F4E8E7",
  teal: "#287C75",
  tealSoft: "#E6F1EF",
  orange: "#BD7446",
};

export default function DriverScreen() {
  const [active, setActive] = React.useState(false);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>MODO CHOFER</Text>
            <Text style={styles.title}>Hola, Carlos</Text>
          </View>
          <Pressable
            onPress={() => router.push("/login")}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>C</Text>
          </Pressable>
        </View>
        <View style={[styles.status, active ? styles.statusActive : null]}>
          <View
            style={[styles.statusIcon, active ? styles.statusIconActive : null]}
          >
            <Ionicons
              color={active ? "#FFFFFF" : colors.wine}
              name={active ? "navigate" : "pause-outline"}
              size={20}
            />
          </View>
          <View style={styles.flex}>
            <Text style={styles.statusTitle}>
              {active ? "Recorrido activo" : "GPS en pausa"}
            </Text>
            <Text style={styles.statusText}>
              {active
                ? "Tu ubicación se está compartiendo"
                : "Inicia cuando estés listo para salir"}
            </Text>
          </View>
          <View style={[styles.signal, active ? styles.signalActive : null]}>
            <View />
            <View />
            <View />
          </View>
        </View>
        <Text style={styles.section}>TU RECORRIDO</Text>
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <View style={styles.routeNumber}>
              <Text style={styles.routeNumberText}>100</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.routeName}>Centro - Terminal Norte</Text>
              <Text style={styles.routeMeta}>Tecamachalco · 14 paradas</Text>
            </View>
            <Ionicons color={colors.muted} name="chevron-down" size={17} />
          </View>
          <View style={styles.stops}>
            <Stop label="Centro de Tecamachalco" active />
            <Stop label="Mercado Municipal" />
            <Stop label="Terminal Norte" last />
          </View>
        </View>
        <Pressable
          onPress={() => setActive(!active)}
          style={({ pressed }) => [
            styles.mainButton,
            active ? styles.stopButton : null,
            pressed ? styles.pressed : null,
          ]}
        >
          <Ionicons
            color="#FFFFFF"
            name={active ? "stop-circle-outline" : "play-circle-outline"}
            size={22}
          />
          <Text style={styles.mainButtonText}>
            {active ? "Finalizar recorrido" : "Iniciar recorrido"}
          </Text>
        </Pressable>
        <View style={styles.stats}>
          <Stat
            icon="speedometer-outline"
            value={active ? "18" : "--"}
            label="km/h"
          />
          <Stat
            icon="people-outline"
            value={active ? "12" : "0"}
            label="pasajeros"
          />
          <Stat
            icon="navigate-outline"
            value={active ? "4.2" : "0"}
            label="km"
          />
        </View>
        <Text style={styles.section}>DURANTE EL RECORRIDO</Text>
        <View style={styles.actionList}>
          <Action
            icon="location-outline"
            title="Compartiendo ubicación"
            detail={active ? "Visible para pasajeros" : "Se activa al iniciar"}
            active={active}
          />
          <Action
            icon="notifications-outline"
            title="Avisos de parada"
            detail="Vibración discreta al acercarte"
          />
          <Action
            icon="help-circle-outline"
            title="Soporte UtBer"
            detail="Ayuda para conductores"
          />
        </View>
        <View style={styles.safety}>
          <Ionicons color={colors.orange} name="warning-outline" size={17} />
          <Text style={styles.safetyText}>
            Conduce con atención. La app comparte tu ubicación automáticamente.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Nav
          icon="home-outline"
          label="Inicio"
          onPress={() => router.push("/")}
        />
        <Nav
          active
          icon="bus-outline"
          label="Mi recorrido"
          onPress={() => undefined}
        />
        <Nav
          icon="help-circle-outline"
          label="Ayuda"
          onPress={() => Alert.alert("Soporte", "Estamos para ayudarte.")}
        />
      </View>
    </SafeAreaView>
  );
}

function Stop({
  label,
  active,
  last,
}: {
  label: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <View style={styles.stop}>
      <View style={styles.stopRail}>
        {!last ? <View style={styles.stopLine} /> : null}
        <View style={[styles.stopDot, active ? styles.stopDotActive : null]} />
      </View>
      <Text style={[styles.stopLabel, active ? styles.stopLabelActive : null]}>
        {label}
      </Text>
      {active ? <Text style={styles.stopTag}>ACTUAL</Text> : null}
    </View>
  );
}
function Stat({
  icon,
  value,
  label,
}: {
  icon: "speedometer-outline" | "people-outline" | "navigate-outline";
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons color={colors.wine} name={icon} size={17} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}
function Action({
  icon,
  title,
  detail,
  active,
}: {
  icon: "location-outline" | "notifications-outline" | "help-circle-outline";
  title: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <View style={styles.action}>
      <View
        style={[styles.actionIcon, active ? styles.actionIconActive : null]}
      >
        <Ionicons
          color={active ? "#FFFFFF" : colors.wine}
          name={icon}
          size={17}
        />
      </View>
      <View style={styles.flex}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDetail}>{detail}</Text>
      </View>
      <Ionicons
        color={active ? colors.teal : colors.muted}
        name={active ? "checkmark-circle" : "chevron-forward"}
        size={17}
      />
    </View>
  );
}
function Nav({
  active,
  icon,
  label,
  onPress,
}: {
  active?: boolean;
  icon: "home-outline" | "bus-outline" | "help-circle-outline";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.nav, active ? styles.navActive : null]}
    >
      <Ionicons
        color={active ? colors.wine : colors.muted}
        name={icon}
        size={18}
      />
      <Text style={[styles.navText, active ? styles.navTextActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },
  content: { padding: 16, paddingBottom: 88 },
  flex: { flex: 1 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  eyebrow: {
    color: colors.wine,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: { color: colors.ink, fontSize: 22, fontWeight: "700", marginTop: 3 },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  avatarText: { color: colors.wine, fontSize: 12, fontWeight: "700" },
  status: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 17,
    padding: 12,
  },
  statusActive: { backgroundColor: colors.tealSoft, borderColor: "#C4E1DB" },
  statusIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 10,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  statusIconActive: { backgroundColor: colors.teal },
  statusTitle: { color: colors.ink, fontSize: 12, fontWeight: "700" },
  statusText: { color: colors.muted, fontSize: 9, marginTop: 3 },
  signal: { alignItems: "flex-end", flexDirection: "row", gap: 2, height: 16 },
  signalActive: { opacity: 1 },
  section: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 22,
  },
  routeCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  routeHeader: { alignItems: "center", flexDirection: "row", gap: 10 },
  routeNumber: {
    alignItems: "center",
    backgroundColor: colors.wine,
    borderRadius: 8,
    height: 39,
    justifyContent: "center",
    width: 39,
  },
  routeNumberText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  routeName: { color: colors.ink, fontSize: 11, fontWeight: "700" },
  routeMeta: { color: colors.muted, fontSize: 9, marginTop: 3 },
  stops: { marginTop: 16 },
  stop: { alignItems: "center", flexDirection: "row", minHeight: 28 },
  stopRail: {
    alignItems: "center",
    height: 28,
    marginRight: 10,
    position: "relative",
    width: 14,
  },
  stopLine: {
    backgroundColor: colors.line,
    height: 28,
    position: "absolute",
    top: 8,
    width: 2,
  },
  stopDot: {
    backgroundColor: colors.white,
    borderColor: colors.muted,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    width: 10,
    zIndex: 1,
  },
  stopDotActive: { backgroundColor: colors.wine, borderColor: colors.wine },
  stopLabel: { color: colors.muted, fontSize: 10 },
  stopLabelActive: { color: colors.wine, fontWeight: "700" },
  stopTag: {
    backgroundColor: colors.soft,
    borderRadius: 8,
    color: colors.wine,
    fontSize: 7,
    marginLeft: "auto",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  mainButton: {
    alignItems: "center",
    backgroundColor: colors.wine,
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 15,
    minHeight: 50,
  },
  stopButton: { backgroundColor: colors.dark },
  pressed: { opacity: 0.8 },
  mainButtonText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  stats: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    paddingVertical: 11,
  },
  stat: { alignItems: "center", gap: 3 },
  statValue: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  statLabel: { color: colors.muted, fontSize: 8 },
  actionList: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  action: {
    alignItems: "center",
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 55,
    paddingHorizontal: 11,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 8,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  actionIconActive: { backgroundColor: colors.teal },
  actionTitle: { color: colors.ink, fontSize: 10, fontWeight: "700" },
  actionDetail: { color: colors.muted, fontSize: 8, marginTop: 2 },
  safety: {
    alignItems: "center",
    backgroundColor: "#FBF0E9",
    borderRadius: 9,
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    padding: 10,
  },
  safetyText: { color: colors.orange, flex: 1, fontSize: 9, lineHeight: 13 },
  bottom: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    paddingVertical: 8,
    position: "absolute",
    right: 0,
  },
  nav: { alignItems: "center", borderRadius: 9, minWidth: 70, padding: 5 },
  navActive: { backgroundColor: colors.soft },
  navText: { color: colors.muted, fontSize: 8, marginTop: 3 },
  navTextActive: { color: colors.wine, fontWeight: "700" },
});
