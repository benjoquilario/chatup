import Sidebar from '@/components/sidebar/Sidebar';
import ChatList from '@/components/chat/ChatList';
import ChatBody from '@/components/chat/ChatBody';
import getChats from '@/utils/getChats';
import getUsers from '@/utils/getUsers';
import ChatItem from '@/components/chat/ChatItem';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Input from '@/components/shared/Input';
import Section from '@/components/shared/Section';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const chats = await getChats();
  const users = await getUsers();

  return (
    <Section>
      <ChatList />
      {children}
    </Section>
  );
};

export default Layout;
