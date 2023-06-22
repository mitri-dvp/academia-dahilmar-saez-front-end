import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useChatStore } from "@store/chat";

export const get = async () => {
  const getResponse = await publicApi.get<{ chats: Chat[] }>(`/chats`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
  });

  const { chats } = getResponse.data;

  useChatStore.getState().set(chats);
};

export const create = async (contact: User) => {
  const postResponse = await publicApi.post<{ chat: Chat }>(
    `/chats`,
    {
      data: { contact },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { chat } = postResponse.data;

  useChatStore.getState().add(chat);

  return chat;
};
