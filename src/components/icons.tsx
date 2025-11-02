import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l3 3h-6l3-3z" />
      <path d="M18 5h-12" />
      <path d="M18 9H6" />
      <path d="M18 13H6" />
      <path d="M18 17H6" />
      <path d="M12 21l-3-3h6l-3 3z" />
      <path d="M6 5v14" />
      <path d="M18 5v14" />
    </svg>
  );
}
