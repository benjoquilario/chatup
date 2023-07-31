'use client';
import React from 'react';

type ListContainerProps = {
  children: React.ReactNode;
  listTitle: string;
};

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  listTitle,
}) => {
  return (
    <React.Fragment>
      <h3 className="flex absolute left-5 font-heading text-2xl font-medium top-5 justify-between mb-4 pt-4 leading-tight">
        {listTitle}
      </h3>
      <aside className="fixed pt-16 inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-[360px] lg:block overflow-y-auto border-r border-border hidden">
        <div className="pl-1 pr-5">{children}</div>
      </aside>
    </React.Fragment>
  );
};

export default ListContainer;
