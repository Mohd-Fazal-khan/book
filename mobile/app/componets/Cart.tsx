import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { styles } from "../styles/styles";

const Cart = ({
  cartItems,
  refreshing,
  onRefresh,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ScrollView
      style={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Your cart is empty</Text>
          <Text style={[styles.empty, { marginTop: 8, fontSize: 14 }]}>
            Start exploring books to add items to your cart
          </Text>
        </View>
      ) : (
        <View style={{ paddingBottom: 140 }}>
          {cartItems.map((c) => (
            <View key={c.id} style={styles.cartRow}>
              <Image source={{ uri: c.image_url }} style={styles.cartThumb} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.cartTitle}>{c.title}</Text>
                <Text style={styles.cartPrice}>
                  ${c.price} • Total: ${(c.price * c.quantity).toFixed(2)}
                </Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => onUpdateQuantity(c, -1)}
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNumber}>{c.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => onUpdateQuantity(c, 1)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => onRemoveItem(c)}
                  >
                    <Text style={styles.removeTxt}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkout} onPress={onCheckout}>
            <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Cart;