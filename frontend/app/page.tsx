import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';
export default function Home() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
