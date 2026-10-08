import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactSchema, services } from '@/lib/contact-schema';
import { submitContact } from '@/lib/contact.functions';

export function ContactForm() {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({ ...Object.fromEntries(form), consent: form.get('consent') === 'on' });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Revisa los datos.'); return; }
    setStatus('sending'); setError('');
    try {
      const result = await send({ data: parsed.data });
      if (!result.success) { setError(result.error ?? 'Inténtalo de nuevo.'); setStatus('idle'); return; }
      setStatus('success');
    } catch { setError('No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.'); setStatus('idle'); }
  }
  if (status === 'success') return <div className="contact-success" role="status"><Check size={40} /><h3>Tu proyecto ya tiene un comienzo.</h3><p>Recibimos tu solicitud. El equipo de ADR podrá contactarte con los datos que nos compartiste.</p><Button variant="outline" onClick={() => setStatus('idle')}>Enviar otra solicitud <ArrowUpRight /></Button></div>;
  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-grid">
      <label>Tu nombre<input name="name" placeholder="¿Cómo te llamas?" required minLength={2} maxLength={100} autoComplete="name" /></label>
      <label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" required maxLength={255} autoComplete="email" /></label>
      <label>Teléfono / WhatsApp<input name="phone" type="tel" placeholder="+57" required minLength={7} maxLength={30} autoComplete="tel" /></label>
      <label>País del proyecto<input name="country" placeholder="¿Dónde lo imaginas?" required maxLength={100} autoComplete="country-name" /></label>
    </div>
    <label>¿Qué tienes en mente?<select name="service" required defaultValue=""><option value="" disabled>Selecciona un servicio</option>{services.map(s => <option key={s}>{s}</option>)}</select></label>
    <label>Cuéntanos sobre tu proyecto<textarea name="message" placeholder="Tu idea, el espacio, lo que quieres transformar…" required minLength={10} maxLength={2000} rows={3} /></label>
    <div className="honeypot" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="consent"><input type="checkbox" name="consent" required /><span>Autorizo a ADR Soluciones a usar mis datos para responder y dar seguimiento a esta solicitud.</span></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <Button className="submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Enviando <Loader2 className="animate-spin" /></> : <>Empecemos tu proyecto <ArrowUpRight /></>}</Button>
  </form>;
}