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
      <div className="flex absolute left-5 text-white top-5 justify-between mb-4 pt-4">
        {listTitle}
      </div>
      <aside className="fixed mt-16 inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-border hidden">
        <div className="px-5">{children}</div>
      </aside>
    </React.Fragment>
  );
};

export default ListContainer;
