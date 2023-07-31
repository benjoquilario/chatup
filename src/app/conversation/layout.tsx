import ChatList from '@/components/chat/chat-list';
import getConversation from '@/utils/getConversation';
import getUsers from '@/utils/getUsers';
import Section from '@/components/shared/section';
import{redirect} from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const conversations = await getConversation();

  return (
    <Section>
      <ChatList conversations={conversations} />
      {children}
    </Section>
  );
};

export default Layout;
