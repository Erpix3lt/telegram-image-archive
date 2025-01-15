import Link from 'next/link';
import React from 'react';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-between items-start m-4">
      <div className="border p-1">
        <h2 className="text-xl font-semibold"><Link href="/">private archive.</Link></h2>
      </div>
      {children && <div className='flex flex-row gap-1 flex-wrap-reverse justify-end'>{children}</div>}
    </div>
  );
};

export default Header;