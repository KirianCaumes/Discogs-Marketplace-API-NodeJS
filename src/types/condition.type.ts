/**
 * Conditions
 */
export type Condition =
    | '0'
    | 'Fair (F)'
    | 'Good (G)'
    | 'Good Plus (G+)'
    | 'Mint (M)'
    | 'Near Mint (NM or M-)'
    | 'Poor (P)'
    | 'Very Good (VG)'
    | 'Very Good Plus (VG+)'
    | ({} & string)
