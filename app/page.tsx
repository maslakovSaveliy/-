"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchEvents, type Event } from "@/lib/api";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventApp() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Top 10 Section */}
      <section className="mb-6">
        <h2 className="px-4 text-xl font-semibold mb-3">Топ 10 в Москве</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex overflow-x-auto gap-3 px-4 pb-2 hide-scrollbar">
            {events.slice(0, 10).map((item) => (
              <Link href={`/event/${item.id}`} key={item.id}>
                <Card className="flex-none w-[80vw] max-w-[256px] h-32 bg-black text-white rounded-xl">
                  <Image
                    src={item.image ?? "/placeholder.svg"}
                    alt={item.title}
                    width={256}
                    height={128}
                    className="w-full h-full object-cover rounded-xl opacity-80"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* For You Section */}
      <section className="mb-6 relative">
        <h2 className="px-4 text-xl font-semibold mb-3">Сегодня здесь</h2>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 px-4 filter blur-sm">
              {events.slice(5, 9).map((item) => (
                <Link href={`/event/${item.id}`} key={item.id}>
                  <Card className="aspect-square bg-black text-white rounded-xl overflow-hidden">
                    <Image
                      src={item.image ?? "/placeholder.svg"}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </Card>
                </Link>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="secondary"
                className="z-10"
                onClick={() => {
                  window.location.href = "https://t.me/EventumHrnyGrglBot";
                }}
              >
                Купить подписку
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Contacts Section */}
      <section className="mb-6">
        <h2 className="px-4 text-xl font-semibold mb-3">Контакты</h2>
        <div className="px-4">
          <p>
            Email:{" "}
            <a href="mailto:co.eventum@yandex.ru" className="text-blue-500">
              co.eventum@yandex.ru
            </a>
          </p>
          <p>
            Telegram:{" "}
            <a href="https://t.me/EventumHrnyGrglBot" className="text-blue-500">
              @EventumHrnyGrglBot
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
