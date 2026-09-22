import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#F8F6F4",
  card: "#FFFFFF",
  ink: "#241F20",
  muted: "#867B7A",
  line: "#E8E1DE",
  wine: "#722F37",
  soft: "#F4E8E7",
  teal: "#287C75",
  tealSoft: "#E6F1EF",
};

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons color={colors.wine} name="arrow-back" size={19} />
          </Pressable>
          <View>
            <Text style={styles.eyebrow}>UTBER</Text>
            <Text style={styles.title}>Avisos</Text>
          </View>
          <View style={styles.unread}>
            <Text style={styles.unreadText}>2 nuevos</Text>
          </View>
        </View>
        <View style={styles.highlight}>
          <View style={styles.highlightIcon}>
            <Ionicons color={colors.teal} name="notifications" size={18} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.highlightTitle}>Tus avisos están activos</Text>
            <Text style={styles.highlightText}>
              Te avisaremos cuando una combi esté cerca.
            </Text>
          </View>
          <Ionicons color={colors.teal} name="checkmark-circle" size={18} />
        </View>
        <Text style={styles.section}>HOY</Text>
        <Notice
          icon="bus-outline"
          title="Ruta 100 está cerca"
          detail="La unidad UT-24 llegará a Mercado Municipal en 3 min."
          time="Hace 1 min"
          unread
        />
        <Notice
          icon="time-outline"
          title="Recordatorio de viaje"
          detail="Tu aviso para la Ruta 13 está programado a 1 km."
          time="Hace 18 min"
          unread
        />
        <Text style={styles.section}>AYER</Text>
        <Notice
          icon="information-circle-outline"
          title="Servicio normal"
          detail="Las rutas 100, 13 y UT operan con frecuencia habitual."
          time="Ayer, 7:42 PM"
        />
      </ScrollView>
      <View style={styles.bottom}>
        <Nav
          icon="home-outline"
          label="Inicio"
          onPress={() => router.push("/")}
        />
        <Nav
          icon="git-branch-outline"
          label="Rutas"
          onPress={() => router.push("/routes")}
        />
        <Nav
          icon="map-outline"
          label="Mapa"
          onPress={() => router.push("/map")}
        />
        <Nav
          active
          icon="notifications-outline"
          label="Avisos"
          onPress={() => undefined}
        />
      </View>
    </SafeAreaView>
  );
}

function Notice({
  icon,
  title,
  detail,
  time,
  unread,
}: {
  icon: "bus-outline" | "time-outline" | "information-circle-outline";
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <Pressable
      style={({ hovered }) => [
        styles.notice,
        hovered ? styles.noticeHover : null,
      ]}
    >
      <View style={styles.noticeIcon}>
        <Ionicons color={colors.wine} name={icon} size={18} />
      </View>
      <View style={styles.flex}>
        <View style={styles.noticeTitleRow}>
          <Text style={styles.noticeTitle}>{title}</Text>
          {unread ? <View style={styles.unreadDot} /> : null}
        </View>
        <Text style={styles.noticeDetail}>{detail}</Text>
        <Text style={styles.noticeTime}>{time}</Text>
      </View>
      <Ionicons color={colors.muted} name="chevron-forward" size={15} />
    </Pressable>
  );
}
function Nav({
  active,
  icon,
  label,
  onPress,
}: {
  active?: boolean;
  icon:
    | "home-outline"
    | "git-branch-outline"
    | "map-outline"
    | "notifications-outline";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered }) => [
        styles.nav,
        active ? styles.navActive : null,
        hovered ? styles.navHover : null,
      ]}
    >
      <Ionicons
        color={active ? colors.wine : colors.muted}
        name={icon}
        size={17}
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
  content: { padding: 16, paddingBottom: 82 },
  flex: { flex: 1 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 11,
    paddingVertical: 8,
  },
  back: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  eyebrow: {
    color: colors.wine,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: { color: colors.ink, fontSize: 20, fontWeight: "700", marginTop: 2 },
  unread: {
    backgroundColor: colors.soft,
    borderRadius: 12,
    marginLeft: "auto",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  unreadText: { color: colors.wine, fontSize: 9, fontWeight: "700" },
  highlight: {
    alignItems: "center",
    backgroundColor: colors.tealSoft,
    borderRadius: 11,
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    padding: 12,
  },
  highlightIcon: {
    alignItems: "center",
    backgroundColor: "#D1E8E4",
    borderRadius: 9,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  highlightTitle: { color: colors.ink, fontSize: 11, fontWeight: "700" },
  highlightText: { color: colors.muted, fontSize: 9, marginTop: 3 },
  section: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 24,
  },
  notice: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 7,
    padding: 11,
  },
  noticeHover: { backgroundColor: colors.soft, borderColor: colors.wine },
  noticeIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 9,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  noticeTitleRow: { alignItems: "center", flexDirection: "row", gap: 6 },
  noticeTitle: { color: colors.ink, fontSize: 11, fontWeight: "700" },
  unreadDot: {
    backgroundColor: colors.wine,
    borderRadius: 4,
    height: 6,
    width: 6,
  },
  noticeDetail: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 3,
  },
  noticeTime: { color: colors.muted, fontSize: 8, marginTop: 5 },
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
  nav: { alignItems: "center", borderRadius: 9, minWidth: 52, padding: 4 },
  navActive: { backgroundColor: colors.soft },
  navHover: { backgroundColor: colors.tealSoft },
  navText: { color: colors.muted, fontSize: 8, marginTop: 3 },
  navTextActive: { color: colors.wine, fontWeight: "700" },
});
