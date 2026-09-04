/** Query bar presets for [CLIENT_1]. Spec 4.8. */

export const queryPresets = [
  {
    id: 'q1',
    chipLabel: 'What changed when the client started to improve?',
    matchTokens: ['changed', 'change', 'improve', 'improved', 'improvement', 'better', 'turning', 'point', 'recovery', 'worked'],
    answer: `Four changes inside eight weeks, and the record does not attribute the improvement to any single one [[05 §Episode summary]].

1. Class switch. Escitalopram cross-tapered to venlafaxine XR, completed by 2025-06-05, titrated to 150 mg by 2025-06-26 [[04 §Disposition 3]] [[05 §2025-06-05]].

2. Augmentation. Aripiprazole 2.5 mg added 2025-07-17, increased to 5 mg 2025-08-14 [[05 §2025-07-17]] [[05 §2025-08-14]]. The largest single measured drop follows this, PHQ-9 18 to 14.

3. Iron repletion. Ferrous fumarate from 2025-05-22, ferritin 9 to 34 and hemoglobin 112 to 124 by August [[04 §Disposition 5]] [[05 §2025-08-14]].

4. Psychological simplification. Thought records suspended for six weeks, sessions 10 to 15 delivered as behavioural activation only at a deliberately low threshold, explicitly decoupled from mood improvement [[05 §Psychological treatment]].

The client's own attribution is the aripiprazole addition as the point where something actually turned, while crediting the behavioural activation work as what allowed her to use the improvement [[05 §2025-11-18]].`,
  },
  {
    id: 'q2',
    chipLabel: 'Was anything flagged early and acted on late?',
    matchTokens: ['flagged', 'early', 'late', 'delay', 'delayed', 'missed', 'acted', 'overlooked', 'ignored', 'gap'],
    answer: `Three items.

Bloodwork including ferritin was recommended at intake on 2025-01-14 and drawn on 2025-05-22, an interval of 128 days. The result was 9 ug/L against a reference floor of 15, and the ED record states it was likely contributing to the fatigue presentation [[01 §9d]] [[04 §Laboratory note]].

The medication history that later supported a treatment-resistant classification was fully documented at intake on 2025-01-14. The classification was made on 2025-05-22 [[01 §3]] [[01 §4]] [[04 §Medication trial history]].

Psychiatric consultation was requested on 2025-04-15, escalated to urgent on 2025-05-06, and the appointment still stood at 2025-06-02 on 2025-05-13 [[02 §S7-P]] [[02 §S8-P]] [[02 §S9-S]].`,
  },
  {
    id: 'q3',
    chipLabel: "How did the client's own language change over the episode?",
    matchTokens: ['language', 'words', 'voice', 'own', 'client', 'wrote', 'writing', 'said', 'tone', 'changed'],
    answer: `Restricted to client-authored and client-quoted text only. Five documents by practitioners are excluded from this answer.

Two documents in this set are written by the client, the thought diary of 2025-08-05 [[06 §A]] and the wellness plan of 2025-11-25 [[07 §1]].

Inside the diary the language shifts measurably. The belief section uses absolute constructions, never, everyone, at a belief rating of 85 [[06 §B]]. The disputation section replaces them with bounded ones, most notably the distinction the client draws herself between what is possible and what is most likely, closing at a belief rating of 50 [[06 §D]] [[06 §E]].

Sixteen weeks later the wellness plan opens in that bounded register rather than arriving at it, and reproduces the same possible-versus-most-likely construction without prompting and without reference to the earlier record [[07 §1]] [[07 §6]]. The clearest single change is the reversal of causal attribution: the failure of the first four months is assigned to the treatment plan rather than to herself [[07 §6]] [[07 §Clinician annotation]].

Across quoted speech in practitioner notes the direction is from self-as-burden to self-as-actor. Burden framing appears in five quoted statements before May, including a drain on everyone [[01 §2]] and at least I cannot fail at it if I am not there [[02 §S8-S]]. It does not appear in any quoted statement after August, where the register is the first week in maybe two years where I was not counting the hours [[05 §2025-08-14]].

One caveat the record supports: quoted speech is selected by the practitioner writing the note. It is evidence about the episode, but it is not a sample of how the client spoke.`,
  },
  {
    id: 'q4',
    chipLabel: 'Give me the risk history with what was done at each point.',
    matchTokens: ['risk', 'history', 'safety', 'ideation', 'suicidal', 'escalation', 'done', 'harm'],
    routesTo: 'risk',
    answer: '',
  },
  {
    id: 'q5',
    chipLabel: 'Show me every outcome score with its source.',
    matchTokens: ['outcome', 'score', 'scores', 'phq', 'phq-9', 'gad', 'gad-7', 'measures', 'measurement', 'source', 'table'],
    answer: 'Fifteen recorded measurements across the episode. Baseline instruments recorded once at intake and not repeated: BDI-II 34, WSAS 27, AUDIT-C 3 [[01 §6]].',
    table: {
      columns: ['Date', 'Context', 'PHQ-9', 'GAD-7', 'C-SSRS', 'Source'],
      rows: [
        ['2025-01-14', 'Intake', '22', '14', 'Item 2', '[[01 §6]]'],
        ['2025-02-11', 'Session 3', '21', '13', 'not administered', '[[02 §S3-O]]'],
        ['2025-03-04', 'Session 5', '19', '12', 'not administered', '[[02 §S5-O]]'],
        ['2025-03-25', 'Session 6', '20', '13', 'screened', '[[02 §S6-O]]'],
        ['2025-04-15', 'Session 7', '23', '15', 'screened', '[[02 §S7-O]]'],
        ['2025-05-06', 'Session 8', '25', '16', 'Item 4', '[[02 §S8-O]] [[03 §2]]'],
        ['2025-05-13', 'Session 9', '26', '17', 'elevated', '[[02 §S9-O]]'],
        ['2025-05-22', 'ED presentation', 'not administered', 'not administered', 'Item 5', '[[03 §Addendum]] [[05 §Outcome table]]'],
        ['2025-06-05', 'Venlafaxine 75 mg', '24', '16', 'Item 2', '[[05 §2025-06-05]]'],
        ['2025-06-26', 'Venlafaxine 150 mg', '21', '15', 'Item 2', '[[05 §2025-06-26]]'],
        ['2025-07-17', 'Week 8 at 150 mg', '18', '13', 'Negative', '[[05 §2025-07-17]]'],
        ['2025-08-14', 'Aripiprazole 2.5 mg', '14', '11', 'Negative', '[[05 §2025-08-14]]'],
        ['2025-09-09', 'Aripiprazole 5 mg', '9', '6', 'Negative', '[[05 §2025-09-09]]'],
        ['2025-10-14', 'Maintenance', '7', '5', 'Negative', '[[05 §2025-10-14]]'],
        ['2025-11-18', 'Maintenance', '5', '4', 'Negative', '[[05 §2025-11-18]]'],
      ],
      greyRows: [7],
    },
  },
]
