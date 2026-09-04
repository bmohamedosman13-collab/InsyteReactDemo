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
  line1: `7 documents · ${redactionStats.spans.toLocaleString()} entity spans detected · 96 held as identifying across 20 distinct identities`,
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
/*
 * The list of entities flagged for reviewer judgement is derived from the
 * spans themselves, in redactionSpans.js, where each carries `over: true` and
 * the reason. It is not duplicated here.
 *
 * What qualifies: genuinely ambiguous public entities, correctly detected.
 * Millwoods library, Access 24/7, 988, 811, Health Link, and the diary date.
 *
 * What does not: detector faults on clinical vocabulary. The audit run flagged
 * PHQ-9 and GAD-7 as Location and Person. Those are bugs, not judgement calls,
 * and a demo of the finished product does not offer them to the reviewer.
 * See INSYTE_DEMO_REDACTION_AUDIT.md section 4.3.
 */

/** Detection sources for the "Why did this get flagged?" expander. Spec 3.1. */
export const DETECTION_SOURCES = ['NER model', 'Pattern rule', 'Presidio recognizer']
