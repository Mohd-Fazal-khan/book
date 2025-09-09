import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { styles } from "../styles/styles";

const SellerOrders = ({ orders, refreshing, onRefresh, onUpdateStatus }) => {
  return (
    <ScrollView
      style={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Customer Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No orders received yet</Text>
          <Text style={[styles.empty, { marginTop: 8, fontSize: 14 }]}>
            Orders will appear here when customers purchase your books
          </Text>
        </View>
      ) : (
        <View style={{ paddingBottom: 20 }}>
          {orders.map((o) => (
            <View key={o.id} style={styles.orderCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.orderTitle}>
                  Order #{o.id} • {o.buyer_name}
                </Text>
                <Text
                  style={[
                    styles.badge,
                    o.status === "pending" ? styles.badgeWarn : styles.badgeOk,
                  ]}
                >
                  {o.status}
                </Text>
              </View>

              <Text style={styles.orderLine}>
                {o.title} • Quantity: {o.quantity}
              </Text>

              <Text
                style={[
                  styles.orderLine,
                  {
                    fontWeight: "600",
                    color: "#1f2937",
                    marginTop: 8,
                  },
                ]}
              >
                Total: ${(o.price * o.quantity).toFixed(2)}
              </Text>

              {o.status === "pending" && (
                <TouchableOpacity
                  style={[styles.primaryBtn, { marginTop: 16 }]}
                  onPress={() => onUpdateStatus(o.id, "shipped")}
                >
                  <Text style={styles.primaryLabel}>Mark as Shipped</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SellerOrders;
