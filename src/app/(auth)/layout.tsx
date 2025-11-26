import { APP_NAME } from '@/lib/constants';
import { Logo } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Logo className="mb-4 h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{APP_NAME}</h1>
          <p className="text-muted-foreground">Welcome to your weather companion</p>
        </div>
        {children}
      </div>
    </div>
  );
}
