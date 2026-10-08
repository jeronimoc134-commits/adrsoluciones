import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './contact-schema';

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { website: _website, ...submission } = data;
    const { error } = await supabaseAdmin.from('contact_submissions').insert(submission);
    if (error) {
      console.error('Contact submission storage failed', error.code);
      return { success: false, error: 'No pudimos guardar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.' };
    }
    return { success: true, error: null };
  });