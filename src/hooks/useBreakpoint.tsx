import useBP from 'use-breakpoint';

const BREAKPOINTS = { mobile: 400, tablet: 900, desktop: 1280 }

export default function useBreakpoint() {
  return useBP(BREAKPOINTS, 'desktop');
}