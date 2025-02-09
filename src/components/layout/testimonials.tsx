import Image from "next/image"

const testimonials = [
  {
    content:
      "ChatUp has revolutionized the way our team communicates. It's fast, reliable, and packed with features!",
    author: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "I love how easy it is to stay in touch with friends and family using ChatUp. The group chat feature is a game-changer!",
    author: "Mike Chen",
    role: "Freelance Designer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "The end-to-end encryption gives me peace of mind when discussing sensitive topics with clients.",
    author: "Emily Rodriguez",
    role: "Legal Consultant",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section
      className="bg-background py-12 sm:py-16 lg:py-20"
      id="testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by users everywhere
          </h2>
          <p className="mt-4 text-lg text-foreground/50">
            Don&apos;t just take our word for it - hear what our users have to
            say!
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg bg-background p-6 shadow-sm">
              <p className="text-foreground/60">{testimonial.content}</p>
              <div className="mt-6 flex items-center">
                <Image
                  className="size-12 rounded-full"
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
