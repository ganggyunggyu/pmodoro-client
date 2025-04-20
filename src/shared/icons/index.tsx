export const BottomArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export const TopArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

interface SelectCircleProp {
  isActive: boolean;
}

export const SelectCircle: React.FC<SelectCircleProp> = ({ isActive }) => {
  return (
    <div
      className={`w-5 h-5 border border-primary rounded-full transition-all
                                      ${isActive ? 'border-4' : 'border-1'}
                                      `}
    />
  );
};

export const LeftArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
};

export const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    </svg>
  );
};
export const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

export const BackIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};

export const KakaoIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z"
        fill="#FFE812"
      />
      <path
        d="M12 5.5C7.5817 5.5 4 8.3241 4 11.8077C4 14.0599 5.4974 16.0361 7.74985 17.1521C7.6273 17.5747 6.9624 19.8709 6.9359 20.0513C6.9359 20.0513 6.92 20.1868 7.00775 20.2385C7.09555 20.2901 7.19875 20.25 7.19875 20.25C7.45045 20.2149 10.1175 18.3415 10.5791 18.0162C11.0403 18.0815 11.5151 18.1154 12 18.1154C16.4183 18.1154 20 15.2914 20 11.8077C20 8.3241 16.4183 5.5 12 5.5Z"
        fill="#381F1F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.57698 14.0096C7.32243 14.0096 7.11543 13.8119 7.11543 13.5688V10.8269H6.39528C6.14553 10.8269 5.94238 10.6241 5.94238 10.375C5.94238 10.1258 6.14558 9.9231 6.39528 9.9231H8.75868C9.00843 9.9231 9.21158 10.1258 9.21158 10.375C9.21158 10.6241 9.00838 10.8269 8.75868 10.8269H8.03853V13.5688C8.03853 13.8119 7.83153 14.0096 7.57698 14.0096ZM11.624 14.0036C11.4316 14.0036 11.2844 13.9255 11.24 13.7998L11.0114 13.2015L9.60403 13.2014L9.37538 13.8001C9.33113 13.9255 9.18398 14.0036 8.99153 14.0036C8.89028 14.0037 8.79018 13.982 8.69813 13.9399C8.57088 13.8812 8.44858 13.7198 8.58873 13.2845L9.69273 10.3787C9.77053 10.1577 10.0067 9.93 10.3074 9.92315C10.6088 9.92995 10.845 10.1577 10.923 10.3791L12.0265 13.2837C12.167 13.72 12.0447 13.8815 11.9174 13.94C11.8253 13.982 11.7253 14.0037 11.624 14.0036ZM10.3077 11.0743L10.7687 12.3839H9.84673L10.3077 11.0743ZM12.7693 13.9423C12.5253 13.9423 12.327 13.7525 12.327 13.5192V10.3846C12.327 10.1301 12.5383 9.9231 12.7981 9.9231C13.0579 9.9231 13.2693 10.1301 13.2693 10.3846V13.0961H14.25C14.494 13.0961 14.6924 13.286 14.6924 13.5192C14.6924 13.7525 14.494 13.9423 14.25 13.9423H12.7693ZM14.8719 13.5421C14.8719 13.7966 15.0789 14.0036 15.3334 14.0036C15.4558 14.0034 15.5732 13.9547 15.6597 13.8682C15.7463 13.7816 15.795 13.6643 15.7951 13.5418V12.5348L15.9553 12.3747L17.0377 13.8088C17.0805 13.8661 17.1362 13.9125 17.2002 13.9444C17.2642 13.9762 17.3348 13.9926 17.4063 13.9923C17.5066 13.9925 17.6042 13.9598 17.684 13.8991C17.7325 13.8628 17.7733 13.8172 17.804 13.7649C17.8347 13.7127 17.8548 13.6548 17.863 13.5948C17.8717 13.5347 17.8683 13.4736 17.853 13.4149C17.8378 13.3562 17.8111 13.3011 17.7744 13.2528L16.6383 11.7478L17.6901 10.6961C17.7624 10.6238 17.7987 10.524 17.792 10.4151C17.7853 10.3072 17.7371 10.2033 17.6563 10.1225C17.5696 10.0359 17.4539 9.98625 17.3387 9.98625C17.2399 9.98625 17.1489 10.0227 17.0827 10.0889L15.795 11.3766V10.3846C15.795 10.1301 15.588 9.9231 15.3334 9.9231C15.0789 9.9231 14.8719 10.1301 14.8719 10.3846V13.5421Z"
        fill="#FFE812"
      />
    </svg>
  );
};

export const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export const MinXIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
};

export const MinMarker = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 5C10.5 8.5 6 11.5 6 11.5C6 11.5 1.5 8.5 1.5 5C1.5 3.80653 1.97411 2.66193 2.81802 1.81802C3.66193 0.974106 4.80653 0.5 6 0.5C7.19347 0.5 8.33807 0.974106 9.18198 1.81802C10.0259 2.66193 10.5 3.80653 10.5 5Z"
        stroke="#37383C"
        strokeOpacity="0.61"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
        stroke="#37383C"
        strokeOpacity="0.61"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckBox = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#F25E51" />
    </svg>
  );
};

export const NextIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 12L10 17"
        stroke="#37383C"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 12L10 7"
        stroke="#37383C"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
