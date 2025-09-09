import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { styles } from "../styles/styles";

const SellerProducts = ({
  products,
  loading,
  refreshing,
  onRefresh,
  onEdit,
  onDelete,
  onAddProduct,
}) => (
  <ScrollView
    style={styles.content}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>Your Library</Text>
    </View>

    {loading ? (
      <View style={{ marginTop: 60, alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color="#3b82f6"
        />
        <Text style={[styles.empty, { marginTop: 16 }]}>Loading books...</Text>
      </View>
    ) : products.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}>No books in your library yet</Text>
        <Text style={[styles.empty, { marginTop: 8, fontSize: 14 }]}>
          Start by adding your first book using the + button
        </Text>
      </View>
    ) : (
      <View style={{ paddingBottom: 100 }}>
        {products.map((p) => (
          <View key={p.id} style={styles.cardSmall}>
            <Image
              source={{ uri: p.image_url }}
              style={styles.cardImageSmall}
            />
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: "center" }}>
              <Text numberOfLines={2} style={styles.cardTitleSmall}>
                {p.title}
              </Text>
              <Text style={styles.cardMetaSmall}>
                {p.stock} in stock • ${p.price}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => onEdit(p)}
                >
                  <Text style={styles.smallBtnTxt}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.smallBtn,
                    { 
                      backgroundColor: "#fef2f2", 
                      borderWidth: 1,
                      borderColor: "#fecaca",
                      marginLeft: 0,
                    },
                  ]}
                  onPress={() => onDelete(p.id)}
                >
                  <Text style={[styles.smallBtnTxt, { color: "#ef4444" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    )}
  </ScrollView>
);

export default SellerProducts;