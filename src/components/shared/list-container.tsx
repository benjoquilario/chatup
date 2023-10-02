"use client"
import React from "react"

type ListContainerProps = {
  children: React.ReactNode
  listTitle: string
  className?: string
}

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  listTitle,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="absolute left-5 top-5 mb-4 flex justify-between pt-4 font-heading text-2xl font-medium leading-tight">
        {listTitle}
      </h3>
      <aside className="fixed inset-y-0 w-full overflow-y-auto border-r border-border pb-20 pt-16 lg:left-20 lg:block lg:w-[360px] lg:pb-0">
        <div className="px-1 md:pl-1 md:pr-5">{children}</div>
      </aside>
    </div>
  )
}

export default ListContainer
