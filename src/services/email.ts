import { publicApi } from "@utils/http";

type EmailData = {
  name: string;
  email: string;
  message: string;
};

export const sendEmail = async (emailData: EmailData) => {
  await publicApi.post(`/email`, {
    template: "contact",
    data: emailData,
  });
};
