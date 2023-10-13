import { create } from "zustand"

type InitialStater = {
  openConversationInfo: boolean
  setOpenConversationInfo: (action: boolean) => void
}

const useConversationStore = create<InitialStater>((set) => ({
  openConversationInfo: false,
  setOpenConversationInfo: (action: boolean) =>
    set({ openConversationInfo: action }),
}))

export default useConversationStore
