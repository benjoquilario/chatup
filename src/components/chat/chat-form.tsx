"use client"

import React, { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { sendMessage } from "@/app/actions"
import { useForm } from "react-hook-form"
import useConversation from "@/lib/hooks/useConversation"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Comment must be at least 1 character" }),
})

type Inputs = z.infer<typeof messageSchema>

export default function ChatForm() {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const messageText = form.watch("message")

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset()
    }
  }, [form.formState.isSubmitSuccessful, form.reset])

  useEffect(() => {
    form.setFocus("message")
  }, [form.setFocus])

  async function handleOnSubmit(data: Inputs) {
    setIsLoading(true)

    try {
      form.setValue("message", "", { shouldValidate: true })
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
    <div className="z-100 w-full p-3 shadow-muted lg:p-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Avatar className="size-10">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex w-full items-center justify-between gap-2 lg:gap-4"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Write a message</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          className="flex"
                          placeholder="Write a message..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="ghost"
              className="sr-only"
              // ref={buttonRef}
            >
              <Send className="size-6 text-white" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
