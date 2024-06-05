import { create } from "zustand"

type InitialState = {
  selectedMessage: Message
  setSelectedMessage: (selectedMessage: Message) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}

interface Message {
  id: string
  body: string
}

const useStoreMessage = create<InitialState>((set) => ({
  selectedMessage: {
    id: "",
    body: "",
  },
  isEditing: false,
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  setSelectedMessage: (selectedMessage: Message) => set({ selectedMessage }),
}))

export default useStoreMessage
