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
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await login(values.username, values.password, fcmToken);
    } catch (error) {
      console.error('Login error:', error);
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

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Platform
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { WebView } from 'react-native-webview';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const LoginScreen = () => {
//   const [showWebView, setShowWebView] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLoginWebView = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const url = 'http://16.171.232.218:4000/login';
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: 'testuser' }),
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setShowWebView(true);
//       console.log("Logged in successfully, opening WebView...");
//     } catch (error) {
//       console.log('Login failed:', error);
//       setError('Failed to login. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToApp = () => {
//     setShowWebView(false);
//   };

//   // Platform-specific back arrow
//   const BackArrow = () => (
//     <Text style={styles.backArrow}>
//       {Platform.OS === 'ios' ? '←' : '←'}
//     </Text>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {!showWebView ? (
//         <View style={styles.loginContainer}>
//           {error && <Text style={styles.errorText}>{error}</Text>}
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={handleLoginWebView}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Open Dashboard</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.webViewContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={handleBackToApp} style={styles.backButton}>
//               {/* <BackArrow /> */}
//               <Ionicons name="arrow-back" size={24} color="#007bff" />
//               <Text style={styles.backText}>Back to App</Text>
//             </TouchableOpacity>
//           </View>
//           <WebView
//             originWhitelist={['http://*', 'https://*']}
//             source={{ uri: 'http://16.171.232.218:4000/dashboard' }}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//             sharedCookiesEnabled={true}
//             thirdPartyCookiesEnabled={true}
//             startInLoadingState={true}
//             style={styles.webView}
//             renderLoading={() => (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" />
//               </View>
//             )}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loginContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loginButton: {
//     backgroundColor: '#007bff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   webViewContainer: {
//     flex: 1,
//   },
//   header: {
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     backgroundColor: '#f8f9fa',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backArrow: {
//     fontSize: 24,
//     color: '#007bff',
//   },
//   backText: {
//     marginLeft: 5,
//     color: '#007bff',
//     fontSize: 16,
//   },
//   webView: {
//     flex: 1,
//   },
// });


// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();
// const PORT = 4000;

// // Middleware setup
// app.use(
//   cors({
//     origin: true, // Reflects the request origin
//     credentials: true, // Allow cookies
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Login endpoint
// app.post("/login", (req, res) => {
//   const { username } = req.body;

//   if (!username) {
//     return res.status(400).json({ message: "Username required" });
//   }

//   res.cookie("user", username, {
//     httpOnly: true,
//     sameSite: 'None',
//     secure: true,
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   });

//   return res.json({ 
//     message: "Logged in successfully",
//     user: username
//   });
// });

// // Dashboard endpoint - serves PDF inline
// app.get("/dashboard", (req, res) => {
//   if (!req.cookies.user) {
//     return res.status(401).send(`
//       <html>
//         <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
//           <h1>Please login first</h1>
//         </body>
//       </html>
//     `);
//   }

//   const pdfPath = path.join(__dirname, 'public', 'document.pdf');
  
//   // Set headers for inline PDF display
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
  
//   return res.sendFile(pdfPath, (err) => {
//     if (err) {
//       console.error('PDF delivery error:', err);
//       return res.status(500).send('Error displaying PDF');
//     }
//   });
// });

// // Logout endpoint
// app.post("/logout", (req, res) => {
//   res.clearCookie("user");
//   return res.json({ message: "Logged out" });
// });

// // Health check
// app.get("/health", (req, res) => {
//   return res.json({ status: "healthy" });
// });

// // Start server
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });