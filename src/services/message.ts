import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useMessageStore } from "@store/message";

type RequestOptions = {
  signal: AbortSignal;
};

export const get = async (chatID: number, options: RequestOptions) => {
  const getResponse = await publicApi.get<{ messages: Message[] }>(
    `/chats/${chatID}/messages`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
      signal: options.signal,
    }
  );

  const { messages } = getResponse.data;

  useMessageStore.getState().set(messages);
};

export const send = async (chatID: number, text: string) => {
  await publicApi.post<{ message: Message }>(
    `/chats/${chatID}/messages`,
    {
      data: { text: text },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );
};
