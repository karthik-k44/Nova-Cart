import React, { useState } from 'react'
import type { Shipping } from '../../types';
import Button from '../button';
import Input from '../input';
import type { ShippingErrors } from '../../schemas/shipping-schema';
import { ValidateShipping } from '../../utils';

interface ShippingFormProps {
  initial?: Partial<Shipping>;
  onSubmit: (data: Shipping) => void;
  onBack: () => void;
}

const empty: Shipping = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const ShippingForm:React.FC<ShippingFormProps> = ({
  initial,
  onSubmit,
  onBack,
}) => {

  const [values, setValues] = useState<Shipping>({ ...empty, ...initial });
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setField = (name: keyof Shipping, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) {
      setErrors(ValidateShipping(next));
    }
  };

  const handleBlur = (name: keyof Shipping) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(ValidateShipping(values));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = ValidateShipping(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
    } as Record<string, boolean>);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          error={touched.fullName ? errors.fullName : undefined}
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
        />
        <Input
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          error={touched.phone ? errors.phone : undefined}
          autoComplete="tel"
        />
        <Input
          label="Postal Code"
          name="postalCode"
          value={values.postalCode}
          onChange={(e) => setField("postalCode", e.target.value)}
          onBlur={() => handleBlur("postalCode")}
          error={touched.postalCode ? errors.postalCode : undefined}
          autoComplete="postal-code"
        />
        <div className="sm:col-span-2">
          <Input
            label="Address"
            name="address"
            value={values.address}
            onChange={(e) => setField("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            error={touched.address ? errors.address : undefined}
            autoComplete="street-address"
          />
        </div>
        <Input
          label="City"
          name="city"
          value={values.city}
          onChange={(e) => setField("city", e.target.value)}
          onBlur={() => handleBlur("city")}
          error={touched.city ? errors.city : undefined}
          autoComplete="address-level2"
        />
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <Button variant="outline" onClick={onBack} type="button">
          Back
        </Button>
        <Button type="submit">Continue to payment</Button>
      </div>
    </form>
  );
}

export default ShippingForm;
