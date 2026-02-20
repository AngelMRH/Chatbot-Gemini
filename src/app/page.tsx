import { Smartphone, Sparkles, Camera, Zap, ShieldCheck, Github, Twitter, Instagram, ArrowRight, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Navbar } from '@/components/navbar';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50/50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full max-w-6xl px-4 py-28 flex flex-col items-center text-center space-y-12">
        <div className="relative animate-in fade-in zoom-in duration-1000">
          <div className="absolute -inset-16 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="relative bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-100/50 backdrop-blur-sm">
            <Smartphone className="h-24 w-24 text-primary" />
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-2xl shadow-xl animate-bounce">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-6 py-2.5 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em]">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Recomendaciones impulsadas por Gemini
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Tu próximo móvil al <br/><span className="bg-gradient-to-br from-primary via-blue-600 to-teal-400 bg-clip-text text-transparent">Mejor Precio</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
            Nuestra IA analiza miles de datos técnicos y ofertas en tiempo real para encontrarte el smartphone perfecto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button size="lg" className="rounded-[2rem] px-14 h-20 text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group" asChild>
              <a href="#catalog" className="flex items-center gap-3">
                Ver Ofertas Flash
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </a>
            </Button>
            <div className="flex flex-col items-start gap-1">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest pl-2">+10k usuarios felices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
           <div className="text-center space-y-2">
             <p className="text-4xl font-black text-primary">2.5s</p>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Respuesta IA</p>
           </div>
           <div className="text-center space-y-2">
             <p className="text-4xl font-black text-teal-500">2024</p>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Últimos Modelos</p>
           </div>
           <div className="text-center space-y-2">
             <p className="text-4xl font-black text-orange-500">30%</p>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ahorro Promedio</p>
           </div>
           <div className="text-center space-y-2">
             <p className="text-4xl font-black text-indigo-500">100%</p>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Garantía Chatbot</p>
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="w-full bg-slate-900 py-32 mt-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-20 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 group">
            <div className="bg-white/10 p-8 rounded-[3rem] transition-all group-hover:bg-primary group-hover:rotate-12 border border-white/5 shadow-2xl">
              <Camera className="h-12 w-12 text-primary group-hover:text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white tracking-tight">Cámaras Pro</h3>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">Captura cada detalle con sensores optimizados por nuestra IA.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-8 group">
            <div className="bg-white/10 p-8 rounded-[3rem] transition-all group-hover:bg-teal-500 group-hover:-rotate-12 border border-white/5 shadow-2xl">
              <Zap className="h-12 w-12 text-teal-500 group-hover:text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white tracking-tight">Gaming Flow</h3>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">Rendimiento sin límites para los juegos más exigentes de 2024.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-8 group">
            <div className="bg-white/10 p-8 rounded-[3rem] transition-all group-hover:bg-orange-500 group-hover:rotate-12 border border-white/5 shadow-2xl">
              <ShieldCheck className="h-12 w-12 text-orange-500 group-hover:text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white tracking-tight">Seguridad Total</h3>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">Todos nuestros equipos son verificados por expertos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Section */}
      <div id="catalog" className="w-full max-w-7xl px-4 py-32">
        <div className="flex flex-col mb-24 items-center text-center space-y-6">
          <div className="bg-orange-500/10 text-orange-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-orange-200">
             🔥 Ofertas de Tiempo Limitado
          </div>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Selección del Analista</h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Actualizado hace 5 minutos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-6xl px-4 mb-32">
        <div className="bg-primary rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-primary/40">
           <div className="absolute -top-20 -right-20 h-64 w-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="relative z-10 space-y-10">
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">¿Aún no te decides? <br/>Habla con nuestra IA</h2>
             <p className="text-xl text-primary-foreground/80 font-medium max-w-2xl mx-auto">Nuestro experto digital está disponible 24/7 para resolver tus dudas técnicas y encontrarte el mejor precio.</p>
             <Button size="lg" variant="secondary" className="rounded-full px-16 h-20 text-xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-primary">
               Iniciar Chat Ahora
             </Button>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white py-24 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-3xl font-black text-primary">
              <Smartphone className="h-10 w-10" />
              <span>Chatbot-Gemini</span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed text-lg">
              La plataforma líder en recomendación de smartphones impulsada por inteligencia artificial avanzada.
            </p>
            <div className="flex gap-6">
              <Button variant="ghost" size="icon" className="rounded-2xl bg-white/5 hover:bg-primary transition-colors h-12 w-12">
                <Github className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-2xl bg-white/5 hover:bg-blue-400 transition-colors h-12 w-12">
                <Twitter className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-2xl bg-white/5 hover:bg-pink-500 transition-colors h-12 w-12">
                <Instagram className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-white/50">Empresa</h4>
            <ul className="space-y-6 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog Tech</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-white/50">Soporte</h4>
            <ul className="space-y-6 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Garantía VIP</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-white/50">Boletín</h4>
            <p className="text-slate-400 text-base font-medium leading-relaxed">Recibe las mejores ofertas analizadas por nuestra IA directamente en tu inbox.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="tu@email.com" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm flex-1 outline-none focus:border-primary transition-colors font-bold" />
              <Button className="rounded-2xl h-14 font-black text-base shadow-lg">Suscribirme</Button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">
            &copy; 2024 Chatbot-Gemini. Crafted with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
