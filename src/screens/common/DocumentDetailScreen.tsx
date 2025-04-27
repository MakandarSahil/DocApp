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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import config from '../../utils/config';
import { Document } from '../../types/document';
import { useDocuments } from '../../context/DocumentsContext';

interface Props {
  route: { params: { document: Document } };
  navigation: any;
}

const DocumentDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { document } = route.params;
  const [remarks, setRemarks] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const { refreshDocuments } = useDocuments();

  // Get safe area insets
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>(null);
  const remarksInputRef = useRef<TextInput>(null);
  const pdfHeight = useRef(new Animated.Value(400)).current;
  const { height: screenHeight } = Dimensions.get('window');

  // Status styles configuration
  const statusStyles = {
    approved: { backgroundColor: '#D1FAE5', textColor: '#065F46' },
    pending: { backgroundColor: '#FEF3C7', textColor: '#92400E' },
    rejected: { backgroundColor: '#FEE2E2', textColor: '#991B1B' },
    correction: { backgroundColor: '#F59E0B', textColor: '#991B1B' }
  };

  const currentStatus = document.status.toLowerCase() as keyof typeof statusStyles;

  // Keyboard handlers
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const keyboardHeight = e.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
        setKeyboardVisible(true);

        Animated.timing(pdfHeight, {
          toValue: 200,
          duration: 300,
          useNativeDriver: false,
        }).start();

        // Scroll to remarks input with a delay to ensure layout is complete
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);

        Animated.timing(pdfHeight, {
          toValue: 400,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // Status bar appearance
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#FFFFFF');
    }, [])
  );

  const scrollToRemarks = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const focusRemarksInput = () => {
    remarksInputRef.current?.focus();
    scrollToRemarks();
  };

  const handleAction = useCallback(async (action: 'approve' | 'reject' | 'correction') => {
    if ((action === 'reject' || action === 'correction') && remarks.trim() === '') {
      Keyboard.dismiss();
      Alert.alert(
        "Remarks Required",
        "Please provide remarks for rejection or correction request.",
        [{
          text: "OK",
          onPress: () => {
            focusRemarksInput();
          }
        }]
      );
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const endpoints = {
        approve: '/file/approve',
        reject: '/file/reject',
        correction: '/file/correction'
      };

      const payload: any = {
        fileUniqueName: document.fileUniqueName,
      };

      if (action !== 'approve') {
        payload.remarks = remarks.trim();
      }

      const response = await axios.post(
        config.API_URL + endpoints[action],
        payload,
        { withCredentials: true }
      );

      await refreshDocuments();

      Alert.alert(
        "Success",
        response.data.message || "Action completed successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      console.error('Action error:', error.response?.data?.message || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to perform action."
      );
    } finally {
      setLoading(false);
    }
  }, [remarks, navigation, document.fileUniqueName]);

  const getActionText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'Document Approved';
      case 'rejected': return 'Document Rejected';
      case 'correction': return 'Sent for Correction';
      default: return '';
    }
  };

  const renderHeader = () => (
    <View style={[
      styles.header,
      // Apply top padding based on safe area insets
      { paddingTop: Math.max(insets.top, 12) }
    ]}>
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
            `Name: ${document.title}\nStatus: ${document.status}\nDate: ${new Date(document.createdDate).toLocaleDateString()}\nRole: ${document.createdBy.fullName}`,
            [{ text: "OK" }]
          );
        }}
      >
        <Icon name="information-outline" size={24} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );

  const renderDocumentInfo = () => (
    <View style={styles.infoCard}>
      <Icon name="file-document-outline" size={24} color="#4B5563" style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={styles.documentName} numberOfLines={2} ellipsizeMode="tail">
          {document.title}
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
          <Text style={styles.metaValue}>
            {new Date(document.createdDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>From:</Text>
          <Text style={styles.metaValue}>
            {document.createdBy.fullName}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderRemarksInfo = () => {
    if (document.status === 'pending') return null;

    const getStatusDate = () => {
      if (currentStatus === 'approved' && document.approvedDate) {
        return new Date(document.approvedDate).toLocaleDateString();
      }
      if (currentStatus === 'rejected' && document.rejectedDate) {
        return new Date(document.rejectedDate).toLocaleDateString();
      }
      if (currentStatus === 'correction' && document.correctionDate) {
        return new Date(document.correctionDate).toLocaleDateString();
      }
      return null;
    };

    return (
      <View style={styles.remarkInfoContainer}>
        <View style={styles.remarkActionRow}>
          {currentStatus === 'approved' && (
            <Icon name="check-circle-outline" size={20} color="#10B981" style={styles.remarkIcon} />
          )}
          {currentStatus === 'rejected' && (
            <Icon name="close-circle-outline" size={20} color="#EF4444" style={styles.remarkIcon} />
          )}
          {currentStatus === 'correction' && (
            <Icon name="pencil-outline" size={20} color="#F59E0B" style={styles.remarkIcon} />
          )}
          <Text style={styles.remarkActionText}>
            {getActionText(currentStatus)}
          </Text>
        </View>

        <Text style={styles.remarkLabel}>Date:</Text>
        <Text style={styles.remarkValue}>
          {getStatusDate() || 'N/A'}
        </Text>

        <Text style={styles.remarkLabel}>Remarks:</Text>
        <Text style={styles.remarkValue}>
          {document.remarks || "No remarks provided."}
        </Text>
      </View>
    );
  };

  const renderPDFPreview = () => (
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
        <View style={styles.pdfPlaceholder}>
          <Icon name="file-pdf-box" size={48} color="#E5E7EB" />
          <Text style={styles.pdfText}>
            PDF preview will be displayed here
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderRemarksInput = () => {
    if (currentStatus !== 'pending') return null;

    return (
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
    );
  };

  const renderActionButtons = () => {
    if (currentStatus !== 'pending') return null;

    return (
      <View style={[
        styles.actionContainer,
        // Apply bottom padding based on safe area insets
        { paddingBottom: Math.max(insets.bottom, 16) }
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
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: 0
        })}
      >
        {renderHeader()}

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            // Add padding at the bottom to ensure content is visible above the action buttons
            {
              paddingBottom: currentStatus === 'pending'
                ? 100 + insets.bottom
                : 16 + insets.bottom
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderDocumentInfo()}
          {renderRemarksInfo()}
          {renderPDFPreview()}
          {renderRemarksInput()}
        </ScrollView>

        {renderActionButtons()}
      </KeyboardAvoidingView>

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
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
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
    paddingTop: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
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
  remarksContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
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
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
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
  remarkInfoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  remarkActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  remarkIcon: {
    marginRight: 8,
  },
  remarkActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  remarkLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  remarkValue: {
    fontSize: 14,
    color: '#1F2937',
  },
});

export default DocumentDetailsScreen;