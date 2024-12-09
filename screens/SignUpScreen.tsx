import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpScreen = ({ navigation }: any) => {
  const handleSignUp = (values: any) => {
    Alert.alert('Sign Up Successful', `Account created for ${values.email}`);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        })}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Text style={styles.title}>Create Your Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7f8c8d"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#7f8c8d"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
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
    backgroundColor: '#e74c3c',
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

export default SignUpScreen;
