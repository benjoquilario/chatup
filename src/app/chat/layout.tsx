import Sidebar from '@/components/sidebar/Sidebar';
import Input from '@/components/shared/Input';
import UserItem from '@/components/users/UserItem';

type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return (
    <Sidebar>
      <div className="fixed inset-y-0 w-full lg:w-80 overflow-y-auto left-28 pt-4">
        <div className="">
          <div className="w-full">
            <div className="text-lg text-white py-2 font-semibold w-full">
              Messages
            </div>
            {/* <div className="">
              <Input
                type="search"
                label="search messenger"
                labelClassName="sr-only"
                className="bg-background-800 pl-4 !rounded-md !ring-0 shadow-background-900 py-3"
                placeholder="Search by keyword"
              />
            </div>
            <UserItem /> */}
            <p className="text-sm text-ice">Nothing to show here...</p>
          </div>
        </div>
      </div>
      {children}
    </Sidebar>
  );
};

export default Layout;
