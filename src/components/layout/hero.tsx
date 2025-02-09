import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-background pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connect and chat with</span>{" "}
                <span className="block text-primary xl:inline">
                  anyone, anywhere
                </span>
              </h1>
              <p className="text-muted-foreground/800 mt-3 text-base sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                ChatUp brings people together through seamless, real-time
                messaging. Stay connected with friends, family, and colleagues
                no matter where you are.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/auth/login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-gray-50 hover:opacity-90 md:px-10 md:py-4 md:text-lg"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:ml-3 sm:mt-0">
                  <a
                    href="#"
                    className="hover:bg-brimary/60 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-50 px-8 py-3 text-base font-medium text-primary/70 md:px-10 md:py-4 md:text-lg"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="flex items-center justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="flex h-96 w-[280px] items-center justify-center object-cover"
          src="/Screenshot_Chat.jpeg"
          alt="ChatUp app interface"
          width={400}
          height={600}
        />
      </div>
    </div>
  )
}
