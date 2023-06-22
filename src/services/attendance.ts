import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useAttendanceStore } from "@store/attendance";

export const get = async () => {
  const getResponse = await publicApi.get<{ attendances: Attendance[] }>(
    `/attendances`,
    { headers: { Authorization: "Bearer " + useUserStore.getState().token } }
  );

  const { attendances } = getResponse.data;

  useAttendanceStore.getState().set(attendances);
};
