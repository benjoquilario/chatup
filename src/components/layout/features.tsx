import { MessageSquare, Users, Lock, Zap } from "lucide-react"

const features = [
  {
    name: "Real-time Messaging",
    description:
      "Send and receive messages instantly with our lightning-fast chat system.",
    icon: MessageSquare,
  },
  {
    name: "Group Chats",
    description:
      "Create and manage group conversations with ease for team collaboration or social gatherings.",
    icon: Users,
  },
  {
    name: "End-to-End Encryption",
    description:
      "Your conversations are secure with our state-of-the-art encryption technology.",
    icon: Lock,
  },
  {
    name: "Seamless Integration",
    description:
      "Connect ChatUp with your favorite apps for a streamlined communication experience.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <div className="bg-background py-12" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary/60">
            Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
            A better way to communicate
          </p>
          <p className="mt-4 max-w-2xl text-xl text-foreground/50 lg:mx-auto">
            ChatUp provides all the tools you need for efficient and enjoyable
            conversations.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="bg-primnary absolute flex size-12 items-center justify-center rounded-md text-gray-50">
                    <feature.icon className="size-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-foreground">
                    {feature.name}
                  </p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-foreground/50">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
