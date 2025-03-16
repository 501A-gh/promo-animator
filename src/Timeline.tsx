import * as SliderPrimitive from "@radix-ui/react-slider";
import { AnimationData } from "./types";
import { cn } from "./lib/utils";

const Scrubber: React.FC<
  React.ComponentProps<typeof SliderPrimitive.Root> & { max: number }
> = ({ ...props }) => {
  return (
    <SliderPrimitive.Root
      ref={props.ref}
      className="relative flex w-full touch-none select-none items-center"
      step={0.01}
      style={{
        background: `repeating-linear-gradient(90deg, #27272a, #27272a ${1 / props.max}%, transparent ${1 / props.max}%, transparent ${10 / props.max}%)`,
      }}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-20 w-full grow overflow-hidden">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="h-20 w-0.5 flex bg-gradient-to-b from-rose-800 to-rose-600 justify-start rounded-xs border-none cursor-ew-resize outline-transparent outline-offset-1 outline-2 opacity-50 focus:opacity-100 bg-zinc-800 shadow shadow-rose-800">
        {/* <button className="absolute -translate-x-1/2 translate-y-20 w-fit px-2 py-0.5 h-fit text-xs text-center rounded-full text-rose-700 font-mono font-semibold">
          {Number(props.value).toFixed(2)}
        </button> */}
      </SliderPrimitive.Thumb>
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
      <div className="flex items-center relative h-4 w-full">
        {keyframes.map((frame, index) => (
          <button
            key={index}
            className={cn(
              "absolute h-4 w-0.5 grow overflow-hidden rounded-full cursor-pointer border-none active:scale-95 transition-all",
              time === frame.time
                ? "bg-amber-500 translate-y-2 -translate-x-1/2 size-6"
                : "bg-amber-700",
              frame.time / duration === 1 && "-translate-x-0.5",
            )}
            style={{ left: `${(frame.time / duration) * 100}%` }}
            onClick={() => setTime(frame.time)}
          />
        ))}
      </div>
    </div>
  );
};
