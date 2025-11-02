import type { SVGProps } from 'react';

export const WhitePawn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" /></g></svg>
);
export const WhiteRook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M14 29.5v-15h17v15H14z" transform="translate(0 .5)" /><path d="M14 14.5h17L32.5 12 31 10.5H14l-1.5 1.5L14 14.5z" /><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5" /></g></svg>
);
export const WhiteKnight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c1.03 0 2.02.42 2.75 1.11 1.02.97 1.25 2.47.63 3.56-1.02 1.8-2.92 2.43-4.38 3.33s-3.02 2.22-3.02 4.4v.02c0 1.2.6 2.2 1.5 2.5-1.01.5-2.21.5-3.5 0-1.29 0-2.49-.5-3.5-1.5-.53 0-1.03-.22-1.38-.62s-.56-.91-.56-1.48c0-.73.23-1.46.68-2.08.45-.62 1.08-1.08 1.77-1.32 2.3-.82 2.89-3.32 1.94-5.11-.94-1.79.44-3.89 2.36-4.22.96-.17 1.95-.02 2.8.44z" /><path d="M22.5 25.5s-1.91 1.5-3.5 1.5c-1.59 0-2.5-.5-2.5-1.5s.91-1.5 2.5-1.5c1.59 0 4.5-2.5 4.5-2.5l-1 3.5-1-1z" /><path d="M31.5 31.5c-1.43 1.17-3.21 1.84-5.16 2.05-1.95.21-3.9-.03-5.69-.74-1.79-.7-3.3-1.82-4.4-3.26" /><path d="M26.5 38.5H18.5v-5l-2-2.5-2 2.5v5h-3.5s0-4.5 0-5.5c0-1 .5-2 1.5-2.5 1-.5 2-.5 3-.5 1 0 2 .5 3 .5s2-.5 3-.5 2 .5 3 .5c1 0 2-.5 3-.5 1 0 1.5.5 1.5 2.5s0 5.5 0 5.5h-3.5z" /></g></svg>
);
export const WhiteBishop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 24.5c2.5 2.5 12.5 2.5 15 0-2.5-2.5-12.5-2.5-15 0zM22.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /><path d="M15 14h15v9H15z" transform="matrix(1 0 0 -1 0 37)" /><path d="M15 14l-3-3L10.5 12 12 14h3zM30 14l3-3 1.5 1L33 14h-3z" /></g></svg>
);
export const WhiteQueen = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM22.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM12 24.5c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5zM33 24.5c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z" /><path d="M37 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M12 14.5s4-2.5 10.5-2.5 10.5 2.5 10.5 2.5-2 3-10.5 3-10.5-3-10.5-3z" /><path d="M12 14.5c3-2 7-3 10.5-3s7.5 1 10.5 3M12 17.5c3 2 7 3 10.5 3s7.5-1 10.5-3" /></g></svg>
);
export const WhiteKing = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#FFF" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25c-5.523 0-10-4.477-10-10 0-5.523 4.477-10 10-10s10 4.477 10 10c0 5.523-4.477 10-10 10z" transform="translate(0 .5)" /><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 32V13M12.5 32v-6.5s3-1.5 10-1.5 10 1.5 10 1.5V32" /><path d="M12.5 25.5s3-1.5 10-1.5 10 1.5 10 1.5" /></g></svg>
);

export const BlackPawn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" /></g></svg>
);
export const BlackRook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" fillRule="evenodd" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M14 29.5v-15h17v15H14z" transform="translate(0 .5)" /><path d="M14 14.5h17L32.5 12 31 10.5H14l-1.5 1.5L14 14.5z" /><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5" /></g></svg>
);
export const BlackKnight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" fillRule="evenodd" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c1.03 0 2.02.42 2.75 1.11 1.02.97 1.25 2.47.63 3.56-1.02 1.8-2.92 2.43-4.38 3.33s-3.02 2.22-3.02 4.4v.02c0 1.2.6 2.2 1.5 2.5-1.01.5-2.21.5-3.5 0-1.29 0-2.49-.5-3.5-1.5-.53 0-1.03-.22-1.38-.62s-.56-.91-.56-1.48c0-.73.23-1.46.68-2.08.45-.62 1.08-1.08 1.77-1.32 2.3-.82 2.89-3.32 1.94-5.11-.94-1.79.44-3.89 2.36-4.22.96-.17 1.95-.02 2.8.44z" /><path d="M22.5 25.5s-1.91 1.5-3.5 1.5c-1.59 0-2.5-.5-2.5-1.5s.91-1.5 2.5-1.5c1.59 0 4.5-2.5 4.5-2.5l-1 3.5-1-1z" /><path d="M31.5 31.5c-1.43 1.17-3.21 1.84-5.16 2.05-1.95.21-3.9-.03-5.69-.74-1.79-.7-3.3-1.82-4.4-3.26" /><path d="M26.5 38.5H18.5v-5l-2-2.5-2 2.5v5h-3.5s0-4.5 0-5.5c0-1 .5-2 1.5-2.5 1-.5 2-.5 3-.5 1 0 2 .5 3 .5s2-.5 3-.5 2 .5 3 .5c1 0 2-.5 3-.5 1 0 1.5.5 1.5 2.5s0 5.5 0 5.5h-3.5z" /></g></svg>
);
export const BlackBishop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" fillRule="evenodd" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 24.5c2.5 2.5 12.5 2.5 15 0-2.5-2.5-12.5-2.5-15 0zM22.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /><path d="M15 14h15v9H15z" transform="matrix(1 0 0 -1 0 37)" /><path d="M15 14l-3-3L10.5 12 12 14h3zM30 14l3-3 1.5 1L33 14h-3z" /></g></svg>
);
export const BlackQueen = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" fillRule="evenodd" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM22.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM12 24.5c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5zM33 24.5c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z" /><path d="M37 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M12 14.5s4-2.5 10.5-2.5 10.5 2.5 10.5 2.5-2 3-10.5 3-10.5-3-10.5-3z" /><path d="M12 14.5c3-2 7-3 10.5-3s7.5 1 10.5 3M12 17.5c3 2 7 3 10.5 3s7.5-1 10.5-3" /></g></svg>
);
export const BlackKing = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 45" {...props}><g fill="#212121" fillRule="evenodd" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25c-5.523 0-10-4.477-10-10 0-5.523 4.477-10 10-10s10 4.477 10 10c0 5.523-4.477 10-10 10z" transform="translate(0 .5)" /><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" /><path d="M22.5 32V13M12.5 32v-6.5s3-1.5 10-1.5 10 1.5 10 1.5V32" /><path d="M12.5 25.5s3-1.5 10-1.5 10 1.5 10 1.5" /></g></svg>
);
