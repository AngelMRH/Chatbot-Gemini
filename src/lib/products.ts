import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: 'Gaming' | 'Fotografía' | 'Económico' | 'Premium';
  imageUrl: string;
  features: string[];
  specs: {
    processor: string;
    ram: string;
    battery: string;
    screen: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Titan Gaming X',
    price: 799,
    oldPrice: 949,
    description: 'Rendimiento extremo con 144Hz y Snapdragon 8 Gen 3.',
    category: 'Gaming',
    imageUrl: PlaceHolderImages.find(img => img.id === 'phone-gaming')?.imageUrl || '',
    features: ['Pantalla 144Hz', 'Refrigeración Líquida', 'Latencia 720Hz'],
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      battery: '6000mAh',
      screen: '6.8" AMOLED'
    }
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 999,
    oldPrice: 1199,
    description: 'Cámaras Pro en titanio con chip A17 Pro.',
    category: 'Fotografía',
    imageUrl: PlaceHolderImages.find(img => img.id === 'phone-photography')?.imageUrl || '',
    features: ['Cámara 48MP', 'Vídeo Log', 'Botón Acción'],
    specs: {
      processor: 'A17 Pro',
      ram: '8GB',
      battery: '3274mAh',
      screen: '6.1" OLED'
    }
  },
  {
    id: '3',
    name: 'Core Lite 5G',
    price: 199,
    oldPrice: 299,
    description: 'Equilibrado con 2 días de batería y conectividad 5G.',
    category: 'Económico',
    imageUrl: PlaceHolderImages.find(img => img.id === 'phone-budget')?.imageUrl || '',
    features: ['Batería 5000mAh', '5G Real', 'Diseño Slim'],
    specs: {
      processor: 'Snapdragon 778G',
      ram: '8GB',
      battery: '5000mAh',
      screen: '6.5" LCD'
    }
  },
  {
    id: '4',
    name: 'Ultra Vision Max',
    price: 1149,
    oldPrice: 1399,
    description: 'El smartphone con el zoom más potente del mercado.',
    category: 'Premium',
    imageUrl: PlaceHolderImages.find(img => img.id === 'phone-premium')?.imageUrl || '',
    features: ['Zoom Óptico 10x', 'Pantalla 2000 nits', 'Titanio'],
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      battery: '5000mAh',
      screen: '6.8" OLED'
    }
  }
];

export function getProductInformationString(): string {
  return PRODUCTS.map(p => `
    Producto: ${p.name}
    Precio Actual: $${p.price}
    ${p.oldPrice ? `Precio Anterior: $${p.oldPrice} (¡Está en OFERTA, el usuario ahorra $${p.oldPrice - p.price}!)` : ''}
    Categoría: ${p.category}
    Descripción: ${p.description}
    Características: ${p.features.join(', ')}
    Especificaciones: Procesador ${p.specs.processor}, ${p.specs.ram} RAM, Batería ${p.specs.battery}, Pantalla ${p.specs.screen}
  `).join('\n---\n');
}
