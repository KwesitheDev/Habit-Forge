import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const CARD_PADDING = 20;
const CHART_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_PADDING * 2;
const CALENDAR_DAY_SIZE =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_PADDING * 2 - 24) / 7;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: Platform.OS === "android" ? 16 : 12,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f0fdfa",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f766e",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: HORIZONTAL_PADDING,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#f0fdfa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d9488",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  // Insight Card
  insightCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  insightIconContainer: {
    width: 44,
    height: 30,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  insightHeaderText: {
    marginLeft: 14,
    flex: 1,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  insightSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  insightContent: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 20,
  },
  predictionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  predictionNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -2,
  },
  trendBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  predictionLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  predictionDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 16,
  },
  predictionText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },

  // Quick Stats
  quickStatsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickStatPrimary: {
    borderTopWidth: 3,
    borderTopColor: "#f97316",
  },
  quickStatSecondary: {
    borderTopWidth: 3,
    borderTopColor: "#0d9488",
  },
  quickStatTertiary: {
    borderTopWidth: 3,
    borderTopColor: "#8b5cf6",
  },
  quickStatIcon: {
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },
  quickStatLabel: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: CARD_PADDING,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  percentageBadge: {
    backgroundColor: "#f0fdfa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0d9488",
  },

  // Calendar
  calendarContainer: {
    overflow: "hidden",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 16,
  },
  legendLabel: {
    fontSize: 11,
    color: "#94a3b8",
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  weekdayHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  weekdayLabel: {
    width: CALENDAR_DAY_SIZE,
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 4,
  },
  calendarDay: {
    width: CALENDAR_DAY_SIZE,
    height: CALENDAR_DAY_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayToday: {
    borderWidth: 2,
    borderColor: "#0d9488",
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: "600",
  },
  todayNumber: {
    fontWeight: "800",
  },

  // Charts
  chartScrollContent: {
    paddingRight: 4,
  },
  chartWrapper: {
    overflow: "hidden",
    borderRadius: 12,
  },
  chart: {
    marginLeft: -16,
    borderRadius: 12,
  },

  // Habit Performance
  habitListScroll: {
    maxHeight: 250,
  },
  habitPerformanceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  habitPerformanceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  habitColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  habitPerformanceInfo: {
    flex: 1,
  },
  habitPerformanceName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
  },
  habitPerformanceStreak: {
    fontSize: 12,
    color: "#f97316",
  },
  habitPerformanceRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0d9488",
    borderRadius: 3,
  },
  habitPerformancePercent: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0d9488",
    width: 40,
    textAlign: "right",
  },

  bottomSpacer: {
    height: 20,
  },

  // Bottom Navigation
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
  },
  navButtonActive: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navIconContainer: {
    marginBottom: 4,
  },
  navIconContainerActive: {
    marginBottom: 4,
    backgroundColor: "#f0fdfa",
    padding: 8,
    borderRadius: 12,
    marginTop: -8,
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
