'use client';

import React from 'react';
import { z } from 'zod';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  SmartForm,
  FieldDefinition,
} from '@/delta/components/smart-form';

export default function SmartFormPaymentDemo() {
  // Define the form schema
  const paymentFormSchema = z.object({
    cardName: z.string().min(1, 'Name on card is required'),
    cardNumber: z
      .string()
      .min(1, 'Card number is required')
      .regex(/^[0-9]{16}$/, 'Card number must be 16 digits'),
    expiryDate: z
      .string()
      .min(1, 'Expiry date is required')
      .regex(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        'Expiry date must be in MM/YY format',
      ),
    cvc: z
      .string()
      .min(1, 'CVC is required')
      .regex(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits'),
    country: z.string().min(1, 'Country is required'),
    saveCard: z.boolean().optional(),
  });

  // Define the form fields
  const paymentFormFields = [
    {
      name: 'cardName',
      label: 'Name on Card',
      type: 'text' as const,
      required: true,
      placeholder: 'John Doe',
      variant: 'pill' as const,
    },
    {
      name: 'cardNumber',
      label: 'Card Number',
      type: 'text' as const,
      required: true,
      placeholder: '1234567890123456',
      variant: 'pill' as const,
      hint: '16-digit number without spaces',
    },
    // Group expiry date and CVC fields to display them side by side
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'text' as const,
      required: true,
      placeholder: 'MM/YY',
      variant: 'pill' as const,
      group: 'card-details', // Group name to link related fields
    },
    {
      name: 'cvc',
      label: 'CVC',
      type: 'text' as const,
      required: true,
      placeholder: '123',
      variant: 'pill' as const,
      hint: '3 or 4 digits on the back of your card',
      group: 'card-details', // Same group name to link related fields
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
      ],
      placeholder: 'Select your country',
      variant: 'pill' as const,
    },
    {
      name: 'saveCard',
      label: 'Save card for future payments',
      type: 'checkbox' as const,
    },
  ];

  const handleSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    // Mock API call
    console.log('Payment data:', data);
    alert('Payment form submitted: ' + JSON.stringify(data, null, 2));
    return Promise.resolve();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Enter your card details to complete your purchase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={paymentFormFields}
          schema={paymentFormSchema}
          onSubmit={handleSubmit}
          submitText="Pay $49.99"
          layout="vertical"
          successMessage="Payment successful! Thank you for your purchase."
        />
      </CardContent>
    </Card>
  );
} 