import Image from 'next/image';
import React from 'react';

const Avatar = () => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full h-10 w-10 shadow-md bg-background overflow-hidden">
        <Image fill alt="Avatar" src="/images/placeholder.jpg" />
      </div>
    </div>
  );
};

export default Avatar;
