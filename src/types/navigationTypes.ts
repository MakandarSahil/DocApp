// navigationTypes.ts
export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  DocumentDetails: { document: Document };
  AllDocuments: undefined;
  AllUsers: undefined;
  // Add all your other screens here
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}