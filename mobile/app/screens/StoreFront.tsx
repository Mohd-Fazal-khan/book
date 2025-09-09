import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import ProductCard from "../componets/ProductCard";
import { styles } from "../styles/styles";

const Storefront = ({
  products,
  loading,
  refreshing,
  onRefresh,
  onProductPress,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header with title and search icon */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Discover Books</Text>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Ionicons name="search" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Search Bar (Visible when icon clicked) */}
      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      <Text
        style={[
          styles.empty,
          { textAlign: "left", marginTop: -8, marginBottom: 20, fontSize: 16 },
        ]}
      >
        Handpicked collection of premium books
      </Text>

      {loading ? (
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={[styles.empty, { marginTop: 16 }]}>Loading books...</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No books found</Text>
          <Text style={[styles.empty, { marginTop: 8, fontSize: 14 }]}>
            Try searching for something else
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} item={p} onPress={() => onProductPress(p)} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Storefront;
