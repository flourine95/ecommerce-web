'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/ecommerce/cart-provider';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  const { user } = useAuthStore();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const routes = {
    home: { path: '/', label: t('navigation.home') },
    products: { path: '/products', label: t('navigation.products') },
    men: { path: '/products/men', label: t('navigation.men') },
    women: { path: '/products/women', label: t('navigation.women') },
    about: { path: '/about', label: t('navigation.about') },
    contact: { path: '/contact', label: t('navigation.contact') },
    profile: { path: '/profile', label: t('navigation.profile') },
    cart: { path: '/cart', label: t('navigation.cart') },
  };

  const navItems = [routes.home, routes.products, routes.men, routes.women];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleAccountClick = () => {
    router.push(user ? '/profile' : '/login');
  };

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-center px-4">
        <MobileNav routes={routes} />

        <Link
          href={routes.home.path}
          className="ml-4 flex items-center gap-2 md:ml-0"
        >
          <span className="text-xl font-bold">Clothify</span>
        </Link>

        <nav className="mx-6 hidden items-center gap-6 text-sm md:flex">
          {navItems.map(({ path, label }) => (
            <NavLink key={path} path={path} label={label} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {/* Search */}
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder={t('placeholders.searchPlaceholder')}
                className="w-[200px] md:w-[300px]"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{t('actions.closeSearch')}</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('actions.search')}</span>
            </Button>
          )}

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>

          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">{t('actions.account')}</span>
          </Button>

          <Link href={routes.cart.path}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">{t('navigation.cart')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

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

function MobileNav({
  routes,
}: {
  routes: Record<string, { path: string; label: string }>;
}) {
  const t = useTranslations();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t('actions.toggleMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="mt-8 flex flex-col gap-4">
          {Object.values(routes).map(({ path, label }) => (
            <Link key={path} href={path} className="text-lg font-medium">
              {label}
            </Link>
          ))}
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {t('actions.language')}
              </span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('actions.theme')}</span>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
