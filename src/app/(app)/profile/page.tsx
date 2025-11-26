'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signOut } from '@/app/actions/auth.actions';
import { getCurrentUser } from '@/app/actions/user-session.actions';
import { LogOut, Mail, User as UserIcon, Loader2 } from 'lucide-react';
import { useTransition, useEffect, useState } from 'react';
import type { User } from '@/lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getCurrentUser().then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    startTransition(() => {
      signOut();
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="max-w-md mx-auto bg-card">
          <CardHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="max-w-md mx-auto bg-card">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-md mx-auto bg-card">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
            <AvatarFallback className="text-3xl">
              {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{user.displayName || 'User'}</CardTitle>
          <CardDescription>{user.email || 'No email'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Name</span>
                <span>{user.displayName}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Email</span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
