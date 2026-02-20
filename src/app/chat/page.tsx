import { redirect } from 'next/navigation';

export default function ChatPage() {
  // Ahora el chat es un widget flotante en la página principal,
  // así que redirigimos al usuario a la home.
  redirect('/');
}
