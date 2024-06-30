"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Toaster
          containerStyle={{ fontSize: "15px" }}
          position="top-left"
          reverseOrder={true}
        />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Provider;
