import type { FC } from "react";

export const FacebookSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
  );
};

export const InstagramSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
    </svg>
  );
};

export const DatepickerSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      ></path>
    </svg>
  );
};

export const BurgerSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};
export const CrossSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
    </svg>
  );
};

export const NotificationSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C13.6569 24 15 22.6569 15 21H9C9 22.6569 10.3431 24 12 24Z"
        fill="currentColor"
      />
      <path
        d="M12 2.87737L10.8042 3.11888C8.06329 3.67243 6.00003 6.09694 6.00003 9C6.00003 9.94174 5.79849 12.2959 5.31173 14.6132C5.0701 15.7636 4.74681 16.9614 4.31714 18H19.6829C19.2532 16.9614 18.9299 15.7636 18.6883 14.6132C18.2016 12.2959 18 9.94173 18 9C18 6.09693 15.9368 3.6724 13.1958 3.11887L12 2.87737ZM21.329 18C21.6638 18.6711 22.0522 19.2015 22.5 19.5H1.5C1.94779 19.2015 2.33617 18.6711 2.67105 18C4.01883 15.2991 4.50003 10.3187 4.50003 9C4.50003 5.36901 7.0803 2.34067 10.5073 1.64856C10.5025 1.59969 10.5 1.55013 10.5 1.5C10.5 0.671573 11.1716 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 1.55013 13.4975 1.59968 13.4927 1.64855C16.9197 2.34063 19.5 5.36899 19.5 9C19.5 10.3187 19.9812 15.2991 21.329 18Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const HouseSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.70711 1.50005C8.31658 1.10952 7.68342 1.10952 7.29289 1.50005L0.646447 8.14649C0.451184 8.34176 0.451184 8.65834 0.646447 8.8536C0.841709 9.04886 1.15829 9.04886 1.35355 8.8536L8 2.20715L14.6464 8.8536C14.8417 9.04886 15.1583 9.04886 15.3536 8.8536C15.5488 8.65834 15.5488 8.34176 15.3536 8.14649L13 5.79294V2.50005C13 2.2239 12.7761 2.00005 12.5 2.00005H11.5C11.2239 2.00005 11 2.2239 11 2.50005V3.79294L8.70711 1.50005Z"
        fill="currentColor"
      />
      <path
        d="M8 3.29294L14 9.29294V13.5C14 14.3285 13.3284 15 12.5 15H3.5C2.67157 15 2 14.3285 2 13.5V9.29294L8 3.29294Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CalendarSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 0H3C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24H21C22.6569 24 24 22.6569 24 21V3C24 1.34315 22.6569 0 21 0ZM1.5 5.78571C1.5 5.07563 2.17157 4.5 3 4.5H21C21.8284 4.5 22.5 5.07563 22.5 5.78571V21.2143C22.5 21.9244 21.8284 22.5 21 22.5H3C2.17157 22.5 1.5 21.9244 1.5 21.2143V5.78571Z"
        fill="currentColor"
      />
      <path
        d="M9.75 10.5C10.5784 10.5 11.25 9.82843 11.25 9C11.25 8.17157 10.5784 7.5 9.75 7.5C8.92157 7.5 8.25 8.17157 8.25 9C8.25 9.82843 8.92157 10.5 9.75 10.5Z"
        fill="currentColor"
      />
      <path
        d="M14.25 10.5C15.0784 10.5 15.75 9.82843 15.75 9C15.75 8.17157 15.0784 7.5 14.25 7.5C13.4216 7.5 12.75 8.17157 12.75 9C12.75 9.82843 13.4216 10.5 14.25 10.5Z"
        fill="currentColor"
      />
      <path
        d="M18.75 10.5C19.5784 10.5 20.25 9.82843 20.25 9C20.25 8.17157 19.5784 7.5 18.75 7.5C17.9216 7.5 17.25 8.17157 17.25 9C17.25 9.82843 17.9216 10.5 18.75 10.5Z"
        fill="currentColor"
      />
      <path
        d="M5.25 15C6.07843 15 6.75 14.3284 6.75 13.5C6.75 12.6716 6.07843 12 5.25 12C4.42157 12 3.75 12.6716 3.75 13.5C3.75 14.3284 4.42157 15 5.25 15Z"
        fill="currentColor"
      />
      <path
        d="M9.75 15C10.5784 15 11.25 14.3284 11.25 13.5C11.25 12.6716 10.5784 12 9.75 12C8.92157 12 8.25 12.6716 8.25 13.5C8.25 14.3284 8.92157 15 9.75 15Z"
        fill="currentColor"
      />
      <path
        d="M14.25 15C15.0784 15 15.75 14.3284 15.75 13.5C15.75 12.6716 15.0784 12 14.25 12C13.4216 12 12.75 12.6716 12.75 13.5C12.75 14.3284 13.4216 15 14.25 15Z"
        fill="currentColor"
      />
      <path
        d="M18.75 15C19.5784 15 20.25 14.3284 20.25 13.5C20.25 12.6716 19.5784 12 18.75 12C17.9216 12 17.25 12.6716 17.25 13.5C17.25 14.3284 17.9216 15 18.75 15Z"
        fill="currentColor"
      />
      <path
        d="M5.25 19.5C6.07843 19.5 6.75 18.8284 6.75 18C6.75 17.1716 6.07843 16.5 5.25 16.5C4.42157 16.5 3.75 17.1716 3.75 18C3.75 18.8284 4.42157 19.5 5.25 19.5Z"
        fill="currentColor"
      />
      <path
        d="M9.75 19.5C10.5784 19.5 11.25 18.8284 11.25 18C11.25 17.1716 10.5784 16.5 9.75 16.5C8.92157 16.5 8.25 17.1716 8.25 18C8.25 18.8284 8.92157 19.5 9.75 19.5Z"
        fill="currentColor"
      />
      <path
        d="M14.25 19.5C15.0784 19.5 15.75 18.8284 15.75 18C15.75 17.1716 15.0784 16.5 14.25 16.5C13.4216 16.5 12.75 17.1716 12.75 18C12.75 18.8284 13.4216 19.5 14.25 19.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ClockSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5.25C12 4.83579 11.6642 4.5 11.25 4.5C10.8358 4.5 10.5 4.83579 10.5 5.25V13.5C10.5 13.7691 10.6442 14.0177 10.8779 14.1512L16.1279 17.1512C16.4875 17.3567 16.9457 17.2317 17.1512 16.8721C17.3567 16.5125 17.2317 16.0543 16.8721 15.8488L12 13.0648V5.25Z"
        fill="currentColor"
      />
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ChatSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15C12.4183 15 16 11.866 16 8C16 4.13401 12.4183 1 8 1C3.58172 1 0 4.13401 0 8C0 9.76087 0.743061 11.3699 1.96979 12.6001C1.87251 13.6162 1.55308 14.7299 1.19898 15.5664C1.12037 15.7521 1.27271 15.9603 1.47172 15.9277C3.72774 15.5584 5.06898 14.9897 5.65284 14.6939C6.39508 14.8929 7.18324 15 8 15Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PersonSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 9C16.5 11.4853 14.4853 13.5 12 13.5C9.51472 13.5 7.5 11.4853 7.5 9C7.5 6.51472 9.51472 4.5 12 4.5C14.4853 4.5 16.5 6.51472 16.5 9Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 14.4801 2.35988 16.7594 3.79779 18.556C4.86439 16.8379 7.20696 15 12 15C16.7931 15 19.1356 16.8379 20.2022 18.5561C21.6401 16.7594 22.5 14.4801 22.5 12C22.5 6.20101 17.799 1.5 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LogOutSVG: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 5.25C15 4.83579 14.6642 4.5 14.25 4.5L2.25 4.5C1.83579 4.5 1.5 4.83579 1.5 5.25L1.5 18.75C1.5 19.1642 1.83579 19.5 2.25 19.5H14.25C14.6642 19.5 15 19.1642 15 18.75V15.75C15 15.3358 15.3358 15 15.75 15C16.1642 15 16.5 15.3358 16.5 15.75V18.75C16.5 19.9926 15.4926 21 14.25 21H2.25C1.00736 21 0 19.9926 0 18.75V5.25C0 4.00736 1.00736 3 2.25 3L14.25 3C15.4926 3 16.5 4.00736 16.5 5.25V8.25C16.5 8.66421 16.1642 9 15.75 9C15.3358 9 15 8.66421 15 8.25V5.25Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.21967 12.5303C5.92678 12.2374 5.92678 11.7626 6.21967 11.4697L10.7197 6.96967C11.0126 6.67678 11.4874 6.67678 11.7803 6.96967C12.0732 7.26256 12.0732 7.73744 11.7803 8.03033L8.56066 11.25H21.75C22.1642 11.25 22.5 11.5858 22.5 12C22.5 12.4142 22.1642 12.75 21.75 12.75H8.56066L11.7803 15.9697C12.0732 16.2626 12.0732 16.7374 11.7803 17.0303C11.4874 17.3232 11.0126 17.3232 10.7197 17.0303L6.21967 12.5303Z"
        fill="currentColor"
      />
    </svg>
  );
};
