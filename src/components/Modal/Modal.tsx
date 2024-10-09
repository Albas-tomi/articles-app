import React from "react";

type FormUsersProps = {
  children: React.ReactNode | any;
  width?: string;
  height?: string;
};

const Modal = (props: FormUsersProps) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto h-screen w-screen bg-black bg-opacity-50">
      <main
        className={`bg-white scrollBar ${props.width} ${props.height} overflow-y-auto  no-scrollbar rounded-lg  p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        {props.children}
      </main>
    </div>
  );
};

export default Modal;
