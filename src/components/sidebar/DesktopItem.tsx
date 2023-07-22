import Link from 'next/link';
import { cn } from '@/lib/cn';
import React from 'react';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export default function DesktopItem({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={cn(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-accent-foreground hover:text-white hover:bg-primary',
          {
            'bg-primary text-white': active,
          }
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
