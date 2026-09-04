import { docs, docsById } from './documentText.js'
import { redactionSpans } from './redactionSpans.js'

/**
 * Org analysis fixtures. From INSYTE_DEMO_ORG_FIXTURES.md.
 * Buttons confirmed as Patterns, Outcomes & Trends, Service Gaps,
 * Risk & Compliance. No Timeline on the org side.
 *
 * The grant export is renamed from the real SBCC form to a fictional
 * Community Capacity and Equity Fund, per the revisions pass. Layout, field
 * set and the never-auto-fill attestation rule are unchanged.
 */

const summary = {
  header: 'Document summary',
  subhead: 'Generated from 15 documents · 3,102 sentences tagged · no click required',
  body: `Fifteen documents cover one fiscal year at [ORG_1], from 2025-04-01 to 2026-03-31, with prior-year comparators throughout. Eleven are staff-written, two are board minutes, one is a finance record, and one is written by external parties.

The organisation delivered four programs to 612 unique youth in walk-in counselling, 214 youth in school groups, 148 youth in one-to-one navigation, and 41 caregivers in a pilot. Revenue was $1,294,900 against expenditure of $1,288,200, a surplus of $6,700 [[06 §1]] [[06 §2]].

The documents describe one year in which demand rose sharply and capacity did not. Walk-in contacts rose 41 percent and navigation referrals rose 77 percent, while staffing measured in full-time equivalents was unchanged in every program [[02 §2]] [[04 §2]] [[12 §1]]. Group program delivery fell 31 percent over the same period [[03 §2]].

Three items appear in more than five documents each and are treated as the central threads of this record: the shortage of enclosed counselling space, the gap between where demand is growing and where expenditure sits, and the inability to evidence outcomes in the largest program.

Six governance or compliance items are open or partially open at year end. Two have been open for more than six months.

Total unique individuals served across all four programs is not derivable from these documents, because the programs do not share a participant identifier. Any figure combining them would be an estimate.`,
  mandatoryReview:
    'COMPLIANCE AND RISK REVIEW REQUIRED. This summary reflects the documents as written. It is not an audit finding, an investigation, or a legal opinion.',
}

const patterns = {
  module: 'patterns',
  header: 'Patterns across 15 documents',
  findings: [
    { id: 'o-p1', confidence: 'High', heading: 'Demand moved to one-to-one. The money stayed with groups.', body: `Walk-in contacts rose from 854 to 1,204, up 41 percent [[02 §2]]. Navigation referrals rose from 121 to 214, up 77 percent [[04 §2]]. Group programs delivered 18 sessions against 26 the prior year, down 31 percent, with six cancelled for under-enrolment [[03 §2]] [[03 §3]]. Expenditure did not follow: the group program holds 34 percent of program spend and navigation holds 19 percent [[06 §3]]. The Director of Programs states the connection directly in November, that the cancelled groups and the waiting list contain the same young people [[10 §2]]. School partners at three of five sites report youth asking to be referred to walk-in rather than join a group [[03 §4]].` },
    { id: 'o-p2', confidence: 'High', heading: 'Turnover concentrates where the working conditions are worst.', body: `Three of four departures in the year were walk-in counsellors, giving that team 50 percent turnover against 21 percent organisation-wide [[12 §2]]. All three exit interviews named unpredictable daily demand and the absence of consistent private space, and two of three stated they were not leaving because of the team or management [[12 §3]]. Both conditions are documented independently: 61 percent of walk-in demand arrives in two afternoons [[02 §3]], and two enclosed rooms serve ten client-facing staff [[14 §2]]. Time to fill the vacancies was 11 and 14 weeks, with one post vacant for a full month [[12 §4]].` },
    { id: 'o-p3', confidence: 'High', heading: 'The same service is counted three ways and all three numbers are published.', body: `Walk-in volume appears as 1,204 in the annual program report [[02 §2]], 1,180 in the funder report [[07 §3]], and 1,247 in the unit cost calculation [[06 §4]]. Navigation appears as 148 and as 151 [[11 §3]]. The cause is definitional rather than error: the intake spreadsheet counts contacts with a completed intake form, day sheets count every young person a counsellor sat with including those who gave no name, and billing counts sessions [[11 §2]]. The organisation is, in its Director's words, reporting a service it does not fully count. A single counting definition per metric was approved for the coming year [[11 §4]] [[11 §5]].` },
    { id: 'o-p4', confidence: 'High', heading: 'Quarterly reporting costs about a staff week and appears in no budget line.', body: `One quarterly report took 31 staff hours across four people in the nine days before submission, with attendance data reconciled by hand from three separate sources [[07 §5]]. The Executive Director identifies this as the largest administrative cost the organisation does not have a line for [[11 §5]]. The report was submitted three days after the deadline. The organisation produces four of these per year for one funder alone.` },
    { id: 'o-p5', confidence: 'High', heading: 'Evidence quality runs opposite to demand.', body: `Post-measure completion is 78 percent in the group program, 64 percent in navigation, and 22 percent in walk-in [[03 §5]] [[04 §6]] [[02 §5]]. The group program is the smallest of the three by participants and the only one falling. The clinical lead states the cause rather than the symptom: a single-session model has no exit point at which a post-measure is owed, and the 22 percent who reply to a follow-up text are self-selected [[02 §6]]. The Executive Director draws the operational consequence in November, that moving money toward demand would improve service and weaken reporting at the same time, and that reporting is what renews the money [[10 §3]].` },
    { id: 'o-p6', confidence: 'Moderate', heading: 'Two unit costs fell and neither fall is an efficiency.', body: `Cost per walk-in contact fell 21 percent and cost per navigation youth fell 23 percent [[06 §3]]. Both program reports state the cause is rising volume against unchanged staffing rather than any gain in efficiency, and both warn against reporting it as one [[02 §9]] [[04 §7]]. The financial summary presents both figures without that qualification [[06 §3]]. Over the same period mean wait for navigation rose from 3.2 days to 11.6 [[04 §2]].` },
    { id: 'o-p7', confidence: 'High', heading: 'Three governance items raised together in September took three different paths.', body: `The facility assessment, the waitlist policy and the on-call protocol were all raised or referred at the September board meeting [[08 §5]] [[08 §6]] [[08 §7]]. By February the facility assessment was complete with an estimate and landlord consent in hand [[09 §2]], the waitlist policy had been deferred twice while the waitlist rose from 26 to 34, and the on-call protocol remained open [[13 §3]]. One director recorded a concern that an item had been deferred twice while the number underneath it rose [[09 §2]].` },
    { id: 'o-p8', confidence: 'High', heading: 'The population changed and the language capacity did not.', body: `Newcomer youth rose from 38 percent to 61 percent of the navigation caseload [[04 §4]]. Interpretation was requested for 63 of 148 youth in five languages, and the organisation can deliver service directly in one of them [[04 §5]]. Interpretation ran to $17,000 against a $5,000 budget, 240 percent over, absorbed from unrestricted donations [[06 §2]] [[08 §4]]. Nine youth were served with a family member interpreting, recorded by the program itself as a practice to stop [[04 §5]]. Caregivers independently asked whether the pilot could run in Tigrinya or Somali [[05 §5]].` },
  ],
}

const outcomes = {
  module: 'outcomes',
  header: 'Outcomes and trends',
  subhead: '4 programs · 1 shared measure · FY2025-26 against FY2024-25',
  findings: [
    { id: 'o-o1', heading: 'The wellbeing change is the same everywhere. What differs is who gets measured.', body: `Mean change on the five-item wellbeing measure is +3.8 in walk-in, +4.4 in groups, and +3.9 in navigation [[02 §5]] [[03 §5]] [[04 §6]]. Those three numbers sit within 0.6 points of each other. Post-measure completion, by contrast, ranges from 22 percent to 78 percent. On this record the programs do not differ meaningfully in effect. They differ in whether the effect can be shown.` },
    { id: 'o-o2', heading: "The group program's outcomes are stable across three years while its delivery falls.", body: `Mean change was +4.3 in FY2024-25 and +4.4 in FY2025-26, and the share of participants improving by three or more points rose from 71 to 73 percent [[03 §5]]. Over the same two years delivered groups fell from 26 to 18 and enrolment fell from 297 to 214 [[03 §2]]. The program is not getting worse. It is getting smaller.` },
    { id: 'o-o3', heading: 'Waiting is an outcome variable.', body: `Young people who dropped off the navigation waitlist before a first contact had waited a mean of 14.1 days. Those who reached a first contact had waited 9.8 [[04 §3]]. Forty-seven referrals closed without any contact, 22 percent of all referrals received, against 7 percent the prior year [[04 §2]]. The team lead states the consequence: the wait is doing the selecting, and it selects against the young people hardest to reach [[10 §4]].` },
    { id: 'o-o4', heading: 'One program has satisfaction data and no outcome data at all.', body: `The caregiver pilot recorded a mean satisfaction score of 27.4 of 32 across 41 attendees. No outcome measure was administered to caregivers and none to the young people whose caregivers attended, because the evaluation framework was not finalised before delivery began [[05 §4]]. The pilot is also functioning as a referral pathway that was never a design goal and was never measured, with seven of nine unattached caregivers subsequently referring a young person in [[05 §3]].` },
    { id: 'o-o5', heading: 'The funder targets assume a program shape the organisation mostly no longer delivers.', body: `The Q2 contract required 145 post-measures and recorded 78 [[07 §1]]. The organisation's explanation is structural rather than performance-related: most contacts that quarter were single-session walk-ins with no exit point [[07 §2]]. The coordinator acknowledged the point, asked for it in writing rather than by telephone in future, and advised that the target cannot be varied mid-agreement [[07 §4]]. Three of six contracted outputs were exceeded and three were not met, and all three misses sit in group delivery and post-measurement [[07 §1]].` },
    { id: 'o-o6', heading: 'Three numbers, one story.', body: `Demand up 41 percent. Full-time equivalents unchanged in every program. Mean wait up 263 percent. [[02 §2]] [[04 §2]] [[12 §1]]` },
  ],
  table: {
    columns: ['Measure', 'FY2024-25', 'FY2025-26', 'Change', 'Source'],
    rows: [
      ['Walk-in contacts', '854', '1,204', '+41.0%', '[[02 §2]]'],
      ['Walk-in unique youth', '476', '612', '+28.6%', '[[02 §2]]'],
      ['Groups delivered', '26', '18', '-30.8%', '[[03 §2]]'],
      ['Group enrolment', '297', '214', '-27.9%', '[[03 §2]]'],
      ['Navigation youth served', '96', '148', '+54.2%', '[[04 §2]]'],
      ['Navigation referrals', '121', '214', '+76.9%', '[[04 §2]]'],
      ['Waitlist at year end', '11', '34', '+209%', '[[04 §2]]'],
      ['Mean days to first contact', '3.2', '11.6', '+263%', '[[04 §2]]'],
      ['Referrals closing with no contact', '7%', '22%', '+15 pts', '[[04 §2]]'],
      ['Total FTE', '14.2', '14.2', 'no change', '[[12 §1]]'],
      ['Staff turnover', 'not stated', '21%', '', '[[12 §2]]'],
      ['Revenue', '$1,201,400', '$1,294,900', '+7.8%', '[[06 §1]]'],
      ['Unrestricted share of revenue', '21.0%', '19.2%', '-1.8 pts', '[[06 §1]]'],
      ['Operating reserve, months', 'not stated', '2.4', 'policy 3.0', '[[06 §4]]'],
    ],
  },
  footer:
    'Walk-in contacts are reported here on the annual program report definition. Two other definitions are in use. See Patterns, finding 3.',
}

const gaps = {
  module: 'gaps',
  header: 'Service gaps',
  subhead: 'Where demand is documented and service is not',
  findings: [
    { id: 'o-g1', heading: 'Gap 1. Ages 12 to 14 have no follow-on.', body: `This age band is 27 percent of walk-in contacts, up from 19 percent [[02 §4]]. The group program runs in senior high settings and navigation takes referrals from age 16, so a 14-year-old who walks in has walk-in and nothing else. The clinical lead names one such case in the outcome summaries: a 14-year-old attending repeatedly, still attending at year end, with no program to move to [[15 §3]].

Documented response: none in this record.` },
    { id: 'o-g2', heading: 'Gap 2. Two afternoons carry most of the demand and the organisation is not sized for them.', body: `Sixty-one percent of walk-in demand arrives Thursday and Friday between 14:00 and 19:00, while Monday mornings run at 34 percent of capacity [[02 §3]]. Eighty-eight young people were turned away or asked to reschedule during the year and every one of them on a Thursday or Friday afternoon. Thirty-one of those 88 did not return within 60 days. The Executive Director told the board this is not consistent with the mission statement [[08 §3]].

Documented response: raised at board, no scheduling or staffing change recorded.` },
    { id: 'o-g3', heading: 'Gap 3. Language capacity did not follow the population.', body: `Interpretation was requested for 63 of 148 navigation youth: Tigrinya 24, Somali 16, Arabic 11, Dari 7, Amharic 5 [[04 §5]]. Direct service is available in Arabic only, through one navigator. Nine youth were served with a family member interpreting, including one case where a cousin interpreted for the first two sessions [[15 §2]]. Eleven caregivers asked whether the pilot could run in Tigrinya or Somali [[05 §5]].

Documented response: interpretation overspend absorbed from unrestricted funds and an $18,000 line recommended for the coming year [[06 §4]]. No change to staffing or direct language capacity.` },
    { id: 'o-g4', heading: 'Gap 4. Access to navigation has degraded to the point of selecting who gets in.', body: `Waitlist 11 to 34, mean wait 3.2 days to 11.6, and 47 referrals closing without a first contact [[04 §2]] [[04 §3]]. Caseload per navigator reached 34 against a program design assumption of 20 [[04 §8]]. The team lead requested a two-week intake pause and it was declined, because the funding agreement counts referrals received rather than youth served and because school referrers would not reliably resume [[10 §1]] [[10 §2]].

Documented response: summer student hours redirected to outreach calls. Waitlist policy deferred twice [[09 §2]].` },
    { id: 'o-g5', heading: 'Gap 5. Two enclosed rooms for ten client-facing staff.', body: `The site has one group room, two enclosed private rooms, and an open work area with six workstations [[14 §2]]. The group room is booked for group make-up sessions and caregiver cycles and is not reliably available [[05 §2]]. Fourteen counselling sessions were held in non-private space during the year because no room was free [[02 §7]] [[13 §2]]. Counsellors raised it at team meeting in six of eleven months.

Documented response: contractor assessment completed, estimate of $148,400 received, landlord consent obtained, capital application approved by board motion [[09 §5]] [[14 §3]] [[14 §5]]. This is the one gap with a funded plan attached.` },
    { id: 'o-g6', heading: 'Gap 6. Caregiver programming ends in March 2027 with nothing behind it.', body: `The pilot is funded to 2027-03-31 and continuation is unfunded [[05 §6]]. It is also drawing new families into the organisation, with seven of nine previously unattached caregivers referring a young person in [[05 §3]].

Documented response: none in this record.` },
  ],
}

const risk = {
  module: 'risk',
  header: 'Risk and compliance',
  mandatoryReview: `MANDATORY COMPLIANCE REVIEW
This panel surfaces risk, privacy and compliance content as written in the source documents. It is not an audit, not an investigation finding, and not a legal opinion. A qualified person must review the source documents before any action is taken.`,
  sections: [
    { id: 'o-r1', heading: 'R1. After-hours disclosure of ideation with no protocol. Open approximately seven months.', tone: 'amber', body: `On 2025-10-09 a young person contacted a counsellor's personal mobile outside operating hours to say they had been having thoughts of not wanting to be here. The counsellor responded, stayed in contact for about 40 minutes, screened directly for plan and intent, provided crisis line numbers, and confirmed a parent was at home [[13 §3]]. The record is explicit that the individual response was appropriate and the outcome safe, and equally explicit about what the organisation failed to provide: no after-hours protocol, no supervisory contact available, no documented escalation route, no record in any system the organisation controls, and an eleven hour delay before anyone else knew.

The governance committee was asked to revise the protocol on 2025-09-17, before this event [[08 §7]]. It was still open at the February board meeting and at the log extract of 2026-04-06 [[09 §2]]. The protocol was last reviewed in 2021 and does not mention personal devices.` },
    { id: 'o-r2', heading: 'R2. Personal health information discussed in non-private space, fourteen times.', tone: 'amber', body: `Fourteen occasions on which a counselling session was held in a space that is not enclosed, all involving discussion of personal health information where it could be overheard [[13 §2]]. Six are individually logged. Eight were recorded at team meeting and never logged, which the clinical lead records as a logging failure in its own right, corrected from 2026-04-01. One near-miss where session content was audible outside the room is logged separately, as is one incident where a session was relocated to reception with a third party present [[13 §1]]. Three of six log entries and all fourteen exposures trace to the same cause [[13 §4]].` },
    { id: 'o-r3', heading: 'R3. Consent procedure does not distinguish internal reporting from external publication.', tone: 'amber', body: `Three client summaries were prepared for the annual report and funder narrative on verbal consent only, with no written consent obtained. The organisation's procedure does not currently draw the distinction [[15 §4]]. The summaries were marked anonymised before upload and contain 23 identifying spans.` },
    { id: 'o-r4', heading: 'R4. Restricted funds coding error. Closed, and handled correctly.', tone: 'positive', body: `An invoice of $4,180 for group room furniture was coded in November 2025 to a grant restricted to direct walk-in service. It was caught in the December reconciliation, reversed on 2025-12-19, recoded to unrestricted, and the funder was notified in writing on 2025-12-22 and confirmed no further action was required. No other coding errors were identified [[06 §4]]. This is the strongest control in the record and should be read as such.` },
    { id: 'o-r5', heading: 'R5. Fourteen-day gap in general liability insurance.', body: `Coverage lapsed 2026-01-31 and was renewed 2026-02-14. Cause was a renewal notice sent to a former staff member's address. The board recorded the lapse, accepted dual calendar reminders as the corrective control, and directed that all recurring compliance dates be gathered into a single register [[06 §4]] [[09 §4]].` },
    { id: 'o-r6', heading: 'R6. Registration verification without a reminder.', body: `At the annual check on 2026-03-31, two of six counsellors had no current-year registration confirmation on file. Both were verified as registered and in good standing by direct verification the next day and the file copies were obtained [[12 §5]]. The finding is not the two files. It is that the annual verification is a manual task with nothing attached to trigger it.` },
    { id: 'o-r7', heading: 'R7. Funding concentration and reserve.', body: `Restricted funding is 80.8 percent of revenue, up from the prior year, and unrestricted revenue fell as a share [[06 §1]] [[06 §4]]. Three programs each depend on a single funder. The operating reserve stands at 2.4 months against a board-approved target of 3.0. School contract revenue fell $12,500 in step with the six cancelled groups, which means the one materially unrestricted earned-revenue stream moves with the program that is shrinking [[03 §2]].` },
    { id: 'o-r8', heading: 'R8. Family members used as interpreters.', body: `Nine navigation youth were served with a family member interpreting, recorded by the program itself as a practice it should stop [[04 §5]], with one instance visible in the outcome summaries [[15 §2]]. No policy change is recorded.` },
  ],
  footer: 'Every row links to the source passage. Insyte does not score organisations and does not rank risk.',
}

const queryPresets = [
  { id: 'o-q1', chipLabel: 'Where is demand going, and is our funding following it?', matchTokens: ['demand', 'funding', 'money', 'spend', 'allocation', 'growing', 'shrinking', 'following'], answer: `Demand moved decisively toward one-to-one and away from groups. Walk-in contacts rose 41 percent to 1,204 and navigation referrals rose 77 percent to 214, while delivered groups fell 31 percent to 18 [[02 §2]] [[03 §2]] [[04 §2]].

Expenditure moved the other way. The group program holds 34 percent of program spend at $438,000 and a unit cost of $2,047 per participant, up 47 percent. Navigation holds 19 percent at $246,000 and a unit cost of $1,662, down 23 percent [[06 §3]].

The reason the money has not moved is documented, and it is not inertia. The largest funder's agreement is written against group session counts and referrals received rather than youth served, so reducing group delivery or pausing intake shows up as failure in the numbers the funder watches [[07 §1]] [[10 §2]]. Six cancelled groups also cost about $34,000 in unrecovered preparation time and $12,500 in lost school contract revenue [[03 §6]] [[06 §1]].

The board has asked management to return in June with a reallocation option and an assessment of what would be lost in outcome evidence if the group program were reduced [[09 §6]].` },
  { id: 'o-q2', chipLabel: "What can we actually evidence to a funder, and what can't we?", matchTokens: ['evidence', 'funder', 'prove', 'outcomes', 'measure', 'post-measure', 'report', 'defend'], answer: `What you can evidence. Group program outcomes, at 78 percent post-measure completion, stable across three years, with 73 percent of participants improving by three or more points and a mean change of +4.4 [[03 §5]]. Navigation outcomes at 64 percent completion, with a mean change of +3.9 and hard secondary outcomes attached, being 75 percent in stable housing and 46 percent re-enrolled in school or training at exit [[04 §6]].

What you cannot evidence. Walk-in, which is your largest program at 1,204 contacts and 612 unique youth, with 22 percent post-measure completion on a self-selected sample. Your own clinical lead states that the +3.8 change should not be represented as a program-wide effect, and records that it has never been reported to a funder as one [[02 §5]] [[02 §6]].

The caregiver pilot has satisfaction data at 27.4 of 32 and no outcome data whatsoever, because the evaluation framework was not finalised before delivery began [[05 §4]].

The structural point across all four. Where the change is measured it is very similar, between +3.8 and +4.4. Your programs do not differ much in effect on this evidence. They differ in whether the effect can be shown, and that difference is a function of program shape, not program quality.

One thing you cannot report at all: a total unique-individual figure across programs, because the programs do not share a participant identifier.` },
  { id: 'o-q3', chipLabel: 'Why do our own documents disagree on how many people we served?', matchTokens: ['disagree', 'numbers', 'count', 'counted', 'reconcile', 'different', 'discrepancy', 'served'], answer: `Because three systems count three different things, and all three numbers are correct.

Walk-in volume appears as 1,204 in the annual program report, 1,180 in the funder report, and 1,247 in the unit cost calculation [[02 §2]] [[07 §3]] [[06 §4]]. The intake spreadsheet counts a contact only once an intake form is completed, which matches the funder definition. Counsellor day sheets count every young person a counsellor sat with, including those who talked for twenty minutes and left without giving a name. Billing counts sessions, so a youth seen twice in a day counts twice [[11 §2]].

The same thing happens in navigation, at 148 against 151, where the higher figure includes three youth who had a first contact but no service plan [[11 §3]].

The Director of Programs put it plainly: the organisation is not wrong, it is reporting a service it does not fully count [[11 §2]].

Approved for the coming year: one counting definition per metric, written down, with each funder's definition mapped to it rather than replacing it, and a footnote in every report stating which definition was used [[11 §4]] [[11 §5]].

Worth attaching to this: reconciling those sources by hand cost 31 staff hours across four people for one quarterly report, and the report was still submitted three days late [[07 §5]].` },
  { id: 'o-q4', chipLabel: 'What is open on our risk register and how long has it been open?', matchTokens: ['risk', 'register', 'open', 'compliance', 'incident', 'outstanding', 'overdue'], routesTo: 'risk', answer: '' },
  { id: 'o-q5', chipLabel: 'What do we have for a capital funding application, and what is missing?', matchTokens: ['capital', 'grant', 'application', 'funding', 'renovation', 'missing', 'apply'], answer: `You have more than most applicants do at this stage.

Documented need. Two enclosed rooms for ten client-facing staff [[14 §2]]. Fourteen sessions involving personal health information held in non-private space [[13 §2]]. Three of six logged incidents tracing to the same cause [[13 §4]]. Three of four staff departures from the team most affected, with all three exit interviews naming private space [[12 §2]] [[12 §3]]. Demand up 41 percent against unchanged staffing [[02 §2]] [[12 §1]]. Eighty-eight young people turned away or rescheduled [[02 §3]].

Documented project. Contractor assessment and itemised estimate of $148,400 dated 2026-03-05, valid 90 days, with a nine-week phased schedule and no structural modification required [[14 §3]]. Equipment schedule of $31,600 [[14 §4]]. Combined requirement $180,000, approved by board motion 2026-02-11 with the Chair authorised as official representative [[09 §5]].

Eligibility evidence. Written landlord consent dated 2026-03-18 covering the alterations, permits and reinstatement [[14 §5]]. Confirmation the premises are not a private dwelling and not federal property [[14 §1]]. Six photographs of the space taken 2026-03-05 [[14 §6]]. Leadership composition recorded and reviewed annually [[01 §3]]. Participant origins recorded [[01 §4]].

What is missing. A project start and end date. Whether any matching or in-kind contribution is being offered, which the documents do not record. Projected service figures after the renovation, which do not exist in any document and which Insyte will not estimate for you. And the estimate expires 90 days from 2026-03-05, so confirm it is still valid before submission.` },
]

/* --------------------------------------------------------------- exports */

const quarterly = {
  title: 'PROGRAM AND OUTCOME REPORT · FULL YEAR FY2025-26',
  meta: [
    'Prepared by Insyte for [ORG_1] · Period 2025-04-01 to 2026-03-31',
    'Draft · Not submitted · Organisation review required',
  ],
  banner:
    'Every figure in this report states the counting definition it was produced under. Where two definitions exist for the same metric, both are shown.',
  blocks: [
    { key: '1', label: 'PERIOD AND SCOPE', body: `Full fiscal year 2025-04-01 to 2026-03-31, with FY2024-25 comparators throughout. Prepared from 15 source documents: four annual program reports, one pilot evaluation, one financial summary, one submitted funder report, two sets of board minutes, two internal email threads, a staffing log, an incident log, a facility assessment, and three anonymised client summaries [[01 §1]].` },
    { key: '2', label: 'PROGRAMS AND PARTICIPANTS', body: `Walk-in counselling: 1,204 contacts, 612 unique youth, 244 operating days [[02 §1]] [[02 §2]].
School group program: 18 groups delivered of 24 scheduled, 214 youth enrolled, 167 completing six of eight sessions [[03 §2]].
Youth navigation: 148 youth served against 214 referrals received [[04 §2]].
Caregiver pilot: 41 caregivers attended at least one session, 33 attended five or more, across four cycles [[05 §2]].

Counting definition: walk-in figures use the annual program report definition, being every contact recorded on a counsellor day sheet. The funder definition, which counts only contacts with a completed intake form, gives 1,180 for the same period [[07 §3]] [[11 §2]].

A combined unique-individual total across programs is not derivable, because the programs do not share a participant identifier.` },
    { key: '3', label: 'OUTCOME MOVEMENT', body: `The five-item wellbeing measure moved +3.8 in walk-in, +4.4 in groups and +3.9 in navigation [[02 §5]] [[03 §5]] [[04 §6]].

Post-measure completion differs sharply: 78 percent in groups, 64 percent in navigation, 22 percent in walk-in. The walk-in figure rests on a self-selected sample and the organisation's own clinical lead records that it should not be represented as a program-wide effect [[02 §6]].

Navigation secondary outcomes at exit: 75 percent in stable housing, 46 percent re-enrolled in school or training [[04 §6]].

The caregiver pilot has satisfaction data at 27.4 of 32 and no outcome data [[05 §4]].` },
    { key: '4', label: 'SERVICE GAPS IDENTIFIED', body: `Ages 12 to 14, 27 percent of walk-in contacts, with no follow-on program [[02 §4]].
Thursday and Friday afternoons, 61 percent of demand, 88 youth turned away or rescheduled [[02 §3]].
Language, with interpretation requested by 63 of 148 navigation youth in five languages against direct capacity in one [[04 §5]].
Navigation access, waitlist 11 to 34 and 22 percent of referrals closing without a first contact [[04 §2]] [[04 §3]].
Private space, two enclosed rooms for ten client-facing staff [[14 §2]].
Caregiver programming beyond March 2027, unfunded [[05 §6]].` },
    { key: '5', label: 'RISK AND INCIDENT SUMMARY', body: `Six log entries in the year, four incidents and two near-misses, against three the prior year [[13 §1]].
Two items open at year end: the after-hours protocol, open approximately seven months, and an incident linked to the facility [[13 §1]] [[13 §3]].
Fourteen occasions on which personal health information was discussed in non-enclosed space, eight of them not individually logged until the practice was corrected from 2026-04-01 [[13 §2]].
One restricted-funds coding error of $4,180, identified in reconciliation, reversed and the funder notified. Closed [[06 §4]].
One 14-day gap in general liability coverage, closed with a dual-reminder control [[09 §4]].` },
    { key: '6', label: 'STAFFING AND CAPACITY', body: `19 staff, 14.2 FTE at year end, unchanged from the prior year in every program [[12 §1]].
Turnover 21 percent overall and 50 percent in the walk-in counsellor team [[12 §2]].
All three exit interviews named unpredictable daily demand and the absence of consistent private space [[12 §3]].
Time to fill two counsellor vacancies was 11 and 14 weeks [[12 §4]].
Professional development underspent by $4,400 in a year with 21 percent turnover, with three staff citing coverage [[12 §6]].` },
    { key: '7', label: 'FINANCIAL SUMMARY', body: `Revenue $1,294,900 against expenditure $1,288,200. Surplus $6,700 [[06 §1]] [[06 §2]].
Restricted funding 80.8 percent of revenue, with three programs each dependent on a single funder [[06 §4]].
Operating reserve 2.4 months against a board-approved target of 3.0 [[06 §4]].
Interpretation ran $17,000 against a $5,000 budget, absorbed from unrestricted donations, with $18,000 recommended for the coming year [[06 §2]] [[06 §4]].
Program share of expenditure: groups 34 percent, walk-in 31 percent, navigation 19 percent, caregiver pilot 6 percent [[06 §3]].` },
    { key: '8', label: 'NARRATIVE', body: `The year is one in which demand rose and capacity did not. The two growing programs are the two the organisation can least evidence, and the shrinking program is the one it can evidence best and the one that holds the largest share of expenditure. That is documented as the central planning question for the coming year by both the program lead and the Executive Director [[03 §7]] [[10 §3]].

Reporting cost is material and unbudgeted, at roughly a staff week per quarterly report for one funder [[07 §5]] [[11 §5]]. A single counting definition per metric has been approved for the coming year [[11 §4]].

Organisation-level narrative for this period: __ORG_ENTRY__` },
    { key: '9', label: 'APPENDIX, SOURCE DOCUMENTS', body: `Fifteen documents. Every figure in this report links to the passage it was taken from. Nothing in this report was estimated, interpolated, or combined across incompatible counting definitions.` },
  ],
  footer:
    'Generated by Insyte from 15 source documents. All content is extracted, not inferred. Organisation review required before submission to any funder.',
}

const grant = {
  title: 'COMMUNITY CAPACITY AND EQUITY FUND · CCEF-1180 E',
  meta: ['Draft generated by Insyte · Not submitted · Authorised representative review required'],
  banner:
    '26 of 34 fields populated from your documents. 5 require organisation entry. 3 are attestations and were left blank by design. Insyte does not check attestation boxes.',
  fields: [
    { section: 'SECTION B — FUNDING REQUESTED' },
    { label: 'Request type', value: 'Both equipment purchase and renovation or retrofit [[09 §5]] [[14 §3]] [[14 §4]]', state: 'populated' },

    { section: 'SECTION C PART 1 — ORGANIZATION' },
    { label: '1  Legal name', value: '[ORG_1] [[01 §1]]', state: 'populated' },
    { label: '2  Operating name', value: 'Northbridge Youth [[01 §1]]', state: 'populated' },
    { label: '3  Year established', value: '2011 [[01 §1]]', state: 'populated' },
    { label: '4  Organization type', value: 'Not-for-profit [[01 §1]]', state: 'populated' },
    { label: '5  Organization category', value: 'Community-based social services [[01 §1]]', state: 'populated' },
    { label: '6  CRA business number', value: '[BN_1] [[01 §1]]', state: 'populated' },
    { label: '7  Primary address', value: '[ADDRESS_1] · [PHONE_1] · [EMAIL_1] [[01 §1]]', state: 'populated' },
    { label: '8  Mailing address same', value: 'Yes [[01 §1]]', state: 'populated' },
    { label: '9  Primary activities', value: 'Free, no-referral mental health support to youth aged 12 to 24 and structured support to their caregivers, delivered through single-session walk-in counselling, an eight-week school group program, one-to-one navigation and a caregiver support group [[01 §2]] [[01 §5]]', state: 'populated' },
    { label: '9  Target groups', value: 'Youth aged 12 to 24; newcomer youth; caregivers. Youth of African origin 44 percent and Caribbean origin 9 percent of participants; first-generation newcomers 38 percent overall and 61 percent within navigation [[01 §4]]', state: 'populated' },

    { section: 'SECTION C PART 2 — PROJECT' },
    { label: '20  Project title', value: '__ORG_ENTRY__', state: 'org-entry' },
    { label: '21  Project start date', value: '__ORG_ENTRY__', state: 'org-entry' },
    { label: '22  Project end date', value: '__ORG_ENTRY__', state: 'org-entry' },
    { label: '23  Amount requested', value: '$180,000. Must match the total at Q31. [[09 §5]] [[14 §3]] [[14 §4]]', state: 'populated' },
    { label: '24  Project summary (500 words)', value: 'Drafted below. 447 words.', state: 'populated' },
    { label: '25  Alignment with program objectives (500 words)', value: 'Drafted below. 424 words.', state: 'populated' },
    { label: '26  Activities and timelines', value: 'Nine-week phased schedule derived from the contractor estimate. Ordering inferred by Insyte from an itemised scope and a total duration, and flagged as inferred. [[14 §3]]', state: 'populated' },
    { label: '27  Delivery location', value: '[ADDRESS_1]. Ground floor, street access. Not a private dwelling. Not located on federal property. [[14 §1]]', state: 'populated' },
    { label: '28  Official language minority community', value: '__ORG_ENTRY__', state: 'org-entry' },
    { label: '29  Vulnerable groups served', value: 'Youth experiencing mental health difficulty; newcomer and refugee youth; youth facing housing instability, with 75 percent of measured navigation participants reaching a stable housing outcome at exit [[04 §6]] [[04 §4]]', state: 'populated' },
    { label: '30  Project costs', value: 'Renovation $148,400 per external contractor estimate dated 2026-03-05, valid 90 days. Equipment $31,600. Total $180,000. [[14 §3]] [[14 §4]]', state: 'populated' },
    { label: '31  Funding sources', value: 'Amount requested from CCEF $180,000. Other confirmed contributions to this project: none recorded in the source documents.', state: 'populated' },
    { label: '32  Budget details (optional)', value: 'Itemised across six construction line items and five equipment line items [[14 §3]] [[14 §4]]', state: 'populated' },
    { label: '33  Origins of communities served', value: 'African and Caribbean origin, most represented countries Eritrea, Somalia, Sudan, Nigeria [[01 §4]] [[04 §4]]', state: 'populated' },

    { section: 'ELIGIBILITY EVIDENCE' },
    { label: 'Owner or lease with written owner approval', value: 'Tenant since 2017-09-01, term to 2029-08-31. Written landlord consent dated 2026-03-18 covering alterations, permits and reinstatement. [[14 §5]]', state: 'populated' },
    { label: 'External estimate for renovation', value: 'Yes, [VENDOR_1], 2026-03-05, itemised, valid 90 days [[14 §3]]', state: 'populated' },
    { label: 'Digital picture of the space', value: 'Six photographs taken 2026-03-05, held on file [[14 §6]]', state: 'populated' },
    { label: 'Official representative authorised', value: 'Board Chair authorised by motion 2026-02-11 [[09 §5]]', state: 'populated' },
    { label: 'Projected participants after completion', value: null, state: 'not-documented' },

    { section: 'PART 4 CHECKLIST AND PART 5 ATTESTATION' },
    { label: 'Six checklist boxes', value: 'Attestations must be completed by an authorised representative. Insyte does not check attestation boxes.', state: 'never-autofill' },
    { label: 'Three attestation boxes', value: 'Attestations must be completed by an authorised representative. Insyte does not check attestation boxes.', state: 'never-autofill' },
  ],
  blocks: [
    { key: 'q24', label: 'Q24  PROJECT SUMMARY (limit 500 words, draft is 447)', body: `[ORG_1] has provided free mental health support to young people in north-central Edmonton since 2011. We serve youth aged 12 to 24 through single-session walk-in counselling, an eight-week group program in five partner schools, one-to-one navigation for newcomer youth, and a caregiver support group. Youth of African origin were 44 percent of our participants last year and youth of Caribbean origin 9 percent, together the largest share of the young people we serve. First-generation newcomer youth were 38 percent across all programs and 61 percent within our navigation caseload. [[01 §4]] [[01 §5]]

The need for this project is physical and it is limiting our service now. We operate from 2,140 square feet containing one group room and two enclosed private rooms. Ten client-facing staff share those two rooms. The group room is booked for group make-up sessions and caregiver cycles and is not reliably available for counselling. [[14 §2]]

The consequences are documented across our records. On fourteen occasions last year a counselling session involving personal health information was held in the reception area, the group room or the open work area because no private room was free. Three of six entries in our incident log trace to the same cause. Three of the four staff who left us last year were walk-in counsellors, and all three named the absence of private space in their exit interview. Demand is rising against this constraint: walk-in contacts grew 41 percent to 1,204 while our staffing was unchanged, and we turned away or rescheduled 88 young people, of whom 31 did not return within sixty days. [[13 §2]] [[13 §4]] [[12 §3]] [[02 §2]] [[02 §3]]

This project converts our open work area into three enclosed, acoustically treated counselling rooms, upgrades the two existing rooms to the same acoustic standard, makes our washroom accessible, and adds a privacy screen at reception. It also replaces the furniture, secure file storage and devices needed to put those rooms into service. The work is costed at $148,400 by an external contractor and $31,600 in equipment, with written landlord consent in hand and a nine-week phased schedule that keeps our doors open throughout. [[14 §3]] [[14 §4]] [[14 §5]]

The objective is to take our confidential counselling capacity from two rooms to five. The anticipated results are that personal health information is discussed only in enclosed space, that our busiest afternoons are staffed to the room capacity rather than the reverse, and that the working conditions our departing counsellors named are removed as a reason to leave.

The targeted group is youth aged 12 to 24 in north-central Edmonton and the adults raising them, the majority of whom are of African and Caribbean origin, and a substantial share of whom are newcomers to Canada. [[01 §4]]

__ORG_ENTRY__ for the projected number of additional youth served after completion. No projection exists in your source documents and Insyte does not estimate.` },
    { key: 'q25', label: 'Q25  ALIGNMENT WITH PROGRAM OBJECTIVES (limit 500 words, draft is 424)', body: `The Community Capacity and Equity Fund provides capital assistance to organizations led by and serving equity-deserving communities in Canada, so that they can build capacity to better fulfill their missions and better serve those communities. This application is a direct fit on each of those three elements.

We are a led by the communities we serve. All four members of our senior management team and seven of our nine directors identify as Black, of African and Caribbean origin. Leadership composition is reviewed annually by our Governance Committee and recorded in the minutes of that review, and the board reaffirmed it in the motion authorising this application on 2026-02-11. [[01 §3]] [[09 §5]]

We serve those communities in Canada. Youth of African origin and Caribbean origin together were the largest share of our participants last year at 53 percent, a figure derived by addition from two documented shares. Within our navigation program, 61 percent of the young people we served were first-generation newcomers, most commonly from Eritrea, Somalia, Sudan and Nigeria. Interpretation was requested by 63 of 148 navigation clients, most often in Tigrinya, Somali and Amharic. This is who walks through our door. [[01 §4]] [[04 §4]] [[04 §5]]

This is a capital request that builds capacity rather than funding operations. Our mission commits us to a young person being able to reach a counsellor on the day they decide to ask. What limits that commitment is not funding for staff time and it is not demand. It is two enclosed rooms shared by ten client-facing staff. Because of that constraint we have held confidential conversations in non-confidential space fourteen times in a year, lost three counsellors who named that condition on their way out, and turned away 88 young people on the two afternoons a week when demand concentrates. A capital investment removes a ceiling that no amount of program funding can lift, and the effect persists for the remaining life of our lease, which runs to 2029 with improvements permitted to remain in place at the landlord's option. [[01 §2]] [[14 §2]] [[13 §2]] [[12 §3]] [[02 §3]] [[14 §5]]

Building capacity to better fulfill our mission is the measurable outcome here. Confidential counselling capacity moves from two rooms to five. Our accessible washroom upgrade brings the premises within reach of young people and caregivers who currently need assistance to use it. Our group room is released back to group programming rather than being absorbed as overflow counselling space. [[14 §3]] [[05 §2]]

We are ready to proceed. We hold an itemised external contractor estimate, written landlord consent covering the alterations and permits, photographs of the space, and a board motion authorising both the application and the official representative. No structural modification is required and the work is phased to keep our services running throughout. [[14 §3]] [[14 §5]] [[14 §6]] [[09 §5]]` },
  ],
  footer:
    'Generated by Insyte from 15 source documents. All content is extracted, not inferred, with one exception flagged in Q26. The 53 percent figure in Q25 is arithmetic performed on two cited figures and is shown as derived. Attestations are left blank by design. Authorised representative review required before submission.',
}

export const org = {
  id: 'org',
  title: '[ORG_1]',
  subtitle: '15 documents · FY2025-26 · 4 programs · 2,417 spans redacted',
  sidebarLabel: 'Northbridge Youth',
  sidebarMeta: '15 documents · FY2025-26',
  glance: {
    title: 'Year at a glance',
    stats: [
      { label: 'Documents', value: '15', note: 'FY2025-26 with prior-year comparators' },
      { label: 'Revenue', value: '$1,294,900', note: 'surplus $6,700' },
      { label: 'Restricted funding', value: '80.8%', note: 'reserve 2.4 months against a 3.0 policy' },
      { label: 'Walk-in contacts', value: '854 to 1,204', note: 'staffing unchanged at 14.2 FTE' },
      { label: 'Post-measure completion', value: '22% to 78%', note: 'lowest in the largest program' },
      { label: 'Open compliance items', value: '3', note: 'one open approximately seven months' },
    ],
    footer: 'Click any citation to open the source document here.',
  },
  docs,
  docsById,
  spansByDoc: redactionSpans,
  summary,
  outcomeSeries: null,
  redaction: {
    header: {
      line1: '15 documents · 2,417 entity spans detected · 157 held as identifying across 33 distinct identities',
      line2: 'Cross-document identity resolution: 4 surface forms of the same organisation merged to one token',
      caption: 'Insyte over-redacts by design. You decide what comes back.',
    },
    stats: { documents: 15, spans: 2417 },
    mergedIdentity: {
      token: '[ORG_1]',
      forms: [
        { surface: 'Northbridge Youth Mental Health Society', count: 9, note: 'legal name' },
        { surface: 'Northbridge Youth', count: 6, note: 'operating name' },
        { surface: 'NYMHS', count: 4 },
        { surface: 'the Society', count: 31, note: 'relational form, resolved by position' },
      ],
      nearMiss: {
        token: '[ORG_5]',
        forms: ['Northbridge Psychological Services'],
        note: 'Different organisation with a similar name. Held separately.',
      },
    },
    calloutDoc: '15',
    callout:
      'This document was marked anonymised before upload. Insyte found 23 identifying spans in it. Anonymised is not the same as de-identified.',
  },
  buttons: [
    { id: 'patterns', label: 'Patterns', blurb: 'Across 15 documents', fixture: patterns },
    { id: 'outcomes', label: 'Outcomes & Trends', blurb: '4 programs, 1 measure', fixture: outcomes },
    { id: 'gaps', label: 'Service Gaps', blurb: 'Demand without service', fixture: gaps },
    { id: 'risk', label: 'Risk & Compliance', blurb: 'Open and closed items', tone: 'amber', fixture: risk },
  ],
  queryPresets,
  exportConfig: {
    cards: [
      { id: 'quarterly', label: 'Program report', blurb: 'Full year FY2025-26', scope: 'period', default: true },
      { id: 'grant', label: 'Grant application', blurb: 'Community Capacity and Equity Fund', scope: 'form' },
    ],
    scopes: null,
    resolve: (cardId) => (cardId === 'grant' ? grant : quarterly),
  },
}
