import {
  CalendarCheckSVG,
  CalendarSVG,
  ChatSVG,
  ClockSVG,
  FacebookSVG,
  HouseSVG,
  InstagramSVG,
  PersonSVG,
  // LinkedInSVG,
  // TwitterSVG,
} from "@components/SVG";

import { USER_ROLES } from "@utils/global";

export const navItems = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Entrenadores",
    href: "/trainers",
  },
  {
    title: "Sedes",
    href: "/locations",
  },
  {
    title: "Contacto",
    href: "/contact",
  },
  {
    title: "Horarios",
    href: "/schedule",
  },
];

export const dashboardNavItems = {
  [USER_ROLES.ATHLETE]: [
    {
      Icon: HouseSVG,
      title: "Página Principal",
      href: "/dashboard",
      type: "dashboard",
    },
    {
      Icon: CalendarCheckSVG,
      title: "Asistencias",
      href: "/dashboard/attendance/athlete/",
      type: "attendance",
    },
    {
      Icon: ClockSVG,
      title: "Horario",
      href: "/dashboard/schedule",
      type: "schedule",
    },
    {
      Icon: CalendarSVG,
      title: "Calendario",
      href: "/dashboard/calendar",
      type: "calendar",
    },
    {
      Icon: ChatSVG,
      title: "Mensajes",
      href: "/dashboard/messages",
      type: "messages",
    },
    {
      Icon: PersonSVG,
      title: "Perfil",
      href: "/dashboard/profile",
      type: "profile",
    },
  ],
  [USER_ROLES.GUARDIAN]: [
    {
      Icon: HouseSVG,
      title: "Página Principal",
      href: "/dashboard",
      type: "dashboard",
    },
    {
      Icon: ClockSVG,
      title: "Atleta",
      href: "/dashboard/athlete",
      type: "athlete",
    },
    {
      Icon: ChatSVG,
      title: "Mensajes",
      href: "/dashboard/messages",
      type: "messages",
    },
    {
      Icon: PersonSVG,
      title: "Perfil",
      href: "/dashboard/profile",
      type: "profile",
    },
  ],
  [USER_ROLES.TRAINER]: [
    {
      Icon: HouseSVG,
      title: "Página Principal",
      href: "/dashboard",
      type: "dashboard",
    },
    {
      Icon: CalendarCheckSVG,
      title: "Asistencias",
      href: "/dashboard/attendance/trainer/",
      type: "attendance",
    },
    {
      Icon: ClockSVG,
      title: "Horario",
      href: "/dashboard/schedule",
      type: "schedule",
    },
    {
      Icon: CalendarSVG,
      title: "Calendario",
      href: "/dashboard/calendar",
      type: "calendar",
    },
    {
      Icon: ChatSVG,
      title: "Mensajes",
      href: "/dashboard/messages",
      type: "messages",
    },
    {
      Icon: PersonSVG,
      title: "Perfil",
      href: "/dashboard/profile",
      type: "profile",
    },
  ],
};

export const socialItems = [
  {
    Icon: FacebookSVG,
    platform: "Facebook",
    href: "https://www.facebook.com/people/Academia-Dahilmar-S%C3%A1ez/100083791611881/",
  },
  // {
  //   Icon: TwitterSVG,
  //   platform: "Twitter",
  //   href: "https://twitter.com/@academiadahilmarsaez",
  // },
  {
    Icon: InstagramSVG,
    platform: "Instagram",
    href: "https://www.instagram.com/academiadahilmarsaez/",
  },
  // {
  //   Icon: LinkedInSVG,
  //   platform: "LinkedIn",
  //   href: "https://www.linkedin.com/company/academiadahilmarsaez",
  // },
];
