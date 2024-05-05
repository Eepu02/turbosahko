"use client";

import { Button } from "./ui/button";
import { refresh } from "@/lib/revalidate";

export const RefreshButton = () => {
  return <Button onClick={() => refresh()}>Refresh</Button>;
};
