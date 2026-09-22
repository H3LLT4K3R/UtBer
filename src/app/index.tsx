import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palette = {
  bg: "#F8F6F4",
  ink: "#241F20",
  muted: "#867B7A",
  line: "#E8E1DE",
  card: "#FFFFFF",
  wine: "#722F37",
  wineDark: "#4F2027",
  blush: "#F4E8E7",
  teal: "#287C75",
  tealSoft: "#E6F1EF",
  amber: "#BD7446",
};

const routeData = [
  {
    number: "100",
    name: "Centro - Terminal Norte",
    next: "3 min",
    color: palette.wine,
    state: "En camino",
  },
  {
    number: "13",
    name: "Ramal Poniente",
    next: "8 min",
    color: palette.amber,
    state: "Normal",
  },
  {
    number: "UT",
    name: "Universidad - Centro",
    next: "12 min",
    color: palette.teal,
    state: "Normal",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>U</Text>
            </View>
            <View>
              <Text style={styles.brand}>UtBer</Text>
              <Text style={styles.city}>TECAMACHALCO</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => router.push("/notifications")}
              style={styles.iconButton}
            >
              <Ionicons
                color={palette.ink}
                name="notifications-outline"
                size={19}
              />
              <View style={styles.badge} />
            </Pressable>
            <Pressable
              onPress={() => router.push("/login")}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>C</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.kicker}>LUNES, 8:42 AM</Text>
        <Text style={styles.title}>¿A dónde vas?</Text>
        <Text style={styles.subtitle}>Encuentra una combi cerca de ti.</Text>
        <Pressable
          onPress={() => router.push("/map")}
          style={({ pressed }) => [
            styles.hero,
            pressed ? styles.heroPressed : null,
          ]}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroKicker}>TU PRÓXIMA COMBI</Text>
              <Text style={styles.heroRoute}>Ruta 100</Text>
              <Text style={styles.heroMeta}>Centro → Terminal Norte</Text>
            </View>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
          </View>
          <View style={styles.heroMiddle}>
            <View style={styles.arrivalBlock}>
              <Text style={styles.arrivalNumber}>3</Text>
              <View>
                <Text style={styles.arrivalUnit}>min</Text>
                <Text style={styles.arrivalLabel}>para llegar</Text>
              </View>
            </View>
            <View style={styles.miniMap}>
              <View style={styles.miniRoad} />
              <View style={styles.miniRoute} />
              <View style={styles.miniVan}>
                <Ionicons color="#FFF" name="bus" size={12} />
              </View>
              <View style={styles.miniPin} />
            </View>
          </View>
          <View style={styles.heroFooter}>
            <Text style={styles.heroFooterText}>Mercado Municipal</Text>
            <Text style={styles.heroLink}>
              Ver mapa <Text style={styles.arrow}>→</Text>
            </Text>
          </View>
        </Pressable>
        <View style={styles.search}>
          <Ionicons color={palette.muted} name="search" size={17} />
          <Text style={styles.searchText}>Buscar una ruta o parada</Text>
          <Ionicons color={palette.muted} name="options-outline" size={17} />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tus rutas</Text>
          <Pressable onPress={() => router.push("/routes")}>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </Pressable>
        </View>
        <View style={styles.routeList}>
          {routeData.map((route) => (
            <RouteRow key={route.number} {...route} />
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aviso de proximidad</Text>
          <Ionicons color={palette.wine} name="options-outline" size={16} />
        </View>
        <View style={styles.proximityCard}>
          <View style={styles.proximityIcon}>
            <Ionicons
              color={palette.wine}
              name="notifications-outline"
              size={17}
            />
          </View>
          <View style={styles.flex}>
            <Text style={styles.proximityTitle}>Avísame cuando esté cerca</Text>
            <Text style={styles.proximityText}>
              Recibirás una alerta cuando la combi esté a 1 km.
            </Text>
          </View>
          <View style={styles.toggle}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyIcon}>
            <Ionicons color="#FFFFFF" name="alert" size={15} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.emergencyTitle}>SOS emergencia</Text>
            <Text style={styles.emergencyText}>
              911 · Seguridad · Ambulancia
            </Text>
          </View>
          <Pressable style={styles.helpButton}>
            <Text style={styles.helpText}>Pedir ayuda</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomNav active="home" />
    </SafeAreaView>
  );
}

function RouteRow({
  number,
  name,
  next,
  color,
  state,
}: (typeof routeData)[number]) {
  return (
    <Pressable
      onPress={() => router.push("/map")}
      style={({ hovered }) => [
        styles.routeRow,
        hovered ? styles.rowHover : null,
      ]}
    >
      <View style={[styles.routeNumber, { backgroundColor: color }]}>
        <Text style={styles.routeNumberText}>{number}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.routeName}>{name}</Text>
        <View style={styles.routeState}>
          <View
            style={[
              styles.stateDot,
              {
                backgroundColor:
                  state === "En camino" ? palette.teal : palette.muted,
              },
            ]}
          />
          <Text style={styles.stateText}>{state}</Text>
        </View>
      </View>
      <View style={styles.next}>
        <Text style={styles.nextNumber}>{next.split(" ")[0]}</Text>
        <Text style={styles.nextUnit}>{next.split(" ")[1]}</Text>
      </View>
      <Ionicons color={palette.muted} name="chevron-forward" size={15} />
    </Pressable>
  );
}
function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: "map-outline" | "location-outline" | "time-outline";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered }) => [
        styles.quickAction,
        hovered ? styles.quickHover : null,
      ]}
    >
      <Ionicons color={palette.wine} name={icon} size={18} />
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}
function BottomNav({ active }: { active: "home" }) {
  return (
    <View style={styles.bottom}>
      <Nav
        active={active === "home"}
        icon="home"
        label="Inicio"
        onPress={() => undefined}
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
        icon="person-outline"
        label="Perfil"
        onPress={() => router.push("/login")}
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
  icon: "home" | "git-branch-outline" | "map-outline" | "person-outline";
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
        color={active ? palette.wine : palette.muted}
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
    backgroundColor: palette.bg,
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
  },
  brandRow: { alignItems: "center", flexDirection: "row", gap: 9 },
  logo: {
    alignItems: "center",
    backgroundColor: palette.wine,
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  logoText: { color: "#FFF", fontSize: 20, fontWeight: "700" },
  brand: { color: palette.ink, fontSize: 14, fontWeight: "700" },
  city: {
    color: palette.wine,
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 2,
  },
  headerActions: { alignItems: "center", flexDirection: "row", gap: 9 },
  iconButton: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderColor: palette.line,
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    position: "relative",
    width: 34,
  },
  badge: {
    backgroundColor: palette.wine,
    borderColor: palette.card,
    borderRadius: 5,
    borderWidth: 2,
    height: 9,
    position: "absolute",
    right: 5,
    top: 5,
    width: 9,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: palette.blush,
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  avatarText: { color: palette.wine, fontSize: 12, fontWeight: "700" },
  kicker: {
    color: palette.wine,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 30,
  },
  title: { color: palette.ink, fontSize: 28, fontWeight: "700", marginTop: 5 },
  subtitle: { color: palette.muted, fontSize: 12, marginTop: 4 },
  hero: {
    backgroundColor: palette.wine,
    borderRadius: 16,
    marginTop: 18,
    padding: 15,
  },
  heroPressed: { backgroundColor: palette.wineDark },
  heroTop: { flexDirection: "row", justifyContent: "space-between" },
  heroKicker: {
    color: "#EECED0",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  heroRoute: { color: "#FFF", fontSize: 20, fontWeight: "700", marginTop: 5 },
  heroMeta: { color: "#EFCFD1", fontSize: 10, marginTop: 3 },
  livePill: {
    alignItems: "center",
    backgroundColor: "#8A434B",
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    height: 24,
    paddingHorizontal: 8,
  },
  liveDot: { backgroundColor: "#7FE0B8", borderRadius: 4, height: 7, width: 7 },
  liveText: { color: "#FFF", fontSize: 8, fontWeight: "700" },
  heroMiddle: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
  },
  arrivalBlock: { alignItems: "center", flexDirection: "row" },
  arrivalNumber: {
    color: "#FFF",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 44,
  },
  arrivalUnit: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  arrivalLabel: { color: "#EFCFD1", fontSize: 9, marginTop: 2 },
  miniMap: {
    backgroundColor: "#8B4A52",
    borderRadius: 10,
    flex: 1,
    height: 82,
    overflow: "hidden",
    position: "relative",
  },
  miniRoad: {
    backgroundColor: "#A6676E",
    height: 13,
    left: -16,
    position: "absolute",
    top: 34,
    transform: [{ rotate: "-18deg" }],
    width: 190,
  },
  miniRoute: {
    borderColor: "#F7D7D9",
    borderRadius: 50,
    borderWidth: 2,
    height: 72,
    left: 22,
    position: "absolute",
    top: 18,
    transform: [{ rotate: "-15deg" }],
    width: 112,
  },
  miniVan: {
    alignItems: "center",
    backgroundColor: palette.teal,
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    left: 64,
    position: "absolute",
    top: 29,
    transform: [{ rotate: "-15deg" }],
    width: 30,
  },
  miniPin: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 8,
    position: "absolute",
    right: 15,
    top: 15,
    width: 8,
  },
  heroFooter: {
    borderTopColor: "#95545B",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
  },
  heroFooterText: { color: "#EFCFD1", fontSize: 9 },
  heroLink: { color: "#FFF", fontSize: 9, fontWeight: "700" },
  arrow: { fontSize: 13 },
  search: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderColor: palette.line,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    marginTop: 12,
    minHeight: 42,
    paddingHorizontal: 12,
  },
  searchText: { color: palette.muted, flex: 1, fontSize: 11 },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: "700" },
  sectionLink: { color: palette.wine, fontSize: 10, fontWeight: "700" },
  routeList: { gap: 7 },
  routeRow: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderColor: palette.line,
    borderRadius: 11,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  rowHover: { backgroundColor: palette.blush, borderColor: palette.wine },
  routeNumber: {
    alignItems: "center",
    borderRadius: 8,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  routeNumberText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  routeName: { color: palette.ink, fontSize: 11, fontWeight: "700" },
  routeState: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    marginTop: 5,
  },
  stateDot: { borderRadius: 4, height: 6, width: 6 },
  stateText: { color: palette.muted, fontSize: 8 },
  next: { alignItems: "flex-end", marginRight: 2 },
  nextNumber: { color: palette.wine, fontSize: 16, fontWeight: "700" },
  nextUnit: { color: palette.muted, fontSize: 8, marginTop: -2 },
  quickRow: { flexDirection: "row", gap: 7, marginTop: 12 },
  quickAction: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderColor: palette.line,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    justifyContent: "center",
    minHeight: 58,
  },
  quickHover: { backgroundColor: palette.blush, borderColor: palette.wine },
  quickLabel: { color: palette.ink, fontSize: 9, fontWeight: "600" },
  tip: {
    alignItems: "center",
    backgroundColor: palette.tealSoft,
    borderRadius: 11,
    flexDirection: "row",
    gap: 9,
    marginTop: 14,
    padding: 11,
  },
  tipIcon: {
    alignItems: "center",
    backgroundColor: "#D1E8E4",
    borderRadius: 8,
    height: 29,
    justifyContent: "center",
    width: 29,
  },
  tipTitle: { color: palette.ink, fontSize: 10, fontWeight: "700" },
  tipText: { color: palette.muted, fontSize: 9, marginTop: 2 },
  proximityCard: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderColor: palette.line,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    padding: 10,
  },
  proximityIcon: {
    alignItems: "center",
    backgroundColor: palette.blush,
    borderRadius: 8,
    height: 29,
    justifyContent: "center",
    width: 29,
  },
  proximityTitle: { color: palette.ink, fontSize: 10, fontWeight: "700" },
  proximityText: { color: palette.muted, fontSize: 8, marginTop: 3 },
  toggle: {
    backgroundColor: palette.wine,
    borderRadius: 9,
    height: 18,
    justifyContent: "center",
    paddingHorizontal: 2,
    width: 31,
  },
  toggleThumb: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    height: 14,
    width: 14,
  },
  emergencyCard: {
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderColor: "#F0D7D7",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    marginTop: 10,
    padding: 10,
  },
  emergencyIcon: {
    alignItems: "center",
    backgroundColor: "#C64F59",
    borderRadius: 7,
    height: 29,
    justifyContent: "center",
    width: 29,
  },
  emergencyTitle: { color: "#9D3B45", fontSize: 10, fontWeight: "700" },
  emergencyText: { color: palette.muted, fontSize: 8, marginTop: 3 },
  helpButton: {
    backgroundColor: "#C64F59",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  helpText: { color: "#FFFFFF", fontSize: 8, fontWeight: "700" },
  bottom: {
    alignItems: "center",
    backgroundColor: palette.card,
    borderTopColor: palette.line,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    paddingBottom: 7,
    paddingTop: 8,
    position: "absolute",
    right: 0,
  },
  nav: {
    alignItems: "center",
    borderRadius: 9,
    minWidth: 52,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navActive: { backgroundColor: palette.blush },
  navHover: { backgroundColor: palette.tealSoft },
  navText: { color: palette.muted, fontSize: 8, marginTop: 3 },
  navTextActive: { color: palette.wine, fontWeight: "700" },
});
