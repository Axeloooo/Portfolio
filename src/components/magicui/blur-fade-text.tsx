import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  delay?: number;
  yOffset?: number;
  fade?: boolean;
}

const BlurFadeText = ({
  text,
  className,
  delay = 0,
  yOffset = 8,
  fade = true,
}: BlurFadeTextProps) => {
  return (
    <div className="flex">
      <BlurFade
        as="span"
        delay={delay}
        yOffset={yOffset}
        fade={fade}
        className={cn("inline-block", className)}
      >
        {text}
      </BlurFade>
    </div>
  );
};

export default BlurFadeText;
