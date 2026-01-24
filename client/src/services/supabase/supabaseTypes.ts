export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      eng_rels: {
        Row: {
          description: string | null;
          file_ids: string[] | null;
          id: number;
          org_uuid: string | null;
          owner_id: string;
          part_numbers: string | null;
          project_id: string;
          release_id: number;
          title: string | null;
        };
        Insert: {
          description?: string | null;
          file_ids?: string[] | null;
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          part_numbers?: string | null;
          project_id: string;
          release_id: number;
          title?: string | null;
        };
        Update: {
          description?: string | null;
          file_ids?: string[] | null;
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          part_numbers?: string | null;
          project_id?: string;
          release_id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "eng_rels_org_uuid_fkey";
            columns: ["org_uuid"];
            isOneToOne: false;
            referencedRelation: "organisations";
            referencedColumns: ["org_uuid"];
          },
          {
            foreignKeyName: "eng_rels_project_id_owner_id_fkey";
            columns: ["project_id", "owner_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["project_id", "owner_id"];
          },
        ];
      };
      org_associations: {
        Row: {
          created_at: string;
          id: number;
          org_uuid: string | null;
          user_uuid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          org_uuid?: string | null;
          user_uuid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          org_uuid?: string | null;
          user_uuid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "org_associations_org_uuid_fkey";
            columns: ["org_uuid"];
            isOneToOne: false;
            referencedRelation: "organisations";
            referencedColumns: ["org_uuid"];
          },
        ];
      };
      organisations: {
        Row: {
          created_at: string;
          id: number;
          org_name: string;
          org_uuid: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          org_name: string;
          org_uuid?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          org_name?: string;
          org_uuid?: string;
        };
        Relationships: [];
      };
      part_numbers: {
        Row: {
          created_date: string | null;
          description: string | null;
          id: number;
          org_uuid: string | null;
          owner_id: string;
          part_number: number;
          project_id: string;
          sub_system: string;
        };
        Insert: {
          created_date?: string | null;
          description?: string | null;
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          part_number: number;
          project_id: string;
          sub_system: string;
        };
        Update: {
          created_date?: string | null;
          description?: string | null;
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          part_number?: number;
          project_id?: string;
          sub_system?: string;
        };
        Relationships: [
          {
            foreignKeyName: "part_numbers_org_uuid_fkey";
            columns: ["org_uuid"];
            isOneToOne: false;
            referencedRelation: "organisations";
            referencedColumns: ["org_uuid"];
          },
        ];
      };
      projects: {
        Row: {
          id: number;
          org_uuid: string | null;
          owner_id: string;
          project_description: string | null;
          project_id: string;
          project_title: string | null;
        };
        Insert: {
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          project_description?: string | null;
          project_id: string;
          project_title?: string | null;
        };
        Update: {
          id?: number;
          org_uuid?: string | null;
          owner_id?: string;
          project_description?: string | null;
          project_id?: string;
          project_title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_org_uuid_fkey";
            columns: ["org_uuid"];
            isOneToOne: false;
            referencedRelation: "organisations";
            referencedColumns: ["org_uuid"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
