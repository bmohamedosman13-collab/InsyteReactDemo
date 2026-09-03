/**
 * Analysis fixtures for [CLIENT_1]. Spec 4.3 to 4.7, with the Document 07
 * additions from the revisions pass.
 *
 * Citations are written inline as [[docId §anchor]] and are resolved against
 * docs.js at render time. A marker that does not resolve to a real document
 * and anchor does not render, which is how spec rule 4 is enforced in the
 * output layer rather than trusted.
 *
 * No em dashes in any UI copy. Spec section 8.
 */

/* ------------------------------------------------------------------ summary */

export const summary = {
  header: 'Document summary',
  subhead: 'Generated from 7 documents · 578 sentences tagged · no click required',
  /** [VERBATIM] spec 4.3, amended for Document 07. */
  body: `Seven documents from three organizations cover 330 days of continuous care for [CLIENT_1], from psychological intake on 2025-01-14 to discharge from intensive community treatment on 2025-12-09.

Five documents are practitioner-written and two are written by the client.

The record describes a single episode of care with three distinct phases. Months one to four are outpatient CBT with an SSRI, during which the primary outcome measure moved from 22 to 26 in the wrong direction [[02 §Outcome table]]. Month five is an acute crisis, a safety plan, and an emergency presentation [[03 §4]] [[04 §Triage]]. Months six to eleven are a revised medication and psychological plan under a community treatment team, ending in documented remission [[05 §Outcome table]].

Fifteen outcome measurements are recorded across the episode and are complete enough to plot without gaps.

Three items were documented at one point in the record and acted on later or not at all. They are listed under Patterns and Risk.`,
  mandatoryReview:
    'MANDATORY CLINICAL REVIEW. This summary contains risk content and reflects the documents as written. It is not a clinical opinion.',
}

/** Spec 4.3. Rendered as a sparkline pair under the summary prose. */
export const outcomeSeries = {
  dates: [
    '2025-01-14', '2025-02-11', '2025-03-04', '2025-03-25', '2025-04-15',
    '2025-05-06', '2025-05-13', '2025-06-05', '2025-06-26', '2025-07-17',
    '2025-08-14', '2025-09-09', '2025-10-14', '2025-11-18',
  ],
  phq9: [22, 21, 19, 20, 23, 25, 26, 24, 21, 18, 14, 9, 7, 5],
  gad7: [14, 13, 12, 13, 15, 16, 17, 16, 15, 13, 11, 6, 5, 4],
  gap: { date: '2025-05-22', label: 'ED presentation, measures not administered' },
}

/* ----------------------------------------------------------------- patterns */

export const patterns = {
  module: 'patterns',
  header: 'Patterns across 7 documents',
  findings: [
    {
      id: 'p1',
      heading: 'The plan did not change while the measure moved the wrong way for fourteen weeks.',
      confidence: 'High',
      body: `PHQ-9 rose from 22 at intake to 26 at session 9 while the treatment approach stayed constant [[01 §6]] [[02 §Outcome table]]. The record contains four separate moments where the trajectory was noted in writing before the plan changed: session 6 documented progress below expectation [[02 §S6-A]], session 7 documented deterioration and that the trajectory no longer supported the current plan [[02 §S7-A]], session 8 documented non-response [[02 §S8-A]], session 9 documented continued deterioration [[02 §S9-A]]. The plan changed after the emergency presentation on 2025-05-22 [[04 §Disposition]].`,
    },
    {
      id: 'p2',
      heading: 'Homework completion tracks severity, and the tracking became part of the problem.',
      confidence: 'High',
      body: `Completion falls as PHQ-9 rises: three of seven log days at session 2 [[02 §S2-S]], one of two thought records at session 5 [[02 §S5-S]], none at session 6 [[02 §S6-S]], homework reduced to activity log only at session 7 [[02 §S7-P]], refusal in session at session 9 [[02 §S9-O]]. The episode summary states this directly, that repeated failure to complete homework had itself become confirmatory evidence for the client's core belief of incompetence [[05 §Psychological treatment]]. When homework was suspended and reintroduced at a lower threshold, the client completed one independently for the first time in the episode [[05 §Psychological treatment]] [[06 §Client note]].`,
    },
    {
      id: 'p3',
      heading: 'A physical finding was raised at the start and investigated four months later.',
      confidence: 'High',
      body: `Bloodwork including ferritin was recommended at intake on 2025-01-14 [[01 §9d]] on the basis of a documented anemia history from 2016 [[01 §4]]. It was not drawn until the emergency presentation on 2025-05-22, where ferritin returned at 9 ug/L against a floor of 15 [[04 §Laboratory]]. The ED record states the deficiency was likely contributing to the fatigue presentation and was not investigated during the episode despite the intake recommendation [[04 §Laboratory note]]. Correction is later named as one of four components of the turning point [[05 §Episode summary]].`,
    },
    {
      id: 'p4',
      heading: 'Two prior medication failures were documented at intake and a third agent in the same class was tried next.',
      confidence: 'Moderate',
      body: `Intake records a partial sertraline trial discontinued for side effects and notes prior partial trials [[01 §3]] [[01 §4]]. The psychiatric consultation later reconstructs the full history and concludes that two adequate and one partially adequate SSRI trial without sustained response meets criteria for a treatment-resistant presentation, and that continued SSRI monotherapy is not indicated [[04 §Medication trial history]]. That conclusion was reachable from the intake document alone.`,
    },
    {
      id: 'p5',
      heading: 'Attendance breaks precede each documented deterioration.',
      confidence: 'Moderate',
      body: `A cancellation on 2025-02-18 precedes the flat two weeks of session 4 [[02 §S4]]. A no-show with no contact on 2025-03-18 precedes the worst stretch reported at session 6 [[02 §S6]]. A cancellation with no reason given on 2025-04-08 precedes the four-point rise at session 7 [[02 §S7]]. Three of three deterioration points in the record are preceded by a missed contact.`,
    },
    {
      id: 'p6',
      heading: 'The improvement is a cluster, not a single change.',
      confidence: 'High',
      body: `Four changes were made inside eight weeks: class switch to an SNRI, augmentation with an atypical antipsychotic, iron repletion, and a psychological protocol simplified to behavioural activation only [[04 §Disposition]] [[05 §Serial notes]] [[05 §Psychological treatment]]. The largest single measured drop follows the augmentation, PHQ-9 18 to 14 [[05 §2025-08-14]]. The record itself declines to attribute the change to any one component [[05 §Episode summary]].`,
    },
  ],
}

/* ----------------------------------------------------------------- timeline */

export const timeline = {
  module: 'timeline',
  header: 'Trajectory',
  subhead: '330 days · 4 phases · 15 recorded measurements',
  footer:
    'Time from first contact to remission: 10 months. First 4 months produced no measured benefit.',
  footerCitation: '[[05 §Episode summary]]',
  phases: [
    {
      id: 'ph1',
      label: 'Phase 1. Engagement without movement.',
      range: '2025-01-14 to 2025-03-04',
      tone: 'neutral',
      events: [
        { date: '2025-01-14', label: 'Intake', body: 'PHQ-9 22, GAD-7 14, BDI-II 34, WSAS 27. Passive ideation one to two times monthly. CBT plus continued escitalopram 10 mg. Bloodwork requested.', cite: '[[01 §6]] [[01 §9]]' },
        { date: '2025-01-28', label: 'Session 1', body: 'Goals set, activity and mood log assigned.', cite: '[[02 §S1]]' },
        { date: '2025-02-11', label: 'Session 3', body: 'PHQ-9 21. Framed to the client as within measurement noise.', cite: '[[02 §S3]]' },
        { date: '2025-03-04', label: 'Session 5', body: 'PHQ-9 19. First measurable movement. Hot thought belief 90 to 70 in session.', cite: '[[02 §S5]]' },
      ],
    },
    {
      id: 'ph2',
      label: 'Phase 2. Reversal.',
      range: '2025-03-13 to 2025-05-13',
      tone: 'amber',
      events: [
        { date: '2025-03-13', label: 'Performance improvement plan at work', body: 'Disclosed at session 6. Maps onto the client’s core belief.', cite: '[[02 §S6]]' },
        { date: '2025-03-25', label: 'Session 6', body: 'PHQ-9 20. Review point. Passive ideation now weekly. Psychiatric review considered.', cite: '[[02 §S6]]' },
        { date: '2025-03-31', label: 'Escitalopram increased to 20 mg', body: 'By [GP_1].', cite: '[[02 §S7-S]]' },
        { date: '2025-04-15', label: 'Session 7', body: 'PHQ-9 23, above intake baseline. More jittery, not less sad. Sleep 3 to 4 hours. Expedited psychiatric consultation requested in writing.', cite: '[[02 §S7]]' },
        { date: '2025-04-28', label: 'Leave of absence begins', body: '', cite: '[[02 §S8-S]]' },
        { date: '2025-05-06', label: 'Session 8', body: 'PHQ-9 25, item 9 at 2. Ideation disclosed. Full C-SSRS administered, safety plan built, spouse briefed with consent, sessions doubled, urgent psychiatric request faxed.', cite: '[[02 §S8]] [[03 §1]] [[03 §4]] [[03 §5]]' },
        { date: '2025-05-13', label: 'Session 9', body: 'PHQ-9 26. Disengagement from the safety plan card. Psychiatry appointment stands at 2025-06-02, described in the record as clinically inappropriate given the trajectory. Access 24/7 contacted for triage advice in session.', cite: '[[02 §S9]]' },
      ],
    },
    {
      id: 'ph3',
      label: 'Phase 3. Crisis and reset.',
      range: '2025-05-22',
      tone: 'amber-deep',
      events: [
        { date: '09:40', label: 'Spouse calls unscheduled', body: 'Ideation intensified over 48 hours. Client would not commit to safety over the next 24 hours.', cite: '[[03 §Addendum]]' },
        { date: '10:04', label: 'Voluntary emergency presentation', body: 'Transported by spouse, receiving department notified by phone.', cite: '[[03 §Addendum]]' },
        { date: '10:44', label: 'Triage, CTAS 2', body: '', cite: '[[04 §Triage]]' },
        { date: '12:15', label: 'Medically cleared', body: 'Ferritin 9, hemoglobin 112, MCV 78.', cite: '[[04 §EP note]] [[04 §Laboratory]]' },
        { date: '14:05', label: 'Psychiatric consultation', body: 'Treatment-resistant presentation at Stage I. Admission offered and declined, capacity intact, involuntary admission not justified and the reasoning is documented.', cite: '[[04 §Psychiatric consultation]]' },
        { date: '17:20', label: 'Discharged', body: 'With an ICTT referral, a cross-taper to venlafaxine, sleep support, iron repletion, and an instruction to shift the psychological work to behavioural activation.', cite: '[[04 §Disposition]]' },
      ],
    },
    {
      id: 'ph4',
      label: 'Phase 4. Response and remission.',
      range: '2025-06-05 to 2025-12-09',
      tone: 'positive',
      events: [
        { date: '2025-06-05', label: 'Venlafaxine 75 mg', body: 'PHQ-9 24.', cite: '[[05 §2025-06-05]]' },
        { date: '2025-06-26', label: '150 mg', body: 'PHQ-9 21. Early partial response. Dressing daily, walking the dog.', cite: '[[05 §2025-06-26]]' },
        { date: '2025-07-17', label: 'Aripiprazole 2.5 mg added', body: 'PHQ-9 18. Partial, residual anhedonia. rTMS referral placed as a contingency.', cite: '[[05 §2025-07-17]]' },
        { date: '2025-08-05', label: 'Session 16', body: 'First independently completed thought record of the episode, at PHQ-9 14.', cite: '[[06 §Clinician annotation]]' },
        { date: '2025-08-14', label: 'Dose increase', body: 'PHQ-9 14. Ferritin 34, hemoglobin 124. rTMS referral cancelled.', cite: '[[05 §2025-08-14]]' },
        { date: '2025-09-02', label: 'Graduated return to work', body: 'Two days per week.', cite: '[[05 §2025-09-09]]' },
        { date: '2025-09-09', label: 'Below the moderate threshold', body: 'PHQ-9 9, for the first time in the episode. C-SSRS negative on all items.', cite: '[[05 §2025-09-09]]' },
        { date: '2025-10-14', label: 'Maintenance', body: 'PHQ-9 7. Four days per week. Running once weekly.', cite: '[[05 §2025-10-14]]' },
        { date: '2025-11-03', label: 'Full-time work resumed', body: '', cite: '[[05 §2025-11-18]]' },
        { date: '2025-11-18', label: 'Remission criteria met', body: 'PHQ-9 5. Discharged from ICTT prescribing to [GP_1].', cite: '[[05 §2025-11-18]]' },
        { date: '2025-11-25', label: 'Wellness plan written independently', body: 'Reviewed in session. Early warning sequence generated from the client’s own recollection. Shame rating declined.', cite: '[[07 §3]] [[07 §Clinician annotation]]' },
        { date: '2025-12-09', label: 'Episode closed', body: 'Four booster sessions scheduled at 6, 12, 24 and 36 weeks. Maintenance recommended for a minimum of 12 months.', cite: '[[05 §Discharge status]]' },
      ],
    },
  ],
}

/* ---------------------------------------------------------------- sentiment */

export const sentiment = {
  module: 'sentiment',
  header: 'Sentiment and trends',
  subhead: 'Scored by who wrote it',
  tabs: [
    { id: 'all', label: 'All sources' },
    { id: 'clinician', label: 'Clinician written (5 docs)' },
    { id: 'client', label: 'Client written (2 docs)' },
  ],
  /** [VERBATIM] spec 4.6 */
  caption:
    'Client voice is scored separately. Quoted speech inside a clinician’s note is marked as reported, not direct.',
  findings: [
    {
      id: 's1',
      scope: 'clinician',
      authorBadge: 'CLINICIAN',
      confidence: 'Moderate',
      heading: 'The clinical register moves through three vocabularies.',
      body: `Sessions 1 to 5 use engagement language: appropriate for CBT, motivation present, modest engagement gain, first measurable movement [[02 §S1]] [[02 §S3-A]] [[02 §S5-A]].

Sessions 6 to 9 shift to containment language: progress below expectation, deterioration, non-response, risk reassessed as elevated, clinically inappropriate [[02 §S6-A]] [[02 §S7-A]] [[02 §S8-A]] [[02 §S9-A]]. The shift is abrupt and lands within one session of the performance improvement plan disclosure.

From 2025-07-17 the register turns to capacity language: notable change, matched to the patient's actual capacity, reinforced the process rather than the outcome [[05 §2025-08-14]] [[05 §Episode summary]] [[06 §Clinician annotation]].`,
    },
    {
      id: 's2',
      scope: 'clinician',
      authorBadge: 'CLINICIAN',
      confidence: 'Moderate',
      heading: 'Two hedged constructions recur before each escalation.',
      body: `Within measurement noise [[02 §S3-A]] and expected at this stage and was normalized [[02 §S2-A]]. Both are accurate at the time of writing. Both appear immediately before periods that were later described as deterioration.`,
    },
    {
      id: 's3',
      scope: 'client',
      authorBadge: 'CLIENT DIRECT',
      confidence: 'High',
      heading: 'Document 06, the thought diary of 2025-08-05',
      body: `Absolute and global constructions dominate the belief section: everyone is waiting, never going to be able to, everyone is going to figure that out, rated at 85 out of 100 [[06 §B]]. The dominant named affect is shame at 80 out of 100, above sadness, panic and fatigue [[06 §C]].

The evidence-against column is where the register changes. The client moves from global to bounded language without prompting: measuring myself against the wrong year, going back to never is possible but it is not the most likely thing, it is the thing I am most scared of, those are different [[06 §D]]. The clinician annotation flags the same move as spontaneous [[06 §Clinician annotation]].

Self-attribution flips inside a single page. The A section is avoidance framed as a personal failure, standing in the kitchen for ten minutes pretending to look for something [[06 §A]]. The E section is the same day reframed as a schedule, two days is the plan, I am allowed to be part way [[06 §E]].`,
    },
    {
      id: 's4',
      scope: 'client',
      authorBadge: 'CLIENT DIRECT',
      confidence: 'High',
      heading: 'Document 07, the wellness plan of 2025-11-25, sixteen weeks later',
      body: `The same client, the same author type, at PHQ-9 5 rather than 14. Three things move and one does not.

Absolute constructions are gone. The thought diary opened at a belief rating of 85 on never going to be able to and everyone is going to figure that out [[06 §B]]. The wellness plan contains no global construction of that form. Where the earlier document reached bounded language only in the disputation column, after working for it, the later document opens in bounded language and stays there: possible and it is not what I expect, at the level I am at now and not above it [[07 §1]] [[07 §2]].

Causal attribution reverses. In the thought diary the avoidance is framed as a personal failure [[06 §A]]. In the wellness plan the failure of the first four months is assigned to the treatment plan, explicitly and in detail: wrong dose, wrong class, ferritin at 9, and a cognitive task set above the capacity available at the time [[07 §6]]. The clinician annotation names this as the clearest change in the episode and notes that no instrument captures it [[07 §Clinician annotation]].

The distinction persists without prompting. The possible-versus-most-likely construction the client generated on her own on 2025-08-05 [[06 §D]] reappears on 2025-11-25 with no reference to the earlier record [[07 §6]]. Sixteen weeks between them. This is the most defensible sentiment finding in the corpus, because it is the same construction, by the same author, in two documents written four months apart, and the second one is unprompted.

What does not move is self-monitoring vigilance. The plan is organised entirely around detecting recurrence, and the client writes that recurrence is possible and that she has been here twice before [[07 §1]]. This is clinically appropriate rather than a residual symptom and should not be read as one.`,
    },
    {
      id: 's5',
      scope: 'client',
      authorBadge: 'CLIENT DIRECT',
      confidence: 'High',
      heading: 'The finding worth leading with',
      body: `At the point the client wrote the thought diary, PHQ-9 was 14 and falling, an eleven point improvement from the May peak. Shame was still rated 80 out of 100 before disputation and 45 after [[05 §Outcome table]] [[06 §C]] [[06 §E]]. The instrument was improving faster than the client's self-appraisal, and the annotation names shame as the remaining target for the next phase [[06 §Clinician annotation]]. No PHQ-9 item captures this.

At the next client-authored document, sixteen weeks later, the client declined to rate shame at all and said the question no longer felt like the relevant one [[07 §Clinician annotation]]. The record therefore contains no closing shame measurement, and the absence is itself documented rather than missing. The instrument series ends at PHQ-9 5. The self-appraisal series ends by the client stepping outside the frame the instrument was using.`,
    },
    {
      id: 's6',
      scope: 'clinician',
      authorBadge: 'CLIENT REPORTED',
      confidence: 'Moderate',
      heading: 'Client speech quoted inside practitioner notes',
      body: `Direction of travel across the episode, all reported rather than written:

2025-01-14 nothing lands anymore, a drain on everyone, wishing I could just not wake up [[01 §2]]
2025-02-04 I kept forgetting, which is the whole problem [[02 §S2-S]]
2025-03-04 I am going to be found out as useless [[02 §S5-S]]
2025-05-06 at least I cannot fail at it if I am not there [[02 §S8-S]]
2025-05-22 cannot picture a version of next year that is different [[04 §History]]
2025-08-14 the first week in maybe two years where I was not counting the hours [[05 §2025-08-14]]
2025-11-18 something actually turned [[05 §2025-11-18]]

Burden language appears in five of the seven quoted statements before May and in none after August.`,
    },
  ],
  trendBlock: {
    heading: 'Trend block',
    body: `Instrument agreement: PHQ-9 and GAD-7 move together across all 14 paired measurements, correlation is visually near-perfect, so the anxiety measure adds little independent signal in this record.

Divergence point: between 2025-08-05 and 2025-09-09 the measures fall by five points while the client's own writing still rates shame at 80 pre-disputation. Measured recovery leads self-appraisal by roughly one month in this record.

Second divergence, later and in the other direction: by 2025-11-25 the measured series has been flat at remission for a week while the client's own writing shows the largest single shift in the corpus, the reversal of causal attribution [[07 §6]]. The instrument had stopped moving. The self-appraisal had not.`,
  },
}

/* --------------------------------------------------------------------- risk */

export const risk = {
  module: 'risk',
  header: 'Risk content as documented',
  /** [VERBATIM] spec 4.7. Renders above content, not dismissible. */
  mandatoryReview: `MANDATORY CLINICAL REVIEW
This panel surfaces risk content as written in the source documents. It is not a risk assessment, not a triage decision, and not a clinical opinion. A qualified clinician must review the source documents before any action is taken.`,
  chronology: {
    columns: ['Date', 'Documented level', 'What the record says', 'Source'],
    rows: [
      ['2025-01-14', 'Passive, low acute', 'Passive thoughts one to two times monthly over the past year. No plan, intent or preparatory behaviour. No self-harm history. C-SSRS screen positive at item 2.', '[[01 §2]] [[01 §6]]'],
      ['2025-03-25', 'Passive, increased', 'Endorses passive thoughts more than before, estimated weekly. Denies plan or intent. Re-screened at the six session review.', '[[02 §S6-A]]'],
      ['2025-04-15', 'Passive, frequent', 'A few times a week. Denies plan, intent, means consideration. Client agreed to contact clinician or 811 if thoughts intensify.', '[[02 §S7-P]]'],
      ['2025-05-06', 'Moderate to high chronic, acute-on-chronic elevation', 'Full C-SSRS administered. Items 1 to 4 endorsed, items 5 to 7 denied. Formulated as rising, with the current care plan judged insufficient.', '[[03 §2]] [[03 §3]]'],
      ['2025-05-13', 'Elevated', 'Disengagement from the safety plan card, itself documented as a risk indicator. Access 24/7 contacted during session.', '[[02 §S9-A]] [[02 §S9-P]]'],
      ['2025-05-22', 'Acute and imminent', 'Item 5 endorsed. Would not commit to safety over the next 24 hours. Deterrents described as not enough today.', '[[03 §Addendum]]'],
      ['2025-05-22 (ED)', 'Voluntary, capacity intact', 'Admission offered and declined. Involuntary admission assessed as not justified, with reasoning documented.', '[[04 §Disposition 1]]'],
      ['2025-07-17 onward', 'Negative', 'C-SSRS negative at every subsequent contact through discharge.', '[[05 §Outcome table]]'],
    ],
  },
  sections: [
    {
      id: 'r-actions',
      heading: 'What the record shows was done at each escalation',
      body: `Safety plan built collaboratively in the Stanley-Brown format and supplied in two formats [[03 §4]]. Spouse contacted with written consent and means restriction agreed the same day [[03 §5b]]. Session frequency doubled [[03 §5c]]. Urgent psychiatric consultation requested by fax with the clinical rationale stated [[03 §5d]]. Same-day supervision consultation, plan endorsed [[03 §5e]]. Capacity-based decision to decline emergency presentation documented with rationale [[03 §5f]]. On escalation: emergency presentation, receiving department telephoned in advance, verbal handover at triage, means restriction re-confirmed, supervisor notified [[03 §Addendum]].`,
    },
    {
      id: 'r-gaps',
      heading: 'Three documented gaps',
      tone: 'amber',
      body: `1. Bloodwork recommended 2025-01-14, drawn 2025-05-22, four month interval, result outside range and named as contributory [[01 §9d]] [[04 §Laboratory note]].

2. Wait to psychiatric assessment. Expedited consultation requested 2025-04-15, escalated to urgent 2025-05-06, appointment standing at 2025-06-02, described in the record itself as clinically inappropriate given the trajectory [[02 §S7-P]] [[02 §S8-P]] [[02 §S9-A]].

3. Psychological intensity was not reduced as severity rose, and the episode summary names this as an iatrogenic source of self-criticism [[05 §Episode summary]].`,
    },
    {
      id: 'r-protective',
      heading: 'Protective factors as documented, carried forward',
      tone: 'positive',
      body: `Spouse engaged and available. No substance misuse, AUDIT-C below cut-off. No lifetime attempt or self-injury. Help-seeking maintained throughout, including attendance during the worst stretch. Deterrents articulated spontaneously by the client [[01 §4]] [[01 §6]] [[03 §3]].

Written wellness plan with a staged response, authored by the client, naming ideation as a late sign and specifying that decisions are not made alone at that stage [[07 §3]] [[07 §4]].`,
    },
  ],
  footer:
    'Every row above links to the source passage. Insyte does not score risk and does not rank clients.',
}

export const analyses = { patterns, timeline, sentiment, risk }
