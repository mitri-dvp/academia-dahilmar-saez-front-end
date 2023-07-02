import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";
import { useAttendanceStore } from "@store/attendance";

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

export const deleteGroup = async (groupID: number) => {
  const deleteResponse = await publicApi.delete<{ groups: Group[] }>(
    `/groups/${groupID}`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { groups } = deleteResponse.data;

  console.log(groups);

  useGroupStore.getState().set(groups);
};

export const update = async (groupID: number, groupData: GroupData) => {
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

  useAttendanceStore.getState().setGroupAttendances(attendances);
};

export const postAttendances = async (
  groupID: number,
  date: Date,
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

  useAttendanceStore.getState().setGroupAttendances(attendances);
};

export const exportAttendances = async (
  groupID: number,
  date: string,
  range: string
) => {
  const getResponse = await publicApi.get<{ attendances: Attendance[] }>(
    `/group/${groupID}/export/attendances/?date=${date}&range=${range}`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  return getResponse.data.attendances;
};
