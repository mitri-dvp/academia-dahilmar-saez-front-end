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
