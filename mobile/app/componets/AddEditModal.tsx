import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/styles';

// Cloudinary configuration
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhsvjvgec/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';

const AddEditModal = ({ visible, form, setForm, onClose, onSave, isEdit = false }) => {
  const [imageUploading, setImageUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to select images.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const uploadImageToCloudinary = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'book-image.jpg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openGallery() },
      ]
    );
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera permissions.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handleImageSelection(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handleImageSelection(result.assets[0].uri);
    }
  };

  const handleImageSelection = async (imageUri) => {
    setImageUploading(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(imageUri);
      setForm(prev => ({ ...prev, image_url: uploadedUrl }));
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload Failed', 'Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove the selected image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setForm(prev => ({ ...prev, image_url: '' }))
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {isEdit ? "Edit Book" : "Add New Book"}
            </Text>
              
            <TextInput
              placeholder="Book title *"
              value={form.title}
              onChangeText={(t) => setForm((s) => ({ ...s, title: t }))}
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              placeholder="Description (optional)"
              value={form.description}
              onChangeText={(t) => setForm((s) => ({ ...s, description: t }))}
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              multiline
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              placeholder="Price *"
              value={form.price}
              onChangeText={(t) => setForm((s) => ({ ...s, price: t }))}
              style={styles.input}
              keyboardType="decimal-pad"
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              placeholder="Stock quantity *"
              value={form.stock}
              onChangeText={(t) => setForm((s) => ({ ...s, stock: t }))}
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="#9ca3af"
            />

            {/* Image Selection Section */}
            <View style={{ marginVertical: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280', 
                marginBottom: 8,
                fontWeight: '500'
              }}>
                Book Cover Image
              </Text>
              
              {form.image_url ? (
                <View style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 12,
                  position: 'relative'
                }}>
                  <Image
                    source={{ uri: form.image_url }}
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: '#f3f4f6'
                    }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 20,
                      width: 32,
                      height: 32,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={removeImage}
                  >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>×</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{
                  height: 200,
                  backgroundColor: '#f9fafb',
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#e5e7eb',
                  borderStyle: 'dashed',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12
                }}>
                  <Text style={{
                    color: '#9ca3af',
                    fontSize: 16,
                    marginBottom: 8
                  }}>
                    No image selected
                  </Text>
                  <Text style={{
                    color: '#6b7280',
                    fontSize: 12,
                    textAlign: 'center'
                  }}>
                    Tap the button below to add a cover image
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={{
                  backgroundColor: '#f3f4f6',
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
                onPress={selectImage}
                disabled={imageUploading}
              >
                {imageUploading ? (
                  <>
                    <ActivityIndicator size="small" color="#3b82f6" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#6b7280', fontWeight: '500' }}>
                      Uploading...
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={{ color: '#374151', fontWeight: '500', marginRight: 8 }}>
                      📷
                    </Text>
                    <Text style={{ color: '#374151', fontWeight: '500' }}>
                      {form.image_url ? 'Change Image' : 'Select Image'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                gap: 12,
              }}
            >
              <TouchableOpacity
                style={[styles.ghostBtn, { flex: 1 }]}
                onPress={onClose}
                disabled={imageUploading}
              >
                <Text style={styles.ghostLabel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.primaryBtn, 
                  { flex: 1, marginTop: 0 },
                  imageUploading && { opacity: 0.6 }
                ]}
                onPress={onSave}
                disabled={imageUploading}
              >
                <Text style={styles.primaryLabel}>
                  {isEdit ? "Save Changes" : "Add Book"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddEditModal;