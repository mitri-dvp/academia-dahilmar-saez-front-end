import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useMessageStore } from "@store/message";

export const get = async (chatID: number) => {
  const getResponse = await publicApi.get<{ messages: Message[] }>(
    `/chats/${chatID}/messages`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { messages } = getResponse.data;

  useMessageStore.getState().set(messages);
};

export const send = async (chatID: number, text: string) => {
  const postResponse = await publicApi.post<{ message: Message }>(
    `/chats/${chatID}/messages`,
    {
      data: { text: text },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { message } = postResponse.data;

  // Use Socket

  console.log(message);

  useMessageStore.getState().add(message);
};
