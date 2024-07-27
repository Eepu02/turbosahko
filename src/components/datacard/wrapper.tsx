import { Suspense } from "react";
import { CardLoader } from "../card-loader";

export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<CardLoader />}>{children}</Suspense>;
};
