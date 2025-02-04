// TODO(HiDeoo) META or something?
// TODO(HiDeoo) normalize? Not order wise, this should be done by the user but regarding casing?

/**
 * <kbd>   → `<chord>[ <chord>]`
 * <chord> → `[<mods>+]<key>`
 * <mods>  → `<mod>[+<mod>]`
 */
export function parseKbd(kbd: string): string[][] {
  return kbd
    .trim()
    .split(' ')
    .map((chord) => chord.split(/\b\+/).filter(Boolean))
}
