/**
 * Corpus for [CLIENT_2], the compensable injury case.
 * From INSYTE_DEMO_WCB_CASE.md sections 2 and 3. Four documents, 41 days.
 */

const W1 = `LANDRY, C. | [ID_2] | WCB Alberta referral and treatment authorization | 2026-05-20 | SYNTHETIC TEST RECORD

WORKERS' COMPENSATION BOARD ALBERTA
REFERRAL AND TREATMENT AUTHORIZATION
Issued by [CLAIM_OWNER_1], Case Manager. Addressed to [PSYCHOLOGIST_2] at [ORG_4].

1. CLAIM IDENTIFICATION
Worker: [CLIENT_2]. Date of birth [DOB_2]. Claim number [CLAIM_1]. Personal health number [PHN_2].
Address [ADDRESS_2]. Telephone [PHONE_5].

2. EMPLOYER
[EMPLOYER_2], Fort Saskatchewan, Alberta. Worker occupation: welder-fabricator, Red Seal certified,
employed at this site since 2019-03-04.

3. INJURY
Date of accident 2026-04-23. Physical injury accepted 2026-04-29: contusion and laceration to the left
forearm, treated same day at an urgent care clinic, sutures removed 2026-05-04, no time loss attributed
to the physical injury. Psychological injury accepted as a secondary condition 2026-05-15 following
review of the treating physician's report of 2026-05-11.

4. TIME LOSS
Worker has been off work since 2026-05-11 on the psychological condition. No time loss on the physical
injury.

5. AUTHORIZATION
Authorized for psychological assessment and treatment, initial block of eight sessions plus one
assessment session. Initial report on form C-851 required within seven business days of the initial
counselling session. Progress report on form C-852 due at session six or eight weeks, whichever is
earlier.

6. CASE MANAGER NOTES TO PROVIDER
Employer has confirmed availability of modified duties. Worker has expressed reluctance to return to the
fabrication bay. Please address return-to-work planning in your initial report and identify any barriers.
[COWORKER_1] remains off work on a separate accepted claim. An investigation into the rigging failure is
open and its findings are not available to this office.

Synthetic record, not a real claim.`

const W2 = `[EMPLOYER_2] | Incident report | 2026-04-23 | SYNTHETIC TEST RECORD

EMPLOYER INCIDENT REPORT
Completed by [SUPERVISOR_2], shop supervisor. 2026-04-23, 16:40. Attached to the WCB referral package.

1. EVENT
Date and time 2026-04-23, approximately 14:15. Location: main fabrication bay, overhead crane lift zone.
Weather and lighting not a factor, interior work.

2. DESCRIPTION
A steel beam section of approximately 900 kg was being moved by overhead crane from the cutting table to
the assembly jig. [CLIENT_2] was acting as designated spotter and had called the lift. At approximately
two metres of height a rigging strap failed at the eye and the load dropped. [COWORKER_1], working at the
assembly jig, was struck on the lower left leg by the falling section. [CLIENT_2], standing approximately
1.5 metres from the load, was struck on the left forearm by a piece of displaced dunnage and was knocked
to the floor.

3. INJURIES
[COWORKER_1]: open fracture, lower left leg. Transported by ambulance at 14:31. Off work.
[CLIENT_2]: laceration and contusion, left forearm. Transported by a coworker to urgent care at 15:05.
Sutured. Returned to work 2026-04-27.

4. IMMEDIATE ACTIONS
Bay cleared and secured at 14:22. Crane locked out. Rigging equipment quarantined. Occupational Health
and Safety notified 14:55. Internal investigation opened. All lifts suspended pending strap inspection
across the site.

5. WITNESS STATEMENTS
Three witnesses recorded. [CLIENT_2] provided a statement on 2026-04-27 on return to work.

6. SUPERVISOR COMMENT
[CLIENT_2] followed lift procedure as written. The strap in use was within its inspection date. The
failure is under investigation and no fault has been attributed to any worker.

Synthetic record.`

const W3 = `LANDRY, C. | [ID_2] | Initial counselling session record | 2026-06-02 | SYNTHETIC TEST RECORD

[ORG_4]
INITIAL COUNSELLING SESSION RECORD
File [ID_2]. Session 1 of authorized block. 2026-06-02, 60 minutes, in person.
[PSYCHOLOGIST_2], R.Psych.

1. REFERRAL AND CONSENT
Referred by WCB Alberta under claim [CLAIM_1], authorization dated 2026-05-20. Limits of confidentiality
explained, including that reports are provided to WCB and may be examined by any person with a direct
interest in the claim under review. Worker acknowledged and consented in writing 2026-06-02. Service
delivered in person.

2. WORKER ACCOUNT OF THE EVENT
[CLIENT_2] described the incident of 2026-04-23 in a flat, factual register with several pauses. He was
the designated spotter and had called the lift. He described hearing the strap go, seeing the load drop,
and being on the floor before he understood what had happened. He described reaching [COWORKER_1] and
applying pressure to the leg until paramedics arrived. He repeated three times during the session that he
called the lift.

3. SYMPTOMS REPORTED, PAST MONTH
Intrusive re-experiencing: daily, triggered most reliably by metal-on-metal sound. Reports the sound of a
dropped tool at home produced a full startle response and 20 minutes of shaking.
Nightmares: four to five nights weekly, content described as the same few seconds repeating.
Avoidance: has not entered the fabrication bay since 2026-04-27 and drives a route that avoids the site.
Declines to discuss the incident with coworkers, has not answered calls from two of them.
Negative alterations in cognition and mood: persistent guilt centred on having called the lift, described
as "I said go." Reports loss of interest in activities including hockey with his brother-in-law, which he
has not attended since April. Describes feeling detached from [SPOUSE_2].
Arousal: hypervigilance to overhead noise, exaggerated startle, sleep onset and maintenance difficulty
averaging four hours nightly, irritability with reported snapping at [SPOUSE_2] and at his daughter,
concentration difficulty.
Duration: symptoms present since the week following the incident, worsening from approximately
2026-05-06, continuous for six weeks at assessment.

4. WORK HISTORY AND CURRENT STATUS
Welder-fabricator, Red Seal, at [EMPLOYER_2] since 2019. No prior WCB claims. Returned to work 2026-04-27
on light duties for the forearm and worked ten days. Reports that during those ten days he was "not right
on the floor" and twice left the bay during a lift. Off work since 2026-05-11 following an appointment
with [GP_2]. Reports that he wants to work and does not want to be off.

5. PRIOR MENTAL HEALTH
One prior episode. In 2019, following a marital separation, [CLIENT_2] attended six sessions of
counselling through his employer's assistance program for what he describes as situational anxiety. No
medication, no psychiatric involvement, no time loss from work. Resolved and no recurrence until the
current presentation. No history of trauma-related presentation. No family psychiatric history known to
him.

6. MEDICATION
Zopiclone 5 mg as needed at bedtime, prescribed by [GP_2] on 2026-05-19, reports using it four to five
nights weekly. No antidepressant prescribed. No other prescription medication. No known drug allergies.

7. SUBSTANCE USE
Alcohol, self-reported at approximately four standard drinks weekly before the incident and approximately
ten weekly since, concentrated in the evening and described by the worker as being for sleep. He raised
this himself. No cannabis, no other substance use. Discussed in session as a maintaining factor for both
sleep disruption and arousal symptoms, and as a target for early intervention. Worker agreed to record
intake for two weeks. No indication of dependence at this time. No withdrawal history.

8. MENTAL STATUS
Appearance neat, dressed for weather. Cooperative and forthcoming. Psychomotor activity mildly increased,
scanning the room twice when a door closed elsewhere in the building. Speech normal in rate and volume,
reduced during the account of the event. Mood described as "wound up." Affect anxious, congruent,
constricted during trauma content. Thought process linear. No perceptual disturbance. No delusional
content. Cognition grossly intact, mild attentional inefficiency evident. Insight good. Judgment intact.

9. RISK
Suicide risk screened directly. Denies current or past suicidal ideation, plan, intent or preparatory
behaviour. Denies self-harm history. Denies homicidal ideation. No access-to-means concern identified.
Risk assessed as low. Risk factors present: sleep deprivation, increased alcohol use, guilt cognitions,
occupational disruption, social withdrawal. Protective factors present: engaged partner, intact employment
relationship with modified duties available, strong stated motivation to return to work, no history of
self-harm or ideation, help-seeking, no substance dependence. Risk management plan: risk re-screened at
every session; worker provided with the practice number, Health Link 811 and the Access 24/7 number, and
advised to attend emergency without delay if his situation changes; [SPOUSE_2] identified by the worker as
his first contact with his consent. To be reviewed at each session and on any change in alcohol use or
sleep.

10. CLINICAL IMPRESSION
Posttraumatic Stress Disorder (F43.1), provisional, arising from a workplace accident of 2026-04-23 in
which the worker was directly exposed to a life-threatening event and witnessed serious injury to a
coworker. Criteria met for intrusion, avoidance, negative alterations in cognition and mood, and arousal,
with duration exceeding one month and clear functional impairment. Guilt cognitions centred on causal
responsibility are the most prominent feature.
Secondary: insomnia disorder, provisional, and increased alcohol use as a maintaining factor rather than
an independent condition at this stage.
Rule out: Adjustment Disorder with mixed anxiety and depressed mood, considered and judged less consistent
with the intrusion and avoidance profile.
The forearm injury is minor and healed. The worker's distress is not primarily an emotional reaction to
his own physical injury, it is a response to the event and to witnessing the injury to [COWORKER_1].

11. TREATMENT PLAN
Trauma-focused cognitive behavioural therapy, weekly, eight sessions in the authorized block with review
at session six. Sessions 1 to 2 psychoeducation, stabilisation and sleep intervention. Sessions 3 to 6
trauma processing with cognitive work on responsibility appraisal, which is the primary maintaining
cognition here. Sessions 6 to 8 graded in-vivo exposure to the worksite, coordinated with the employer,
moving from site perimeter to yard to bay. Alcohol monitored throughout with a reduction target agreed
with the worker. Sleep intervention delivered in session 2 with a view to reducing reliance on zopiclone,
coordinated with [GP_2] by letter. Care plan discussed with the worker in session and treatment goals
reaffirmed. Worker agreed with the plan and with the return-to-work approach.

12. BARRIERS TO RECOVERY AND RETURN TO WORK
Psychological: PTSD symptoms with avoidance of the workplace as a core feature, so return to work is both
the goal and part of the intervention.
Employment: the open investigation into the rigging failure, and the worker's belief that he bears causal
responsibility, which he holds despite his supervisor's written statement that he followed procedure and
no fault has been attributed. [COWORKER_1] remains off work, and the worker's guilt is anchored to that
fact.
Emotional reaction to physical injury: minor and not the primary driver.
Non-compensable: none identified.

13. NEXT APPOINTMENT
2026-06-09.

Synthetic record.`

const W4 = `LANDRY, C. | [ID_2] | Psychometric summary and collateral contact record | 2026-06-04 | SYNTHETIC TEST RECORD

[ORG_4]
PSYCHOMETRIC SUMMARY AND COLLATERAL CONTACT RECORD
File [ID_2]. 2026-06-04. [PSYCHOLOGIST_2], R.Psych.

1. MEASURES ADMINISTERED 2026-06-02
PCL-5      52   Above the provisional cut-off of 33. Symptom presentation consistent with PTSD.
PHQ-9      16   15 to 19, moderately severe. Item 9 endorsed at 0.
GAD-7      14   10 to 14, moderate.
ISI        21   15 to 21, moderate clinical insomnia.
AUDIT-C     5   At or above cut-off for men. Consistent with self-reported increase since the incident.
All measures are initial-status administrations. No prior administration exists for comparison. Repeat
scheduled at session four and session eight.

2. PCL-5 CLUSTER DETAIL
Highest item endorsements fall in the intrusion cluster and in the negative alterations cluster,
specifically blame of self and persistent negative emotional states. Lowest endorsements fall in the
amnesia and reckless behaviour items, both endorsed at zero.

3. COLLATERAL CONTACT, [CLAIM_OWNER_1], 2026-06-04, 11:20, 15 minutes
Case manager confirmed the authorized session block and the C-851 due date. Confirmed [COWORKER_1] remains
off work on a separate claim and that the rigging investigation findings are not available. Advised that
the employer has confirmed modified duties are available and that the employer is open to a graduated
schedule. Clinician advised that in this presentation, return to the worksite is a treatment component and
not only an outcome, and that a graduated return beginning away from the fabrication bay would be
therapeutic rather than merely accommodating. Case manager agreed and asked that this be stated in the
initial report.

4. COLLATERAL CONTACT, [SUPERVISOR_2] VIA [CLAIM_OWNER_1], NOTED 2026-06-04
Employer can offer tool crib and yard duties away from the fabrication bay, day shift only, with no
overhead crane involvement. Employer confirmed the position is held open. Worker's consent for contact
with the employer obtained in session 2026-06-02 and recorded in the file.

5. RETURN-TO-WORK DISCUSSION WITH THE WORKER, 2026-06-02
Worker stated he wants to return and is worried about the position being held. He was clear that he does
not feel able to enter the fabrication bay at present. He agreed to a graduated return beginning in the
yard and tool crib, four hours per day, three days per week, with progression tied to session-by-session
review rather than to a fixed calendar. He agreed to no overhead crane work and no return to the assembly
jig area during the initial phase. Worker is in agreement with these details.

6. ESTIMATED RETURN TO PRE-ACCIDENT WORK LEVEL
Estimated at 12 to 16 weeks from the start of treatment, giving a target of approximately 2026-09-28,
contingent on treatment response and on graded exposure to the worksite proceeding as planned. This
estimate should be revised at the session six review. Neither long-term restriction nor permanent
restriction is anticipated at this time.

Synthetic record.`

export const documentText = { W1, W2, W3, W4 }

export const docs = [
  {
    id: 'W1', title: 'WCB Alberta referral and treatment authorization', org: 'WCB Alberta',
    author: '[CLAIM_OWNER_1]', authorType: 'external', dateStart: '2026-05-20', pages: 1, text: W1,
    sections: [
      { anchor: '§1', label: '1. Claim identification', find: '1. CLAIM IDENTIFICATION' },
      { anchor: '§2', label: '2. Employer', find: '2. EMPLOYER' },
      { anchor: '§3', label: '3. Injury', find: '3. INJURY' },
      { anchor: '§4', label: '4. Time loss', find: '4. TIME LOSS' },
      { anchor: '§5', label: '5. Authorization', find: '5. AUTHORIZATION' },
      { anchor: '§6', label: '6. Case manager notes', find: '6. CASE MANAGER NOTES TO PROVIDER' },
      { anchor: '§header', label: 'Header', find: 'REFERRAL AND TREATMENT AUTHORIZATION' },
    ],
  },
  {
    id: 'W2', title: 'Employer incident report', org: '[EMPLOYER_2]',
    author: '[SUPERVISOR_2]', authorType: 'external', dateStart: '2026-04-23', pages: 1, text: W2,
    sections: [
      { anchor: '§1', label: '1. Event', find: '1. EVENT' },
      { anchor: '§2', label: '2. Description', find: '2. DESCRIPTION' },
      { anchor: '§3', label: '3. Injuries', find: '3. INJURIES' },
      { anchor: '§4', label: '4. Immediate actions', find: '4. IMMEDIATE ACTIONS' },
      { anchor: '§5', label: '5. Witness statements', find: '5. WITNESS STATEMENTS' },
      { anchor: '§6', label: '6. Supervisor comment', find: '6. SUPERVISOR COMMENT' },
    ],
  },
  {
    id: 'W3', title: 'Initial counselling session record, session 1', org: '[ORG_4]',
    author: '[PSYCHOLOGIST_2]', authorType: 'clinician', dateStart: '2026-06-02', pages: 2, text: W3,
    sections: [
      { anchor: '§header', label: 'Header', find: 'INITIAL COUNSELLING SESSION RECORD' },
      { anchor: '§1', label: '1. Referral and consent', find: '1. REFERRAL AND CONSENT' },
      { anchor: '§2', label: '2. Worker account of the event', find: '2. WORKER ACCOUNT OF THE EVENT' },
      { anchor: '§3', label: '3. Symptoms reported', find: '3. SYMPTOMS REPORTED, PAST MONTH' },
      { anchor: '§4', label: '4. Work history and current status', find: '4. WORK HISTORY AND CURRENT STATUS' },
      { anchor: '§5', label: '5. Prior mental health', find: '5. PRIOR MENTAL HEALTH' },
      { anchor: '§6', label: '6. Medication', find: '6. MEDICATION' },
      { anchor: '§7', label: '7. Substance use', find: '7. SUBSTANCE USE' },
      { anchor: '§8', label: '8. Mental status', find: '8. MENTAL STATUS' },
      { anchor: '§9', label: '9. Risk', find: '9. RISK' },
      { anchor: '§10', label: '10. Clinical impression', find: '10. CLINICAL IMPRESSION' },
      { anchor: '§11', label: '11. Treatment plan', find: '11. TREATMENT PLAN' },
      { anchor: '§12', label: '12. Barriers to recovery and return to work', find: '12. BARRIERS TO RECOVERY AND RETURN TO WORK' },
      { anchor: '§13', label: '13. Next appointment', find: '13. NEXT APPOINTMENT' },
    ],
  },
  {
    id: 'W4', title: 'Psychometric summary and collateral contact record', org: '[ORG_4]',
    author: '[PSYCHOLOGIST_2]', authorType: 'clinician', dateStart: '2026-06-04', pages: 1, text: W4,
    sections: [
      { anchor: '§1', label: '1. Measures administered', find: '1. MEASURES ADMINISTERED 2026-06-02' },
      { anchor: '§2', label: '2. PCL-5 cluster detail', find: '2. PCL-5 CLUSTER DETAIL' },
      { anchor: '§3', label: '3. Collateral contact, case manager', find: '3. COLLATERAL CONTACT, [CLAIM_OWNER_1]' },
      { anchor: '§4', label: '4. Collateral contact, employer', find: '4. COLLATERAL CONTACT, [SUPERVISOR_2]' },
      { anchor: '§5', label: '5. Return-to-work discussion', find: '5. RETURN-TO-WORK DISCUSSION WITH THE WORKER' },
      { anchor: '§6', label: '6. Estimated return to pre-accident level', find: '6. ESTIMATED RETURN TO PRE-ACCIDENT WORK LEVEL' },
    ],
  },
]

export const docsById = Object.fromEntries(docs.map((d) => [d.id, d]))
