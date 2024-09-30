"use client";
import {
  QueryClient,
  QueryClientProvider as ReacrQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReacrQueryClientProvider client={queryClient}>
      {children}
    </ReacrQueryClientProvider>
  );
};

export default QueryClientProvider;
