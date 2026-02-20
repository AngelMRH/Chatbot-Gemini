import Link from 'next/link';
import { Smartphone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
          <Smartphone className="h-6 w-6" />
          <span>Chatbot-Gemini</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">Catálogo</Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary">Beneficios</Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">Ofertas</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button asChild className="hidden sm:inline-flex rounded-full px-6">
            <Link href="#catalog">Explorar</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}