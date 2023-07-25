import ChatList from '@/components/chat/ChatList';
import getConversation from '@/utils/getConversation';
import getUsers from '@/utils/getUsers';
import Section from '@/components/shared/Section';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const conversations = await getConversation();
  const users = await getUsers();

  return (
    <Section>
      <ChatList conversations={conversations} />
      {children}
    </Section>
  );
};

export default Layout;
