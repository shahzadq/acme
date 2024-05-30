import { Provider } from "@radix-ui/react-tooltip";

export const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof Provider>) => (
  <Provider delayDuration={delayDuration} {...props} />
);
