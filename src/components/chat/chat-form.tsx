"use client"

import { HiPaperAirplane } from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import useConversation from "@/lib/hooks/useConversation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useRef } from "react"
import { editMessage, sendMessage } from "@/app/actions"
import useMessageStore from "@/store/message"

type FormData = {
  message: string
}

export default function ChatForm() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { conversationId } = useConversation()
  const [isEditing, setIsEditing] = useMessageStore((store) => [
    store.isEditing,
    store.setIsEditing,
  ])
  const [selectedMessage, setSelectedMessage] = useMessageStore((store) => [
    store.selectedMessage,
    store.setSelectedMessage,
  ])

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  })

  useEffect(() => {
    setFocus("message")
  }, [setFocus])

  async function handleOnSubmit(data: FormData) {
    setValue("message", "", { shouldValidate: true })

    if (isEditing && data.message.length !== 0) {
      await editMessage({
        id: selectedMessage.id,
        body: data.message,
        conversationId: conversationId as string,
      })
      setIsEditing(false)
    } else {
      await sendMessage({
        message: data.message,
        conversationId: conversationId as string,
      })
    }

    setSelectedMessage({
      id: "",
      body: "",
    })
  }

  useEffect(() => {
    if (isEditing && selectedMessage.id) {
      setValue("message", selectedMessage.body)
    }
  }, [isEditing, selectedMessage, setValue, setFocus])

  return (
    <div className="z-100 w-full border-t border-border bg-background p-3 lg:p-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex w-full items-center gap-2 lg:gap-4"
        >
          <div className="relative w-full">
            <Input
              className="flex text-white"
              placeholder="Write a message..."
              {...register("message", { required: false })}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="ghost"
            ref={buttonRef}
          >
            <HiPaperAirplane className="h-6 w-6 text-white" />
          </Button>
        </form>
      </div>
    </div>
  )
}
