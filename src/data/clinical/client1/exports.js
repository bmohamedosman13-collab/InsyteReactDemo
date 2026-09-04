/**
 * Export layer for [CLIENT_1].
 *
 * Spec 4.9 gave SOAP and DAP for the single session of 2025-08-05 and set the
 * default scope to full episode. A 330 day SOAP note is not a document type
 * that exists, so the revisions pass resolved it this way:
 *
 *   - SOAP and DAP stay session-scoped. Default session 2025-11-25, the most
 *     recent in the record. 2025-08-05 stays selectable.
 *   - Complete Clinical File is a fourth card and is the genuine
 *     whole-record artifact. The modal opens on it.
 *
 * Field states, spec 4.9:
 *   populated        rendered with citations
 *   clinician-entry  amber, requires a practitioner judgement Insyte cannot make
 *   not-documented   grey italic, source documents searched and silent
 */

export const exportCards = [
  { id: 'episode', label: 'Complete Clinical File', blurb: 'Every document, full course of care', scope: 'episode', default: true },
  { id: 'soap', label: 'SOAP note', blurb: 'Standard four-part clinical note', scope: 'session' },
  { id: 'dap', label: 'DAP note', blurb: 'Data, Assessment, Plan', scope: 'session' },
]

export const sessionOptions = [
  { id: '2025-11-25', label: 'Most recent session · 2025-11-25 · wellness plan review', default: true },
  { id: '2025-08-05', label: 'Session 16 · 2025-08-05 · first independent thought record' },
]

/* ------------------------------------------------------------- SOAP, by session */

export const soap = {
  '2025-11-25': {
    title: 'SOAP NOTE',
    meta: [
      'Client: [CLIENT_1]   File: [ID_1]   Session 22   Date: 2025-11-25',
      'Clinician: [PSYCHOLOGIST_1]   Modality: Individual CBT   Duration: 50 min',
    ],
    blocks: [
      {
        key: 'S',
        label: 'S — SUBJECTIVE',
        body: `Client attended with a completed relapse prevention and wellness plan, written independently between sessions and brought to session complete. [[07 §Header]]
Client reported writing the plan while well, on the stated reasoning that the person who would need it would not be in a state to write it. [[07 §1]]
Client identified sleep as the first function to deteriorate, followed by withdrawal from morning activity, then re-checking of work, then withdrawal from contact. [[07 §3]]
Client stated that recurrence is possible and is not what she expects, and noted two prior episodes without a plan in place. [[07 §1]]
Client declined to rate shame when asked, stating that the question no longer felt like the relevant one. [[07 §Clinician annotation]]`,
      },
      {
        key: 'O',
        label: 'O — OBJECTIVE',
        body: `Plan submitted and reviewed in session. Structure and content client-generated, with the exception of the staged response format introduced at session 14. [[07 §Clinician annotation]]
Client placed ideation as the fifth and latest item in her own early warning sequence, having described it at intake as the first thing she noticed. [[07 §3]] [[01 §2]]
Client reproduced the likelihood versus feared outcome distinction generated spontaneously sixteen weeks earlier, without prompting or reference to the earlier record. [[07 §6]] [[06 §D]]
Most recent administered measures: PHQ-9 5, GAD-7 4 on 2025-11-18. C-SSRS negative on all items. [[05 §2025-11-18]]
Concurrent medication: venlafaxine XR 150 mg daily, aripiprazole 5 mg daily, ferrous fumarate 300 mg daily. [[05 §2025-08-14]]`,
      },
      {
        key: 'A',
        label: 'A — ASSESSMENT',
        body: `Remission criteria met at the preceding contact and sustained at this session. [[05 §2025-11-18]]
Causal attribution for the first phase of the episode has reversed. At intake and through session 9 the same events were attributed to personal inadequacy; the plan assigns them to the treatment approach, naming dose, class, untreated iron deficiency and a cognitive task set above available capacity. [[07 §6]] [[01 §2]] [[02 §S8-S]]
The disputation skill has generalised rather than being recalled, on the evidence of the unprompted reappearance of a construction generated four months earlier. [[07 §6]] [[07 §Clinician annotation]]
Declining to rate shame is recorded as informative rather than as missing data. No closing measurement of shame exists in the record.
Relapse plan is specific, staged, and correctly identifies the point at which the client's own judgement should not be the deciding input. [[07 §4]]`,
      },
      {
        key: 'P',
        label: 'P — PLAN',
        body: `Wellness plan filed. Copy to client. To be reviewed at each booster session. [[07 §Clinician annotation]]
Four booster sessions at 6, 12, 24 and 36 weeks as scheduled. [[05 §Discharge status]]
Maintenance pharmacotherapy for a minimum of 12 months, prescribing returned to [GP_1]. [[05 §2025-11-18]] [[05 §Discharge status]]
Support the named early warning sequence as the client's own monitoring instrument rather than substituting a clinician-generated one. [[07 §3]]
Next session: __CLINICIAN_ENTRY__
Risk: no indicators reported this session. __CLINICIAN_ENTRY__ to confirm.`,
      },
    ],
    footer:
      'Generated by Insyte from 3 source documents. All content is extracted, not inferred. Clinician review required before this note enters the record.',
  },

  '2025-08-05': {
    title: 'SOAP NOTE',
    meta: [
      'Client: [CLIENT_1]   File: [ID_1]   Session 16   Date: 2025-08-05',
      'Clinician: [PSYCHOLOGIST_1]   Modality: Individual CBT   Duration: 50 min',
    ],
    blocks: [
      {
        key: 'S',
        label: 'S — SUBJECTIVE',
        body: `Client presented with a completed ABCDE thought record, the first she has completed independently during this episode. [[06 §Client note]]
Activating event was a family dinner at which a relative asked when she would be returning to work properly. Client reported leaving the room and remaining withdrawn for the remainder of the evening. [[06 §A]] [[06 §C]]
Hot thought identified by the client as an inability to return to full-time work and an expectation that others would recognise this, initial belief 85/100. [[06 §B]]
Dominant reported affect was shame at 80/100, with sadness, panic and fatigue also endorsed. Somatic report included facial flushing, chest tightness and heaviness in the arms. [[06 §C]]
Client reported the record took approximately 40 minutes and that she nearly did not complete it. [[06 §Client note]]`,
      },
      {
        key: 'O',
        label: 'O — OBJECTIVE',
        body: `Homework submitted and reviewed in session. Client independently generated the evidence-against column, which she was unable to do at sessions 5 and 7. [[06 §Clinician annotation]]
Client spontaneously articulated a distinction between likelihood and feared outcome. [[06 §D]] [[06 §Clinician annotation]]
Most recent administered measures: PHQ-9 14, GAD-7 11 on 2025-08-14. C-SSRS negative on all items at the preceding administration. [[05 §Outcome table]]
Concurrent medication at time of session: venlafaxine XR 150 mg daily, aripiprazole 2.5 mg daily, ferrous fumarate 300 mg daily. [[05 §2025-07-17]]`,
      },
      {
        key: 'A',
        label: 'A — ASSESSMENT',
        body: `First independently completed thought record of the episode, obtained at PHQ-9 14 following six weeks in which cognitive restructuring was suspended in favour of behavioural activation. [[05 §Psychological treatment]] [[06 §Clinician annotation]]
Belief reduction of 35 points within a single record, and affect reduction of 35 points, both self-rated. [[06 §E]]
Shame remains the dominant affect and is disproportionate to current symptom severity, identified as the target for the next phase. [[06 §Clinician annotation]]
Cognitive capacity for restructuring appears to have returned in step with symptom reduction rather than in advance of it.`,
      },
      {
        key: 'P',
        label: 'P — PLAN',
        body: `Reinforce process over outcome. [[06 §Clinician annotation]]
Continue thought records at current frequency.
Shift emphasis to shame and to predictions about the future, using behavioural experiments rather than verbal disputation. [[05 §Psychological treatment]]
Maintain graduated return-to-work schedule as set by the treating physician; reinforce that the schedule is the plan rather than a shortfall. [[06 §D]]
Next session: __CLINICIAN_ENTRY__
Risk: no indicators reported this session. __CLINICIAN_ENTRY__ to confirm.`,
      },
    ],
    footer:
      'Generated by Insyte from 2 source documents. All content is extracted, not inferred. Clinician review required before this note enters the record.',
  },
}

/* -------------------------------------------------------------- DAP, by session */

export const dap = {
  '2025-11-25': {
    title: 'DAP NOTE',
    meta: [
      'Client: [CLIENT_1]   File: [ID_1]   Session 22   Date: 2025-11-25',
      'Clinician: [PSYCHOLOGIST_1]   Duration: 50 min',
    ],
    blocks: [
      {
        key: 'D',
        label: 'D — DATA',
        body: `Client attended with a relapse prevention and wellness plan written independently between sessions. [[07 §Header]]
Protective priorities named by the client: current work level and not above it, sleep, morning activity, and direct communication with her spouse in place of withdrawal. [[07 §2]]
Early warning sequence generated by the client in the order she recalls it occurring: sleep, withdrawal from morning activity, re-checking work, withdrawal from contact, then ideation as the fifth item. [[07 §3]]
Staged response specified at each level, including that at the ideation stage decisions are not made alone and the practice, crisis line and spouse are contacted the same day. [[07 §4]]
Client declined a shame rating, stating the question no longer felt relevant. [[07 §Clinician annotation]]
Measures in the surrounding window: PHQ-9 5, GAD-7 4, C-SSRS negative. [[05 §2025-11-18]]`,
      },
      {
        key: 'A',
        label: 'A — ASSESSMENT',
        body: `Sustained remission with a client-generated relapse plan in place. [[05 §2025-11-18]] [[07 §3]]
The reversal of causal attribution for the first phase of the episode is the clearest change in the record and is not captured by any administered instrument. [[07 §6]] [[07 §Clinician annotation]]
Placement of ideation as a late rather than early sign is accurate against the record and is the reverse of the client's own account at intake, indicating improved self-monitoring accuracy rather than minimisation. [[07 §3]] [[01 §2]]
Self-monitoring vigilance remains high and is proportionate to a third episode rather than residual symptom.`,
      },
      {
        key: 'P',
        label: 'P — PLAN',
        body: `File the plan and review it at each booster session rather than replacing it with a clinician-generated version. [[07 §Clinician annotation]]
Booster sessions at 6, 12, 24 and 36 weeks. [[05 §Discharge status]]
Maintain pharmacotherapy for a minimum of 12 months under [GP_1]. [[05 §2025-11-18]]
Treat the absence of a closing shame rating as documented rather than outstanding.
Next session: __CLINICIAN_ENTRY__`,
      },
    ],
    footer: 'Generated by Insyte from 3 source documents. Clinician review required.',
  },

  '2025-08-05': {
    title: 'DAP NOTE',
    meta: [
      'Client: [CLIENT_1]   File: [ID_1]   Session 16   Date: 2025-08-05',
      'Clinician: [PSYCHOLOGIST_1]   Duration: 50 min',
    ],
    blocks: [
      {
        key: 'D',
        label: 'D — DATA',
        body: `Client attended with a completed ABCDE thought record, her first independently completed record this episode. [[06 §Client note]]
Trigger was a question from a relative at a family dinner regarding return to work. Client withdrew from the room and remained withdrawn for the evening. [[06 §A]] [[06 §C]]
Hot thought: inability to sustain full-time work and expectation of being found out, 85/100. Shame 80/100. Somatic symptoms reported. [[06 §B]] [[06 §C]]
Unhelpful thinking styles identified by the client without prompting: mind reading, fortune telling, all-or-nothing, and possible disqualification of the positive. [[06 §B]]
Evidence-against column generated independently, including reference to the graduated return being deliberate, the measured PHQ-9 change from 25 to 14, and a cooked meal for six as behavioural evidence. [[06 §D]]
Ratings on completion: hot thought 50/100, shame 45/100. [[06 §E]]
Measures in the surrounding window: PHQ-9 14, GAD-7 11. [[05 §Outcome table]]`,
      },
      {
        key: 'A',
        label: 'A — ASSESSMENT',
        body: `Independent completion at session 16 marks a change in capacity relative to sessions 5 and 7, where the same task could not be completed. [[06 §Clinician annotation]]
Timing is consistent with the six-week suspension of cognitive work and the pharmacological changes of the preceding eight weeks, and is unlikely to be attributable to the psychological work alone. [[05 §Psychological treatment]] [[05 §Episode summary]]
Shame persists at a level out of proportion to current symptom scores and is the clearest residual target.
Client's spontaneous separation of likelihood from feared outcome indicates the disputation skill is now generalising rather than being prompted.`,
      },
      {
        key: 'P',
        label: 'P — PLAN',
        body: `Reinforce the process of completion rather than the outcome ratings.
Move the focus to shame and to future-oriented predictions, tested behaviourally. [[05 §Psychological treatment]]
Continue current session frequency.
Support the graduated return schedule as set, and treat schedule adherence rather than schedule expansion as the success criterion this phase.
Next session: __CLINICIAN_ENTRY__`,
      },
    ],
    footer: 'Generated by Insyte from 2 source documents. Clinician review required.',
  },
}

/* ------------------------------------------------------------- episode summary */

export const episodeSummary = {
  title: 'COMPLETE CLINICAL FILE',
  meta: [
    'Client: [CLIENT_1]   File: [ID_1]   Episode: 2025-01-14 to 2025-12-09   330 days',
    'Prepared from 7 documents across 3 organizations',
    'Treating clinician: [PSYCHOLOGIST_1]   Prescribing at close: [GP_1]',
  ],
  banner:
    'This covers the full course of care, not a single session. It draws on every document in the record. SOAP and DAP remain available for individual sessions.',
  blocks: [
    {
      key: '1',
      label: 'PRESENTING PROBLEM AND CONTEXT',
      body: `Referral received 2024-11-28, intake assessment 2025-01-14. [[01 §Header]]
Major Depressive Disorder, recurrent, severe, without psychotic features (F33.2), superimposed on Persistent Depressive Disorder (F34.1), as recorded by the assessing psychologist and later reaffirmed at psychiatric consultation. [[01 §7]] [[04 §Diagnosis]]
Insidious onset dated by the client to spring 2018 following a workplace restructuring, with no clear return to premorbid functioning. [[01 §3]] [[01 §8]]
Baseline instruments: PHQ-9 22, GAD-7 14, BDI-II 34, WSAS 27, AUDIT-C 3. [[01 §6]]
Iron deficiency anemia (D50.9) later identified as contributory. [[04 §Diagnosis]] [[04 §Laboratory note]]`,
    },
    {
      key: '2',
      label: 'COURSE OF TREATMENT',
      body: `Phase 1, 2025-01-14 to 2025-03-04. Weekly individual CBT from 2025-01-28 with continued escitalopram 10 mg. PHQ-9 22 to 19. [[02 §S1]] [[02 §S5]]

Phase 2, 2025-03-13 to 2025-05-13. Performance improvement plan at work disclosed at session 6. Escitalopram increased to 20 mg. PHQ-9 rose to 26, above the intake baseline. Full C-SSRS administered 2025-05-06, safety plan built, session frequency doubled, urgent psychiatric consultation requested. [[02 §S6]] [[02 §S9]] [[03 §4]] [[03 §5]]

Phase 3, 2025-05-22. Voluntary emergency presentation. Medically cleared with ferritin 9. Psychiatric consultation classified the presentation as treatment-resistant at Stage I. Admission offered and declined with capacity intact and the reasoning documented. [[04 §Triage]] [[04 §Laboratory]] [[04 §Psychiatric consultation]] [[04 §Disposition 1]]

Phase 4, 2025-06-05 to 2025-12-09. Intensive community treatment. Venlafaxine XR titrated to 150 mg, aripiprazole augmentation from 2025-07-17, iron repletion, and psychological work simplified to behavioural activation for six weeks. PHQ-9 24 to 5. [[05 §Serial notes]] [[05 §Psychological treatment]] [[05 §2025-11-18]]`,
    },
    {
      key: '3',
      label: 'OUTCOME',
      body: `Fifteen paired measurements recorded across 330 days with no gaps other than the emergency presentation, at which measures were not administered. [[05 §Outcome table]]
PHQ-9 22 at intake, peak 26 on 2025-05-13, 5 at close. A 17 point reduction from baseline. [[01 §6]] [[05 §2025-11-18]]
GAD-7 14 at intake, peak 17, 4 at close. [[01 §6]] [[05 §2025-11-18]]
C-SSRS negative at every contact from 2025-07-17 through discharge. [[05 §Outcome table]]
Remission criteria met 2025-11-18. [[05 §2025-11-18]]
BDI-II and WSAS recorded once at intake and not repeated during the episode. [[01 §6]]
Return to work: graduated from 2025-09-02 at two days per week, four days from 2025-10-14, full time from 2025-11-03. [[05 §2025-09-09]] [[05 §2025-10-14]] [[05 §2025-11-18]]`,
    },
    {
      key: '4',
      label: 'WHAT THE RECORD IDENTIFIES AS THE TURNING POINT',
      body: `The record declines to attribute the improvement to any single component and names four changes made inside eight weeks: class switch, augmentation, iron repletion, and psychological simplification. [[05 §Episode summary]]
The largest single measured drop follows the augmentation, PHQ-9 18 to 14. [[05 §2025-08-14]]
The episode summary additionally names the failure to reduce psychological intensity as severity rose, describing it as an iatrogenic source of self-criticism. [[05 §Episode summary]]`,
    },
    {
      key: '5',
      label: 'RISK HISTORY',
      body: `Passive ideation at intake, one to two times monthly, no plan or intent. [[01 §2]] [[01 §6]]
Escalation through 2025-03-25 and 2025-04-15 to full C-SSRS administration on 2025-05-06 with items 1 to 4 endorsed. [[02 §S6-A]] [[02 §S7-P]] [[03 §2]]
Highest documented point 2025-05-22, item 5 endorsed, would not commit to safety over 24 hours, resolved through voluntary emergency presentation. [[03 §Addendum]]
C-SSRS negative at every contact from 2025-07-17 to discharge. [[05 §Outcome table]]
Protective factors documented throughout: spouse engaged, no substance misuse, no attempt or self-injury history, help-seeking maintained including during the worst stretch, deterrents articulated spontaneously. [[01 §4]] [[03 §3]]
A client-authored wellness plan with a staged response was filed at close. [[07 §3]] [[07 §4]]`,
    },
    {
      key: '6',
      label: 'DISPOSITION AND RECOMMENDATIONS',
      body: `Discharged from intensive community treatment 2025-12-09, prescribing returned to [GP_1]. [[05 §Discharge status]]
Four booster sessions scheduled at 6, 12, 24 and 36 weeks. [[05 §Discharge status]]
Maintenance pharmacotherapy recommended for a minimum of 12 months given the chronic and recurrent course. [[05 §Discharge status]]
Relapse prevention plan authored by the client, filed, and to be reviewed at each booster session. [[07 §Clinician annotation]]
Prognostic statement: __CLINICIAN_ENTRY__
Formal discharge risk rating: __CLINICIAN_ENTRY__`,
    },
  ],
  footer:
    'Generated by Insyte from 7 source documents spanning 330 days. All content is extracted, not inferred. Insyte does not assign a risk level and does not produce a diagnosis. Clinician review required before this summary enters the record.',
}
