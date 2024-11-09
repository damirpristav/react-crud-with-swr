import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const Sidebar = ({ children, onClose }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  // disable scrolling when sidebar is opened
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setIsOpened(true);
  }, []);

  const onSidebarClose = () => {
    setIsOpened(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <>
      <div className={clsx('sidebar-overlay', { 'sidebar-overlay--visible': isOpened })} />
      <aside className={clsx('sidebar', { 'sidebar--opened': isOpened })}>
        <div className="sidebar-content">{children}</div>
        <button type="button" onClick={onSidebarClose} className="sidebar-close">
          X
        </button>
      </aside>
    </>
  );
};

type Props = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};
