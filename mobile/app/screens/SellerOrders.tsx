import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
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
                  marginBottom: 12,
                }}
              >
                <Text style={styles.orderTitle}>
                  Order #{o.id} • {o.buyer_name || 'Unknown Buyer'}
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

              {/* Product Image and Details */}
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                backgroundColor: '#f9fafb',
                borderRadius: 8,
                padding: 12,
              }}>
                {o.image_url && (
                  <Image
                    source={{ uri: o.image_url }}
                    style={{
                      width: 60,
                      height: 80,
                      borderRadius: 6,
                      backgroundColor: '#e5e7eb',
                      marginRight: 12,
                    }}
                    resizeMode="cover"
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: 4,
                  }}>
                    {o.title || o.book_title || 'Unknown Book'}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#6b7280',
                    marginBottom: 2,
                  }}>
                    Quantity: {o.quantity}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#6b7280',
                  }}>
                    Unit Price: ${o.price ? Number(o.price).toFixed(2) : '0.00'}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.orderLine,
                  {
                    fontWeight: "700",
                    color: "#1f2937",
                    fontSize: 16,
                    textAlign: 'right',
                    backgroundColor: '#f3f4f6',
                    padding: 8,
                    borderRadius: 6,
                  },
                ]}
              >
                Total: ${(Number(o.price || 0) * Number(o.quantity || 0)).toFixed(2)}
              </Text>

              {o.status === "pending" && (
                <TouchableOpacity
                  style={[styles.primaryBtn, { marginTop: 16 }]}
                  onPress={() => onUpdateStatus(o.id, "shipped")}
                >
                  <Text style={styles.primaryLabel}>Mark as Shipped</Text>
                </TouchableOpacity>
              )}

              {o.status === "shipped" && (
                <View style={{
                  marginTop: 16,
                  backgroundColor: '#dcfce7',
                  padding: 12,
                  borderRadius: 6,
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: '#16a34a',
                    fontWeight: '600',
                    fontSize: 14,
                  }}>
                    ✓ Order Shipped Successfully
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SellerOrders;