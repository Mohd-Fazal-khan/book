import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { styles } from '../styles/styles';

const { width } = Dimensions.get("window");

const Header = ({ userMode, onToggleUserMode, pulse }) => (
  <View style={styles.headerWrap}>
    <View style={styles.headerLeft}>
      <Text style={styles.brand}>Paper & Pixel</Text>
      <Text style={styles.tagline}>Curated books • premium experience</Text>
    </View>

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggleUserMode}
      style={styles.roleButton}
    >
      <Animated.View
        style={[styles.pulse, { transform: [{ scale: pulse }] }]}
      />
      <Text style={styles.roleText}>
        {userMode === "buyer" ? "👤 Buyer" : "🏪 Seller"}
      </Text>
    </TouchableOpacity>
  </View>
);

export default Header;