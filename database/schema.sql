-- Supabase Database Schema for Teccell Premium Admin Panel

-- Create storage bucket for media files (skip if already exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage bucket (skip if policies already exist)
DO $$
BEGIN
    -- Check if policy exists before creating
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can upload'
    ) THEN
        CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can delete'
    ) THEN
        CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
    END IF;
END
$$;

-- Create media_items table
CREATE TABLE IF NOT EXISTS public.media_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    file_path TEXT,
    file_size INTEGER,
    mime_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    location TEXT,
    device TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    repair_type TEXT,
    date DATE NOT NULL,
    platform VARCHAR(20) DEFAULT 'local' CHECK (platform IN ('google', 'facebook', 'local')),
    verified BOOLEAN DEFAULT false,
    review_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for media_items (skip if already exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'media_items' 
        AND policyname = 'Media items are viewable by everyone'
    ) THEN
        CREATE POLICY "Media items are viewable by everyone" ON public.media_items FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'media_items' 
        AND policyname = 'Authenticated users can insert media items'
    ) THEN
        CREATE POLICY "Authenticated users can insert media items" ON public.media_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'media_items' 
        AND policyname = 'Authenticated users can update their own media items'
    ) THEN
        CREATE POLICY "Authenticated users can update their own media items" ON public.media_items FOR UPDATE USING (auth.uid() = created_by);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'media_items' 
        AND policyname = 'Authenticated users can delete their own media items'
    ) THEN
        CREATE POLICY "Authenticated users can delete their own media items" ON public.media_items FOR DELETE USING (auth.uid() = created_by);
    END IF;
END
$$;

-- Create policies for testimonials (skip if already exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'testimonials' 
        AND policyname = 'Testimonials are viewable by everyone'
    ) THEN
        CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'testimonials' 
        AND policyname = 'Authenticated users can insert testimonials'
    ) THEN
        CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'testimonials' 
        AND policyname = 'Authenticated users can update their own testimonials'
    ) THEN
        CREATE POLICY "Authenticated users can update their own testimonials" ON public.testimonials FOR UPDATE USING (auth.uid() = created_by);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'testimonials' 
        AND policyname = 'Authenticated users can delete their own testimonials'
    ) THEN
        CREATE POLICY "Authenticated users can delete their own testimonials" ON public.testimonials FOR DELETE USING (auth.uid() = created_by);
    END IF;
END
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at (skip if already exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'handle_updated_at' 
        AND event_object_table = 'media_items'
    ) THEN
        CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.media_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'handle_updated_at' 
        AND event_object_table = 'testimonials'
    ) THEN
        CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
    END IF;
END
$$;

-- Create indexes for better performance (skip if already exist)
CREATE INDEX IF NOT EXISTS idx_media_items_type ON public.media_items(type);
CREATE INDEX IF NOT EXISTS idx_media_items_category ON public.media_items(category);
CREATE INDEX IF NOT EXISTS idx_media_items_created_at ON public.media_items(created_at);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_testimonials_platform ON public.testimonials(platform);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at);