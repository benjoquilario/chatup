"use client"

import { oauthSigninAction } from "@/server/auth"
import { Button } from "@/components/ui/button"
import { FiGithub } from "react-icons/fi"
import { AiOutlineGoogle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

function Oauth() {
  const [errMessage, setErrMessage] = useState("")
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (!error) return

    if (error === "OAuthAccountNotLinked")
      setErrMessage("This account is already in use. Please sign in.")
    else setErrMessage("An error occured. Please try again!")
  }, [error])

  const clickHandler = async (provider: "google" | "github") => {
    try {
      const res = await oauthSigninAction(provider)

      if (res.success) window.location.href = "/conversation"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <Button onClick={clickHandler.bind(null, "google")} variant="outline">
        <AiOutlineGoogle aria-hidden="true" className="mr-2 size-4" />
        Google
      </Button>
      <Button onClick={clickHandler.bind(null, "google")} variant="outline">
        <FiGithub aria-hidden="true" className="mr-2 size-4" />
        Github
      </Button>
      {errMessage && (
        <p className="mt-2 text-sm font-medium text-destructive">
          {errMessage}
        </p>
      )}
    </div>
  )
}
export default Oauth
