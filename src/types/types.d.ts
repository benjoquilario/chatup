import { Conversation, Message, User } from "@prisma/client"

interface FullMessage extends Message {
  user: User
  seen: User[]
}

type FullConversation = Conversation & {
  users: User[]
  messages: FullMessageType
}
