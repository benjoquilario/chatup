"use client"

import React, { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Send } from "lucide-react"
import { sendMessage } from "@/app/actions"
import { useForm } from "react-hook-form"
import useConversation from "@/lib/hooks/useConversation"
import axios from "axios"

type FormData = {
  message: string
}

export default function ChatForm() {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  })

  const messageText = watch("message")

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    setFocus("message")
  }, [setFocus])

  async function handleOnSubmit(data: FormData) {
    setIsLoading(true)

    try {
      setValue("message", "", { shouldValidate: true })
      // const res = await axios.post("/api/messages", {
      //   ...data,
      //   conversationId: conversationId,
      // })

      const response = await sendMessage({
        message: data.message,
        conversationId: conversationId as string,
      })

      if (response) {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="z-100 absolute bottom-0 w-full bg-background p-3 lg:p-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Avatar className="size-10">
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
            // disabled={isSubmitting}
            type="submit"
            variant="ghost"
            // ref={buttonRef}
          >
            <Send className="size-6 text-white" />
          </Button>
        </form>
      </div>
    </div>
  )
}
