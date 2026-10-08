import { z } from 'zod';

export const services = ['Planes de arquitectura por mensualidad', 'Reformas de apartamentos', 'Diseño arquitectónico', 'Recorridos virtuales 3D'] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.').max(100),
  email: z.string().trim().email('Revisa tu correo electrónico.').max(255),
  phone: z.string().trim().min(7, 'Escribe un teléfono válido.').max(30).regex(/^[+\d\s()-]+$/, 'Revisa tu teléfono.'),
  service: z.enum(services),
  country: z.string().trim().min(2, 'Escribe el país de tu proyecto.').max(100),
  message: z.string().trim().min(10, 'Cuéntanos un poco más sobre tu proyecto.').max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Autoriza el uso de tus datos para responder tu solicitud.' }) }),
  website: z.string().max(0),
});