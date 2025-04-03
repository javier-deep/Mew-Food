import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditarPerfil = () => {
    const [name, setName] = useState('');
    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const updateProfile = () => {
        Alert.alert("Guardado", "¡Datos actualizados correctamente!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Edita tu perfil</Text>
                {['Nombre:', 'Teléfono:', 'Correo:'].map((label, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={label}
                            placeholderTextColor="#9CA3AF"
                            onChangeText={(text) => {
                                switch (index) {
                                    case 0: setName(text); break;
                                    case 1: setPhone(text); break;
                                    case 2: setEmail(text); break;
                                }
                            }}
                            value={[name,  phone, email][index]}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                    <Text style={styles.imageButtonText}>{image ? 'Imagen seleccionada' : 'Seleccionar imagen'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
                    <Text style={styles.saveButtonText}>Editar datos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#8bd4c4',
        padding: 20,
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    imageButton: {
        backgroundColor: '#e0f7fa',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    imageButtonText: {
        color: '#000',
    },
    saveButton: {
        backgroundColor: '#b2ffff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
export default EditarPerfil;
