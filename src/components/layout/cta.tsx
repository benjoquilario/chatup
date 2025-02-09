export default function CTA() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-50 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-50/70">
          Join thousands of satisfied users and experience the power of ChatUp.
          No credit card required.
        </p>
        <a
          href="#"
          className="hover:opacity/90 mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-background px-5 py-3 text-base font-medium text-primary sm:w-auto"
        >
          Sign up for free
        </a>
      </div>
    </div>
  )
}
