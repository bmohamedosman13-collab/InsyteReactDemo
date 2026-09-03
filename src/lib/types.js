/**
 * Data shapes for the Insyte demo, from INSYTE_DEMO_SPEC.md section 6.
 *
 * The spec expresses these as TypeScript interfaces. This repo is JavaScript,
 * so they are carried as JSDoc typedefs instead: same shapes, no toolchain
 * change. Editors still get completion and checking from these.
 *
 * @typedef {'clinician'|'physician'|'nursing'|'client'|'collateral'|
 *           'staff'|'finance'|'governance'|'external'} AuthorType
 *
 * @typedef {Object} DocSection
 * @property {string} anchor  Citation anchor, e.g. "§4" or "§Outcome table"
 * @property {string} label   Human heading shown in the source panel
 * @property {string} text    Body text, already tokenised
 *
 * @typedef {Object} SourceDoc
 * @property {string} id          "01"
 * @property {string} title
 * @property {string} org         token
 * @property {string} author      token
 * @property {AuthorType} authorType
 * @property {string} dateStart
 * @property {string} [dateEnd]
 * @property {number} pages
 * @property {DocSection[]} sections
 *
 * @typedef {Object} Citation
 * @property {string} docId       "03"
 * @property {string} anchor      "§Addendum"
 * @property {'High'|'Moderate'} confidence
 *
 * @typedef {Object} Finding
 * @property {string} id
 * @property {string} [heading]
 * @property {string} body                may contain {{cite:0}} placeholders
 * @property {Citation[]} citations
 * @property {'CLINICIAN'|'CLIENT DIRECT'|'CLIENT REPORTED'} [authorBadge]
 * @property {'neutral'|'amber'|'positive'} [tone]
 * @property {'High'|'Moderate'} [confidence]
 *
 * @typedef {Object} AnalysisTable
 * @property {string[]} columns
 * @property {Array<Array<string|Citation>>} rows
 *
 * @typedef {Object} AnalysisFixture
 * @property {'patterns'|'timeline'|'sentiment'|'risk'|'outcomes'|'gaps'} module
 * @property {string} header
 * @property {string} [subhead]
 * @property {string} [mandatoryReview]   risk only, renders above content
 * @property {Finding[]} findings
 * @property {AnalysisTable} [table]
 *
 * @typedef {Object} QueryPreset
 * @property {string} id
 * @property {string} chipLabel
 * @property {string[]} matchTokens       for fuzzy routing of typed input
 * @property {Finding[]} answer
 * @property {'risk'} [routesTo]
 *
 * @typedef {'populated'|'clinician-entry'|'org-entry'|'not-documented'|'never-autofill'} FieldState
 *
 * @typedef {Object} ExportField
 * @property {string} label
 * @property {string|null} value
 * @property {FieldState} state
 * @property {Citation[]} citations
 *
 * @typedef {Object} RedactionSpan
 * @property {string} id            stable span id
 * @property {string} token         "[CLIENT_1]", the data-model name. Never shown in review UI.
 * @property {string} entityClass   "Person" | "Location" | "Date" | "Phone" | "Health number" | "Organization"
 * @property {'NER model'|'Pattern rule'|'Presidio recognizer'} source
 * @property {string} surface       original text, revealed only on restore
 * @property {boolean} [overRedacted] true for the planted restore candidates
 */

export const AUTHOR_BADGE = {
  CLINICIAN: 'CLINICIAN',
  CLIENT_DIRECT: 'CLIENT DIRECT',
  CLIENT_REPORTED: 'CLIENT REPORTED',
}

export const FIELD_STATE = {
  POPULATED: 'populated',
  CLINICIAN_ENTRY: 'clinician-entry',
  ORG_ENTRY: 'org-entry',
  NOT_DOCUMENTED: 'not-documented',
  NEVER_AUTOFILL: 'never-autofill',
}

/** Entity classes surfaced on chip hover. Spec 3.1. */
export const ENTITY_CLASSES = [
  'Person',
  'Location',
  'Date',
  'Phone',
  'Health number',
  'Organization',
]
