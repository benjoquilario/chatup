import { create } from "zustand"

type InitialState = {
  selectedMessage: Message
  setSelectedMessage: (message: Message) => void
  isEditing: boolean
  setIsEditing: (action: boolean) => void
}

interface Message {
  id: string
  body: string
}

const useMessageStore = create<InitialState>((set) => ({
  selectedMessage: {
    id: "",
    body: "",
  },
  isEditing: false,
  setIsEditing: (action: boolean) => set({ isEditing: action }),
  setSelectedMessage: (message: Message) => set({ selectedMessage: message }),
}))

export default useMessageStore
