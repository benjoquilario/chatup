import { Chat, Message, User } from '@prisma/client';

interface FullMessage extends Message {
  sender: User;
  seen: User[];
}

type FullChat = Chat & {
  users: User[];
  messages: FullMessageType;
};
