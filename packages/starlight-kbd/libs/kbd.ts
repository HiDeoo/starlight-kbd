const keyLabelReplacements: Record<string, string> = {
  // Abbreviations
  Ctrl: 'Control',
  Opt: 'Option',
  Cmd: 'Command',
  Win: 'Windows',
  Esc: 'Escape',
  Fn: 'Function',
  Del: 'Delete',
  Ins: 'Insert',
  PgUp: 'Page Up',
  PgDn: 'Page Down',
  Up: 'Up Arrow',
  Down: 'Down Arrow',
  Left: 'Left Arrow',
  Right: 'Right Arrow',
  // Special characters
  '`': 'Backtick',
  '~': 'Tilde',
  '!': 'Exclamation Mark',
  '@': 'At Sign',
  '#': 'Number Sign',
  $: 'Dollar Sign',
  '%': 'Percent Sign',
  '^': 'Caret',
  '&': 'Ampersand',
  '*': 'Asterisk',
  '(': 'Left Parenthesis',
  ')': 'Right Parenthesis',
  '-': 'Minus Sign',
  _: 'Underscore',
  '=': 'Equal Sign',
  '+': 'Plus Sign',
  '[': 'Left Square Bracket',
  '{': 'Left Curly Bracket',
  ']': 'Right Square Bracket',
  '}': 'Right Curly Bracket',
  '\\': 'Backslash',
  '|': 'Vertical Bar',
  ';': 'Semicolon',
  ':': 'Colon',
  "'": 'Apostrophe',
  '"': 'Quotation Mark',
  ',': 'Comma',
  '<': 'Less Than Sign',
  '.': 'Period',
  '>': 'Greater Than Sign',
  '?': 'Question Mark',
  '/': 'Slash',
  // Symbols
  '⌃': 'Control',
  '⌥': 'Option',
  '⌘': 'Command',
  '⊞': 'Windows',
  '⎋': 'Escape',
  '⇧': 'Shift',
  '⇪': 'Caps Lock',
  '⌦': 'Delete',
  '⌫': 'Backspace',
  '⇥': 'Tab',
  '↖': 'Home',
  '↘': 'End',
  '⇱': 'Page Up',
  '⇲': 'Page Down',
  '⇞': 'Page Up',
  '⇟': 'Page Down',
  '↑': 'Up Arrow',
  '↓': 'Down Arrow',
  '←': 'Left Arrow',
  '→': 'Right Arrow',
  '␣': 'Space',
  '⏎': 'Return',
  '↵': 'Return',
}

/**
 * <kbd>   → `<chord>[ <chord>]`
 * <chord> → `[<mods>+]<key>`
 * <mods>  → `<mod>[+<mod>]`
 */
export function getKbdFromString(kbd: string): Kbd {
  return kbd
    .trim()
    .split(' ')
    .map((chord) => chord.split(/\b\+/).filter(Boolean))
}

export function getKbdLabel(kbd: Kbd, keywords: KbdLabelKeywords): string {
  return kbd.map((chord) => chord.map((key) => keyLabelReplacements[key] ?? key).join(' + ')).join(keywords.then)
}

type Kbd = string[][]

interface KbdLabelKeywords {
  then: string
}
