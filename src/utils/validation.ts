import { shippingSchema, type ShippingErrors, type ShippingForm } from "../schemas/shipping-schema";

export const ValidateShipping = (values: ShippingForm) :ShippingErrors => {
  const result = shippingSchema.safeParse(values);
  if (result.success) return {};
  const errors: ShippingErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ShippingForm;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}