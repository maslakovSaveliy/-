interface EventApi {
  id: number;
  title: string;
  description: string;
  images: {
    image: string;
  }[];
  place: {
    id: number;
    coords: {
      lat: number;
      lon: number;
    };
  };
  price: string;
  categories: string[];
}

export type Event = {
  id: number;
  title: string;
  description: string;
  place: {
    id: number;
    coords: {
      lat: number;
      lon: number;
    };
  };
  image?: string;
  price?: string;
  category?: string;
};

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch("/api/events");
  const data = await response.json();

  return data.results
    .filter((event: EventApi) => event.place)
    .slice(0, 10)
    .map((event: EventApi) => ({
      id: event.id,
      title: event?.title,
      description: event?.description,
      place: event?.place,
      image: event?.images[0]?.image,
      price: event?.price,
      category: event?.categories[0],
    }));
}

export async function fetchEventById(id: string): Promise<Event | null> {
  const response = await fetch(`/api/event?id=${id}`);
  const data = await response.json();

  if (!data.results.length) {
    return null;
  }

  return {
    id: data.results[0].id,
    title: data.results[0].title,
    description: data.results[0].description,
    place: data.results[0].place,
    image: data.results[0].images[0]?.image,
    price: data.results[0].price,
    category: data.results[0].categories[0],
  };
}

export async function searchEvents(query: string): Promise<Event[] | []> {
  const response = await fetch(
    `/api/events-search?search=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  return data.results.slice(0, 10).map((event: EventApi) => ({
    id: event.id,
    title: event?.title,
  }));
}
