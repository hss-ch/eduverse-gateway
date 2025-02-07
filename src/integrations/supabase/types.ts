export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface JobListing {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      blog_ratings: {
        Row: {
          blog_id: string | null
          created_at: string
          id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          blog_id?: string | null
          created_at?: string
          id?: string
          rating: number
          user_id?: string | null
        }
        Update: {
          blog_id?: string | null
          created_at?: string
          id?: string
          rating?: number
          user_id?: string | null
        }
      }
      blogs: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          published: boolean | null
          rating: number | null
          ratings_count: number | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          rating?: number | null
          ratings_count?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          rating?: number | null
          ratings_count?: number | null
          title?: string
          updated_at?: string
        }
      }
      job_listings: {
        Row: {
          id: string
          title: string
          location: string
          department: string
          type: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          location: string
          department: string
          type: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          location?: string
          department?: string
          type?: string
          description?: string
          created_at?: string
        }
      }
      demo_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          organization: string
          preferred_date: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          organization: string
          preferred_date: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          organization?: string
          preferred_date?: string
          status?: string | null
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          cover_letter: string
          created_at: string
          email: string
          id: string
          job_title: string
          name: string
          phone: string
          status: string | null
          updated_at: string
        }
        Insert: {
          cover_letter: string
          created_at?: string
          email: string
          id?: string
          job_title: string
          name: string
          phone: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          cover_letter?: string
          created_at?: string
          email?: string
          id?: string
          job_title?: string
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string
        }
      }
      job_listings: {
        Row: {
          created_at: string
          department: string
          description: string
          id: string
          location: string;
          title: string;
          type: string;
        }
        Insert: {
          created_at?: string;
          department: string;
          description: string;
          id?: string;
          location: string;
          title: string;
          type: string;
        }
        Update: {
          created_at?: string;
          department?: string;
          description?: string;
          id?: string;
          location?: string;
          title?: string;
          type?: string;
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
    ? I
    : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
