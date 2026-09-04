/**
 * Redaction fixture for [CLIENT_1]. Spec 3.1.
 *
 * NUMBERS ARE MEASURED, NOT ILLUSTRATIVE.
 * Every figure comes from the Presidio and spaCy run over the seven source
 * documents. Regenerate the spans with scratchpad/redact/emit_client1.py and
 * these figures come with them. `npm run audit:coverage` fails the build if
 * any identifier-shaped text is left uncovered.
 *
 * The spec originally carried 1,184 spans / 61 identities / 1,847 sentences.
 * Those were placeholders and did not reconcile with the corpus.
 */

export const redactionStats = {
  documents: 7,
  spans: 141,
  identities: 39,
  sentences: 578,
  mergedSurfaceForms: 6,
}

/** Header stats bar copy. Spec 3.1. */
export const redactionHeader = {
  line1: `${redactionStats.documents} documents · ${redactionStats.spans} identifying spans held · ${redactionStats.identities} distinct identities resolved`,
  line2: `Cross-document identity resolution: ${redactionStats.mergedSurfaceForms} surface forms of the same person merged to one identity`,
  /** [VERBATIM] spec 3.1 */
  caption: 'Insyte over-redacts by design. You decide what comes back.',
}

/**
 * The surface forms of [CLIENT_1] the run actually merged, with occurrence
 * counts across the seven documents. Shown in the header expander.
 */
export const mergedIdentity = {
  token: '[CLIENT_1]',
  forms: [
    { surface: 'RAMANATHAN, P.', count: 11, note: 'most common form in the corpus' },
    { surface: 'RAMANATHAN, Priya S.', count: 4 },
    { surface: 'RAMANATHAN, P.S.', count: 4 },
    { surface: 'Priya R.', count: 2 },
    { surface: 'RAMANATHAN, Priya S', count: 1, note: 'no trailing period' },
    { surface: 'Ramanathan', count: 1, note: 'surname alone, mid-sentence' },
  ],
  /**
   * The hard case, and the one worth pointing at. The spouse shares the
   * client's surname, so any rule matching the bare surname claims only
   * "Ramanathan" out of "R. Ramanathan" and merges two people into one
   * identity. His full forms have to be recognised as longer matches.
   */
  nearMiss: {
    token: '[SPOUSE_1]',
    forms: ['R. Ramanathan', 'R. R.'],
    note: 'Shares the surname. Held as a separate identity, not merged.',
  },
}

/*
 * The entities flagged for reviewer judgement are derived from the spans
 * themselves, in redactionSpans.js, where each carries `over: true` and its
 * reason. They are not duplicated here.
 *
 * What qualifies: genuinely ambiguous public entities, correctly detected.
 * Millwoods library, Access 24/7 and its number, 988, 811, Health Link.
 *
 * What does not: detector faults on clinical vocabulary. The run flags PHQ-9
 * and GAD-7 as Location and Person. Those are bugs, not judgement calls, and a
 * demo of the finished product does not offer them to the reviewer. They are
 * dropped by the deny-list in the generator.
 * See INSYTE_DEMO_REDACTION_AUDIT.md section 4.3.
 */

/** Detection sources for the "Why did this get flagged?" expander. Spec 3.1. */
export const DETECTION_SOURCES = ['NER model', 'Pattern rule', 'Presidio recognizer']
