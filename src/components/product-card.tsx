"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Sparkles, Loader2, Tag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Product } from '@/lib/products';
import { summarizeProductInformation } from '@/ai/flows/summarize-product-information';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  const fetchSummary = async () => {
    if (summary || loading) return;
    setLoading(true);
    try {
      const response = await summarizeProductInformation({
        productName: product.name,
        productDetails: `Categoría: ${product.category}. Características: ${product.features.join(', ')}. Especificaciones: ${JSON.stringify(product.specs)}`
      });
      setSummary(response.summary);
    } catch (error) {
      setSummary("No se pudo generar el análisis en este momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 border-none bg-white group h-full relative">
      {savings > 0 && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-orange-600 text-white border-none font-black px-3 py-1.5 shadow-lg animate-in slide-in-from-left duration-500 flex items-center gap-1.5 rounded-full text-[10px] uppercase tracking-wider">
            <Tag className="h-3 w-3" />
            Ahorras ${savings}
          </Badge>
        </div>
      )}
      
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={product.category.toLowerCase() + " phone"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary font-black shadow-xl border-none px-4 py-1.5 rounded-full text-[10px] uppercase">
          {product.category}
        </Badge>
        
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <Button className="w-full rounded-2xl bg-white text-primary hover:bg-primary hover:text-white font-bold shadow-2xl">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir al carrito
          </Button>
        </div>
      </div>
      
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-black text-slate-900 leading-tight">
            {product.name}
          </CardTitle>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xl font-black text-primary leading-none">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through font-bold mt-1">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-1">
        <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl text-[9px] text-slate-600 font-black uppercase tracking-widest border border-slate-100">
              <CheckCircle2 className="h-3 w-3 text-teal-500" />
              {feature}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 border-t border-slate-50 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-primary/5 group/ai h-12"
              onClick={fetchSummary}
            >
              <Sparkles className="h-4 w-4 mr-2 text-teal-500 group-hover/ai:animate-pulse" />
              Análisis Experto IA
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[3rem] border-none shadow-2xl overflow-hidden p-0">
            <div className="p-8 bg-gradient-to-br from-primary/5 to-teal-50/30">
              <DialogHeader className="mb-6">
                <DialogTitle className="flex items-center gap-3 text-primary text-2xl font-black tracking-tight">
                  <div className="bg-primary/10 p-2.5 rounded-2xl">
                    <Sparkles className="h-6 w-6 text-teal-600" />
                  </div>
                  PhonePro Intelligence
                </DialogTitle>
                <DialogDescription className="font-bold text-slate-900 text-xl mt-4 leading-tight">
                  ¿Por qué el <span className="text-primary">{product.name}</span> es para ti?
                </DialogDescription>
              </DialogHeader>
              
              <div className="min-h-[150px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-6 text-slate-400 py-10">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <Sparkles className="h-6 w-6 text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase">Generando análisis experto...</p>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl relative">
                      <div className="absolute -top-3 -left-3 bg-teal-500 text-white p-2 rounded-xl shadow-lg">
                        <Tag className="h-4 w-4" />
                      </div>
                      <p className="text-slate-700 leading-relaxed italic text-lg font-medium">
                        "{summary}"
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
                        <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">Cerebro</p>
                        <p className="text-sm font-bold text-slate-900">{product.specs.processor}</p>
                      </div>
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
                        <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">Visión</p>
                        <p className="text-sm font-bold text-slate-900">{product.specs.screen}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-10 flex flex-col gap-4">
                <Button className="w-full rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                  Comprar con Descuento
                </Button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  Envío gratis incluido en esta oferta
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
