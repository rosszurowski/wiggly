hash.BASE = 0x811c9dc5

/**
 * Generates 32 bit FNV-1a hash from the given string.
 * As explained here: http://isthe.com/chongo/tech/comp/fnv/
 */
export default function hash(s: string, h = hash.BASE): number {
  const l = s.length

  for (let i = 0; i < l; i++) {
    h ^= s.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }

  return h >>> 0
}
