import {
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

export const dashboardNavItems = [
  {
    Icon: HouseSVG,
    title: "Página Principal",
    href: "/dashboard",
  },
  {
    Icon: CalendarSVG,
    title: "Calendario",
    href: "/dashboard/calendar",
  },
  {
    Icon: ClockSVG,
    title: "Horario",
    href: "/dashboard/schedule",
  },
  {
    Icon: ChatSVG,
    title: "Mensajes",
    href: "/dashboard/messages",
  },
  {
    Icon: PersonSVG,
    title: "Perfil",
    href: "/dashboard/profile",
  },
];

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
