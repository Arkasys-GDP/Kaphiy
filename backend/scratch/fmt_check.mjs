import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

const createdAt = '2026-05-24T21:38:34.698Z';
const wall = new Date();

console.log('Stored UTC ISO :', createdAt);
console.log('Wall now       :', wall.toString());
console.log('TZ offset min  :', new Date().getTimezoneOffset(), '(should be 300 for Ecuador UTC-5)');
console.log('--- Dashboard history page format(parseISO, "HH:mm") ---');
console.log(format(parseISO(createdAt), 'HH:mm', { locale: es }));
console.log('--- PWA mis-pedidos toLocaleTimeString("es-EC") ---');
console.log(new Date(createdAt).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }));
console.log('--- useElapsedTime diff (Date.now() - createdAt ms) ---');
const sec = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
console.log(sec, 'sec elapsed');
