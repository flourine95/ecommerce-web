'use client';

import Link from 'next/link';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: SiFacebook, href: '#', label: 'Facebook' },
  { icon: SiInstagram, href: '#', label: 'Instagram' },
  { icon: SiX, href: '#', label: 'X' },
];

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-muted-foreground hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useTranslations('footer');

  const shopLinks = [
    { href: '/products/men', label: t('menCollection') },
    { href: '/products/women', label: t('womenCollection') },
    { href: '/products/new', label: t('newArrivals') },
    { href: '/products/sale', label: t('sale') },
  ];

  const companyLinks = [
    { href: '/about', label: t('aboutUs') },
    { href: '/contact', label: t('contact') },
    { href: '/careers', label: t('careers') },
    { href: '/stores', label: t('storeLocator') },
  ];

  const customerLinks = [
    { href: '/help', label: t('helpCenter') },
    { href: '/shipping', label: t('shippingReturns') },
    { href: '/size-guide', label: t('sizeGuide') },
    { href: '/faq', label: t('faq') },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('privacyPolicy') },
    { href: '/terms', label: t('termsService') },
    { href: '/cookies', label: t('cookiePolicy') },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('title')}</h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <LinkList title={t('shop')} links={shopLinks} />
          <LinkList title={t('company')} links={companyLinks} />
          <LinkList title={t('customerService')} links={customerLinks} />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="text-muted-foreground flex gap-4 text-xs">
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
