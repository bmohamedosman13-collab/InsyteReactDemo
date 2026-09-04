/**
 * Original text and entity spans for [CLIENT_2], de-tokenised from the corpus.
 *
 * Generated, do not hand-edit. Regenerate with scratchpad/redact/emit_spans.py
 */

export const redactionSpans = {
 "W1": {
  "original": "LANDRY, C. | NPS-2026-1188 | WCB Alberta referral and treatment authorization | 2026-05-20 | SYNTHETIC TEST RECORD\n\nWORKERS' COMPENSATION BOARD ALBERTA\nREFERRAL AND TREATMENT AUTHORIZATION\nIssued by M. Sandoval-Reyes, Case Manager. Addressed to D. Marchetti-Okafor, R.Psych #5218 at Northbridge Psychological Services.\n\n1. CLAIM IDENTIFICATION\nWorker: Curtis J. Landry. Date of birth 1988-02-11. Claim number WCB-2026-441907. Personal health number 63140-8827.\nAddress 9317 - 74 Avenue, Fort Saskatchewan, AB T8L 2C4. Telephone 780-555-0413.\n\n2. EMPLOYER\nSturgeon Fabrication and Steel Ltd., Fort Saskatchewan, Alberta. Worker occupation: welder-fabricator, Red Seal certified,\nemployed at this site since 2019-03-04.\n\n3. INJURY\nDate of accident 2026-04-23. Physical injury accepted 2026-04-29: contusion and laceration to the left\nforearm, treated same day at an urgent care clinic, sutures removed 2026-05-04, no time loss attributed\nto the physical injury. Psychological injury accepted as a secondary condition 2026-05-15 following\nreview of the treating physician's report of 2026-05-11.\n\n4. TIME LOSS\nWorker has been off work since 2026-05-11 on the psychological condition. No time loss on the physical\ninjury.\n\n5. AUTHORIZATION\nAuthorized for psychological assessment and treatment, initial block of eight sessions plus one\nassessment session. Initial report on form C-851 required within seven business days of the initial\ncounselling session. Progress report on form C-852 due at session six or eight weeks, whichever is\nearlier.\n\n6. CASE MANAGER NOTES TO PROVIDER\nEmployer has confirmed availability of modified duties. Worker has expressed reluctance to return to the\nfabrication bay. Please address return-to-work planning in your initial report and identify any barriers.\nDevon Pritchard remains off work on a separate accepted claim. An investigation into the rigging failure is\nopen and its findings are not available to this office.\n\nSynthetic record, not a real claim.",
  "spans": [
   {
    "start": 0,
    "end": 10,
    "surface": "LANDRY, C.",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W1-s0"
   },
   {
    "start": 13,
    "end": 26,
    "surface": "NPS-2026-1188",
    "token": "ID_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W1-s1"
   },
   {
    "start": 199,
    "end": 216,
    "surface": "M. Sandoval-Reyes",
    "token": "CLAIM_OWNER_1",
    "cls": "Person",
    "src": "Pattern rule",
    "id": "W1-s2"
   },
   {
    "start": 245,
    "end": 279,
    "surface": "D. Marchetti-Okafor, R.Psych #5218",
    "token": "PSYCHOLOGIST_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W1-s3"
   },
   {
    "start": 283,
    "end": 317,
    "surface": "Northbridge Psychological Services",
    "token": "ORG_4",
    "cls": "Organization",
    "src": "NER model",
    "id": "W1-s4"
   },
   {
    "start": 352,
    "end": 368,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W1-s5"
   },
   {
    "start": 384,
    "end": 394,
    "surface": "1988-02-11",
    "token": "DOB_2",
    "cls": "Date",
    "src": "Presidio recognizer",
    "id": "W1-s6"
   },
   {
    "start": 409,
    "end": 424,
    "surface": "WCB-2026-441907",
    "token": "CLAIM_1",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W1-s7"
   },
   {
    "start": 449,
    "end": 459,
    "surface": "63140-8827",
    "token": "PHN_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W1-s8"
   },
   {
    "start": 469,
    "end": 516,
    "surface": "9317 - 74 Avenue, Fort Saskatchewan, AB T8L 2C4",
    "token": "ADDRESS_2",
    "cls": "Location",
    "src": "Presidio recognizer",
    "id": "W1-s9"
   },
   {
    "start": 528,
    "end": 540,
    "surface": "780-555-0413",
    "token": "PHONE_5",
    "cls": "Contact",
    "src": "Pattern rule",
    "id": "W1-s10"
   },
   {
    "start": 555,
    "end": 590,
    "surface": "Sturgeon Fabrication and Steel Ltd.",
    "token": "EMPLOYER_2",
    "cls": "Organization",
    "src": "NER model",
    "id": "W1-s11"
   },
   {
    "start": 592,
    "end": 609,
    "surface": "Fort Saskatchewan",
    "token": "ADDRESS_2",
    "cls": "Location",
    "src": "Presidio recognizer",
    "id": "W1-s12"
   },
   {
    "start": 706,
    "end": 716,
    "surface": "2019-03-04",
    "token": "DOB_2",
    "cls": "Date",
    "src": "Presidio recognizer",
    "id": "W1-s13"
   },
   {
    "start": 1786,
    "end": 1801,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W1-s14"
   }
  ]
 },
 "W2": {
  "original": "Sturgeon Fabrication and Steel Ltd. | Incident report | 2026-04-23 | SYNTHETIC TEST RECORD\n\nEMPLOYER INCIDENT REPORT\nCompleted by Wes Kowalchuk, shop supervisor. 2026-04-23, 16:40. Attached to the WCB referral package.\n\n1. EVENT\nDate and time 2026-04-23, approximately 14:15. Location: main fabrication bay, overhead crane lift zone.\nWeather and lighting not a factor, interior work.\n\n2. DESCRIPTION\nA steel beam section of approximately 900 kg was being moved by overhead crane from the cutting table to\nthe assembly jig. Curtis J. Landry was acting as designated spotter and had called the lift. At approximately\ntwo metres of height a rigging strap failed at the eye and the load dropped. Devon Pritchard, working at the\nassembly jig, was struck on the lower left leg by the falling section. Curtis J. Landry, standing approximately\n1.5 metres from the load, was struck on the left forearm by a piece of displaced dunnage and was knocked\nto the floor.\n\n3. INJURIES\nDevon Pritchard: open fracture, lower left leg. Transported by ambulance at 14:31. Off work.\nCurtis J. Landry: laceration and contusion, left forearm. Transported by a coworker to urgent care at 15:05.\nSutured. Returned to work 2026-04-27.\n\n4. IMMEDIATE ACTIONS\nBay cleared and secured at 14:22. Crane locked out. Rigging equipment quarantined. Occupational Health\nand Safety notified 14:55. Internal investigation opened. All lifts suspended pending strap inspection\nacross the site.\n\n5. WITNESS STATEMENTS\nThree witnesses recorded. Curtis J. Landry provided a statement on 2026-04-27 on return to work.\n\n6. SUPERVISOR COMMENT\nCurtis J. Landry followed lift procedure as written. The strap in use was within its inspection date. The\nfailure is under investigation and no fault has been attributed to any worker.\n\nSynthetic record.",
  "spans": [
   {
    "start": 0,
    "end": 35,
    "surface": "Sturgeon Fabrication and Steel Ltd.",
    "token": "EMPLOYER_2",
    "cls": "Organization",
    "src": "NER model",
    "id": "W2-s0"
   },
   {
    "start": 130,
    "end": 143,
    "surface": "Wes Kowalchuk",
    "token": "SUPERVISOR_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s1"
   },
   {
    "start": 523,
    "end": 539,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s2"
   },
   {
    "start": 692,
    "end": 707,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s3"
   },
   {
    "start": 795,
    "end": 811,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s4"
   },
   {
    "start": 968,
    "end": 983,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s5"
   },
   {
    "start": 1061,
    "end": 1077,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s6"
   },
   {
    "start": 1502,
    "end": 1518,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s7"
   },
   {
    "start": 1596,
    "end": 1612,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W2-s8"
   }
  ]
 },
 "W3": {
  "original": "LANDRY, C. | NPS-2026-1188 | Initial counselling session record | 2026-06-02 | SYNTHETIC TEST RECORD\n\nNorthbridge Psychological Services\nINITIAL COUNSELLING SESSION RECORD\nFile NPS-2026-1188. Session 1 of authorized block. 2026-06-02, 60 minutes, in person.\nD. Marchetti-Okafor, R.Psych #5218, R.Psych.\n\n1. REFERRAL AND CONSENT\nReferred by WCB Alberta under claim WCB-2026-441907, authorization dated 2026-05-20. Limits of confidentiality\nexplained, including that reports are provided to WCB and may be examined by any person with a direct\ninterest in the claim under review. Worker acknowledged and consented in writing 2026-06-02. Service\ndelivered in person.\n\n2. WORKER ACCOUNT OF THE EVENT\nCurtis J. Landry described the incident of 2026-04-23 in a flat, factual register with several pauses. He was\nthe designated spotter and had called the lift. He described hearing the strap go, seeing the load drop,\nand being on the floor before he understood what had happened. He described reaching Devon Pritchard and\napplying pressure to the leg until paramedics arrived. He repeated three times during the session that he\ncalled the lift.\n\n3. SYMPTOMS REPORTED, PAST MONTH\nIntrusive re-experiencing: daily, triggered most reliably by metal-on-metal sound. Reports the sound of a\ndropped tool at home produced a full startle response and 20 minutes of shaking.\nNightmares: four to five nights weekly, content described as the same few seconds repeating.\nAvoidance: has not entered the fabrication bay since 2026-04-27 and drives a route that avoids the site.\nDeclines to discuss the incident with coworkers, has not answered calls from two of them.\nNegative alterations in cognition and mood: persistent guilt centred on having called the lift, described\nas \"I said go.\" Reports loss of interest in activities including hockey with his brother-in-law, which he\nhas not attended since April. Describes feeling detached from Alanna Landry.\nArousal: hypervigilance to overhead noise, exaggerated startle, sleep onset and maintenance difficulty\naveraging four hours nightly, irritability with reported snapping at Alanna Landry and at his daughter,\nconcentration difficulty.\nDuration: symptoms present since the week following the incident, worsening from approximately\n2026-05-06, continuous for six weeks at assessment.\n\n4. WORK HISTORY AND CURRENT STATUS\nWelder-fabricator, Red Seal, at Sturgeon Fabrication and Steel Ltd. since 2019. No prior WCB claims. Returned to work 2026-04-27\non light duties for the forearm and worked ten days. Reports that during those ten days he was \"not right\non the floor\" and twice left the bay during a lift. Off work since 2026-05-11 following an appointment\nwith R. Thibodeau, MD CCFP. Reports that he wants to work and does not want to be off.\n\n5. PRIOR MENTAL HEALTH\nOne prior episode. In 2019, following a marital separation, Curtis J. Landry attended six sessions of\ncounselling through his employer's assistance program for what he describes as situational anxiety. No\nmedication, no psychiatric involvement, no time loss from work. Resolved and no recurrence until the\ncurrent presentation. No history of trauma-related presentation. No family psychiatric history known to\nhim.\n\n6. MEDICATION\nZopiclone 5 mg as needed at bedtime, prescribed by R. Thibodeau, MD CCFP on 2026-05-19, reports using it four to five\nnights weekly. No antidepressant prescribed. No other prescription medication. No known drug allergies.\n\n7. SUBSTANCE USE\nAlcohol, self-reported at approximately four standard drinks weekly before the incident and approximately\nten weekly since, concentrated in the evening and described by the worker as being for sleep. He raised\nthis himself. No cannabis, no other substance use. Discussed in session as a maintaining factor for both\nsleep disruption and arousal symptoms, and as a target for early intervention. Worker agreed to record\nintake for two weeks. No indication of dependence at this time. No withdrawal history.\n\n8. MENTAL STATUS\nAppearance neat, dressed for weather. Cooperative and forthcoming. Psychomotor activity mildly increased,\nscanning the room twice when a door closed elsewhere in the building. Speech normal in rate and volume,\nreduced during the account of the event. Mood described as \"wound up.\" Affect anxious, congruent,\nconstricted during trauma content. Thought process linear. No perceptual disturbance. No delusional\ncontent. Cognition grossly intact, mild attentional inefficiency evident. Insight good. Judgment intact.\n\n9. RISK\nSuicide risk screened directly. Denies current or past suicidal ideation, plan, intent or preparatory\nbehaviour. Denies self-harm history. Denies homicidal ideation. No access-to-means concern identified.\nRisk assessed as low. Risk factors present: sleep deprivation, increased alcohol use, guilt cognitions,\noccupational disruption, social withdrawal. Protective factors present: engaged partner, intact employment\nrelationship with modified duties available, strong stated motivation to return to work, no history of\nself-harm or ideation, help-seeking, no substance dependence. Risk management plan: risk re-screened at\nevery session; worker provided with the practice number, Health Link 811 and the Access 24/7 number, and\nadvised to attend emergency without delay if his situation changes; Alanna Landry identified by the worker as\nhis first contact with his consent. To be reviewed at each session and on any change in alcohol use or\nsleep.\n\n10. CLINICAL IMPRESSION\nPosttraumatic Stress Disorder (F43.1), provisional, arising from a workplace accident of 2026-04-23 in\nwhich the worker was directly exposed to a life-threatening event and witnessed serious injury to a\ncoworker. Criteria met for intrusion, avoidance, negative alterations in cognition and mood, and arousal,\nwith duration exceeding one month and clear functional impairment. Guilt cognitions centred on causal\nresponsibility are the most prominent feature.\nSecondary: insomnia disorder, provisional, and increased alcohol use as a maintaining factor rather than\nan independent condition at this stage.\nRule out: Adjustment Disorder with mixed anxiety and depressed mood, considered and judged less consistent\nwith the intrusion and avoidance profile.\nThe forearm injury is minor and healed. The worker's distress is not primarily an emotional reaction to\nhis own physical injury, it is a response to the event and to witnessing the injury to Devon Pritchard.\n\n11. TREATMENT PLAN\nTrauma-focused cognitive behavioural therapy, weekly, eight sessions in the authorized block with review\nat session six. Sessions 1 to 2 psychoeducation, stabilisation and sleep intervention. Sessions 3 to 6\ntrauma processing with cognitive work on responsibility appraisal, which is the primary maintaining\ncognition here. Sessions 6 to 8 graded in-vivo exposure to the worksite, coordinated with the employer,\nmoving from site perimeter to yard to bay. Alcohol monitored throughout with a reduction target agreed\nwith the worker. Sleep intervention delivered in session 2 with a view to reducing reliance on zopiclone,\ncoordinated with R. Thibodeau, MD CCFP by letter. Care plan discussed with the worker in session and treatment goals\nreaffirmed. Worker agreed with the plan and with the return-to-work approach.\n\n12. BARRIERS TO RECOVERY AND RETURN TO WORK\nPsychological: PTSD symptoms with avoidance of the workplace as a core feature, so return to work is both\nthe goal and part of the intervention.\nEmployment: the open investigation into the rigging failure, and the worker's belief that he bears causal\nresponsibility, which he holds despite his supervisor's written statement that he followed procedure and\nno fault has been attributed. Devon Pritchard remains off work, and the worker's guilt is anchored to that\nfact.\nEmotional reaction to physical injury: minor and not the primary driver.\nNon-compensable: none identified.\n\n13. NEXT APPOINTMENT\n2026-06-09.\n\nSynthetic record.",
  "spans": [
   {
    "start": 0,
    "end": 10,
    "surface": "LANDRY, C.",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s0"
   },
   {
    "start": 13,
    "end": 26,
    "surface": "NPS-2026-1188",
    "token": "ID_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W3-s1"
   },
   {
    "start": 102,
    "end": 136,
    "surface": "Northbridge Psychological Services",
    "token": "ORG_4",
    "cls": "Organization",
    "src": "NER model",
    "id": "W3-s2"
   },
   {
    "start": 177,
    "end": 190,
    "surface": "NPS-2026-1188",
    "token": "ID_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W3-s3"
   },
   {
    "start": 258,
    "end": 292,
    "surface": "D. Marchetti-Okafor, R.Psych #5218",
    "token": "PSYCHOLOGIST_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s4"
   },
   {
    "start": 364,
    "end": 379,
    "surface": "WCB-2026-441907",
    "token": "CLAIM_1",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W3-s5"
   },
   {
    "start": 695,
    "end": 711,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s6"
   },
   {
    "start": 995,
    "end": 1010,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s7"
   },
   {
    "start": 1921,
    "end": 1934,
    "surface": "Alanna Landry",
    "token": "SPOUSE_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s8"
   },
   {
    "start": 2108,
    "end": 2121,
    "surface": "Alanna Landry",
    "token": "SPOUSE_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s9"
   },
   {
    "start": 2384,
    "end": 2419,
    "surface": "Sturgeon Fabrication and Steel Ltd.",
    "token": "EMPLOYER_2",
    "cls": "Organization",
    "src": "NER model",
    "id": "W3-s10"
   },
   {
    "start": 2695,
    "end": 2716,
    "surface": "R. Thibodeau, MD CCFP",
    "token": "GP_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s11"
   },
   {
    "start": 2861,
    "end": 2877,
    "surface": "Curtis J. Landry",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s12"
   },
   {
    "start": 3282,
    "end": 3303,
    "surface": "R. Thibodeau, MD CCFP",
    "token": "GP_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s13"
   },
   {
    "start": 5196,
    "end": 5211,
    "surface": "Health Link 811",
    "token": "CRISIS_LINE_3",
    "cls": "Contact",
    "src": "NER model",
    "over": true,
    "why": "Public health line, Alberta.",
    "id": "W3-s14"
   },
   {
    "start": 5220,
    "end": 5231,
    "surface": "Access 24/7",
    "token": "CRISIS_LINE_1",
    "cls": "Contact",
    "src": "NER model",
    "over": true,
    "why": "Public crisis line named in the risk management plan.",
    "id": "W3-s15"
   },
   {
    "start": 5312,
    "end": 5325,
    "surface": "Alanna Landry",
    "token": "SPOUSE_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s16"
   },
   {
    "start": 6432,
    "end": 6447,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s17"
   },
   {
    "start": 7107,
    "end": 7128,
    "surface": "R. Thibodeau, MD CCFP",
    "token": "GP_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s18"
   },
   {
    "start": 7716,
    "end": 7731,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W3-s19"
   }
  ]
 },
 "W4": {
  "original": "LANDRY, C. | NPS-2026-1188 | Psychometric summary and collateral contact record | 2026-06-04 | SYNTHETIC TEST RECORD\n\nNorthbridge Psychological Services\nPSYCHOMETRIC SUMMARY AND COLLATERAL CONTACT RECORD\nFile NPS-2026-1188. 2026-06-04. D. Marchetti-Okafor, R.Psych #5218, R.Psych.\n\n1. MEASURES ADMINISTERED 2026-06-02\nPCL-5      52   Above the provisional cut-off of 33. Symptom presentation consistent with PTSD.\nPHQ-9      16   15 to 19, moderately severe. Item 9 endorsed at 0.\nGAD-7      14   10 to 14, moderate.\nISI        21   15 to 21, moderate clinical insomnia.\nAUDIT-C     5   At or above cut-off for men. Consistent with self-reported increase since the incident.\nAll measures are initial-status administrations. No prior administration exists for comparison. Repeat\nscheduled at session four and session eight.\n\n2. PCL-5 CLUSTER DETAIL\nHighest item endorsements fall in the intrusion cluster and in the negative alterations cluster,\nspecifically blame of self and persistent negative emotional states. Lowest endorsements fall in the\namnesia and reckless behaviour items, both endorsed at zero.\n\n3. COLLATERAL CONTACT, M. Sandoval-Reyes, 2026-06-04, 11:20, 15 minutes\nCase manager confirmed the authorized session block and the C-851 due date. Confirmed Devon Pritchard remains\noff work on a separate claim and that the rigging investigation findings are not available. Advised that\nthe employer has confirmed modified duties are available and that the employer is open to a graduated\nschedule. Clinician advised that in this presentation, return to the worksite is a treatment component and\nnot only an outcome, and that a graduated return beginning away from the fabrication bay would be\ntherapeutic rather than merely accommodating. Case manager agreed and asked that this be stated in the\ninitial report.\n\n4. COLLATERAL CONTACT, Wes Kowalchuk VIA M. Sandoval-Reyes, NOTED 2026-06-04\nEmployer can offer tool crib and yard duties away from the fabrication bay, day shift only, with no\noverhead crane involvement. Employer confirmed the position is held open. Worker's consent for contact\nwith the employer obtained in session 2026-06-02 and recorded in the file.\n\n5. RETURN-TO-WORK DISCUSSION WITH THE WORKER, 2026-06-02\nWorker stated he wants to return and is worried about the position being held. He was clear that he does\nnot feel able to enter the fabrication bay at present. He agreed to a graduated return beginning in the\nyard and tool crib, four hours per day, three days per week, with progression tied to session-by-session\nreview rather than to a fixed calendar. He agreed to no overhead crane work and no return to the assembly\njig area during the initial phase. Worker is in agreement with these details.\n\n6. ESTIMATED RETURN TO PRE-ACCIDENT WORK LEVEL\nEstimated at 12 to 16 weeks from the start of treatment, giving a target of approximately 2026-09-28,\ncontingent on treatment response and on graded exposure to the worksite proceeding as planned. This\nestimate should be revised at the session six review. Neither long-term restriction nor permanent\nrestriction is anticipated at this time.\n\nSynthetic record.",
  "spans": [
   {
    "start": 0,
    "end": 10,
    "surface": "LANDRY, C.",
    "token": "CLIENT_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W4-s0"
   },
   {
    "start": 13,
    "end": 26,
    "surface": "NPS-2026-1188",
    "token": "ID_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W4-s1"
   },
   {
    "start": 118,
    "end": 152,
    "surface": "Northbridge Psychological Services",
    "token": "ORG_4",
    "cls": "Organization",
    "src": "NER model",
    "id": "W4-s2"
   },
   {
    "start": 209,
    "end": 222,
    "surface": "NPS-2026-1188",
    "token": "ID_2",
    "cls": "Identifier",
    "src": "Pattern rule",
    "id": "W4-s3"
   },
   {
    "start": 236,
    "end": 270,
    "surface": "D. Marchetti-Okafor, R.Psych #5218",
    "token": "PSYCHOLOGIST_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W4-s4"
   },
   {
    "start": 1131,
    "end": 1148,
    "surface": "M. Sandoval-Reyes",
    "token": "CLAIM_OWNER_1",
    "cls": "Person",
    "src": "Pattern rule",
    "id": "W4-s5"
   },
   {
    "start": 1266,
    "end": 1281,
    "surface": "Devon Pritchard",
    "token": "COWORKER_1",
    "cls": "Person",
    "src": "NER model",
    "id": "W4-s6"
   },
   {
    "start": 1845,
    "end": 1858,
    "surface": "Wes Kowalchuk",
    "token": "SUPERVISOR_2",
    "cls": "Person",
    "src": "NER model",
    "id": "W4-s7"
   },
   {
    "start": 1863,
    "end": 1880,
    "surface": "M. Sandoval-Reyes",
    "token": "CLAIM_OWNER_1",
    "cls": "Person",
    "src": "Pattern rule",
    "id": "W4-s8"
   }
  ]
 }
}
