import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
// import Pdf from 'react-native-pdf';
import { Document } from '../../types/document';

interface Props {
  route: { params: { document: Document } };
  navigation: any;
}

const DocumentDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const [remarks, setRemarks] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const remarksInputRef = useRef<TextInput>(null);
  
  // Animation values
  const pdfHeight = useRef(new Animated.Value(400)).current;
  const screenHeight = Dimensions.get('window').height;

  // Handle keyboard appearance
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardVisible(true);
        // Animate PDF container to smaller height when keyboard appears
        Animated.timing(pdfHeight, {
          toValue: 200,
          duration: 300,
          useNativeDriver: false,
        }).start();
        
        // Scroll to remarks input
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        // Animate PDF container back to original height
        Animated.timing(pdfHeight, {
          toValue: 400,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Handle status bar appearance
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#FFFFFF');
    }, [])
  );

  const pdfSource = { uri: document.fileUrl || 'https://example.com/sample.pdf' };

  const handleAction = useCallback((action: 'approve' | 'reject' | 'correction') => {
    if (action !== 'approve' && remarks.trim() === '') {
      Keyboard.dismiss();
      Alert.alert(
        "Remarks Required",
        "Please provide remarks for rejection or correction request.",
        [{ 
          text: "OK", 
          onPress: () => {
            remarksInputRef.current?.focus();
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }
        }]
      );
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const actionText = action === 'approve' ? 'approved' :
        action === 'reject' ? 'rejected' :
          'sent for correction';

      Alert.alert(
        "Success",
        `Document ${actionText} successfully.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }, 1000);
  }, [remarks, navigation]);

  const statusStyles = {
    approved: { backgroundColor: '#D1FAE5', textColor: '#065F46' },
    pending: { backgroundColor: '#FEF3C7', textColor: '#92400E' },
    rejected: { backgroundColor: '#FEE2E2', textColor: '#991B1B' }
  };

  const currentStatus = document.status.toLowerCase() as keyof typeof statusStyles;
  
  const focusRemarksInput = () => {
    remarksInputRef.current?.focus();
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Icon name="arrow-left" size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            Document Details
          </Text>
          <TouchableOpacity 
            style={styles.headerRightButton}
            onPress={() => {
              Alert.alert(
                "Document Information",
                `Name: ${document.name}\nStatus: ${document.status}\nDate: ${document.date}\nRole: ${document.role}`,
                [{ text: "OK" }]
              );
            }}
          >
            <Icon name="information-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({
            ios: 100,
            android: 85
          })}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Document Info */}
            <View style={styles.infoCard}>
              <Icon name="file-document-outline" size={24} color="#4B5563" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.documentName} numberOfLines={2} ellipsizeMode="tail">
                  {document.name}
                </Text>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Status:</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: statusStyles[currentStatus].backgroundColor }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: statusStyles[currentStatus].textColor }
                    ]}>
                      {document.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Date:</Text>
                  <Text style={styles.metaValue} numberOfLines={1} ellipsizeMode="tail">
                    {document.date}
                  </Text>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Role:</Text>
                  <Text style={styles.metaValue} numberOfLines={1} ellipsizeMode="tail">
                    {document.role}
                  </Text>
                </View>
              </View>
            </View>

            {/* PDF Preview */}
            <Animated.View style={[styles.pdfContainer, { height: pdfHeight }]}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Document Preview</Text>
                {isKeyboardVisible && (
                  <TouchableOpacity 
                    style={styles.expandButton}
                    onPress={() => Keyboard.dismiss()}
                  >
                    <Text style={styles.expandButtonText}>Expand</Text>
                    <Icon name="arrow-expand" size={16} color="#3B82F6" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.pdfWrapper}>
                {pdfLoading && (
                  <View style={styles.pdfLoading}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text style={styles.loadingText}>Loading document...</Text>
                  </View>
                )}

                <View style={styles.pdfPlaceholder}>
                  <Icon name="file-pdf-box" size={48} color="#E5E7EB" />
                  <Text style={styles.pdfText}>
                    PDF preview will be displayed here
                  </Text>
                </View>
                {/* <Pdf
                  source={pdfSource}
                  onLoadComplete={() => setPdfLoading(false)}
                  onError={(error) => {
                    console.log('PDF Error: ', error);
                    setPdfLoading(false);
                    Alert.alert("Error", "Failed to load document preview");
                  }}
                  style={styles.pdf}
                /> */}
              </View>
            </Animated.View>

            {/* Remarks Input */}
            <View style={styles.remarksContainer}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Remarks</Text>
                <TouchableOpacity 
                  style={styles.addRemarksButton}
                  onPress={focusRemarksInput}
                >
                  <Text style={styles.addRemarksText}>Add remarks</Text>
                  <Icon name="pencil" size={16} color="#3B82F6" />
                </TouchableOpacity>
              </View>
              <TextInput
                ref={remarksInputRef}
                style={[
                  styles.remarksInput,
                  isKeyboardVisible && styles.remarksInputFocused
                ]}
                multiline
                placeholder="Add your remarks here..."
                placeholderTextColor="#9CA3AF"
                value={remarks}
                onChangeText={setRemarks}
                textAlignVertical="top"
                returnKeyType="default"
              />
            </View>
            
            {/* Extra padding at bottom for keyboard */}
            {/* <View style={{ height: Platform.OS === 'ios' ? 120 : 150 }} /> */}
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Action Buttons */}
        <View style={[
          styles.actionContainer,
          isKeyboardVisible && styles.actionContainerWithKeyboard
        ]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleAction('approve')}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Icon name="check-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.correctionButton]}
            onPress={() => handleAction('correction')}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Icon name="pencil-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Correction</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleAction('reject')}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Icon name="close-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingOverlayText}>Processing...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  headerRightButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    // marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    width: 60,
  },
  metaValue: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  pdfContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    overflow: 'hidden',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 4,
  },
  pdfWrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pdfText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  pdfLoading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  remarksContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  addRemarksButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addRemarksText: {
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 4,
  },
  remarksInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
    fontSize: 14,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  remarksInputFocused: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  actionContainerWithKeyboard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  correctionButton: {
    backgroundColor: '#F59E0B',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  loadingOverlayText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
});

export default DocumentDetailsScreen;