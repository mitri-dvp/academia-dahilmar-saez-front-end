import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useGroupStore } from "@store/group";

type CreateSchedule = {
  datetime: Date;
  groupID: number;
};

export const create = async (scheduleData: CreateSchedule) => {
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

  useGroupStore.getState().updateSchedule(scheduleData.groupID, schedules);
};
