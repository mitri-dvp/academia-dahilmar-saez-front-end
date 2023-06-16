import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";
import { useEventStore } from "@store/event";

type EventData = {
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

export const create = async (event: EventData) => {
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

export const update = async (eventID: number, event: EventData) => {
  const postResponse = await publicApi.put<{ events: CalendarEvent[] }>(
    `/events/${eventID}`,
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

export const deleteEvent = async (eventID: number) => {
  const deleteResponse = await publicApi.delete<{ events: CalendarEvent[] }>(
    `/events/${eventID}`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { events } = deleteResponse.data;

  useEventStore.getState().set(events);
};
