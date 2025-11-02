import type { SVGProps } from 'react';

export const WhitePawn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" /><path d="M22.5 15c-3.9 0-7 3.1-7 7v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2c0-3.9-3.1-7-7-7z" /><path d="M22.5 27c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z" /><path d="M12.5 38.5h20" /></g></svg>
);
export const WhiteRook = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M14 29.5v-13h17v13h-17z" strokeLinecap="butt" /><path d="M14 16.5L11 14h23l-3 2.5H14z" /><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5" /></g></svg>
);
export const WhiteKnight = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c10.5 0 11.5 8 8.5 12-3 4-6 6-6 6-1 2 7.5 9.5 7.5 9.5-3 2.5-12.5 2.5-15 0 0 0 8.5-7.5 7.5-9.5 0 0-3-2-6-6-3-4 .5-12 8.5-12z" /><path d="M14 24.5c-3 3-4 4.5-4 4.5-4 4-4 4 1 4 0 0 4-1 6-3l-3-5.5z" /><path d="M25 32a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" fill="#000" stroke="#000"/><path d="M27 34.5c-2 0-3.5-1-3.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1.5 2.5-1.5 2.5z" /></g></svg>
);
export const WhiteBishop = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /><path d="M17.5 15c4.5-2.5 4.5-2.5 9 0-4.5 2.5-4.5 2.5-9 0zM17.5 15c0 4.5 0 4.5-2.5 7.5-2.5 3 2.5 7.5 2.5 7.5s5-4.5 2.5-7.5c-2.5-3-2.5-7.5-2.5-7.5z" /><path d="M26.5 15c0 4.5 0 4.5 2.5 7.5 2.5 3-2.5 7.5-2.5 7.5s-5-4.5-2.5-7.5c2.5-3 2.5-7.5 2.5-7.5z" /></g></svg>
);
export const WhiteQueen = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM22.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM37 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M11.5 14.5c5-2.5 16-2.5 21 0" /><path d="M11.5 30c5-2.5 16-2.5 21 0" /><path d="M11.5 14.5L15 30h14l3.5-15.5h-21z" /></g></svg>
);
export const WhiteKing = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" /><path d="M22.5 25c-5.523 0-10 4.477-10 10v3h20v-3c0-5.523-4.477-10-10-10z" /><path d="M12.5 30C12.5 30 12.5 32 10.5 32C8.5 32 8 30 7 30" /><path d="M32.5 30c0 0 0 2-2 2s-2.5-2-3.5-2" /><path d="M12.5 25a4.5 4.5 0 0 1 0 9h20a4.5 4.5 0 0 1 0-9" /><path d="M22.5 11.5a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6z" /><path d="M22.5 11.5a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z" /><path d="M22.5 11.5A2.5 2.5 0 1 1 22.5 18.5 A 2.5 2.5 0 1 1 22.5 11.5 z" /></g></svg>
);

export const BlackPawn = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" /><path d="M22.5 15c-3.9 0-7 3.1-7 7v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2c0-3.9-3.1-7-7-7z" /><path d="M22.5 27c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z" /><path d="M12.5 38.5h20" /></g></svg>
);
export const BlackRook = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M14 29.5v-13h17v13h-17z" strokeLinecap="butt" /><path d="M14 16.5L11 14h23l-3 2.5H14z" /><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5" /></g></svg>
);
export const BlackKnight = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c10.5 0 11.5 8 8.5 12-3 4-6 6-6 6-1 2 7.5 9.5 7.5 9.5-3 2.5-12.5 2.5-15 0 0 0 8.5-7.5 7.5-9.5 0 0-3-2-6-6-3-4 .5-12 8.5-12z" /><path d="M14 24.5c-3 3-4 4.5-4 4.5-4 4-4 4 1 4 0 0 4-1 6-3l-3-5.5z" /><path d="M25 32a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" fill="#FFF" stroke="#FFF" /><path d="M27 34.5c-2 0-3.5-1-3.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1.5 2.5-1.5 2.5z" /></g></svg>
);
export const BlackBishop = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /><path d="M17.5 15c4.5-2.5 4.5-2.5 9 0-4.5 2.5-4.5 2.5-9 0zM17.5 15c0 4.5 0 4.5-2.5 7.5-2.5 3 2.5 7.5 2.5 7.5s5-4.5 2.5-7.5c-2.5-3-2.5-7.5-2.5-7.5z" /><path d="M26.5 15c0 4.5 0 4.5 2.5 7.5 2.5 3-2.5 7.5-2.5 7.5s-5-4.5-2.5-7.5c2.5-3 2.5-7.5 2.5-7.5z" /></g></svg>
);
export const BlackQueen = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM22.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM37 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M11.5 14.5c5-2.5 16-2.5 21 0" /><path d="M11.5 30c5-2.5 16-2.5 21 0" /><path d="M11.5 14.5L15 30h14l3.5-15.5h-21z" /></g></svg>
);
export const BlackKing = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" /><path d="M22.5 25c-5.523 0-10 4.477-10 10v3h20v-3c0-5.523-4.477-10-10-10z" /><path d="M12.5 30C12.5 30 12.5 32 10.5 32C8.5 32 8 30 7 30" /><path d="M32.5 30c0 0 0 2-2 2s-2.5-2-3.5-2" /><path d="M12.5 25a4.5 4.5 0 0 1 0 9h20a4.5 4.5 0 0 1 0-9" /><path d="M22.5 11.5a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6z" /><path d="M22.5 11.5a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z" /><path d="M22.5 11.5A2.5 2.5 0 1 1 22.5 18.5 A 2.5 2.5 0 1 1 22.5 11.5 z" /></g></svg>
);
