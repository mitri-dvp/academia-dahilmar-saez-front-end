import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";

export const get = async () => {
  const getResponse = await publicApi.get<{ groups: Group[] }>(`/groups`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
  });

  const { groups } = getResponse.data;

  useGroupStore.getState().set(groups);
};
