/**
 * Redaction fixture for [CLIENT_1]. Spec 3.1.
 *
 * NUMBERS ARE MEASURED, NOT ILLUSTRATIVE.
 * Every figure below comes from the Presidio + spaCy en_core_web_lg run of
 * 2026-09-03 over the seven source documents. See INSYTE_DEMO_REDACTION_AUDIT.md
 * for the per-document breakdown and the script that produced them.
 *
 * The spec originally carried 1,184 spans / 61 identities / 1,847 sentences.
 * Those were placeholders and did not reconcile with the corpus. Replaced here.
 */

export const redactionStats = {
  documents: 7,
  spans: 419,
  uniqueEntities: 233,
  sentences: 578,
  mergedSurfaceForms: 5,
  /** Per-document, for the sidebar progress readout. */
  perDoc: {
    '01': { spans: 65, sentences: 70 },
    '02': { spans: 68, sentences: 123 },
    '03': { spans: 64, sentences: 71 },
    '04': { spans: 65, sentences: 74 },
    '05': { spans: 88, sentences: 93 },
    '06': { spans: 31, sentences: 53 },
    '07': { spans: 38, sentences: 94 },
  },
}

/** Header stats bar copy. Spec 3.1. */
export const redactionHeader = {
  line1: `${redactionStats.documents} documents · ${redactionStats.spans.toLocaleString()} entity spans detected · ${redactionStats.uniqueEntities} unique entities resolved`,
  line2: `Cross-document identity resolution: ${redactionStats.mergedSurfaceForms} surface forms of the same person merged to one token`,
  /** [VERBATIM] spec 3.1 */
  caption: 'Insyte over-redacts by design. You decide what comes back.',
}

/**
 * The five surface forms of [CLIENT_1] that the run actually merged.
 * Shown in the "why did these merge?" expander on the header stat line.
 * Counts are occurrences across the seven documents.
 */
export const mergedIdentity = {
  token: '[CLIENT_1]',
  forms: [
    { surface: 'RAMANATHAN, P.', count: 11, note: 'most common form in the corpus' },
    { surface: 'RAMANATHAN, P.S.', count: 4 },
    { surface: 'Priya R.', count: 2 },
    { surface: 'Priya Sunitha', count: 1, note: 'full middle name, spelled out once' },
    { surface: 'Ms. Ramanathan', count: 1 },
  ],
  /**
   * The hard case, and the one worth pointing at. The spouse shares the
   * client's surname, so a rule matching the bare surname collapses two people
   * into one token. Resolution has to order the specific pattern first.
   */
  nearMiss: {
    token: '[SPOUSE_1]',
    forms: ['R. Ramanathan', 'R. R.'],
    note: 'Shares the surname. Held as a separate identity, not merged.',
  },
}

/**
 * Over-redactions the reviewer is expected to restore.
 *
 * Every entry here is a genuinely ambiguous public entity: a real location, a
 * real phone number, a real date, correctly detected, that a reviewer chooses
 * to bring back. These are judgement calls, not detector faults.
 *
 * Detector faults are deliberately NOT surfaced. The audit run flagged clinical
 * instrument names such as PHQ-9 and GAD-7 as Location and Person, and those
 * are excluded: this demo shows the finished product, and a tool that redacts
 * the instrument names out of a clinical record is not a product feature to
 * exercise. See INSYTE_DEMO_REDACTION_AUDIT.md section 4.3.
 */
export const restoreCandidates = [
  {
    id: 'or-millwoods',
    surface: 'Millwoods library',
    entityClass: 'Location',
    source: 'NER model',
    docIds: ['03'],
    occurrences: 1,
    why: 'Public facility named in the safety plan, step 3.',
  },
  {
    id: 'or-access247',
    surface: 'Access 24/7',
    entityClass: 'Phone',
    source: 'Pattern rule',
    docIds: ['02', '03', '05', '07'],
    occurrences: 4,
    why: 'Public crisis line. The digits trip the phone pattern rule.',
  },
  {
    id: 'or-988',
    surface: '988',
    entityClass: 'Phone',
    source: 'Pattern rule',
    docIds: ['03', '07'],
    occurrences: 2,
    why: 'Public crisis line.',
  },
  {
    id: 'or-811',
    surface: '811',
    entityClass: 'Phone',
    source: 'Pattern rule',
    docIds: ['02', '03'],
    occurrences: 2,
    why: 'Public health line, Alberta.',
  },
  {
    id: 'or-diarydate',
    surface: '2025-08-05',
    entityClass: 'Date',
    source: 'Presidio recognizer',
    docIds: ['06'],
    occurrences: 1,
    why: "In the client's own handwriting header. The clinical meaning depends on the sequence.",
  },
]

/** Detection sources for the "Why did this get flagged?" expander. Spec 3.1. */
export const DETECTION_SOURCES = ['NER model', 'Pattern rule', 'Presidio recognizer']
