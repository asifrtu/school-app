'use client';

import { useState } from 'react';
import { CheckCircleIcon, InfoIcon, XIcon } from 'lucide-react';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

type InfoBannerProps = {
  message: string;
  variant?: BannerVariant;
};

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    Icon: InfoIcon,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    Icon: CheckCircleIcon,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    Icon: InfoIcon,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    Icon: InfoIcon,
  },
};

export default function InfoBanner({
  message,
  variant = 'info',
}: InfoBannerProps) {
  const [visible, setVisible] = useState(true);
  const { container, Icon } = variantStyles[variant];

  if (!visible) return null;

  return (
    <div
      className={`flex items-start justify-between dark:bg-black dark:text-white gap-4 px-4 py-2 mb-3 border rounded-lg shadow-sm ${container}`}
      role={variant === 'success' ? 'status' : 'note'}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm leading-snug">{message}</p>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-inherit hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <XIcon className="w-4 h-4 mt-0.5" />
      </button>
    </div>
  );
}
