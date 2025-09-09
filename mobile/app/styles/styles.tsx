import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

searchInput: {
  backgroundColor: "#f3f4f6",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  fontSize: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#d1d5db",
},


  headerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  headerLeft: {
    maxWidth: width * 0.65,
  },

  brand: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },

  tagline: {
    color: "#64748b",
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  roleButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  pulse: {
    position: "absolute",
    left: -8,
    top: -8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
  },

  roleText: {
    color: "#ffffff",
    fontWeight: "700",
    zIndex: 10,
    fontSize: 15,
  },

  navRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  navItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    minWidth: 100,
    alignItems: "center",
  },

  navActive: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  navLabel: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 15,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 20,
    color: "#1f2937",
    letterSpacing: -0.3,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },

  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  cardBody: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    lineHeight: 22,
    marginBottom: 6,
  },

  cardMeta: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 12,
  },

  cardFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  cardPrice: {
    color: "#3b82f6",
    fontWeight: "800",
    fontSize: 18,
  },

  cardStock: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 12,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6, // added spacing
  },

  detailsWrap: {
    padding: 24,
    alignItems: "center",
  },

  back: {
    color: "#3b82f6",
    alignSelf: "flex-start",
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 16,
  },

  detailImage: {
    width: 240,
    height: 360,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  detailTitle: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#1f2937",
    lineHeight: 36,
    marginBottom: 8,
  },

  detailPrice: {
    color: "#3b82f6",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  detailMeta: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 16,
  },

  detailDesc: {
    color: "#374151",
    textAlign: "center",
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  primaryBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    elevation: 3,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // primaryBtn: {
  //   marginTop: 24,
  //   backgroundColor: "#3b82f6",
  //   paddingVertical: 16,
  //   paddingHorizontal: 32,
  //   borderRadius: 16,
  //   alignItems: "center",
  //   shadowColor: "#3b82f6",
  //   shadowOffset: { width: 0, height: 6 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 12,
  //   elevation: 8,
  // },
  primaryLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  disabledBtn: {
    backgroundColor: "#94a3b8",
    shadowOpacity: 0.1,
  },

 ghostBtn: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
  },

  ghostBtnDanger: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  ghostLabel: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  cartRow: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  cartThumb: {
    width: 90,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },

  cartTitle: {
    fontWeight: "700",
    color: "#1f2937",
    fontSize: 16,
    marginBottom: 4,
  },

  cartPrice: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },

 qtyRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between", // ✅ ensures proper alignment
  marginTop: 8,
  flexWrap: "wrap", // ✅ allows wrapping on smaller screens
},

qtyBtn: {
  backgroundColor: "#eff6ff",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 10,
  minWidth: 40,
  alignItems: "center",
},

  qtyText: {
    fontWeight: "700",
    color: "#3b82f6",
    fontSize: 16,
  },

 qtyNumber: {
  marginHorizontal: 16,
  fontWeight: "600",
  fontSize: 16,
  color: "#1f2937",
},

removeBtn: {
  marginLeft: 8, // ✅ reduce margin so it doesn't push out
},

  removeTxt: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 14,
  },

  totalRow: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },

  totalValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
  },

  checkout: {
    backgroundColor: "#10b981",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  checkoutTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 17,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  fab: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  fabText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 20,
  },

  fabSticky: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#3b82f6",
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },

  cardSmall: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  cardImageSmall: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },

  cardTitleSmall: {
    fontWeight: "700",
    color: "#1f2937",
    fontSize: 16,
    lineHeight: 20,
  },

  cardMetaSmall: {
    color: "#3b82f6",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 4,
  },

  smallBtn: {
    backgroundColor: "#eff6ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
  },

  smallBtnTxt: {
    fontWeight: "600",
    color: "#3b82f6",
    fontSize: 14,
  },

  orderCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  orderTitle: {
    fontWeight: "700",
    color: "#1f2937",
    fontSize: 16,
    marginBottom: 8,
  },

  orderLine: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  badgeWarn: {
    backgroundColor: "#f59e0b",
  },

  badgeOk: {
    backgroundColor: "#10b981",
  },

  empty: {
    textAlign: "center",
    marginTop: 60,
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "500",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  

 modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    minWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 24,
  },

 input: {
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#fafbfc",
    marginBottom: 16,
    color: "#374151",
  },
  container: { flex: 1, backgroundColor: "#f6f8fa" },

  header: {
    backgroundColor: "#0b84ff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 3,
  },

  backBtn: {
    backgroundColor: "#0b84ff",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    borderColor:'#ffff',
    // borderWidth:1,
    // elevation:5
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  card1: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    marginBottom: 16,
  },

  cardContent: { alignItems: "center" },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0b1226",
    textAlign: "center",
  },

  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0b84ff",
    marginVertical: 8,
  },

  meta: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 12,
  },

  description: {
    color: "#374151",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 8,
  },

  primaryBtn1: {
    backgroundColor: "#0b84ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    elevation: 4,
  },

  primaryLabel1: { color: "#fff", fontWeight: "800", fontSize: 16 },

  disabledBtn1: { backgroundColor: "#9aa6b2" },
  

  sellerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#eef6ff",
    marginRight: 10,
  },

  editLabel: { marginLeft: 8, fontWeight: "700", color: "#0b84ff" },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#fff5f5",
  },

  deleteLabel: { marginLeft: 8, fontWeight: "700", color: "#ff4d4d" },
});
