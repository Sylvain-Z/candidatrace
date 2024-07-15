export interface Application {
    id: number;
    company_name: string;
    website: string;
    application_link: string;
    application_date: string;
    note: string;
    first_relaunch: string | null;
    second_relaunch: string | null;
    interview_date: string | null;
    final_response: number;
    final_response_date: string | null;
    userId: number;  // la méthode du repository de spring transforme user_id en userId
  }
  
//   export type Applications = Application[];