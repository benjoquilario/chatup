"use client"

import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import useConversation from "@/lib/hooks/useConversation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useRef, useState } from "react"

type FormData = {
  message: string
}

export function ChatForm() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { conversationId } = useConversation()

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
      const res = await axios.post("/api/messages", {
        ...data,
        conversationId: conversationId,
      })

      if (res.status === 200) setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

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
              className="flex text-muted-foreground"
              placeholder="Write a message..."
              {...register("message", { required: false })}
            />
          </div>
          <Button
            disabled={isLoading}
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
