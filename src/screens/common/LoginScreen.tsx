import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  ScrollView,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

// Types
interface LoginFormValues {
  username: string;
  password: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const { fcmToken } = useNotification();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const passwordInputRef = useRef<TextInput>(null);
  const [error, setError] = useState<string | null>(null); // For error message
  const [success, setSuccess] = useState<string | null>(null); // For success message

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setError(null); // Reset previous error
    setSuccess(null); // Reset previous success message
    try {
      await login(values.username, values.password, fcmToken);
      setSuccess('Login successful!'); // Show success message
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.'); // Show error message
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry(prev => !prev);
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleContactAdmin = () => {
    Linking.openURL(`tel:+91 9579891114`);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#f4f6f8' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>DA</Text>
              </View>
            </View>

            {/* Titles */}
            <Text style={styles.title}>Welcome to DocApp</Text>
            <Text style={styles.subtitle}>Login to access your dashboard</Text>

            {/* Error or Success Message */}
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            {success && (
              <Text style={styles.successText}>{success}</Text>
            )}

            {/* Formik Form */}
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <View style={styles.form}>
                  {/* Username */}
                  <Text style={styles.inputLabel}>Username</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      touched.username && errors.username && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      placeholder="Enter username"
                      placeholderTextColor="#adb5bd"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  {/* Password */}
                  <Text style={styles.inputLabel}>Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      touched.password && errors.password && styles.inputError,
                    ]}
                  >
                    <TextInput
                      ref={passwordInputRef}
                      style={styles.input}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Enter password"
                      placeholderTextColor="#adb5bd"
                      secureTextEntry={secureTextEntry}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="go"
                      onSubmitEditing={() => handleSubmit()}
                    />
                    <TouchableOpacity
                      onPress={toggleSecureEntry}
                      style={styles.eyeIcon}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.eyeIconText}>
                        {secureTextEntry ? '👁️' : '🙈'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={[
                      styles.loginButton,
                      isSubmitting && styles.loginButtonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                    activeOpacity={0.8}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={styles.loginButtonText}>Login</Text>
                    )}
                  </TouchableOpacity>

                  {/* Footer */}
                  <View style={styles.footer}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                    <TouchableOpacity activeOpacity={0.6}>
                      <Text
                        onPress={handleContactAdmin}
                        style={styles.contactText}
                      >
                        {' '}
                        Contact Admin
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(LoginScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: '#0d6efd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    paddingHorizontal: 14,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#212529',
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  eyeIconText: {
    fontSize: 18,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
    marginLeft: 4,
  },
  successText: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#0d6efd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  forgotText: {
    fontSize: 14,
    color: '#6c757d',
  },
  contactText: {
    fontSize: 14,
    color: '#0d6efd',
    fontWeight: '600',
  },
});
