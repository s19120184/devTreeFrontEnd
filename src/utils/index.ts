export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function urlValid(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}




