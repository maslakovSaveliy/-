"use client";

import { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchEvents, type Event } from "@/lib/api";
import Loader from "@/components/ui/loader";
import { WeekdayCalendar } from "@/components/ui/weekday-calendar";

const categoryColors: Record<string, string> = {
	party: "#ff000076",
	concert: "#00ff0090",
	holiday: "#d9ff0090",
	default: "#e58cfc"
};

export default function MapPage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [mapInstance, setMapInstance] = useState<ymaps.Map | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleEventClick = (event: Event) => {
		setSelectedEvent(event);
		if (mapInstance && event.place?.coords) {
			mapInstance.setCenter([event.place.coords.lat, event.place.coords.lon]);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchEvents().then((data) => {
			setEvents(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="p-4 bg-transparent">
			<WeekdayCalendar />

			{loading ? (
				<Loader />
			) : (
				<YMaps>
					<Map
						defaultState={{
							center: [55.7558, 37.6173],
							zoom: 13,
							controls: ["zoomControl", "fullscreenControl"],
						}}
						width="100%"
						height="400px"
						instanceRef={(ref) => setMapInstance(ref)}
						modules={["control.ZoomControl", "control.FullscreenControl"]}
					>
						{events.map((event) => (
							<Placemark
								key={event.id}
								geometry={[
									event.place?.coords.lat ?? 0,
									event.place?.coords.lon ?? 0,
								]}
								options={{
									preset: "islands#circleDotIcon",
									iconColor:
										selectedEvent?.id === event.id
											? "#df61ff"
											: categoryColors[event.category ?? 'default'] || "#e58cfc",
								}}
								onClick={() => handleEventClick(event)}
							/>
						))}
					</Map>
				</YMaps>
			)}

			{!loading && (
				<div className="mt-4 bg-transparent">
					<h2 className="text-xl font-semibold mb-2 bg-transparent">
						Мероприятия
					</h2>
					<Accordion type="single" collapsible className="w-full">
						{events.map((event) => (
							<AccordionItem value={event.id.toString()} key={event.id}>
								<AccordionTrigger
									onClick={() => handleEventClick(event)}
									className="hover:no-underline"
								>
									<div className="flex flex-col items-start bg-transparent">
										<span>{event.title}</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-2 bg-transparent">
										{event.image && (
											<img
												src={event.image}
												alt={event.title}
												className="w-full h-48 object-cover rounded-lg bg-transparent"
											/>
										)}
										<div
											dangerouslySetInnerHTML={{ __html: event.description }}
										/>
										{event.price && (
											<p className="font-semibold">{event.price}</p>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			)}
		</div>
	);
}
