import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";

type GroupData = {
  name: string;
  description: string;
  users: number[];
};

type RequestOptions = {
  signal: AbortSignal;
};

export const get = async () => {
  const getResponse = await publicApi.get<{ groups: Group[] }>(`/groups`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
  });

  const { groups } = getResponse.data;

  useGroupStore.getState().set(groups);
};

export const create = async (groupData: GroupData) => {
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

export const edit = async (groupID: number, groupData: GroupData) => {
  const postResponse = await publicApi.put<{ group: Group }>(
    `/groups/${groupID}`,
    {
      data: { groupData },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { group } = postResponse.data;

  useGroupStore.getState().update(groupID, group);
  useGroupStore.getState().setSelected(group);
};

export const getAttendances = async (
  groupID: number,
  date: string,
  options: RequestOptions
) => {
  const getResponse = await publicApi.get<{ attendances: Attendance[] }>(
    `/group/${groupID}/attendances/${date}`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
      signal: options.signal,
    }
  );

  const { attendances } = getResponse.data;

  return attendances;
};

export const postAttendances = async (
  groupID: number,
  date: string,
  draftAttendances: DraftAttendance[]
) => {
  const getResponse = await publicApi.post<{ attendances: Attendance[] }>(
    `/group/${groupID}/attendances/${date}`,
    {
      data: { draftAttendances },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { attendances } = getResponse.data;

  return attendances;
};
