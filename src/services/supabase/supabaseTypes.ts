export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
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
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
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
      eng_release_old: {
        Row: {
          cost_code: string | null;
          description: string | null;
          er_num: string;
          id: number;
          owner_id: string;
          part_numbers: string | null;
          title: string | null;
        };
        Insert: {
          cost_code?: string | null;
          description?: string | null;
          er_num: string;
          id?: number;
          owner_id: string;
          part_numbers?: string | null;
          title?: string | null;
        };
        Update: {
          cost_code?: string | null;
          description?: string | null;
          er_num?: string;
          id?: number;
          owner_id?: string;
          part_numbers?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      eng_rels: {
        Row: {
          description: string | null;
          id: number;
          owner_id: string;
          part_numbers: string | null;
          project_id: string;
          release_id: number;
          title: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          owner_id?: string;
          part_numbers?: string | null;
          project_id: string;
          release_id: number;
          title?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          owner_id?: string;
          part_numbers?: string | null;
          project_id?: string;
          release_id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "eng_rels_project_id_owner_id_fkey";
            columns: ["project_id", "owner_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["project_id", "owner_id"];
          },
        ];
      };
      part_numbers: {
        Row: {
          created_date: string | null;
          description: string | null;
          id: number;
          owner_id: string;
          part_number: number;
          project_id: string;
          sub_system: string;
        };
        Insert: {
          created_date?: string | null;
          description?: string | null;
          id?: number;
          owner_id?: string;
          part_number: number;
          project_id: string;
          sub_system: string;
        };
        Update: {
          created_date?: string | null;
          description?: string | null;
          id?: number;
          owner_id?: string;
          part_number?: number;
          project_id?: string;
          sub_system?: string;
        };
        Relationships: [];
      };
      part_numbers_old: {
        Row: {
          description: string | null;
          id: number;
          owner_id: string | null;
          part_number: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          owner_id?: string | null;
          part_number?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          owner_id?: string | null;
          part_number?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: number;
          owner_id: string;
          project_description: string | null;
          project_id: string;
          project_title: string | null;
        };
        Insert: {
          id?: number;
          owner_id?: string;
          project_description?: string | null;
          project_id: string;
          project_title?: string | null;
        };
        Update: {
          id?: number;
          owner_id?: string;
          project_description?: string | null;
          project_id?: string;
          project_title?: string | null;
        };
        Relationships: [];
      };
      projects_old: {
        Row: {
          id: number;
          owner_id: string;
          project_description: string;
          project_id: string;
          project_title: string;
        };
        Insert: {
          id?: number;
          owner_id: string;
          project_description: string;
          project_id: string;
          project_title: string;
        };
        Update: {
          id?: number;
          owner_id?: string;
          project_description?: string;
          project_id?: string;
          project_title?: string;
        };
        Relationships: [];
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
