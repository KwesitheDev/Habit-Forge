import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f766e",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#0f172a",
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  frequencyButtonActive: {
    borderColor: "#0d9488",
    backgroundColor: "#f0fdfa",
  },
  frequencyText: {
    fontSize: 14,
    color: "#64748b",
  },
  frequencyTextActive: {
    color: "#0f766e",
    fontWeight: "600",
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
  },
  timeIcon: {
    marginRight: 12,
  },
  timeInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryButton: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  categoryButtonActive: {
    borderColor: "#0d9488",
    backgroundColor: "#f0fdfa",
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: "#334155",
  },
  categoryLabelActive: {
    color: "#0f766e",
    fontWeight: "600",
  },
  // Color picker styles
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorSelected: {
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  insightCard: {
    backgroundColor: "#faf5ff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginTop: 8,
  },
  insightContent: {
    flexDirection: "row",
  },
  insightIcon: {
    marginTop: 4,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#581c87",
    marginBottom: 4,
  },
  insightQuote: {
    fontSize: 13,
    color: "#7c3aed",
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  createButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
