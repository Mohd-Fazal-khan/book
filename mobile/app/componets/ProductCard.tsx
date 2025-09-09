import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from "react-native";
import { styles } from '../styles/styles';

const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.95}
    style={styles.card}
    onPress={onPress}
  >
    <Image source={{ uri: item.image_url }} style={styles.cardImage} />
    <View style={styles.cardBody}>
      <Text numberOfLines={2} style={styles.cardTitle}>
        {item.title}
      </Text>
      <Text style={styles.cardMeta}>
        {item.seller_name ? `by ${item.seller_name}` : ""}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>${item.price}</Text>
        <Text style={styles.cardStock}>{item.stock} in stock</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default ProductCard;