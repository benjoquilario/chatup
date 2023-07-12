'use client';
import Avatar from '../shared/Avatar';
import useRoutes from '@/lib/hooks/useRoutes';
import DesktopItem from './DesktopItem';

type TSidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<TSidebarProps> = ({ children }) => {
  const routes = useRoutes();

  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-between items-center flex-col fixed inset-y-0 py-2 left-0 z-40 w-20 shadow-md lg:overflow-y-auto my-4 mx-3 rounded-lg bg-background-800">
        <nav>
          <ul role="list" className="flex flex-col items-end space-y-1">
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
        <div>
          <Avatar />
        </div>
      </div>
      <main className="lg:pl-28 h-full block">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
