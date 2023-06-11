import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useEventStore } from "@store/event";

export const get = async () => {
  const getResponse = await publicApi.get<{ events: CalendarEvent[] }>(
    `/events`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { events } = getResponse.data;

  useEventStore.getState().set(events);
};
