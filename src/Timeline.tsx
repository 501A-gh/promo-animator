import * as SliderPrimitive from "@radix-ui/react-slider";
import { AnimationData } from "./types";
import { cn } from "./lib/utils";

const Scrubber: React.FC<React.ComponentProps<typeof SliderPrimitive.Root>> = ({
  ...props
}) => {
  return (
    <SliderPrimitive.Root
      ref={props.ref}
      className="relative flex w-full touch-none select-none items-center"
      step={0.01}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-10 w-full grow overflow-hidden rounded-sm bg-zinc-800">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-9 w-1 rounded-full cursor-ew-resize border-none bg-rose-700 shadow transition-colors outline-transparent outline-offset-2 outline-2 focus-visible:outline-zinc-600 focus-visible:ring-rose-700" />
    </SliderPrimitive.Root>
  );
};

export const Timeline: React.FC<{
  data: AnimationData;
  isPlaying: boolean;
  setTime: (value: number) => void;
  time: number;
  setIsPlaying: (value: boolean) => void;
}> = ({ data, time, isPlaying, setTime, setIsPlaying }) => {
  const { duration, keyframes } = data;
  return (
    <div className="flex flex-col relative">
      <Scrubber
        min={0}
        max={duration}
        value={[time]}
        onValueChange={(value) => {
          setTime(value[0]);
          setIsPlaying(false); // Pause when scrubbing manually
        }}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault(); // Prevent page scrolling
            if (time === duration) {
              setTime(0);
            } else {
              setIsPlaying(!isPlaying); // Toggle play state
            }
          }
        }}
      />
      <div className="flex items-center w-full">
        {keyframes.map((frame, index) => (
          <button
            key={index}
            className={cn(
              "absolute h-8 w-0.5 grow overflow-hidden rounded-full bg-amber-500 -translate-y-5 cursor-pointer active:scale-95",
              frame.time / duration === 1 && "-translate-x-0.5",
            )}
            style={{ left: `${(frame.time / duration) * 100}%` }}
            onClick={() => onChange(frame.time)}
          />
        ))}
      </div>
    </div>
  );
};
