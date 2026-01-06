import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1, // Fallback
    backgroundColor: "#f8fafc",
  },
  mainContent: {
    flex: 1, // Ensures this takes all space above the bottom nav
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f766e",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0fdfa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccfbf1",
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    marginBottom: 4,
    fontWeight: "500",
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  streakNumber: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
  },
  streakDays: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontWeight: "600",
  },
  totalHabits: {
    alignItems: "flex-end",
  },
  totalNumber: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
  habitsList: {
    flex: 1,
  },
  habitsListContent: {
    padding: 24,
    paddingBottom: 100, // Extra padding for FAB
  },
  insightCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  insightText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 24,
    fontWeight: "500",
  },
  insightLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  insightLoadingText: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.9,
  },
  insightFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 6,
    opacity: 0.8,
  },
  insightFooterText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  habitCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  habitIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  habitEmoji: {
    fontSize: 24,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  habitMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  metaDot: {
    color: "#cbd5e1",
    fontSize: 12,
  },
  checkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  checkButtonCompleted: {
    backgroundColor: "#0d9488",
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  checkButtonUncompleted: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  progressBarContainer: {
    marginTop: 16,
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0d9488",
    borderRadius: 3,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  fab: {
    position: "absolute",
    bottom: 24, // Adjusted relative to mainContent
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0f766e",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0f766e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteAction: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginBottom: 16,
    borderRadius: 20,
    marginRight: 24, // Add spacing for swipe visual
  },
  deleteActionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },

  // --- Bottom Navigation (Matching Analytics/Profile) ---
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navButton: {
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  navButtonActive: {
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  navIconContainer: {
    marginBottom: 4,
  },
  navIconContainerActive: {
    marginBottom: 4,
    backgroundColor: "#f0fdfa",
    padding: 8,
    borderRadius: 12,
    marginTop: -8, // Lift effect
  },
  navLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#0d9488",
    fontWeight: "600",
  },
});

export default styles;
