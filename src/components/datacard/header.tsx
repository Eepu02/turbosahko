import React from "react";
import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export const Header = ({
  title,
  Icon,
  isLive,
  description,
}: {
  title: string;
  Icon: JSX.ElementType;
  isLive: boolean;
  description?: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex flex-row gap-2">
          <Icon className="mr-2 inline" />
          <p>{title}</p>
          {isLive && (
            <Badge
              variant={"outline"}
              className="border-destructive text-destructive ml-auto"
            >
              Live
            </Badge>
          )}
        </div>
      </HoverCardTrigger>
      {description && (
        <HoverCardContent className="w-auto max-w-xl text-base font-normal leading-normal tracking-normal">
          {description}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
