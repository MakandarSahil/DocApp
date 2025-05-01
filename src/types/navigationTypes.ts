// navigationTypes.ts
import {User} from '../types/user';

export type RootStackParamList = {
  Login: undefined;
  Profile: {userId: string};
  DocumentDetails: {document: Document};
  AllDocuments: {createdBy?: User};
  AllUsers: undefined;
  DocumentPreview: {url: string};
  // Add all your other screens here
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
