import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

const quickActions = [
  { title: "Ride", icon: "🚕", accent: "#111827" },
  { title: "Delivery", icon: "🍔", accent: "#1F2937" },
  { title: "Reserve", icon: "📅", accent: "#374151" },
];

const recentTrips = [
  { title: "Trabajo", time: "Hoy, 8:30 AM", price: "$18.50" },
  { title: "Universidad", time: "Ayer, 9:15 PM", price: "$12.20" },
  { title: "Aeropuerto", time: "Lun, 6:40 AM", price: "$34.90" },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView style={styles.topBar}>
            <Pressable style={styles.menuButton}>
              <ThemedText style={styles.menuText}>☰</ThemedText>
            </Pressable>

            <View style={styles.profileBadge}>
              <ThemedText style={styles.profileText}>HP</ThemedText>
            </View>
          </ThemedView>

          <ThemedView style={styles.heroCard}>
            <View style={styles.heroHeader}>
              <ThemedText type="small" style={styles.eyebrow}>
                Buenos días
              </ThemedText>
              <ThemedText type="subtitle" style={styles.greeting}>
                ¿A dónde vamos?
              </ThemedText>
            </View>

            <View style={styles.routeBox}>
              <View style={styles.routePoint}>
                <View style={[styles.dot, styles.dotGreen]} />
                <ThemedText type="small" style={styles.routeLabel}>
                  Calle 45, Centro
                </ThemedText>
              </View>

              <View style={styles.routeDivider} />

              <View style={styles.routePoint}>
                <View style={[styles.dot, styles.dotDark]} />
                <ThemedText type="small" style={styles.routeLabel}>
                  Parque de la Luz
                </ThemedText>
              </View>
            </View>

            <View style={styles.routeMap}>
              <View style={styles.mapLine} />
              <View style={styles.mapPin} />
              <View style={styles.mapPinSecondary} />
            </View>
          </ThemedView>

          <View style={styles.actionsRow}>
            {quickActions.map((action) => (
              <Pressable key={action.title} style={styles.actionCard}>
                <ThemedView
                  style={[
                    styles.actionIcon,
                    { backgroundColor: action.accent },
                  ]}
                >
                  <ThemedText style={styles.actionEmoji}>
                    {action.icon}
                  </ThemedText>
                </ThemedView>
                <ThemedText type="smallBold" style={styles.actionTitle}>
                  {action.title}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <ThemedView style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <ThemedText type="smallBold">Viajes frecuentes</ThemedText>
              <ThemedText type="small" style={styles.linkText}>
                Ver todo
              </ThemedText>
            </View>

            {recentTrips.map((trip) => (
              <View key={trip.title} style={styles.tripRow}>
                <View style={styles.tripLocationIcon}>
                  <ThemedText style={styles.tripLocationText}>📍</ThemedText>
                </View>
                <View style={styles.tripInfo}>
                  <ThemedText type="smallBold">{trip.title}</ThemedText>
                  <ThemedText type="small" style={styles.tripTime}>
                    {trip.time}
                  </ThemedText>
                </View>
                <ThemedText type="smallBold" style={styles.tripPrice}>
                  {trip.price}
                </ThemedText>
              </View>
            ))}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: BottomTabInset,
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.one,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 20,
  },
  profileBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },
  heroCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 28,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  heroHeader: {
    gap: 4,
  },
  eyebrow: {
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  greeting: {
    color: "#111827",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  routeBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  dotGreen: {
    backgroundColor: "#16A34A",
  },
  dotDark: {
    backgroundColor: "#111827",
  },
  routeLabel: {
    color: "#374151",
    flex: 1,
  },
  routeDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginLeft: 4,
  },
  routeMap: {
    height: 120,
    borderRadius: 22,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  mapLine: {
    position: "absolute",
    width: 200,
    height: 2,
    backgroundColor: "#111827",
    transform: [{ rotate: "35deg" }],
  },
  mapPin: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#16A34A",
    left: "18%",
    top: "28%",
    borderWidth: 4,
    borderColor: "#F3F4F6",
  },
  mapPinSecondary: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#111827",
    right: "22%",
    bottom: "24%",
    borderWidth: 4,
    borderColor: "#F3F4F6",
  },
  actionsRow: {
    flexDirection: "row",
    gap: Spacing.three,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 18,
    paddingVertical: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
  },
  actionIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  actionEmoji: {
    fontSize: 24,
    lineHeight: 24,
  },
  actionTitle: {
    color: "#FFFFFF",
  },
  sectionCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkText: {
    color: "#111827",
    fontWeight: "600",
  },
  tripRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    paddingVertical: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tripLocationIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tripLocationText: {
    fontSize: 16,
    lineHeight: 16,
  },
  tripInfo: {
    flex: 1,
    gap: 2,
  },
  tripTime: {
    color: "#6B7280",
  },
  tripPrice: {
    color: "#111827",
  },
});
