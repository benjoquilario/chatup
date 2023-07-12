import Link from 'next/link';
import classNames from 'classnames';
import React from 'react';

type TDesktopItemProps = {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
};

const DesktopItem: React.FC<TDesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={classNames(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-ice hover:text-white hover:bg-primary',
          active && 'bg-primary text-white'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
