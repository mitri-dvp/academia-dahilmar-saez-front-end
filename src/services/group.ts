import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";

type CreateGroup = {
  name: string;
  description: string;
  users: number[];
};

export const get = async () => {
  const getResponse = await publicApi.get<{ groups: Group[] }>(`/groups`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
  });

  const { groups } = getResponse.data;

  useGroupStore.getState().set(groups);
};

export const create = async (groupData: CreateGroup) => {
  const postResponse = await publicApi.post<{ group: Group }>(
    `/groups`,
    {
      data: { groupData },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { group } = postResponse.data;

  useGroupStore.getState().add(group);
};
