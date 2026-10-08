CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
 service text NOT NULL CHECK (char_length(service) <= 100),
 country text NOT NULL CHECK (char_length(country) <= 100),
 message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);