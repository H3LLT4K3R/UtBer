import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bg: "#FFF9FA",
  white: "#FFFFFF",
  primary: "#762E38",
  dark: "#4F1E25",
  text: "#29171A",
  muted: "#896F73",
  line: "#E9DADC",
  soft: "#FAF0F1",
  pink: "#FFF0F1",
  road: "#E6D9D9",
  green: "#3F9A77",
};

export default function MapScreen() {
  const progress = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [progress]);
  const vanX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 245],
  });
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
            <Text style={styles.eyebrow}>RUTA 100 · EN VIVO</Text>
            <Text style={styles.title}>Mapa de combis</Text>
          </View>
          <Pressable style={styles.location}>
            <Ionicons color={colors.primary} name="locate-outline" size={18} />
          </Pressable>
        </View>
        <View style={styles.mapCard}>
          <View style={styles.mapTop}>
            <View>
              <Text style={styles.mapLabel}>RECORRIDO ACTUAL</Text>
              <Text style={styles.mapRoute}>Centro → Terminal Norte</Text>
            </View>
            <View style={styles.live}>
              <View style={styles.greenDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
          </View>
          <View style={styles.mapCanvas}>
            <View style={[styles.road, styles.roadOne]} />
            <View style={[styles.road, styles.roadTwo]} />
            <View style={[styles.road, styles.roadThree]} />
            <View style={[styles.road, styles.roadFour]} />
            <View style={[styles.routePath, styles.pathOne]} />
            <View style={[styles.routePath, styles.pathTwo]} />
            <View style={[styles.mapPin, styles.pinStart]}>
              <Ionicons color="#FFFFFF" name="location" size={11} />
            </View>
            <View style={[styles.mapPin, styles.pinEnd]}>
              <Ionicons color="#FFFFFF" name="flag" size={10} />
            </View>
            <View style={[styles.stop, styles.stopA]} />
            <View style={[styles.stop, styles.stopB]} />
            <View style={[styles.stop, styles.stopC]} />
            <Animated.View
              style={[
                styles.vanPosition,
                { transform: [{ translateX: vanX }] },
              ]}
            >
              <Urvan />
            </Animated.View>
            <View style={styles.mapLabelBox}>
              <Text style={styles.mapLabelBoxText}>Centro de Tecamachalco</Text>
            </View>
            <View style={styles.mapLabelBoxEnd}>
              <Text style={styles.mapLabelBoxText}>Terminal Norte</Text>
            </View>
            <View style={styles.zoom}>
              <Pressable>
                <Ionicons color={colors.primary} name="add" size={17} />
              </Pressable>
              <View style={styles.zoomLine} />
              <Pressable>
                <Ionicons color={colors.primary} name="remove" size={17} />
              </Pressable>
            </View>
          </View>
          <View style={styles.mapLegend}>
            <View style={styles.legendItem}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>Tu combi</Text>
            </View>
            <Text style={styles.updated}>Actualizado ahora</Text>
          </View>
        </View>
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleIcon}>
            <Ionicons color={colors.primary} name="bus" size={20} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleTitle}>Urvan UT-24</Text>
            <Text style={styles.vehicleMeta}>
              Ruta 100 · hacia Terminal Norte
            </Text>
          </View>
          <View style={styles.arrival}>
            <Text style={styles.arrivalLabel}>LLEGA EN</Text>
            <Text style={styles.arrivalTime}>8 min</Text>
          </View>
        </View>
        <View style={styles.tripProgress}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressTitle}>Ruta en curso</Text>
              <Text style={styles.progressSubtitle}>
                La Urvan avanza hacia tu destino
              </Text>
            </View>
            <View style={styles.stopCount}>
              <Text style={styles.stopCountText}>2 de 4 paradas</Text>
            </View>
          </View>
          <View style={styles.timeline}>
            <View style={styles.timelineTrack} />
            <View style={styles.timelineFill} />
            <TimelineStop label="Centro" time="Salida" />
            <TimelineStop active label="Mercado" time="Ahora" />
            <TimelineStop label="Terminal Norte" time="8 min" last />
          </View>
          <View style={styles.currentStop}>
            <Ionicons color={colors.primary} name="navigate" size={14} />
            <Text style={styles.currentStopText}>
              Pasando por{" "}
              <Text style={styles.currentStopBold}>Mercado Municipal</Text>
            </Text>
          </View>
        </View>
        <View style={styles.nextStop}>
          <View style={styles.nextIcon}>
            <Ionicons color={colors.primary} name="walk-outline" size={18} />
          </View>
          <View style={styles.nextInfo}>
            <Text style={styles.nextLabel}>SIGUIENTE PARADA</Text>
            <Text style={styles.nextName}>Mercado Municipal</Text>
            <Text style={styles.nextMeta}>A 420 m · aproximadamente 2 min</Text>
          </View>
          <Ionicons color={colors.muted} name="chevron-forward" size={16} />
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.action}>
            <Ionicons
              color={colors.primary}
              name="notifications-outline"
              size={16}
            />
            <Text style={styles.actionText}>Avisarme al llegar</Text>
          </Pressable>
          <Pressable style={styles.action}>
            <Ionicons
              color={colors.primary}
              name="share-social-outline"
              size={16}
            />
            <Text style={styles.actionText}>Compartir ruta</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomNav active="map" />
    </SafeAreaView>
  );
}

function Urvan() {
  return (
    <View style={styles.urvanWrap}>
      <View style={styles.urvanShadow} />
      <View style={styles.urvanBody}>
        <View style={styles.urvanRoof} />
        <View style={styles.windshield} />
        <View style={styles.windowSide} />
        <View style={styles.urvanStripe} />
        <View style={styles.wheelOne} />
        <View style={styles.wheelTwo} />
        <View style={styles.headlight} />
      </View>
      <View style={styles.urvanLabel}>UT</View>
    </View>
  );
}
function TimelineStop({
  active,
  label,
  time,
  last,
}: {
  active?: boolean;
  label: string;
  time: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.timelineStop, last ? styles.timelineStopLast : null]}>
      <View
        style={[styles.timelineDot, active ? styles.timelineDotActive : null]}
      />
      <Text
        style={[
          styles.timelineLabel,
          active ? styles.timelineLabelActive : null,
        ]}
      >
        {label}
      </Text>
      <Text style={styles.timelineTime}>{time}</Text>
    </View>
  );
}
function BottomNav({ active }: { active: "map" }) {
  return (
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
        active={active === "map"}
        icon="map-outline"
        label="Mapa"
        onPress={() => undefined}
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
  content: { padding: 12, paddingBottom: 80 },
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
    letterSpacing: 0.4,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 2 },
  location: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 7,
    height: 32,
    justifyContent: "center",
    marginLeft: "auto",
    width: 32,
  },
  mapCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 9,
    borderWidth: 1,
    overflow: "hidden",
  },
  mapTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 11,
  },
  mapLabel: { color: colors.muted, fontSize: 8, fontWeight: "700" },
  mapRoute: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  live: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  greenDot: {
    backgroundColor: colors.green,
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  liveText: { color: colors.green, fontSize: 8, fontWeight: "700" },
  mapCanvas: {
    backgroundColor: "#F7EFF0",
    height: 255,
    overflow: "hidden",
    position: "relative",
  },
  road: {
    backgroundColor: colors.road,
    height: 18,
    position: "absolute",
    transform: [{ rotate: "-22deg" }],
    width: 410,
  },
  roadOne: { left: -48, top: 55 },
  roadTwo: { left: -36, top: 155, transform: [{ rotate: "18deg" }] },
  roadThree: {
    left: 75,
    top: 115,
    transform: [{ rotate: "72deg" }],
    width: 300,
  },
  roadFour: {
    left: 220,
    top: 12,
    transform: [{ rotate: "-48deg" }],
    width: 290,
  },
  routePath: {
    borderColor: colors.primary,
    borderRadius: 50,
    borderWidth: 3,
    height: 160,
    position: "absolute",
    width: 330,
  },
  pathOne: { left: -62, top: 45, transform: [{ rotate: "-7deg" }] },
  pathTwo: {
    borderColor: "#B9858B",
    borderStyle: "dashed",
    height: 90,
    left: 174,
    top: 105,
    transform: [{ rotate: "-50deg" }],
    width: 160,
  },
  mapPin: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: "#FFFFFF",
    borderRadius: 13,
    borderWidth: 2,
    height: 25,
    justifyContent: "center",
    position: "absolute",
    width: 25,
  },
  pinStart: { left: 28, top: 194 },
  pinEnd: { right: 28, top: 32, backgroundColor: colors.green },
  stop: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: "absolute",
    width: 10,
  },
  stopA: { left: 124, top: 176 },
  stopB: { left: 184, top: 121 },
  stopC: { left: 253, top: 75 },
  vanPosition: { position: "absolute", top: 119, left: 0, zIndex: 4 },
  urvanWrap: { height: 48, transform: [{ rotate: "-10deg" }], width: 72 },
  urvanShadow: {
    backgroundColor: "#CDB8BA",
    borderRadius: 18,
    height: 10,
    left: 8,
    opacity: 0.55,
    position: "absolute",
    top: 35,
    width: 54,
  },
  urvanBody: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    height: 29,
    left: 7,
    position: "absolute",
    top: 10,
    transform: [{ rotateY: "-8deg" }],
    width: 57,
  },
  urvanRoof: {
    backgroundColor: "#8D4A53",
    borderRadius: 8,
    height: 15,
    left: 10,
    position: "absolute",
    top: -7,
    transform: [{ skewX: "-12deg" }],
    width: 38,
  },
  windshield: {
    backgroundColor: "#C9E0E3",
    borderRadius: 3,
    height: 11,
    left: 16,
    position: "absolute",
    top: -3,
    transform: [{ skewX: "-12deg" }],
    width: 14,
  },
  windowSide: {
    backgroundColor: "#A9CED2",
    borderRadius: 3,
    height: 11,
    left: 32,
    position: "absolute",
    top: -4,
    transform: [{ skewX: "-12deg" }],
    width: 17,
  },
  urvanStripe: {
    backgroundColor: "#E8B6BC",
    height: 3,
    left: 6,
    position: "absolute",
    top: 19,
    width: 50,
  },
  wheelOne: {
    backgroundColor: "#271D1E",
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    bottom: -5,
    height: 14,
    left: 14,
    position: "absolute",
    width: 14,
  },
  wheelTwo: {
    backgroundColor: "#271D1E",
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    bottom: -5,
    height: 14,
    position: "absolute",
    right: 7,
    width: 14,
  },
  headlight: {
    backgroundColor: "#FFEAB0",
    borderRadius: 3,
    height: 5,
    position: "absolute",
    right: -2,
    top: 16,
    width: 5,
  },
  urvanLabel: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "700",
    left: 27,
    position: "absolute",
    top: 13,
    zIndex: 2,
  },
  mapLabelBox: {
    backgroundColor: colors.white,
    borderRadius: 4,
    left: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    position: "absolute",
    top: 216,
  },
  mapLabelBoxEnd: {
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    position: "absolute",
    right: 10,
    top: 8,
  },
  mapLabelBoxText: { color: colors.muted, fontSize: 7 },
  zoom: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
    bottom: 10,
    elevation: 2,
    paddingVertical: 3,
    position: "absolute",
    right: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    width: 28,
  },
  zoomLine: { backgroundColor: colors.line, height: 1, width: 18 },
  mapLegend: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 9,
  },
  legendItem: { alignItems: "center", flexDirection: "row", gap: 5 },
  legendDot: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  legendText: { color: colors.muted, fontSize: 8 },
  updated: { color: colors.green, fontSize: 8 },
  vehicleCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    marginTop: 9,
    padding: 10,
  },
  vehicleIcon: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 7,
    height: 35,
    justifyContent: "center",
    width: 35,
  },
  vehicleInfo: { flex: 1 },
  vehicleTitle: { color: colors.text, fontSize: 11, fontWeight: "700" },
  vehicleMeta: { color: colors.muted, fontSize: 8, marginTop: 3 },
  arrival: { alignItems: "flex-end" },
  arrivalLabel: { color: colors.muted, fontSize: 7 },
  arrivalTime: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  tripProgress: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 9,
    padding: 10,
  },
  progressTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressTitle: { color: colors.text, fontSize: 10, fontWeight: "700" },
  progressSubtitle: { color: colors.muted, fontSize: 8, marginTop: 3 },
  stopCount: {
    backgroundColor: colors.soft,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  stopCountText: { color: colors.primary, fontSize: 7, fontWeight: "700" },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 4,
    position: "relative",
  },
  timelineTrack: {
    backgroundColor: colors.line,
    height: 3,
    left: 8,
    position: "absolute",
    right: 8,
    top: 5,
  },
  timelineFill: {
    backgroundColor: colors.primary,
    height: 3,
    left: 8,
    position: "absolute",
    top: 5,
    width: "48%",
  },
  timelineStop: { alignItems: "flex-start", width: "31%", zIndex: 1 },
  timelineStopLast: { alignItems: "flex-end" },
  timelineDot: {
    backgroundColor: colors.white,
    borderColor: colors.muted,
    borderRadius: 6,
    borderWidth: 2,
    height: 11,
    width: 11,
  },
  timelineDotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  timelineLabel: { color: colors.muted, fontSize: 8, marginTop: 6 },
  timelineLabelActive: { color: colors.primary, fontWeight: "700" },
  timelineTime: { color: colors.muted, fontSize: 7, marginTop: 2 },
  currentStop: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 5,
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  currentStopText: { color: colors.muted, fontSize: 8 },
  currentStopBold: { color: colors.primary, fontWeight: "700" },
  nextStop: {
    alignItems: "center",
    backgroundColor: colors.soft,
    borderRadius: 8,
    flexDirection: "row",
    gap: 9,
    marginTop: 9,
    padding: 10,
  },
  nextIcon: {
    alignItems: "center",
    backgroundColor: colors.pink,
    borderRadius: 8,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  nextInfo: { flex: 1 },
  nextLabel: { color: colors.primary, fontSize: 7, fontWeight: "700" },
  nextName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  nextMeta: { color: colors.muted, fontSize: 8, marginTop: 2 },
  actions: { flexDirection: "row", gap: 6, marginTop: 9 },
  action: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    minHeight: 34,
  },
  actionText: { color: colors.primary, fontSize: 8, fontWeight: "700" },
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
  navHover: { backgroundColor: colors.pink },
  navText: { color: colors.muted, fontSize: 8, marginTop: 2 },
  navTextActive: { color: colors.primary, fontWeight: "700" },
});
