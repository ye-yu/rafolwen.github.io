import useBP from 'use-breakpoint';

const BREAKPOINTS = { mobile: 300, tablet: 768, desktop: 1280 }

export default function useBreakpoint() {
  return useBP(BREAKPOINTS, 'desktop');
}