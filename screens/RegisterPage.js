import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          Name: name,
          Email: email,
          CreatedAt: new Date().toUTCString(),
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log("Error saving user data: ", error);
        });
      } catch (error) {
        console.log("Error creating user: ", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate('Login')}
        style={styles.subtitle}>LOGIN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30FFAE',
  },
  title: {
    top: 140,
    fontSize: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
  },
  input: {
    top: 230,
    width: 328,
    height: 43,
    borderColor: '#2B8B5D',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  subtitle: {
    top: 250,
    fontSize: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
  },
  button: {
    top: 250,
    width: 328,
    height: 50,
    backgroundColor: '#2B8B5D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
