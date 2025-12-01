export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < 768;
}
