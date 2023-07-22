'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import useRoutes from '@/lib/hooks/useRoutes';
import DesktopItem from './DesktopItem';

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const routes = useRoutes();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-secondary my-4 mx-2 lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map(route => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              active={route.active}
              onClick={route.onClick}
              icon={route.icon}
            />
          ))}
        </ul>
      </nav>
      <nav
        aria-label="Avatar"
        className="mt-4 flex flex-col justify-between items-center"
      >
        <div className="cursor-pointer">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/images/placeholder.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </div>
  );
}
