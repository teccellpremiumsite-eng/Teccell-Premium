export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      media_items: {
        Row: {
          id: string
          type: 'image' | 'video'
          url: string
          title: string
          description: string
          category: string
          file_path: string | null
          file_size: number | null
          mime_type: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          type: 'image' | 'video'
          url: string
          title: string
          description: string
          category: string
          file_path?: string | null
          file_size?: number | null
          mime_type?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          type?: 'image' | 'video'
          url?: string
          title?: string
          description?: string
          category?: string
          file_path?: string | null
          file_size?: number | null
          mime_type?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      testimonials: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          location: string | null
          device: string
          rating: number
          testimonial: string
          repair_type: string | null
          date: string
          platform: 'google' | 'facebook' | 'local'
          verified: boolean | null
          review_url: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          avatar_url?: string | null
          location?: string | null
          device: string
          rating: number
          testimonial: string
          repair_type?: string | null
          date: string
          platform?: 'google' | 'facebook' | 'local'
          verified?: boolean | null
          review_url?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          location?: string | null
          device?: string
          rating?: number
          testimonial?: string
          repair_type?: string | null
          date?: string
          platform?: 'google' | 'facebook' | 'local'
          verified?: boolean | null
          review_url?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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