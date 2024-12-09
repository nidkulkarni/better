import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validation Schema for Login
const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }: any) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredEmail = async () => {
      const email = await AsyncStorage.getItem('email');
      if (email) {
        setStoredEmail(email);
        setRememberMe(true);
      }
    };
    loadStoredEmail();
  }, []);

  const handleLogin = async (values: any) => {
    if (rememberMe) {
      await AsyncStorage.setItem('email', values.email);
    } else {
      await AsyncStorage.removeItem('email');
    }
    Alert.alert('Login Successful', `Welcome back, ${values.email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: storedEmail || '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkbox}
              >
                <View style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]} />
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>

            <Button title="Login" onPress={handleSubmit} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.switchScreen}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#f7f9fb',
    },
    form: {
      backgroundColor: '#ffffff',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#34495e',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 50,
      backgroundColor: '#ecf0f1',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: '#34495e',
    },
    button: {
      backgroundColor: '#3498db',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: '#e74c3c',
      fontSize: 12,
      marginBottom: 5,
    },
    linkText: {
      color: '#2ecc71',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 14,
      fontWeight: '600',
    },
  });
  

export default LoginScreen;
