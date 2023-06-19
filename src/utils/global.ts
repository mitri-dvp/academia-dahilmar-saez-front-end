import {
  BellSVG,
  CalendarCheckSVG,
  CalendarSVG,
  ChatSVG,
  ClockSVG,
  GroupSVG,
  PersonSVG,
} from "@components/SVG";

export const USER_ROLES = {
  ATHLETE: "athlete",
  GUARDIAN: "guardian",
  TRAINER: "trainer",
};

export const removeFocus = () => {
  if (document && document.activeElement && document.activeElement) {
    const element = document.activeElement as HTMLDivElement;

    element.blur();
  }
};

export const entityToIcon = (entity: string, className: string) => {
  switch (entity) {
    case "api::group.group":
      return GroupSVG({ className });
    case "api::schedule.schedule":
      return ClockSVG({ className });
    case "api::attendance.attendance":
      return CalendarCheckSVG({ className });
    case "api::event.event":
      return CalendarSVG({ className });
    case "api::chat.chat":
      return ChatSVG({ className });
    case "api::message.message":
      return ChatSVG({ className });
    case "api::notification.notification":
      return BellSVG({ className });
    case "api::auth.auth":
      return PersonSVG({ className });
    default:
      return BellSVG({ className });
  }
};
