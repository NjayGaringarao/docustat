export interface UserType {
  id: string;
  name: string[];
  avatar_url: string;
  sex?: string;
  birthdate?: Date;
  civil_status?: string;
  address: string[];
  admin_info?: {
    department: string;
  };
  student_info?: {
    dept_prog: string;
    year_level: string;
  };
  alumni_info?: {
    year_graduated: Date;
  };
  created_at: Date;
}

export interface UserCredentialType {
  id: string;
  email: string;
  role: string;
}

export interface RequestType {
  id: string;
  document: string[];
  purpose: string;
  request_note: string;
  user_id: string;
  status: string;
  remarks: string;
  updated_at: Date;
  created_at: Date;
}

export interface NotificationType {
  id: string;
  title: string;
  description: string;
  origin: { type: string; id: string };
  content: { type: string; id: string };
  user_id: string;
  isViewed: boolean;
  created_at: Date;
}
