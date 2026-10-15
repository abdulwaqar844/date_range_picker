export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const item of classes) {
    if (!item) continue;
    if (typeof item === 'string' || typeof item === 'number') {
      result.push(String(item));
    } else if (Array.isArray(item)) {
      const inner = cn(...item);
      if (inner) result.push(inner);
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}

export function scrollToSelected(container: HTMLElement | null, selected: HTMLElement | null, smooth = true): void {
  if (!container || !selected) return;
  const top = selected.offsetTop - container.offsetTop;
  container.scrollTo({
    top: Math.max(0, top - 32),
    behavior: smooth ? 'smooth' : 'auto',
  });
}
