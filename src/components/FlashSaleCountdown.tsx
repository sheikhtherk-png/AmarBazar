import * as React from "react";
import { Timer } from "lucide-react";

export const FlashSaleCountdown = () => {
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg">
        <Timer className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Ends In:</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="bg-slate-900 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg">{format(timeLeft.hours)}</span>
        <span className="text-slate-900 font-bold">:</span>
        <span className="bg-slate-900 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg">{format(timeLeft.minutes)}</span>
        <span className="text-slate-900 font-bold">:</span>
        <span className="bg-slate-900 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg">{format(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};
