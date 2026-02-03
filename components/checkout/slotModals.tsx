"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  onSlotSelect?: (day: string, date: number, time: string) => void;
};

const days = [
  { day: "Sat", date: 20 },
  { day: "Sun", date: 21 },
  { day: "Mon", date: 22 },
  { day: "Tue", date: 23 },
];

const times = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
];

export default function SlotModal({
  open,
  onClose,
  onProceed,
  onSlotSelect,
}: Props) {
  const [selectedDay, setSelectedDay] = useState(21);
  const [selectedTime, setSelectedTime] = useState("09:00 AM");

  const handleProceed = () => {
    const selectedDayData = days.find(d => d.date === selectedDay);
    if (selectedDayData && onSlotSelect) {
      onSlotSelect(selectedDayData.day, selectedDay, selectedTime);
    }
    onProceed();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/40">

      {/* MODAL */}
      <div className="w-full max-w-md rounded-t-2xl lg:rounded-2xl bg-white shadow-lg max-h-[90vh] lg:max-h-none overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">
              When should the professional arrive?
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Service will start from the selected service slot and will run till it's over.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 space-y-6">

          {/* DATE SELECT */}
          <div className="flex gap-3">
            {days.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border text-sm
                  ${
                    selectedDay === d.date
                      ? "border-prime bg-prime text-white font-semibold"
                      : "border-border text-muted-foreground"
                  }`}
              >
                <span>{d.day}</span>
                <span className="text-base font-semibold">
                  {d.date}
                </span>
              </button>
            ))}
          </div>

          {/* TIME SELECT */}
          <div>
            <p className="text-sm font-semibold mb-3">
              Select start time of service
            </p>

            <div className="grid grid-cols-3 gap-3">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-lg border py-2 text-sm
                    ${
                      selectedTime === time
                        ? "border-prime bg-prime text-white font-medium"
                        : "border-border text-muted-foreground"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={handleProceed}
            className="w-full rounded-xl bg-prime hover:bg-prime text-white py-3 text-sm font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}