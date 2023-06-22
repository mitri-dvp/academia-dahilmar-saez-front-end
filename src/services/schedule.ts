import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";

type ScheduleData = {
  datetime: Date;
  groupID: number;
};

export const create = async (scheduleData: ScheduleData) => {
  const postResponse = await publicApi.post<{ schedules: Schedule[] }>(
    `/schedules`,
    {
      data: { scheduleData },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { schedules } = postResponse.data;

  useGroupStore.getState().updateSchedules(scheduleData.groupID, schedules);
};

export const update = async (
  scheduleID: number,
  scheduleData: ScheduleData
) => {
  const postResponse = await publicApi.put<{ schedules: Schedule[] }>(
    `/schedules/${scheduleID}`,
    {
      data: { scheduleData },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { schedules } = postResponse.data;

  useGroupStore.getState().updateSchedules(scheduleData.groupID, schedules);
};

export const deleteSchedule = async (scheduleID: number, groupID: number) => {
  const deleteResponse = await publicApi.delete<{ schedules: Schedule[] }>(
    `/schedules/${scheduleID}`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { schedules } = deleteResponse.data;

  useGroupStore.getState().updateSchedules(groupID, schedules);
};
