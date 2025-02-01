export declare namespace UserType {
  type Info = {
    id: string;
    auth_id: string;
    name: string[];
    avatar_url: string;
    sex: string;
    birthdate: Date;
    civil_status: string;
    address: string[];
    admin_info?: {
      id: string;
      department: string;
    };
    student_info?: {
      id: string;
      dept_prog: string[];
      year_level: string;
    };
    alumni_info?: {
      id: string;
      year_graduated: Date;
    };
    created_at: Date;
  };
}

export interface Credential {
  id: string;
  email: string;
  role: string;
}

export declare namespace RequestType {
  type Info = {
    id: string;
    document: string[];
    purpose: string;
    request_note: string;
    user_id: string;
    status: string;
    remarks: string;
    updated_at: Date;
    created_at: Date;
  };
}

export declare namespace NotificationType {
  type Info = {
    id: string;
    title: string;
    description: string;
    origin: { type: string; id: string };
    content: { type: string; id: string };
    user_id: string;
    isViewed: boolean;
    created_at: Date;
  };
}
