import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

const LoginPage = () => {
  const { login, setPage } = useCart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      toast.success('Successfully logged in!');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh]">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setPage('home')}
                className="text-primary hover:underline font-semibold"
              >
                Sign up
              </button>
            </p>
            <p className="mt-2 text-xs">
              Demo: Use any email with password to login
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
