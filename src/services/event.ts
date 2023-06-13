import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useEventStore } from "@store/event";

type CreateEvent = {
  name: string;
  description: string;
  datetime: Date;
};

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

export const create = async (event: CreateEvent) => {
  const postResponse = await publicApi.post<{ events: CalendarEvent[] }>(
    `/events`,
    {
      data: { event },
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { events } = postResponse.data;

  useEventStore.getState().set(events);
};
