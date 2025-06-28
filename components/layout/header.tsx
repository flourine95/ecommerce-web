'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/components/ecommerce/cart-provider';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

const routes = {
  home: { path: '/', label: 'Home' },
  products: { path: '/products', label: 'All Products' },
  men: { path: '/products/men', label: 'Men' },
  women: { path: '/products/women', label: 'Women' },
  about: { path: '/about', label: 'About' },
  contact: { path: '/contact', label: 'Contact' },
  profile: { path: '/profile', label: 'Profile' },
  cart: { path: '/cart', label: 'Cart' },
};

const navItems = [routes.home, routes.products, routes.men, routes.women];

function NavLink({ path, label }: { path: string; label: string }) {
  return (
    <Link
      href={path}
      className="hover:text-primary font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="mt-8 flex flex-col gap-4">
          {Object.values(routes).map(({ path, label }) => (
            <Link key={path} href={path} className="text-lg font-medium">
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  const { user } = useAuthStore();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleAccountClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/profile');
    }
  };
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-center px-4">
        <MobileNav />

        <Link
          href={routes.home.path}
          className="ml-4 flex items-center gap-2 md:ml-0"
        >
          <span className="text-xl font-bold">StyleHub</span>
        </Link>

        <nav className="mx-6 hidden items-center gap-6 text-sm md:flex">
          {navItems.map(({ path, label }) => (
            <NavLink key={path} path={path} label={label} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search products..."
                className="w-[200px] md:w-[300px]"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Link href={routes.cart.path}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
