import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SettingsProvider } from '@/contexts/settings-context';

export const metadata = {
  title: 'Flowers&Saints Dashboard',
  description: 'A modern, responsive financial dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <TopNav />
            <div className="container mx-auto max-w-7xl p-6">
              <main className="w-full">{children}</main>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </SettingsProvider>
  );
}
