
-- Update blog_ratings policies
ALTER POLICY "Users can rate blogs" ON "public"."blog_ratings"
USING (auth.role() = 'authenticated');

-- Update blogs policies for admin access
CREATE OR REPLACE POLICY "Admins can manage all blogs" ON "public"."blogs"
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Ensure published blogs are viewable by everyone
ALTER POLICY "Blogs are viewable by authenticated users only" ON "public"."blogs"
USING (published = true OR auth.uid() = author_id);
