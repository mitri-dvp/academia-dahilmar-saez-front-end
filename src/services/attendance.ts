import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useAttendanceStore } from "@store/attendance";

export const get = async () => {
  const editResponse = await publicApi.get<{ attendances: Attendance[] }>(
    `/attendances`,
    { headers: { Authorization: "Bearer " + useUserStore.getState().token } }
  );

  const { attendances } = editResponse.data;

  useAttendanceStore.getState().set(attendances);
};
