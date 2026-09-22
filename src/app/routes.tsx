import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#FFF9FA",
  white: "#FFFFFF",
  primary: "#762E38",
  text: "#29171A",
  muted: "#896F73",
  line: "#F0E2E4",
  soft: "#FAF0F1",
  pale: "#FFF0F1",
  green: "#2E8B68",
};

const routes = [
  {
    number: "100",
    name: "Centro - Terminal Norte",
    detail: "Av. 9 Oriente · Mercado · Terminal",
    time: "3 min",
    status: "En camino",
    color: colors.primary,
  },
  {
    number: "13",
    name: "Ramal Poniente",
    detail: "San Mateo · Centro · El Carmen",
    time: "8 min",
    status: "Normal",
    color: "#B76645",
  },
  {
    number: "UT",
    name: "Universidad - Centro",
    detail: "Zona universitaria · Centro · Terminal",
    time: "12 min",
    status: "Normal",
    color: "#477A8C",
  },
];

export default function RoutesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons color={colors.primary} name="arrow-back" size={19} />
          </Pressable>
          <View>
            <Text style={styles.eyebrow}>TECAMACHALCO</Text>
            <Text style={styles.title}>Rutas y combis</Text>
          </View>
          <Pressable
            onPress={() => router.push("/map")}
            style={styles.mapButton}
          >
            <Ionicons color="#FFFFFF" name="map-outline" size={16} />
          </Pressable>
        </View>
        <View style={styles.search}>
          <Ionicons color={colors.muted} name="search" size={16} />
          <TextInput
            placeholder="Buscar ruta, colonia o parada"
            placeholderTextColor="#B79B9F"
            style={styles.searchInput}
          />
          <Ionicons color={colors.primary} name="options-outline" size={16} />
        </View>
        <View style={styles.filterRow}>
          <Filter label="Todas" active />
          <Filter label="Cerca de mí" />
          <Filter label="Favoritas" />
        </View>
        <View style={styles.liveHeader}>
          <View>
            <Text style={styles.sectionTitle}>Combis activas</Text>
            <Text style={styles.sectionSubtitle}>
              Actualizado hace unos segundos
            </Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>EN VIVO</Text>
          </View>
        </View>
        {routes.map((route) => (
          <RouteCard key={route.number} route={route} />
        ))}
        <View style={styles.tip}>
          <Ionicons color={colors.primary} name="navigate-outline" size={17} />
          <Text style={styles.tipText}>
            <Text style={styles.bold}>Consejo:</Text> toca una ruta para verla
            avanzando en el mapa.
          </Text>
        </View>
      </ScrollView>
      <BottomNav active="routes" />
    </SafeAreaView>
  );
}

function Filter({ label, active }: { label: string; active?: boolean }) {
  return (
    <Pressable style={[styles.filter, active ? styles.filterActive : null]}>
      <Text
        style={[styles.filterText, active ? styles.filterTextActive : null]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
function RouteCard({ route }: { route: (typeof routes)[number] }) {
  return (
    <Pressable
      onPress={() => router.push("/map")}
      style={({ hovered }) => [
        styles.routeCard,
        hovered ? styles.routeHover : null,
      ]}
    >
      <View style={[styles.routeNumber, { backgroundColor: route.color }]}>
        <Text style={styles.routeNumberText}>{route.number}</Text>
      </View>
      <View style={styles.routeInfo}>
        <View style={styles.routeTitleRow}>
          <Text style={styles.routeName}>{route.name}</Text>
          <Ionicons color={colors.muted} name="chevron-forward" size={15} />
        </View>
        <Text style={styles.routeDetail}>{route.detail}</Text>
        <View style={styles.routeStatus}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  route.status === "Demorada" ? "#C27B52" : colors.green,
              },
            ]}
          />
          <Text style={styles.statusText}>{route.status}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.nextText}>Próxima en {route.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
function BottomNav({ active }: { active: "routes" }) {
  return (
    <View style={styles.bottom}>
      <Nav
        icon="home-outline"
        label="Inicio"
        onPress={() => router.push("/")}
      />
      <Nav
        active={active === "routes"}
        icon="git-branch-outline"
        label="Rutas"
        onPress={() => undefined}
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
  icon:
    | "home-outline"
    | "git-branch-outline"
    | "map-outline"
    | "person-outline";
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
        color={active ? colors.primary : colors.muted}
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
  content: { padding: 12, paddingBottom: 78 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingVertical: 8,
  },
  back: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 2 },
  mapButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: 32,
    justifyContent: "center",
    marginLeft: "auto",
    width: 32,
  },
  search: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 40,
    paddingHorizontal: 11,
  },
  searchInput: { color: colors.text, flex: 1, fontSize: 11, minHeight: 38 },
  filterRow: { flexDirection: "row", gap: 6, marginTop: 12 },
  filter: {
    backgroundColor: colors.soft,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  filterActive: { backgroundColor: colors.primary },
  filterText: { color: colors.primary, fontSize: 9 },
  filterTextActive: { color: "#FFFFFF", fontWeight: "700" },
  liveHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 8,
  },
  sectionTitle: { color: colors.text, fontSize: 14, fontWeight: "700" },
  sectionSubtitle: { color: colors.muted, fontSize: 9, marginTop: 2 },
  livePill: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  liveDot: {
    backgroundColor: colors.green,
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  liveText: { color: colors.green, fontSize: 8, fontWeight: "700" },
  routeCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 7,
    padding: 10,
  },
  routeHover: { backgroundColor: colors.pale, borderColor: colors.primary },
  routeNumber: {
    alignItems: "center",
    borderRadius: 7,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  routeNumberText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  routeInfo: { flex: 1 },
  routeTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  routeName: { color: colors.text, fontSize: 11, fontWeight: "700" },
  routeDetail: { color: colors.muted, fontSize: 9, marginTop: 3 },
  routeStatus: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 7,
  },
  statusDot: { borderRadius: 4, height: 7, width: 7 },
  statusText: { color: colors.muted, fontSize: 8 },
  separator: { color: colors.line, fontSize: 9 },
  nextText: { color: colors.primary, fontSize: 8, fontWeight: "700" },
  tip: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 7,
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    padding: 10,
  },
  tipText: { color: colors.muted, flex: 1, fontSize: 9 },
  bold: { color: colors.primary, fontWeight: "700" },
  bottom: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    paddingVertical: 7,
    position: "absolute",
    right: 0,
  },
  nav: { alignItems: "center", borderRadius: 6, minWidth: 50, padding: 4 },
  navActive: { backgroundColor: colors.soft },
  navHover: { backgroundColor: colors.pale },
  navText: { color: colors.muted, fontSize: 8, marginTop: 2 },
  navTextActive: { color: colors.primary, fontWeight: "700" },
});
