import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

const ProductDetails = ({
  product,
  userMode,
  onBack,
  onAddToCart,
  onEdit,
  onDelete,
}) => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Product Details</Text>
    </View>

    {/* Product Card */}
    <View style={styles.card1}>
      <Image source={{ uri: product.image_url }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.meta}>
          {product.seller_name || "Unknown Seller"} • Stock {product.stock}
        </Text>
        <Text style={styles.description}>
          {product.description || "No description available."}
        </Text>
      </View>

      {/* Buyer Button */}
      {userMode === "buyer" && (
        <TouchableOpacity
          style={[styles.primaryBtn1, product.stock <= 0 && styles.disabledBtn1]}
          disabled={product.stock <= 0}
          onPress={() => onAddToCart(product)}
        >
          <Text style={styles.primaryLabel1}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Seller Actions */}
      {userMode === "seller" && (
        <View style={styles.sellerActions}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => onEdit(product)}
          >
            <Ionicons name="create-outline" size={20} color="#0b84ff" />
            <Text style={styles.editLabel}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(product.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
            <Text style={styles.deleteLabel}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </ScrollView>
);


export default ProductDetails;
