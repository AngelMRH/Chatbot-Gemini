
"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle, Bot as BotIcon, GripHorizontal, Minus, Volume2, Loader2, Trash2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { recommendProduct } from '@/ai/flows/product-recommendation';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { getProductInformationString } from '@/lib/products';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
};

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "¡Hola! 👋 Soy tu experto PhonePro. ¿Buscas un móvil para fotografía, juegos o quizás un iPhone?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  
  const [position, setPosition] = useState({ right: 24, bottom: 24 });
  const [size, setSize] = useState({ width: 380, height: 550 });
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, initialRight: 0, initialBottom: 0 });
  const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, initialWidth: 0, initialHeight: 0 });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = dragStart.mouseX - e.clientX;
        const deltaY = dragStart.mouseY - e.clientY;
        const newRight = Math.max(0, Math.min(window.innerWidth - (isOpen ? size.width : 64), dragStart.initialRight + deltaX));
        const newBottom = Math.max(0, Math.min(window.innerHeight - (isOpen ? (isMinimized ? 80 : size.height) : 64), dragStart.initialBottom + deltaY));
        setPosition({ right: newRight, bottom: newBottom });
      }
      
      if (isResizing && isOpen && !isMinimized) {
        const deltaX = resizeStart.mouseX - e.clientX;
        const deltaY = resizeStart.mouseY - e.clientY;
        setSize({
          width: Math.max(300, Math.min(800, resizeStart.initialWidth + deltaX)),
          height: Math.max(400, Math.min(900, resizeStart.initialHeight + deltaY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, size, isOpen, isMinimized]);

  const onDragStart = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('form') || target.closest('audio')) return;
    setIsDragging(true);
    setDragStart({ mouseX: e.clientX, mouseY: e.clientY, initialRight: position.right, initialBottom: position.bottom });
  };

  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ mouseX: e.clientX, mouseY: e.clientY, initialWidth: size.width, initialHeight: size.height });
  };

  const handleSpeak = async (message: Message) => {
    if (isSpeakingId === message.id) return;
    
    setIsSpeakingId(message.id);
    try {
      let url = message.audioUrl;
      if (!url) {
        const response = await textToSpeech(message.content);
        url = response.media;
        setMessages(prev => prev.map(m => m.id === message.id ? { ...m, audioUrl: url } : m));
      }
      
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error de voz:", error);
    } finally {
      setIsSpeakingId(null);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "¡Hola de nuevo! 👋 Soy tu experto PhonePro. ¿En qué puedo ayudarte ahora?",
        timestamp: new Date()
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await recommendProduct({
        needs: input,
        productInformation: getProductInformationString()
      });
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.recommendation, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Lo siento, hubo un problema. Intenta de nuevo.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed z-50 flex items-center justify-center group" style={{ right: position.right, bottom: position.bottom }} onMouseDown={onDragStart}>
        <div className="absolute -inset-4 bg-primary/30 rounded-full blur-2xl animate-pulse group-hover:bg-primary/50 transition-all"></div>
        <Button onClick={() => setIsOpen(true)} className="h-16 w-16 rounded-full shadow-2xl bg-primary border-4 border-white/20 transition-transform active:scale-95 relative z-10 cursor-grab active:cursor-grabbing">
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed z-50 flex flex-col items-end select-none" style={{ right: position.right, bottom: position.bottom, width: size.width }}>
      <audio ref={audioRef} hidden />
      <div className={cn("relative flex flex-col border border-white/20 rounded-[2.5rem] bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300", isMinimized ? "h-20" : "")} style={{ height: isMinimized ? 80 : size.height, width: '100%' }}>
        {!isMinimized && (
          <div onMouseDown={onResizeStart} className="absolute top-0 left-0 w-10 h-10 cursor-nw-resize z-[60] p-2 opacity-50 hover:opacity-100 flex items-center justify-center">
             <div className="w-4 h-4 border-t-2 border-l-2 border-primary/50 rounded-tl-sm" />
          </div>
        )}
        <div onMouseDown={onDragStart} className="p-6 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl">
              <BotIcon className="h-5 w-5 text-teal-300" />
            </div>
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                Chatbot-Gemini
                <GripHorizontal className="h-4 w-4 opacity-40" />
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                <span className="text-[10px] opacity-90 uppercase font-black tracking-widest">En línea</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 relative z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8 text-white hover:bg-white/20 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Limpiar chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 text-white hover:bg-white/20 rounded-full"><Minus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:bg-white/20 rounded-full"><X className="h-4 w-4" /></Button>
          </div>
        </div>
        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-6 bg-slate-50/70">
              <div className="space-y-6">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex flex-col", m.role === 'user' ? 'items-end' : 'items-start')}>
                    <div className={cn("max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-sm shadow-sm relative group/msg transition-all", m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none')}>
                      <p className="leading-relaxed font-medium">{m.content}</p>
                      {m.role === 'assistant' && (
                        <div className="flex gap-2 absolute -right-12 top-0 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                           <Button 
                            onClick={() => handleSpeak(m)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-white border shadow-sm text-slate-400 hover:text-primary"
                          >
                            {isSpeakingId === m.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-2 font-bold uppercase tracking-widest">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 items-center text-xs font-bold text-primary animate-pulse">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Bot className="h-4 w-4" />
                    </div>
                    Analizando catálogo...
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            <div className="p-6 bg-white border-t border-slate-100">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input 
                  placeholder="Ej: 'Búscame un iPhone barato'" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  disabled={isLoading} 
                  className="rounded-2xl border-slate-200 h-12 px-5 focus-visible:ring-primary shadow-inner" 
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-12 w-12 rounded-2xl shadow-lg shadow-primary/30">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
              <p className="text-[9px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">Powered by Gemini 2.5 Flash</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
