import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from '../styles/styles';

const Navigation = ({ 
  userMode, 
  currentView, 
  cartItemsCount, 
  ordersCount, 
  onViewChange 
}) => (
  <View style={styles.navRow}>
    {userMode === "buyer" ? (
      <>
        <TouchableOpacity
          style={[
            styles.navItem,
            currentView === "storefront" && styles.navActive,
          ]}
          onPress={() => onViewChange("storefront")}
        >
          <Text style={styles.navLabel}>Explore Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, currentView === "cart" && styles.navActive]}
          onPress={() => onViewChange("cart")}
        >
          <Text style={styles.navLabel}>Cart ({cartItemsCount})</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity
          style={[
            styles.navItem,
            currentView === "products" && styles.navActive,
          ]}
          onPress={() => onViewChange("products")}
        >
          <Text style={styles.navLabel}>My Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            currentView === "orders" && styles.navActive,
          ]}
          onPress={() => onViewChange("orders")}
        >
          <Text style={styles.navLabel}>Orders ({ordersCount})</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);

export default Navigation;