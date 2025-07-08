'use client';

import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import HolyLoader from 'holy-loader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 phút
            gcTime: 10 * 60 * 1000,
            retry: (failureCount, error: any) => {
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                return false;
              }
              return failureCount < 3;
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HolyLoader />
      <Toaster position="top-right" richColors />
      <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="clothify-theme"
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
