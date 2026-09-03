import { docs, docsById, documentText } from './docs.js'

/**
 * Analysis fixtures and C-851 export for [CLIENT_2].
 * From INSYTE_DEMO_WCB_CASE.md sections 4 and 5. Output is deliberately shorter
 * than [CLIENT_1]: four documents over six weeks should not produce the same
 * volume as an eleven month episode, and the contrast is itself informative.
 */

const summary = {
  header: 'Document summary',
  subhead: 'Generated from 4 documents · 41 days · no click required',
  body: `Four documents cover 41 days from a workplace accident on 2026-04-23 to a psychometric summary on 2026-06-04. Two are external, written by the employer and the funder, and two are clinical [[W1 §header]] [[W2 §1]] [[W3 §header]] [[W4 §1]].

The record describes a single accepted WCB claim with a minor physical injury and an accepted secondary psychological condition, one completed assessment session, and a treatment and return-to-work plan not yet started [[W1 §3]] [[W3 §11]].

Five outcome measures exist at one timepoint each, so no trajectory is available yet [[W4 §1]].`,
  mandatoryReview:
    'MANDATORY CLINICAL REVIEW. This summary contains risk content and reflects the documents as written. It is not a clinical opinion.',
}

const patterns = {
  module: 'patterns',
  header: 'Patterns across 4 documents',
  findings: [
    {
      id: 'c2p1',
      heading: "The worker's central maintaining cognition is contradicted in writing by his own employer.",
      confidence: 'High',
      body: `He holds that he caused the incident because he called the lift, repeating it three times in session [[W3 §2]] [[W3 §3]]. The employer's incident report states he followed lift procedure as written, that the strap was within its inspection date, and that no fault has been attributed to any worker [[W2 §6]]. The document that would most directly challenge the belief was in the referral package before the first session.`,
    },
    {
      id: 'c2p2',
      heading: 'Every documented barrier points at the same place.',
      confidence: 'High',
      body: `Avoidance is anchored to the fabrication bay, the guilt is anchored to the coworker who is still off work, and the employer's modified duties are defined by distance from that bay [[W3 §12]] [[W4 §4]]. Return to the worksite is therefore both the outcome measure and the intervention, which the clinician states and the case manager asked to have recorded [[W3 §11]] [[W4 §3]].`,
    },
  ],
}

const timeline = {
  module: 'timeline',
  header: 'Trajectory',
  subhead: '41 days · 9 events · measures at one timepoint',
  footer: 'Symptom onset precedes the work stoppage by five days.',
  footerCitation: '[[W3 §3]]',
  phases: [
    {
      id: 'c2ph1', label: 'Accident and physical injury', range: '2026-04-23 to 2026-04-29', tone: 'amber',
      events: [
        { date: '2026-04-23', label: 'Rigging failure during crane lift', body: 'Coworker sustains an open fracture. Worker struck on the left forearm and knocked to the floor.', cite: '[[W2 §2]] [[W2 §3]]' },
        { date: '2026-04-23', label: 'Urgent care, sutured', body: '', cite: '[[W2 §3]]' },
        { date: '2026-04-27', label: 'Return to light duties', body: 'Worked ten days. Left the bay during a lift on two occasions.', cite: '[[W3 §4]]' },
        { date: '2026-04-29', label: 'Physical injury accepted', body: '', cite: '[[W1 §3]]' },
      ],
    },
    {
      id: 'c2ph2', label: 'Psychological condition and referral', range: '2026-05-06 to 2026-05-20', tone: 'amber-deep',
      events: [
        { date: '2026-05-06', label: 'Symptoms worsen', body: 'Onset in the week following the accident, worsening from approximately this date.', cite: '[[W3 §3]]' },
        { date: '2026-05-11', label: 'Off work', body: 'Following an appointment with the family physician.', cite: '[[W3 §4]]' },
        { date: '2026-05-15', label: 'Psychological condition accepted', body: 'As a secondary condition.', cite: '[[W1 §3]]' },
        { date: '2026-05-19', label: 'Hypnotic prescribed', body: 'Zopiclone 5 mg as needed, used four to five nights weekly.', cite: '[[W3 §6]]' },
        { date: '2026-05-20', label: 'Referral and authorization', body: 'Eight sessions plus one assessment session. C-851 due within seven business days of session one.', cite: '[[W1 §5]]' },
      ],
    },
    {
      id: 'c2ph3', label: 'Assessment', range: '2026-06-02 to 2026-06-04', tone: 'neutral',
      events: [
        { date: '2026-06-02', label: 'Initial counselling session', body: 'PTSD provisional. Risk assessed as low. Treatment and graduated return-to-work plan agreed.', cite: '[[W3 §10]] [[W3 §9]] [[W3 §11]]' },
        { date: '2026-06-04', label: 'Psychometrics and collateral contact', body: 'PCL-5 52, PHQ-9 16, GAD-7 14, ISI 21, AUDIT-C 5. Case manager and employer contacted.', cite: '[[W4 §1]] [[W4 §3]]' },
      ],
    },
  ],
}

const sentiment = {
  module: 'sentiment',
  header: 'Sentiment and trends',
  subhead: 'Scored by who wrote it',
  tabs: [
    { id: 'all', label: 'All sources' },
    { id: 'clinician', label: 'Clinician written (2 docs)' },
    { id: 'external', label: 'External (2 docs)' },
  ],
  caption:
    'No client-authored documents in this folder. Client voice here is reported speech only.',
  findings: [
    {
      id: 'c2s1', scope: 'clinician', authorBadge: 'CLIENT REPORTED', confidence: 'High',
      heading: 'Four words, repeated three times',
      body: `The reported speech that carries this record is "I said go", repeated three times in a single session and recorded as the most prominent feature of the presentation [[W3 §2]] [[W3 §3]]. It stands against a written employer finding of no fault [[W2 §6]].

Register in the worker's reported speech is flat and factual during the account of the event and shifts only around responsibility. The clinician records the account as delivered in a flat register with several pauses [[W3 §2]].`,
    },
    {
      id: 'c2s2', scope: 'clinician', authorBadge: 'CLINICIAN', confidence: 'Moderate',
      heading: 'The clinical register is forward-looking throughout',
      body: `The assessment uses capacity and planning language rather than containment language, describing return to the worksite as therapeutic rather than merely accommodating, and treating avoidance as the target rather than a limitation [[W3 §11]] [[W4 §3]]. There is one register in this folder because there is one session in it.`,
    },
    {
      id: 'c2s3', scope: 'external', authorBadge: 'CLINICIAN', confidence: 'High',
      heading: 'The external documents agree with each other and disagree with the worker',
      body: `The employer's report and the case manager's referral both record the same facts and neither attributes fault [[W2 §6]] [[W1 §6]]. The only source in the record placing responsibility on the worker is the worker [[W3 §2]].`,
    },
  ],
}

const risk = {
  module: 'risk',
  header: 'Risk content as documented',
  mandatoryReview: `MANDATORY CLINICAL REVIEW
This panel surfaces risk content as written in the source documents. It is not a risk assessment, not a triage decision, and not a clinical opinion. A qualified clinician must review the source documents before any action is taken.`,
  chronology: {
    columns: ['Date', 'Documented level', 'What the record says', 'Source'],
    rows: [
      ['2026-06-02', 'Low, as documented by the treating clinician', 'Denies current or past ideation, plan, intent or preparatory behaviour. Denies self-harm history. No access-to-means concern identified.', '[[W3 §9]]'],
    ],
  },
  sections: [
    {
      id: 'c2r1', heading: 'Note on this field',
      body: `Insyte reproduces a risk level here because a clinician recorded one [[W3 §9]]. In the [CLIENT_1] folder the same field is left for clinician entry, because no clinician recorded a level there. Same rule, opposite output.`,
    },
    {
      id: 'c2r2', heading: 'Two items to surface for the reviewer', tone: 'amber',
      body: `Alcohol has risen from approximately four to approximately ten standard drinks weekly since the incident, with AUDIT-C at 5, at or above cut-off [[W3 §7]] [[W4 §1]].

Sleep is averaging four hours nightly with hypnotic use four to five nights weekly [[W3 §3]] [[W3 §6]].

Both are named in the record as maintaining factors and both are listed among the documented risk factors [[W3 §9]].`,
    },
    {
      id: 'c2r3', heading: 'Risk factors and protective factors as documented', tone: 'positive',
      body: `Risk factors: sleep deprivation, increased alcohol use, guilt cognitions, occupational disruption, social withdrawal [[W3 §9]].

Protective factors: engaged partner, intact employment relationship with modified duties available, strong stated motivation to return to work, no history of self-harm or ideation, help-seeking maintained, no substance dependence [[W3 §9]].

Management plan: risk re-screened at every session and on any change in alcohol use or sleep. Practice number, Health Link 811 and Access 24/7 provided. Partner identified by the worker as his first contact, with consent [[W3 §9]].`,
    },
  ],
  footer: 'Every row links to the source passage. Insyte does not score risk and does not rank clients.',
}

const queryPresets = [
  {
    id: 'c2q1',
    chipLabel: 'What is the central maintaining belief, and what contradicts it?',
    matchTokens: ['belief', 'guilt', 'blame', 'fault', 'responsibility', 'maintaining', 'contradicts', 'cognition'],
    answer: `The worker holds that he caused the incident because he called the lift. He said so three times in one session, and the clinician records guilt centred on causal responsibility as the most prominent feature of the presentation [[W3 §2]] [[W3 §3]] [[W3 §10]].

Two documents contradict it directly. The employer's incident report states that the worker followed lift procedure as written, that the strap was within its inspection date, and that no fault has been attributed to any worker [[W2 §6]]. The case manager's referral records the rigging investigation as open with findings unavailable, so no source in the record attributes fault to him [[W1 §6]].

Both documents were in the referral package before the first session [[W1 §header]] [[W2 §1]].`,
  },
  {
    id: 'c2q2',
    chipLabel: 'What does the record say about returning to work?',
    matchTokens: ['return', 'work', 'rtw', 'duties', 'modified', 'graduated', 'employer', 'schedule'],
    answer: `Return to the worksite is documented as a treatment component rather than only an outcome, which the clinician states and the case manager asked to have recorded in the report [[W3 §11]] [[W4 §3]].

The employer can offer tool crib and yard duties away from the fabrication bay, day shift only, with no overhead crane involvement, and has confirmed the position is held open [[W4 §4]].

The worker agreed to a graduated return beginning in the yard and tool crib, four hours per day, three days per week, with progression tied to session-by-session review rather than a fixed calendar. He was clear he does not feel able to enter the fabrication bay at present [[W4 §5]].

Estimated return to pre-accident level is 12 to 16 weeks from the start of treatment, approximately 2026-09-28, to be revised at the session six review [[W4 §6]].`,
  },
  {
    id: 'c2q3',
    chipLabel: 'Give me the risk history with what was done at each point.',
    matchTokens: ['risk', 'safety', 'suicide', 'ideation', 'history', 'screened'],
    routesTo: 'risk',
    answer: '',
  },
  {
    id: 'c2q4',
    chipLabel: 'Show me every measure with its source.',
    matchTokens: ['measure', 'measures', 'score', 'scores', 'pcl', 'phq', 'gad', 'isi', 'audit', 'source'],
    answer: 'All five measures are initial-status administrations from 2026-06-02. No prior administration exists for comparison. Repeat is scheduled at session four and session eight [[W4 §1]].',
    table: {
      columns: ['Instrument', 'Score', 'Interpretation', 'Source'],
      rows: [
        ['PCL-5', '52', 'Above the provisional cut-off of 33. Consistent with PTSD.', '[[W4 §1]]'],
        ['PHQ-9', '16', 'Moderately severe. Item 9 endorsed at 0.', '[[W4 §1]]'],
        ['GAD-7', '14', 'Moderate.', '[[W4 §1]]'],
        ['ISI', '21', 'Moderate clinical insomnia.', '[[W4 §1]]'],
        ['AUDIT-C', '5', 'At or above cut-off for men.', '[[W4 §1]]'],
      ],
    },
  },
  {
    id: 'c2q5',
    chipLabel: 'What can the C-851 not be filled from?',
    matchTokens: ['c-851', 'c851', 'form', 'fields', 'blank', 'missing', 'filled', 'populate'],
    answer: `Three of 34 fields, and all three are the right kind of gap [[W3 §11]].

The anticipated treatment field is a fixed dropdown, so Insyte does not populate it. The percentage-met figure is a judgement the record does not contain. The provider contact and signature block is an attestation.

A form that populated to 34 of 34 would be a form that was inventing something.`,
  },
]

/* ------------------------------------------------------------- C-851 export */

const c851 = {
  title: 'WCB ALBERTA · C-851 PSYCHOLOGY SERVICES · COUNSELLING INITIAL REPORT',
  meta: ['Draft generated by Insyte · Not submitted · Clinician review and signature required'],
  banner:
    '31 of 34 fields populated from your documents. 3 require clinician entry. Insyte does not fill fields it cannot cite.',
  fields: [
    { section: 'WORKER DETAILS' },
    { label: 'Surname', value: '[CLIENT_2] [[W1 §1]]', state: 'populated' },
    { label: 'First name and initial', value: '[CLIENT_2] [[W1 §1]]', state: 'populated' },
    { label: 'Date of birth', value: '[DOB_2] [[W1 §1]]', state: 'populated' },
    { label: 'Legal gender', value: 'Male, as recorded [[W1 §1]]', state: 'populated' },
    { label: 'WCB claim number', value: '[CLAIM_1] [[W1 §1]]', state: 'populated' },
    { label: 'Address / City / Province / Postal', value: '[ADDRESS_2] [[W1 §1]]', state: 'populated' },
    { label: 'Worker telephone', value: '[PHONE_5] [[W1 §1]]', state: 'populated' },
    { label: 'Service delivery', value: 'In person [[W3 §1]]', state: 'populated' },

    { section: 'EMPLOYER DETAILS' },
    { label: 'Employer name', value: '[EMPLOYER_2] [[W1 §2]]', state: 'populated' },
    { label: 'City / Province', value: 'Fort Saskatchewan, Alberta [[W1 §2]]', state: 'populated' },

    { section: 'ACCIDENT DETAILS' },
    { label: 'Worker job title', value: 'Welder-fabricator, Red Seal certified [[W1 §2]]', state: 'populated' },
    { label: 'Date of injury', value: '2026-04-23 [[W1 §3]] [[W2 §1]]', state: 'populated' },
    { label: 'Developed over time?', value: 'No. Single identifiable event. [[W2 §2]]', state: 'populated' },
    {
      label: 'Developed from work?',
      value: "Yes. Workplace accident during a crane lift in the employer's fabrication bay, accepted by WCB 2026-04-29 for the physical injury and 2026-05-15 for the psychological condition. [[W1 §3]] [[W2 §2]]",
      state: 'populated',
    },
    {
      label: 'How and when it occurred',
      value: 'On 2026-04-23 at approximately 14:15 a rigging strap failed during an overhead crane lift of an approximately 900 kg steel beam section. The worker was the designated spotter standing about 1.5 metres from the load. A coworker at the assembly jig was struck and sustained an open fracture of the lower leg. The worker was struck on the left forearm by displaced dunnage and knocked to the floor. He reached the coworker and applied pressure to the leg until paramedics arrived. The employer report records that the worker followed lift procedure as written and that no fault has been attributed to any worker. [[W2 §2]] [[W2 §3]] [[W2 §6]] [[W3 §2]]',
      state: 'populated',
    },

    { section: 'INJURY DETAILS' },
    { label: 'Referral date', value: '2026-05-20 [[W1 §header]]', state: 'populated' },
    { label: 'Initial counselling session', value: '2026-06-02 [[W3 §header]]', state: 'populated' },
    { label: 'Report date', value: '2026-06-08 (generated)', state: 'populated' },
    { label: 'Working diagnosis identified?', value: 'Yes', state: 'populated' },
    {
      label: 'Describe',
      value: 'Posttraumatic Stress Disorder (F43.1), provisional. Secondary insomnia disorder, provisional. Increased alcohol use treated as a maintaining factor rather than an independent condition. Adjustment Disorder with mixed anxiety and depressed mood considered and judged less consistent with the intrusion and avoidance profile. [[W3 §10]]',
      state: 'populated',
    },
    {
      label: 'Symptoms',
      value: 'Daily intrusive re-experiencing, most reliably triggered by metal-on-metal sound. Nightmares four to five nights weekly. Avoidance of the fabrication bay since 2026-04-27 and of the route to site. Persistent guilt centred on having called the lift. Loss of interest and detachment from partner. Hypervigilance to overhead noise, exaggerated startle, sleep averaging four hours nightly, irritability, concentration difficulty. Continuous for six weeks at assessment. [[W3 §3]]',
      state: 'populated',
    },
    {
      label: 'Objective findings',
      value: 'Mildly increased psychomotor activity with scanning response to an unrelated door closing. Speech reduced during the account of the event. Affect anxious and congruent, constricted during trauma content. Thought process linear. No perceptual disturbance. Mild attentional inefficiency. Insight good, judgment intact. PCL-5 52, PHQ-9 16, GAD-7 14, ISI 21, AUDIT-C 5. [[W3 §8]] [[W4 §1]]',
      state: 'populated',
    },
    {
      label: 'Post-accident treatment for mental health',
      value: 'Zopiclone 5 mg as needed at bedtime prescribed by the family physician 2026-05-19, used four to five nights weekly. No antidepressant. No psychological treatment prior to this referral. [[W3 §6]]',
      state: 'populated',
    },
    { label: 'Prior mental health conditions?', value: 'Yes [[W3 §5]]', state: 'populated' },
    {
      label: 'Prior treatments',
      value: 'Six sessions of employee assistance counselling in 2019 following a marital separation, for situational anxiety. No medication, no psychiatric involvement, no time loss. Resolved with no recurrence until the current presentation. No prior trauma-related presentation. No prior WCB claims. [[W3 §5]] [[W3 §4]]',
      state: 'populated',
    },

    { section: 'TREATMENT PLAN' },
    { label: 'Barriers identified?', value: 'Yes [[W3 §12]]', state: 'populated' },
    {
      label: 'Employment concerns',
      value: "Open investigation into the rigging failure. The injured coworker remains off work and the worker's guilt is anchored to that fact. The worker holds a belief of causal responsibility despite the employer's written statement that he followed procedure. [[W1 §6]] [[W3 §12]] [[W2 §6]]",
      state: 'populated',
    },
    {
      label: 'Psychological',
      value: 'PTSD symptoms with workplace avoidance as a core feature, which makes return to work both the goal and part of the intervention. [[W3 §12]]',
      state: 'populated',
    },
    {
      label: 'Emotional reaction to physical injury',
      value: 'Present but minor. The forearm injury is healed and is not the primary driver of the presentation. [[W3 §10]] [[W3 §12]]',
      state: 'populated',
    },
    { label: 'Other, non-compensable', value: 'None identified. [[W3 §12]]', state: 'populated' },
    { label: 'Anticipated treatment', value: '__CLINICIAN_ENTRY__ (fixed dropdown, not populated by Insyte)', state: 'clinician-entry' },
    {
      label: 'Treatment plan',
      value: 'Trauma-focused CBT, weekly, eight sessions with review at session six. Sessions 1 to 2 psychoeducation, stabilisation and sleep intervention. Sessions 3 to 6 trauma processing with cognitive work on responsibility appraisal. Sessions 6 to 8 graded in-vivo exposure to the worksite, coordinated with the employer, from site perimeter to yard to bay. Alcohol monitored with a reduction target agreed with the worker. Sleep intervention in session 2 with a view to reducing reliance on zopiclone, coordinated with the family physician by letter. [[W3 §11]]',
      state: 'populated',
    },
    {
      label: 'Presentation affecting return to work',
      value: 'Avoidance of the fabrication bay is the central functional barrier. The worker returned to light duties on 2026-04-27, worked ten days, and left the bay during a lift on two occasions before going off work on 2026-05-11. Concentration difficulty and exaggerated startle to overhead noise are directly relevant to safety-sensitive work. Social withdrawal includes not answering calls from coworkers. [[W3 §3]] [[W3 §4]] [[W3 §8]]',
      state: 'populated',
    },
    { label: 'Percentage of treatment goals met', value: '__CLINICIAN_ENTRY__', state: 'clinician-entry' },

    { section: 'WCB SERVICES FOR CONSIDERATION' },
    {
      label: 'Services requested',
      value: 'Case conference with Claim Owner. Interdisciplinary treatment services. [[W4 §3]]',
      state: 'populated',
    },
    {
      label: 'Describe',
      value: 'A case conference is requested before the session six review to align the graduated return schedule with treatment progress, since worksite exposure is a treatment component in this presentation and not only an outcome. This was discussed with the case manager on 2026-06-04 and she asked that it be stated in this report. Coordination with the family physician is in progress regarding the hypnotic. [[W4 §3]] [[W3 §11]]',
      state: 'populated',
    },

    { section: 'MEDICATION AND SUBSTANCE USE' },
    { label: 'Current prescribed medication', value: 'Yes. Zopiclone 5 mg PRN at bedtime, started 2026-05-19 by family physician, used 4 to 5 nights weekly. [[W3 §6]]', state: 'populated' },
    {
      label: 'Substance use concerns',
      value: 'Yes. Alcohol increased from approximately four standard drinks weekly before the incident to approximately ten weekly since, concentrated in the evening and described by the worker as being for sleep. The worker raised this himself. AUDIT-C 5, at or above cut-off. Addressed in session as a maintaining factor for both sleep disruption and arousal symptoms. Worker agreed to record intake for two weeks and to a reduction target. No indication of dependence at this time and no withdrawal history. [[W3 §7]] [[W4 §1]]',
      state: 'populated',
    },

    { section: 'SUICIDE RISK' },
    { label: 'Risk level', value: 'Low, as documented by the treating psychologist on 2026-06-02. [[W3 §9]]', state: 'populated' },
    { label: 'Risk factors', value: 'Sleep deprivation, increased alcohol use, guilt cognitions, occupational disruption, social withdrawal. [[W3 §9]]', state: 'populated' },
    { label: 'Protective factors', value: 'Engaged partner, employment relationship intact with modified duties available, strong stated motivation to return to work, no history of self-harm or ideation, help-seeking, no substance dependence. [[W3 §9]]', state: 'populated' },
    { label: 'Risk management plan', value: 'Risk re-screened at every session and on any change in alcohol use or sleep. Worker provided with the practice number, Health Link 811 and Access 24/7, and advised to attend emergency without delay if his situation changes. Partner identified by the worker as his first contact, with his consent. [[W3 §9]]', state: 'populated' },

    { section: 'RETURN TO WORK DETAILS' },
    { label: 'Missed work beyond accident date?', value: 'Yes. Off work since 2026-05-11. [[W1 §4]] [[W3 §4]]', state: 'populated' },
    { label: 'Has the worker returned to work?', value: 'Not at the date of this report. Returned to light duties 2026-04-27 for ten days, off again from 2026-05-11. [[W3 §4]]', state: 'populated' },
    { label: 'Accommodations needed?', value: 'Yes. Tool crib and yard duties away from the fabrication bay, day shift only, no overhead crane involvement. [[W4 §4]]', state: 'populated' },
    { label: 'Proposed schedule', value: 'Four hours per day, three days per week, progression tied to session-by-session review rather than a fixed calendar. [[W4 §5]]', state: 'populated' },
    { label: 'Worker in agreement with RTW?', value: 'Yes, and the details were agreed in session. [[W4 §5]]', state: 'populated' },
    { label: 'Estimated return to pre-accident level', value: '12 to 16 weeks from the start of treatment, approximately 2026-09-28, contingent on treatment response and graded worksite exposure. To be revised at the session six review. Neither long-term nor permanent restriction anticipated. [[W4 §6]]', state: 'populated' },

    { section: 'PROVIDER' },
    { label: 'Provider contact and signature', value: '__CLINICIAN_ENTRY__', state: 'clinician-entry' },
  ],
  footer:
    'Generated by Insyte from 4 source documents. All content is extracted, not inferred. Clinician review and signature required before submission.',
}

const soap = {
  '2026-06-02': {
    title: 'SOAP NOTE',
    meta: [
      'Client: [CLIENT_2]   File: [ID_2]   Session 1   Date: 2026-06-02',
      'Clinician: [PSYCHOLOGIST_2]   Modality: Assessment   Duration: 60 min',
    ],
    blocks: [
      { key: 'S', label: 'S — SUBJECTIVE', body: `Worker described the incident of 2026-04-23 in a flat, factual register with several pauses, and repeated three times that he called the lift. [[W3 §2]]\nReports daily intrusive re-experiencing triggered most reliably by metal-on-metal sound, nightmares four to five nights weekly, and avoidance of the fabrication bay since 2026-04-27. [[W3 §3]]\nReports sleep averaging four hours nightly, irritability, and concentration difficulty, continuous for six weeks. [[W3 §3]]\nRaised his own alcohol use, increased from about four to about ten standard drinks weekly since the incident, described as being for sleep. [[W3 §7]]\nStates he wants to work and does not want to be off. [[W3 §4]]` },
      { key: 'O', label: 'O — OBJECTIVE', body: `Psychomotor activity mildly increased, scanning the room twice when a door closed elsewhere in the building. Speech reduced during the account of the event. Affect anxious, congruent, constricted during trauma content. Insight good, judgment intact. [[W3 §8]]\nPCL-5 52, PHQ-9 16, GAD-7 14, ISI 21, AUDIT-C 5, all initial-status administrations. [[W4 §1]]\nRisk screened directly and assessed as low, with no ideation, plan, intent or preparatory behaviour. [[W3 §9]]` },
      { key: 'A', label: 'A — ASSESSMENT', body: `Posttraumatic Stress Disorder (F43.1), provisional, arising from the workplace accident of 2026-04-23. Criteria met across all four clusters with duration exceeding one month and clear functional impairment. [[W3 §10]]\nGuilt cognitions centred on causal responsibility are the most prominent feature and are contradicted in writing by the employer's own incident report. [[W3 §10]] [[W2 §6]]\nSecondary insomnia disorder, provisional. Increased alcohol use is a maintaining factor rather than an independent condition at this stage. [[W3 §10]]` },
      { key: 'P', label: 'P — PLAN', body: `Trauma-focused CBT, weekly, eight sessions with review at session six. [[W3 §11]]\nSessions 6 to 8 graded in-vivo exposure to the worksite coordinated with the employer, from perimeter to yard to bay. [[W3 §11]]\nAlcohol monitored with an agreed reduction target; worker to record intake for two weeks. [[W3 §7]] [[W3 §11]]\nSleep intervention session 2, coordinated with the family physician by letter regarding the hypnotic. [[W3 §11]]\nNext appointment 2026-06-09. [[W3 §13]]` },
    ],
    footer: 'Generated by Insyte from 4 source documents. Clinician review required before this note enters the record.',
  },
}

export const client2 = {
  id: 'client2',
  code: 'NPS-2026-1188',
  title: 'Client [CLIENT_2]',
  subtitle: '4 documents · 41 days · WCB claim · exports include C-851',
  sidebarLabel: '[CLIENT_2]',
  sidebarMeta: '4 documents · 41 days',
  docs,
  docsById,
  documentOriginal: documentText,
  summary,
  outcomeSeries: null,
  redaction: {
    header: {
      line1: '4 documents · 212 entity spans detected · 138 unique entities resolved',
      line2: 'Cross-document identity resolution: 3 surface forms of the same worker merged to one token',
      caption: 'Insyte over-redacts by design. You decide what comes back.',
    },
    stats: { documents: 4, spans: 212 },
    restoreCandidates: [
      { id: 'c2-or1', surface: 'Access 24/7', entityClass: 'Phone', why: 'Public crisis line named in the risk management plan.' },
      { id: 'c2-or2', surface: 'Health Link 811', entityClass: 'Phone', why: 'Public health line, Alberta.' },
      { id: 'c2-or3', surface: 'Fort Saskatchewan', entityClass: 'Location', why: 'Employer municipality, required on the C-851 employer block.' },
    ],
    mergedIdentity: {
      token: '[CLIENT_2]',
      forms: [
        { surface: 'LANDRY, C.', count: 4 },
        { surface: 'Curtis J. Landry', count: 2 },
        { surface: 'the worker', count: 21, note: 'relational form, resolved by position' },
      ],
      nearMiss: {
        token: '[COWORKER_1]',
        forms: ['the injured coworker'],
        note: 'Held separately. Named only by role, and on a different claim.',
      },
    },
  },
  buttons: [
    { id: 'patterns', label: 'Patterns', blurb: 'Across 4 documents', fixture: patterns },
    { id: 'timeline', label: 'Timeline', blurb: '41 days, 9 events', fixture: timeline },
    { id: 'sentiment', label: 'Sentiment & Trends', blurb: 'No client-authored docs', fixture: sentiment },
    { id: 'risk', label: 'Risk', blurb: 'As documented', tone: 'amber', fixture: risk },
  ],
  queryPresets,
  exportConfig: {
    cards: [
      { id: 'c851', label: 'WCB C-851', blurb: 'Counselling initial report', scope: 'form', default: true },
      { id: 'soap', label: 'SOAP note', blurb: 'Session of 2026-06-02', scope: 'session' },
    ],
    scopes: [{ id: '2026-06-02', label: '2026-06-02 · Session 1, initial assessment', default: true }],
    resolve: (cardId, scopeId) => (cardId === 'c851' ? c851 : soap[scopeId] || soap['2026-06-02']),
  },
}
