import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function WeekdayCalendar() {
  const [currentDay, setCurrentDay] = useState<number>(0);

  useEffect(() => {
    const today = new Date().getDay();
    setCurrentDay(today === 0 ? 6 : today - 1); // Adjust for Monday as the first day
  }, []);

  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow p-2 mb-4">
      {daysOfWeek.map((day, index) => (
        <Dialog key={day}>
          <DialogTrigger asChild>
            <Button
              variant={index === currentDay ? "default" : "ghost"}
              className={`w-10 h-10 p-0 ${
                index === currentDay ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {day}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Подписка</DialogTitle>
            </DialogHeader>
            <p>
              Для доступа к расширенным функциям необходимо купить подписку.
            </p>
            <div className="mt-4">
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = "https://t.me/EventumHrnyGrglBot";
                }}
              >
                Оформить подписку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
