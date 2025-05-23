const variable = {
  APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  APPWRITE_PLATFORM: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  APPWRITE_PROJECT: process.env.EXPO_PUBLIC_APPWRITE_PROJECT!,
  DATABASE_PRIMARY: process.env.EXPO_PUBLIC_DATABASE_PRIMARY!,
  COLLECTION_USER: process.env.EXPO_PUBLIC_COLLECTION_USER!,
  
  COLLECTION_STUDENT_INFO : process.env.EXPO_PUBLIC_COLLECTION_STUDENT_INFO!,
  COLLECTION_ADMIN_INFO : process.env.EXPO_PUBLIC_COLLECTION_ADMIN_INFO!,
  COLLECTION_ALUMNI_INFO : process.env.EXPO_PUBLIC_COLLECTION_ALUMNI_INFO!,

  COLLECTION_CREDENTIAL: process.env.EXPO_PUBLIC_COLLECTION_CREDENTIAL!,
  COLLECTION_REQUEST: process.env.EXPO_PUBLIC_COLLECTION_REQUEST!,
  COLLECTION_NOTIFICATION: process.env.EXPO_PUBLIC_COLLECTION_NOTIFICATION!,

  FUNCTION_ACCOUNT: process.env.EXPO_PUBLIC_FUNCTION_ACCOUNT!,
  FUNCTION_REQUEST: process.env.EXPO_PUBLIC_FUNCTION_REQUEST!,

  BUCKET_IMAGE: process.env.EXPO_PUBLIC_BUCKET_IMAGE!,
};

export const env = variable;
