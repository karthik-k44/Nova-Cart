import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9+\-\s()]{7,15}$/, 'Enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(5, 'Address must be at least 5 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .regex(/^[A-Za-z0-9\s-]{3,10}$/, 'Enter a valid postal code'),
});

export type ShippingForm = z.infer<typeof shippingSchema>;
export type ShippingErrors = Partial<Record<keyof ShippingForm, string>>;
