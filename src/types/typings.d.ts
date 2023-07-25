import { Conversation, Message, User } from '@prisma/client';

interface FullMessage extends Message {
  sender: User;
  seen: User[];
}

type FullConversation = Conversation & {
  users: User[];
  messages: FullMessageType;
};
