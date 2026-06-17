# TPS Central: Revenue Intelligence & Operating System
**Portfolio Reference Document**
*Consolidated from: Context Overview, NBA Whitepaper, AI Agent Strategy Proposal, DDOM Maturity Framework, KPI Scorecard, Architecture & RI Reference*

---

## What This Document Is

TPS Central is the operating system I designed and built for Adobe's Technical Pre-Sales organization — a ~1,000-person global function influencing ~$800M in new ARR. This document consolidates the architecture, operating model, AI strategy, and measurement framework across three years of work.

It is intended as a portfolio reference for conversations about revenue operations, AI-native GTM systems, and operating model design.

---

## Table of Contents

1. [What TPS Central Is](#what-tps-central-is)
2. [Strategic Positioning: The Revenue Intelligence Case](#strategic-positioning-the-revenue-intelligence-case)
3. [The Revenue Formula](#the-revenue-formula)
4. [DDOM Maturity Journey](#ddom-maturity-journey)
5. [System Architecture: Three Planes](#system-architecture-three-planes)
6. [Where Intelligence Sits](#where-intelligence-sits)
7. [The NBA Engine](#the-nba-engine)
8. [AI Agent Strategy](#ai-agent-strategy)
9. [KPI Scorecard](#kpi-scorecard)
10. [Operating Model Reference](#operating-model-reference)

---

## What TPS Central Is

TPS Central is Adobe's system of record and operating backbone for Technical Pre-Sales. Built on Adobe Workfront with PowerBI as the analytics layer, it functions as three things simultaneously.

**Domain system of record.** TPS Central owns the technical validation truth for every opportunity in the pipeline — Tech Fit, Tech Engaged, Tech Win, Tech Risk, and the 9 Tech Driver fields. Deal facts originate in D365 and flow downstream. Technical validation truth originates in TPS Central and flows upstream to inform leadership decisions.

**Workflow engine.** TPS Central routes TPS engagement requests, manages Tech Driver assignment, and enforces stage-gate discipline across the global organization.

**Signal engine.** TPS Central captures 22 standardized touchpoint types — the unit of activity measurement for all technical engagement. These touchpoints feed the DDOM reporting layer, leadership cadences, and the Revenue Intelligence stack.

The platform sits on a DDOM data lake (ADX / DPASS) that unifies Workfront, D365, UDA, and Finsys into one queryable layer. That join — technical validation data alongside deal economics, customer master data, and org hierarchy — is what makes TPS Central a revenue intelligence asset, not just an activity tracker.

### Architecture at a Glance

| Layer | Function | Tech / Owner |
|---|---|---|
| Access | Exposes governed TPS data to any AI surface | TPS Central MCP server (roadmap) |
| Action / Delivery | Turns intelligence into conversation and automated output | Copilot Studio agents + Friday Package (roadmap) |
| Revenue Intelligence | Sense, Predict, Prescribe — tied to revenue | NBA engine via Workfront Fusion (roadmap) |
| Reporting | Descriptive base — what happened | PowerBI (incl. NBA Action Center) |
| Data Lake | Unifies all sources into one queryable layer | ADX; DPASS (CANWF), DPASS (TPS DDOM) |
| System of Record | Canonical store of TPS engagements and work | Adobe Workfront RM — TPS Central |
| Integration | Moves data between SoR, CRM, corp stores | Workfront Fusion, Azure Function App, CBS, Power Automate |
| Source Systems | Deal, customer, and org data | D365 (CRM) → Calcium DB; UDA; Finsys |
| Identity / Governance | Auth and control | IMS; Ecosystem Platform Ops; TSCRUM; Project Gateway |

### Workfront Object Hierarchy

| Workfront Object | TPS Central Meaning |
|---|---|
| Portfolio | TPS Central (the system) |
| Program | Global Account (one per account) |
| Project | Opportunity or Account Management entry |
| Issue | Request or support item under a Project |

---

## Strategic Positioning: The Revenue Intelligence Case

### The Moat

TPS Central's competitive advantage is vertical integration under one COE. Most GTM systems of record are owned by tooling teams with no model authority. TPS Central is owned by the team that defines the operating model, owns the data lake, and governs the AI layer on top.

Three reasons the moat holds:

**The substrate is the asset.** The DDOM data lake unifies technical validation (Workfront), deal economics (D365), customer master data (UDA), and org hierarchy (Finsys). A generic seller-intelligence tool like Clari or Gong models activity-against-deals. It has none of that join. TPS Central can answer questions no off-the-shelf tool can because the proprietary substrate was built to answer them.

**Owning the substrate means owning the AI layer.** Every roadmap initiative reads from the same data lake and is governed by the same program team. No clean substrate, no safe agent. The governance claim Ecosystem Platform Ops is making is now backed by a specified architecture, not a slide.

**It is the proof point for the methodology.** If Revenue Architecture sequences correctly here — definitions first (TD fields, touchpoint types), then KPIs (the revenue formula), then intelligence (NBA), then delivery (agents) — it generalizes to RevOps, IGTM, and DDOM at large.

### The Naming Decision

DDOM is the CEO-mandated air cover. Revenue Intelligence is the market-legible capability that delivers it. The clean position is both/and: Revenue Intelligence is how TPS Central delivers DDOM. DDOM is the mandate; RI is the method.

Phase 3 already reaches across Marketing, Sales, and ACS data into CJA B2B and lifecycle analytics. The data lake already joins UDA and Finsys. That is the full revenue lifecycle, not pre-sales analytics. The RI&O COE is the named destination of the journey already drawn.

### The Pitch

TPS Central has matured from a system people update into a Revenue Intelligence operating system: a unified DDOM data lake, an NBA engine that turns signal into prescribed action, agents that deliver it and reclaim 25-40 hours/week of ops capacity, and an MCP layer that exposes it — governed — to any AI surface. It is the working proof that Revenue Architecture sequences correctly, end to end. The ask is not "fund a tool." It is "name what already exists as the Revenue Intelligence and Operations COE and let it scale to the full revenue motion."

---

## The Revenue Formula

> **Revenue = Activity Volume x Signal Quality x Conversion Rate x Deal Size**

This formula is the operating thesis behind everything TPS Central is designed to do. Each term maps directly to an NBA engine capability — which is how "definitions to KPIs" becomes "intelligence."

| Component | Definition | NBA Engine Mapping |
|---|---|---|
| Activity Volume | Customer engagement that creates opportunity momentum | NBA recommends next touchpoint based on won-deal sequences |
| Signal Quality | Completeness and accuracy of the 9 Tech Driver fields | Gap detector ensures validation fields are current at each stage |
| Conversion Rate | Validated signals that accelerate deal progression | Pattern matcher identifies high-correlation engagement types that drive stage transitions |
| Deal Size | GNARR / ASV banding used for prioritization | GNARR weighting surfaces largest deals first in FLM views |

The keystone gap: Signal Quality currently depends on manual touchpoint logging by individual contributors. Inverting this — so agents author touchpoints and humans govern exceptions — is the asymmetric architectural move that unlocks the rest of the formula.

### Signal Classes

| Signal Class | Construct | Use |
|---|---|---|
| Activity volume | 22 touchpoint types, sequences | Next-touchpoint recommendation; momentum |
| Signal quality | 9 TD validation fields, stage-gate completeness | Gap detection; hygiene; data quality |
| Technical progression | Tech Fit / Win / Risk / Case state vs. stage | Pipeline technical health; deal-level progression |
| Conversion | Touchpoint-sequence to stage-transition correlation | Pattern matching to won-deal benchmarks |
| Deal size | GNARR / ASV bands | Prioritization weighting in FLM views |
| Capacity / fit | Assignments, EA-vs-SC criteria, team load | Reassignment recommendations; coverage |

---

## DDOM Maturity Journey

TPS Central is built across a four-phase transformation arc. Read through the Revenue Intelligence lens, this is a RI maturity curve — not a feature roadmap.

| Phase | Year | Objective | RI Maturity Stage |
|---|---|---|---|
| Global COE Program | FY24 | Standardize role excellence and technical selling globally | Instrument the motion |
| Establish DDOM Foundation | FY25 | Build data, process, and operating model backbone | Descriptive |
| Centralize Execution and Scale Adoption | FY26 | Drive consistency, leverage, and real-time performance management | Diagnostic + real-time Sense |
| AI-Enabled, Fully Integrated DDOM | FY27+ | From data visibility to predictive, AI-driven execution | Predictive to Prescriptive to Autonomous |

### Phase Detail

**Phase 1 — Establish the Foundation**
Objective: Create a common technical selling language and baseline visibility. Deliverables: standardized technical selling methodology, aligned Tech Driver field discipline, manual hygiene processes to drive early adoption, consolidated data from fragmented tools into an initial reporting layer. Impact: first-ever global TPS visibility, common execution framework, baseline performance insights.

**Phase 2 — Centralize Execution and Scale Adoption (Current)**
Objective: Institutionalize TPS execution through a centralized operating system. Deliverables: centralized request intake, activity, and engagement tracking; enterprise-wide adoption at 1,000+ users; bi-directional Tech Driver sync into CRM; centralized data and automated reporting workflows. Impact: consistent execution at scale, dramatically reduced manual consolidation, real-time pipeline technical health.

**Phase 3 — AI-Enabled, Fully Integrated DDOM (Roadmap)**
Objective: Move from reporting to real-time, AI-driven execution orchestration. This is not "AI features bolted onto DDOM." The Signal to Insight to Action in real time engine is the NBA engine — and the Revenue Intelligence value chain. Deliverables: NBA engine, Copilot Studio agents, MCP access layer, CJA B2B and lifecycle analytics. Impact: Signal to Insight to Action in real time, non-linear leverage through AI.

---

## System Architecture: Three Planes

The TPS Central north star architecture runs three planes on a single DDOM substrate. Viewed through the RI lens, they are not separate projects — they are one Revenue Intelligence operating system.

### Plane 1 — Intelligence: The NBA Engine

A Workfront Fusion scenario reading from the DPASS (TPS DDOM) data lake. No new platforms or data stores required.

Three sub-modules: Gap Detector (field state vs. stage-gate expectation), Pattern Matcher (touchpoint sequences vs. won-deal benchmarks by GNARR band), Risk Scorer (Priority = Impact x Urgency x (1/Effort) x GNARR weight, normalized 0-100).

Delivered via a Workfront NBA tab (Tech Driver action cards) and PowerBI NBA Action Center (FLM team view). The NBA engine is the single intelligence brain. Agents and MCP read its output; they never recompute it.

### Plane 2 — Action and Delivery: Copilot Studio Agents

Four deliverables built on Copilot Studio and Power Automate:

**TPS Opportunity Agent** — Built on GPT-5 Reasoning (Preview) in Copilot Studio. Deployed to Tech Drivers and FLMs. Handles touchpoint logging from Outlook Calendar, Tech Risk Summary Notes, Product Risk Mitigation write-ups, and weekly manager updates.

**Janet — Ask Janet Agent** — Always-on analyst for GTM leaders. Pipeline health, capacity, coverage, hygiene, and priorities grounded in operating-model rules. Phase 1 reads Friday Package SharePoint artifacts. Phase 2 goes live-API.

**TPS Central Support Agent** — Automated help desk for the full TPS user base. 93 intents, approximately 400 trigger phrases, 4 Job Aid JSONs. Knowledge base already built.

**Friday GTM Briefing Package** — Automated weekly deck and Excel workbooks per vertical. Slack-first delivery with SharePoint archive that feeds Janet.

### Plane 3 — Access and Governance: TPS Central MCP Server

Exposes TPS Central's domain knowledge as callable MCP tools to any AI surface (Claude, Slack, future Adobe agents) — no bespoke integration per surface. The TPS Central MCP server is pure domain logic (Tech Driver definitions, touchpoint types, NBA scoring rules) on top of Adobe-maintained Workfront MCP infrastructure. Ship infrastructure, not an embedded UI.

**Sequencing (decided):** Phase 1 is read-only — query and shape TPS data, no writes. Phase 2 introduces write-back gated by confirmation, audit trail, and per-user permission tier. Write-back is data capture, not auto-execution. NBA still prescribes, a human confirms, then the write happens.

**Transport abstraction (decided):** The domain layer calls an internal Workfront adapter interface with two implementations — Workfront MCP and Workfront REST. This decouples the program from Adobe's MCP roadmap. Decision rule: if Workfront MCP covers custom-field reads today, go MCP-first. If not, ship Phase 1 on REST as an explicit interim. The validation exercise is a go/no-go on the MCP premise, not just an effort estimate — the REST adapter means the team owns and maintains integration code, which partially erodes the "Adobe maintains the integration" value proposition.

**Five-layer governance model:** connection registry, role-based tool access, write controls (confirmation + audit), rate limiting and abuse detection, data classification. All owned by Ecosystem Platform Ops.

### Write Governance

The prescribe-to-execute line is made testable by distinguishing capture from execute:

**Capture (allowed in Phase 2, human-confirmed):** The system records a fact the human just asserted — log_touchpoint, a TD-field update. Human is author, system is scribe.

**Execute (Phase 3+, not yet governed):** The system acts on an NBA recommendation — reassign a TD, send an external comm, change a stage. A "confirm? [yes]" on a system-pre-filled reassignment drifts toward auto-execution. Execution is a separate, explicitly-governed decision.

**Audit as asset:** Every write records who, which client, what input, what was written. NBA-linked writes additionally tag the NBA action ID. That turns the audit log into labeled training data for NBA's Phase 3 feedback loop ("when this action was taken, did the deal progress?") — governance and model improvement from the same record.

### Rollout Posture

The system reads intelligence from day one, and earns the right to write it back in Phase 2 — gated, audited, human-confirmed. Prove read value first, open writes only under controls you own. Nobody is asked to trust an agent with write access on faith.

---

## Where Intelligence Sits

The risk across three execution substrates (Fusion / Copilot Studio / MCP) is duplicated intelligence — NBA scoring in Fusion and Janet re-reasoning about priorities in Copilot Studio creates two sources of truth for "what happens next." Resolved by decomposing intelligence into four jobs, each with exactly one home:

| Job | Home | Rule |
|---|---|---|
| Compute (gap rules, pattern benchmarks, risk scoring, priority formula) | NBA engine | One brain. The only place intelligence is calculated. |
| Define (9 TD fields, touchpoint types, stage-gates, revenue formula) | One canonical knowledge base | Authored once; referenced by NBA rules, agents, and MCP schemas — never re-authored per surface. |
| Reason / converse (NLU, orchestration, answer composition) | Copilot agents | Reason about language, not priorities. Translate questions into "read NBA's output," never rank. |
| Access / transport (governed, callable exposure) | MCP server | The doorway, not the brain. Exposes NBA outputs plus the knowledge base. |

**The principle in one line:** Compute once (NBA), define once (knowledge base), expose everywhere (MCP), deliver conversationally (agents) — never recompute downstream.

**Why intelligence must live in the NBA engine, not Copilot:**

*Determinism and explainability.* Revenue decisions cannot vary by model mood. "Score 92 because..." needs a formula, not a vibe.

*Governability.* One brain to audit. An unauditable distributed AI is exactly what the COE claim says should be centralized — so the architecture choice is the ownership claim.

*Cost of change.* Change a stage-gate once, not in four places. "Designing the system that produces intelligence" only exists if intelligence has a single locus to design.

**Enforcement (decided), not discipline:** Agents and MCP are wired to NBA-output tools only — no raw-data-reasoning tools that invite re-derivation. If you changed a stage-gate tomorrow, you should edit exactly two things — NBA logic and the one definition. If it is four, intelligence has leaked.

**Substrate strategy (decided):** Keep three substrates; don't consolidate on aesthetics. Each does a job it is good at — Fusion (scheduled deterministic automation), Copilot Studio (conversation), MCP (access). Monitor for intelligence leakage, not substrate count.

**Quarterly architecture review triggers:** (1) Same logic appears in two substrates — consolidate immediately; (2) integration-glue maintenance crosses a capacity threshold or one substrate's outage breaks another; (3) anyone proposes a fourth substrate — forces a full-stack re-examination.

---

## The NBA Engine

### The Opportunity

Three data points framed the build case:

- 40% of deals at Stage 5+ lacked a started Tech Case at a stage where comparable won deals had one completed
- 3.2 average touchpoint types missing vs. the won-deal pattern at the same GNARR band and stage
- 62% of high-risk deals had no documented risk mitigation plan despite having identified technical blockers

The operating model was well-defined. The data was already in TPS Central. What was missing was the intelligence layer connecting the two.

### Revenue Intelligence Mapping

| RI Capability | NBA Module | What It Does |
|---|---|---|
| Sense | Hydrate deal context | Pulls 9 TD fields, stage, GNARR, close quarter, touchpoints, account context into one record |
| Predict (gaps) | Gap detector (rules) | Field state vs. stage-gate expectation — "start tech case," "assess tech fit" |
| Predict (patterns) | Pattern matcher | Touchpoint sequence vs. won-deal benchmarks by GNARR band (e.g., 83% of won $1-3M Stage 5 deals had an Architecture Review) |
| Prescribe | Risk scorer + ranking | Priority = Impact x Urgency x (1/Effort) x GNARR weight, normalized 0-100; top 3 actions written back |

### Engine Modules

**Gap Detector** (rule-based, no ML required)
Compares each deal's current field state against what the operating model requires at that sales stage. If a deal at Stage 5 has Opp Tech Case = "Not Started," the gap detector emits the action. Always-on rules apply regardless of stage: Tech Risk rated High with empty mitigation field, or GNARR exceeding $3M with Expert SC rather than EA assigned.

**Pattern Matcher** (historical benchmark analysis)
Segments historical closed-won deals into cohorts by GNARR band, product mix, and industry vertical. Extracts the touchpoint sequence — which types were completed at which stage. Identifies touchpoint types with high win-rate correlation that are missing. Benchmarks built as a one-time analysis in PowerBI, stored as reference tables. Recalibrated quarterly in Phase 3.

**Risk Scorer** (urgency weighting)
Evaluates proximity to close quarter, current tech risk level, and whether documented blockers have a resolution plan. Outputs a time-pressure multiplier that adjusts the final priority score for urgent situations.

### Scoring Formula

**Priority = Impact x Urgency x (1/Effort) x GNARR weight**

| Factor | What It Measures | Example Values |
|---|---|---|
| Impact | How much the action moves the deal if completed | Closes validation gap = 0.9, Matches won pattern = 0.7, Hygiene = 0.3 |
| Urgency | Time pressure from close quarter and risk level | CQ close + high risk = 1.0, No pressure = 0.2 |
| 1/Effort | Inverse of effort required | Update a field = 0.1, Schedule meeting = 0.4, Run a POC = 0.9 |
| GNARR weight | Slight multiplier for larger deals | $4.7M deal = 1.05x, $310K deal = 1.00x |

### Projected Impact

| Metric | Target | Mechanism |
|---|---|---|
| Tech Win rate | +15% | Gaps caught and acted on before they become blockers |
| Gap detection time | -40% | Automated detection replaces manual weekly review |
| FLM deal review prep | 2x efficiency | Pre-built action summary replaces manual aggregation |
| TD field completeness | +25% | Monday/Friday nudges close gaps on missing data points |

### Implementation Phases

**Phase 1: Gap Detector (Weeks 1-4)** — Purely rule-based Fusion automations. No ML, no historical analysis. Stage-gate rules, action card custom object in Workfront, notification routing, pilot team deployment.

**Phase 2: Pattern Matcher (Weeks 5-10)** — One-time historical analysis of closed-won deals in PowerBI to build touchpoint benchmarks. FLM NBA Action Center dashboard.

**Phase 3: Feedback Loop (Weeks 11-16)** — Completion tracking, outcome correlation analysis, quarterly weight recalibration. Audit log tagged to NBA action IDs feeds model improvement.

---

## AI Agent Strategy

### The Core Shift

Today, TPS Ops is the intermediary between data and decisions — assembling reports, answering questions, responding to support requests, and facilitating cadences. The agent strategy eliminates that intermediary role. GTM leaders self-serve intelligence. Tech Drivers get real-time guidance. Platform questions get instant answers. The team shifts from producing intelligence to designing the systems that produce it.

### Three Agents, Not More — Not Fewer

Early design explored a separate "TPS Action Agent" for next best actions. That capability already lives across two agents: the TPS Central Agent surfaces deal-level actions to Tech Drivers, and Janet surfaces portfolio-level actions to leadership. A fourth conversational agent creates confusion, not capability.

Collapsing Janet and the Support Agent would conflate two distinct jobs: "what's happening with my business" (intelligence) vs. "how do I use this system" (enablement). Different knowledge bases, different audiences, different answer patterns.

### TPS Central Agent (Opportunity Agent)

The Tech Driver's AI-powered interface for keeping TPS Central current and getting real-time deal guidance.

**Evolution path:**

| Layer | Capability | Timeline |
|---|---|---|
| Layer 1: Touchpoint Logging | Reads TD calendar, classifies against touchpoint types, resolves to correct opp, writes to Workfront | Weeks 1-4 |
| Layer 2: TD Field Updates | Interprets natural language to update 9 TD validation fields | Weeks 5-8 |
| Layer 3: NBA Read-Back | After updates, checks for open NBA actions and surfaces top recommendation | Weeks 9-12 |
| Layer 4: Full Agent | Request queries, document context, deal prep. Primary operating interface. | Q2+ |

**Example interaction (Layer 3):**

> Tech Driver: "Just finished the architecture review with Globex. Tech fit is confirmed — aligned on AEP + GenStudio. Seeing risk around their legacy integration layer though."
>
> Agent: "Got it. Logged: Architecture Review touchpoint on DR-4521, Opp Tech Fit Confirmed, Opp Architecture Design Complete, Opp Tech Risk High. Since Tech Risk is now High with no mitigation plan, your next best action is to document the risk mitigation path. This deal closes in 6 weeks — time-sensitive. Want me to help draft the summary?"

One conversation. Four system writes. One forward-looking recommendation. Zero time in the Workfront UI.

### Janet — Ask Janet Agent

The always-available operational analyst for GTM leadership. Answers questions about pipeline, team performance, deal health, capacity, and data quality using live system data and operating model knowledge.

| Category | Example Questions |
|---|---|
| Pipeline and Deals | Which $1M+ deals stalled? What's my pipeline by close quarter? |
| Team and Capacity | Who's overloaded? What's our request queue depth? |
| TD Coverage | Coverage gap in financial services? EAs on the right deals? |
| Adoption and Hygiene | Team hygiene score? Who hasn't updated this week? |
| Actions and Priorities | What should I focus on this week? Which deals need attention? |
| Trends | This quarter vs. last? Touchpoint volume trending up? |

Phase 1 reads Friday Package SharePoint artifacts — a configuration exercise, not a development project. Phase 2 replaces SharePoint reads with live API queries when adoption proves out (50+ questions/week target).

### TPS Central Support Agent

The automated help desk for TPS Central. Answers "how do I use this system" questions instantly across 93 documented intents and approximately 400 trigger phrases.

Knowledge base is already built: 4 Job Aid JSON files (GSV, Manager, Account Management, Reporting), Master Routing Index, Bot Response Schema, and TPS Central Knowledge Base. Estimated 1-2 weeks to pilot deployment. Fastest win in the roadmap.

### Friday GTM Briefing Package

Automated weekly delivery: one branded deck plus two Excel workbooks per GTM vertical, every Friday at EOD. Zero human touch.

**Briefing deck sections:** Executive View with 4 headline KPIs and AI-generated narrative, $1M+ Pipeline by urgency, Tech Driver Review with coverage matrix, Request Health with load balance heat map, Adoption and Hygiene scorecard, Actions and Focus with top 3-5 actions for next week.

**Capacity recovery from automation:**

| Activity | Hours Recovered |
|---|---|
| Weekly briefing packages | 15-20+ hrs/week |
| Ad hoc leadership requests (Janet) | 5-10 hrs/week |
| Support channel answering | 5-8 hrs/week |
| TD hygiene follow-up | 2-4 hrs/week |

### The Flywheel

| Component | Feeds | How |
|---|---|---|
| TPS Central Agent | Janet + Friday Package + Support Agent | Every update improves data quality — better intelligence, fewer support questions |
| Friday Package | Janet | Weekly SharePoint artifacts become Janet's knowledge source |
| Janet | TPS Central Agent | Surfacing gaps creates urgency for TDs to update via the Agent |
| Support Agent | All agents (via adoption) | Removing friction from "how do I" increases data volume and quality |

### Implementation Roadmap

| Phase | Timeline | Delivers |
|---|---|---|
| 1: Touchpoint Agent + Support Agent | Weeks 1-4 | Layer 1 pilot. Support Agent to #tpscentral-support. |
| 2: TD Fields + Friday Package v1 | Weeks 5-8 | Layer 2. First automated Friday Package for pilot vertical. |
| 3: NBA Read-Back + Janet Phase 1 | Weeks 9-12 | Layer 3. Janet SharePoint-grounded Q&A. |
| 4: Scale + Intelligence | Q2 | All verticals. Janet live data. Agent Layer 4. Zero TPS Ops hours on reporting or routine support. |

---

## KPI Scorecard

TPS Strategy and Business Operations owns the end-to-end operating model for Technical Pre-Sales — translating GTM strategy into prioritized big bets, measurable execution, and data-driven decisions.

**Design principle: Signals must change decisions. If a TPS signal does not change a decision, we do not measure it.**

The shift: Activity to Decision signals. Lagging metrics to Early risk identification. Dashboards to Action loops.

| Pillar | What We Measure | Why It Matters |
|---|---|---|
| 1. Adoption and Engagement | Active users (% TPS by role/region), deals with required fields complete (%), touchpoint freshness/recency | TPS Central is the system of record and must be used consistently |
| 2. Trust and Data Integrity | Quarterly NPS score, request-to-assignment SLA adherence, early risk identification rate (pre-commit) | Leaders and field trust the data enough to act |
| 3. Signal Quality and Actionability | % of TPS insights acted on, Tech Fit/Tech Win/Tech Risk coverage, insight-to-action cycle time | Signals drive decisions, not just reporting |
| 4. Capacity and Scale Effectiveness | HC forecast accuracy and predictability, demand vs. capacity alignment, mix of 1:1 vs. scaled coverage | Right work, right coverage model, right time |
| 5. Business and Strategic Impact | Deal velocity/cycle time reduction, cost-to-serve per engagement trend, product roadmap influence via DDOM insights | TPS drives revenue, efficiency, and GTM decisions |

---

## Operating Model Reference

### The Technical Sales Cycle

| Stage | Name | Key Technical Gates |
|---|---|---|
| Stage 0 | Account Planning | |
| Stages 1/2 | Prospecting / Evaluating | |
| Stage 3 | Qualifying | Tech Fit |
| Stage 4 | Influencing | |
| Stage 5 | Solutioning | Tech Case, North Star Architecture |
| Stages 6/7 | Negotiating / Closing | Tech Win confirmed |
| Stage 8a | Launch Health | |
| Stage 8b | Run / Operate | |
| Stage 8c | Renew / Expand | |

Three key qualifiers gate progression: Tech Fit (pipeline is clean, gaps identified, Adobe can deliver), Tech Engaged (technical stakeholders identified and willing to engage), Tech Win (all technical validation complete, no blockers, outstanding risks documented). Tech Risk is always-on at four levels: No Risk / Low / Medium / High.

### The 9 Tech Driver Fields

The Tech Driver is the assigned SC or EA responsible for driving the customer's path to Technical Win. They maintain 9 fields per opportunity:

1. Tech Driver Disengaged
2. Opp Tech Fit
3. Opp Tech Win
4. Opp Architecture Design
5. POV Status
6. Opp Tech Case
7. Opp Tech Risk
8. Opp Tech Risk Category
9. Opp Tech Risk Comments Mitigation

### The 22 Touchpoint Types

Every customer interaction maps to exactly one standardized type: 1:Many Demo, Architecture Review, Business Case Presentation, CEC/Adobe Day/SBR, Customer Journey, Customer Meeting, Discovery, Executive Pitch, Hands-on Lab, Internal Alignment, Live Demo, Marketing Event, NSOM, Post-Sales Support, Proof of Concept, Prototype, Repeatable Demo, RFX Advisory, Technical Account Review, Use Case Workshop, Vision Demo, Vision Planning Workshop.

### DDOM Data Architecture

The TPS DDOM data lake unifies four source systems via ADX / DPASS:

| Data Source | Via | Content |
|---|---|---|
| Workfront RM | DPASS (CANWF) | 9 TD validation fields, touchpoint history, request status |
| D365 CRM | Calcium DB via ADX | GNARR, sales stage, close quarter, pipeline metrics |
| UDA | ADX import | Customer profile, corporate hierarchy, master data |
| Finsys DB | ADX import | Employee hierarchy for resource fit recommendations |

Data flows: downstream (CRM to TPS Central for deal facts) and upstream (TPS Central to CRM for technical progression fields via bi-directional Tech Driver sync). Booking and account/opportunity data refresh every 24 hours.

### Current State Honest Assessment

AI-native on paper, bolted-on in production. The DDOM data lake and NBA engine are specified in Phase 3. The TPS Opportunity Agent is live. Janet, the Support Agent, and the Friday Package are in design. The Workfront MCP validation exercise — a single half-day pass covering reads on custom fields and writes on Issues — is the one remaining action that cannot be resolved on paper. It is the go/no-go on the MCP premise: MCP-first if reads are covered, REST interim if not.

The strategic imperative: stop scaling the COE narrative and ship one plane to production. Make the invisible legible; let the working proof create the mandate.

---

*Consolidated Portfolio Reference | June 2026*
*Built by Beckie Cole, Director of Strategy and Business Operations, Technical Pre-Sales, Adobe*
