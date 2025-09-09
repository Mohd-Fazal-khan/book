import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Header from "./componets/Header";
import Navigation from "./componets/Navigation";
import Storefront from "./screens/StoreFront";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./componets/Cart";
import SellerProducts from "./screens/SellerProducts";
import SellerOrders from "./screens/SellerOrders";
import AddEditModal from "./componets/AddEditModal";
import { apiCall } from "./utils/api";
import { styles } from "./styles/styles";

const CURRENT_BUYER_ID = 1;
const CURRENT_SELLER_ID = 2;

export default function App() {
  const [userMode, setUserMode] = useState("buyer");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("storefront");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pulse = useRef(new Animated.Value(1)).current;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });

  useEffect(() => {
    loadInitialData();
    startPulse();
  }, [userMode]);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadInitialData = async () => {
    if (userMode === "buyer") {
      await Promise.all([loadProducts(), loadCart()]);
      setCurrentView("storefront");
    } else {
      await Promise.all([loadSellerProducts(), loadSellerOrders()]);
      setCurrentView("products");
    }
    setSelectedProduct(null);
  };

  const loadProducts = async () => {
    setLoading(true);
    const data = await apiCall("/products");
    if (!data.error) setProducts(data || []);
    setLoading(false);
  };

  const loadCart = async () => {
    const data = await apiCall(`/cart/buyer/${CURRENT_BUYER_ID}`);
    if (!data.error) setCartItems(data || []);
  };

  const loadSellerProducts = async () => {
    setLoading(true);
    const data = await apiCall(`/products/seller/${CURRENT_SELLER_ID}`);
    if (!data.error) setProducts(data || []);
    setLoading(false);
  };

  const loadSellerOrders = async () => {
    const data = await apiCall(`/orders/seller/${CURRENT_SELLER_ID}`);
    if (!data.error) setOrders(data || []);
  };

  const addToCart = async (product) => {
    setLoading(true);
    const res = await apiCall("/cart", {
      method: "POST",
      body: JSON.stringify({
        buyer_id: CURRENT_BUYER_ID,
        book_id: product.id,
        quantity: 1,
      }),
    });
    setLoading(false);
    if (!res.error) {
      Alert.alert(
        "Added to Cart",
        `${product.title} has been added to your cart`,
        [
          {
            text: "Continue Shopping",
            style: "cancel",
          },
          {
            text: "View Cart",
            onPress: () => setCurrentView("cart"),
          },
        ]
      );
      await loadCart();
      setSelectedProduct(null);
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const checkout = async () => {
    Alert.alert("Confirm Order", "Are you sure you want to place this order?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Place Order",
        onPress: async () => {
          setLoading(true);
          const res = await apiCall("/orders/checkout", {
            method: "POST",
            body: JSON.stringify({ buyer_id: CURRENT_BUYER_ID }),
          });
          setLoading(false);
          if (!res.error) {
            Alert.alert(
              "Order Placed Successfully!",
              `Thank you for your order. ${
                res.totalOrders || 0
              } items have been ordered.`,
              [
                {
                  text: "Continue Shopping",
                  onPress: () => setCurrentView("storefront"),
                },
              ]
            );
            await loadCart();
          } else {
            Alert.alert("Order Failed", res.error);
          }
        },
      },
    ]);
  };

  const createProduct = async () => {
    if (!form.title || !form.price || !form.stock) {
      return Alert.alert(
        "Missing Information",
        "Please fill in all required fields (Title, Price, Stock)"
      );
    }

    setLoading(true);
    const res = await apiCall("/products", {
      method: "POST",
      body: JSON.stringify({
        seller_id: CURRENT_SELLER_ID,
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      }),
    });
    setLoading(false);

    if (!res.error) {
      Alert.alert(
        "Book Added",
        "Your book has been successfully added to your library"
      );
      setShowAddModal(false);
      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
      });
      await loadSellerProducts();
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const deleteProduct = async (id) => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            const res = await apiCall(`/products/${id}`, { method: "DELETE" });
            setLoading(false);
            if (!res.error) {
              Alert.alert(
                "Book Deleted",
                "The book has been successfully removed from your library"
              );
              await loadSellerProducts();
              if (selectedProduct && selectedProduct.id === id) {
                setSelectedProduct(null);
                setCurrentView("products");
              }
            } else {
              Alert.alert("Error", res.error);
            }
          },
        },
      ]
    );
  };

  const openEdit = (product) => {
    setForm({
      title: product.title || "",
      description: product.description || "",
      price: String(product.price || ""),
      stock: String(product.stock || ""),
      image_url: product.image_url || "",
      id: product.id,
    });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    const id = form.id;
    if (!id) return Alert.alert("Error", "No product selected for editing");

    if (!form.title || !form.price || !form.stock) {
      return Alert.alert(
        "Missing Information",
        "Please fill in all required fields (Title, Price, Stock)"
      );
    }

    setLoading(true);
    const res = await apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      }),
    });
    setLoading(false);

    if (!res.error) {
      Alert.alert("Changes Saved", "Your book has been successfully updated");
      setShowEditModal(false);
      await loadSellerProducts();
      // Update selected product if it's the one being edited
      if (selectedProduct && selectedProduct.id === id) {
        setSelectedProduct({
          ...selectedProduct,
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
        });
      }
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const removeCartItem = async (cartItem) => {
    setLoading(true);
    const res = await apiCall(`/cart/${cartItem.id}`, { method: "DELETE" });
    setLoading(false);
    if (!res.error) {
      await loadCart();
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const updateCartQuantity = async (cartItem, delta) => {
    const newQty = cartItem.quantity + delta;
    if (newQty < 1) return removeCartItem(cartItem);

    setLoading(true);
    const res = await apiCall(`/cart/${cartItem.id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: newQty }),
    });
    setLoading(false);

    if (!res.error) {
      await loadCart();
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    const res = await apiCall(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    setLoading(false);

    if (!res.error) {
      Alert.alert("Order Updated", `Order has been marked as ${status}`);
      await loadSellerOrders();
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const toggleUserMode = () => {
    setUserMode((m) => (m === "buyer" ? "seller" : "buyer"));
    setSelectedProduct(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const handleOpenAddModal = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
    });
    setShowAddModal(true);
  };

  const renderCurrent = () => {
    if (userMode === "buyer") {
      if (selectedProduct) {
        return (
          <ProductDetails
            product={selectedProduct}
            userMode={userMode}
            onBack={() => {
              setSelectedProduct(null);
              setCurrentView("storefront");
            }}
            onAddToCart={addToCart}
            onEdit={openEdit}
            onDelete={deleteProduct}
          />
        );
      }
      return currentView === "storefront" ? (
        <Storefront
          products={products}
          loading={loading}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onProductPress={setSelectedProduct}
        />
      ) : (
        <Cart
          cartItems={cartItems}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeCartItem}
          onCheckout={checkout}
        />
      );
    }

    if (selectedProduct) {
      return (
        <ProductDetails
          product={selectedProduct}
          userMode={userMode}
          onBack={() => {
            setSelectedProduct(null);
            setCurrentView("products");
          }}
          onAddToCart={addToCart}
          onEdit={openEdit}
          onDelete={deleteProduct}
        />
      );
    }

    return currentView === "products" ? (
      <SellerProducts
        products={products}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEdit={openEdit}
        onDelete={deleteProduct}
        onAddProduct={handleOpenAddModal}
      />
    ) : (
      <SellerOrders
        orders={orders}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onUpdateStatus={updateOrderStatus}
      />
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Header
        userMode={userMode}
        onToggleUserMode={toggleUserMode}
        pulse={pulse}
      />

      <Navigation
        userMode={userMode}
        currentView={currentView}
        cartItemsCount={cartItems.length}
        ordersCount={orders.length}
        onViewChange={setCurrentView}
      />

      {renderCurrent()}

      <AddEditModal
        visible={showAddModal}
        form={form}
        setForm={setForm}
        onClose={() => setShowAddModal(false)}
        onSave={createProduct}
        isEdit={false}
      />

      <AddEditModal
        visible={showEditModal}
        form={form}
        setForm={setForm}
        onClose={() => setShowEditModal(false)}
        onSave={saveEdit}
        isEdit={true}
      />

      {userMode === "seller" && (
        <TouchableOpacity
          style={styles.fabSticky}
          onPress={handleOpenAddModal}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
