import useBP from "use-breakpoint";

export const BREAKPOINTS = { mobile: 400, tablet: 900, desktop: 1280 };

export default function useBreakpoint() {
  const vpWidth = window.visualViewport?.width ?? 0;
  return useBP(
    BREAKPOINTS,
    vpWidth > BREAKPOINTS.desktop
      ? "desktop"
      : vpWidth > BREAKPOINTS.tablet
      ? "tablet"
      : "mobile"
  );
}
