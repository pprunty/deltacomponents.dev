'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
import { Button, type ButtonProps, type ButtonVariant } from './button';
import { cn } from '@/lib/utils';

export interface BackButtonProps extends Omit<ButtonProps, 'icon' | 'onClick'> {
  fallbackRoute?: string;
  iconProps?: React.ComponentProps<typeof ArrowLeft>;
  pulse?: boolean;
  text?: string;
  variant?: ButtonVariant;
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  (
    {
      className,
      fallbackRoute = '/',
      iconProps,
      pulse = false,
      text,
      variant = 'secondary',
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const [isPulsing, setIsPulsing] = React.useState(false);

    const handleBack = () => {
      if (pulse) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 200); // Match animation duration
      }

      if (typeof window !== 'undefined' && window.history.length > 2) {
        router.back();
      } else {
        router.push(fallbackRoute);
      }
    };

    return (
      <Button
        className={cn('gap-0', className)}
        onClick={handleBack}
        icon={<ArrowLeft weight="bold" size={20} {...iconProps} />}
        title={text || undefined}
        variant={variant}
        {...props}
      />
    );
  },
);

BackButton.displayName = 'BackButton';

export { BackButton };
