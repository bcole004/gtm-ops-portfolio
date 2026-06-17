import React, { useState, useEffect, useRef } from "react";

// ============================================================
// REVOPS AI LAB — a self-contained, hands-on environment.
// One company (Northwind Cloud). Five modules. Live model.
// You build, measure, govern. Each module ends with a
// deliverable and an "un-bullshittable bar" you must clear.
// ============================================================

const STORAGE_KEY = "northwind_revops_lab_v1";
const MODEL = "claude-sonnet-4-20250514";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.lab {
  --ink: #0b0b11;
  --panel: #15151f;
  --panel-2: #1c1c28;
  --line: #2c2c3a;
  --line-soft: #232330;
  --text: #ece9e2;
  --muted: #9794a6;
  --faint: #66647a;
  --gold: #e0a64d;
  --gold-dim: #b9893f;
  --green: #6fbf8f;
  --red: #d97a72;
  --blue: #7bb0c9;
  background: var(--ink);
  color: var(--text);
  font-family: 'Hanken Grotesk', sans-serif;
  min-height: 100vh;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

.wrap { max-width: 760px; margin: 0 auto; padding: 0 18px 120px; }

.serif { font-family: 'Fraunces', serif; }
.mono { font-family: 'JetBrains Mono', monospace; }

/* Header */
.masthead {
  padding: 38px 0 22px;
  border-bottom: 1px solid var(--line);
  position: relative;
}
.masthead::before {
  content: "";
  position: absolute; left: 0; top: 38px; width: 34px; height: 3px;
  background: var(--gold);
}
.kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 14px;
}
.title { font-family: 'Fraunces', serif; font-weight: 600; font-size: 34px; line-height: 1.05; letter-spacing: -0.01em; }
.subtitle { color: var(--muted); font-size: 15px; margin-top: 10px; max-width: 56ch; }

/* Progress */
.progress-row { display: flex; gap: 6px; margin-top: 22px; }
.progress-seg { flex: 1; height: 4px; background: var(--line-soft); border-radius: 2px; overflow: hidden; }
.progress-seg.done { background: var(--gold); }

/* Nav pills */
.nav { display: flex; gap: 8px; overflow-x: auto; padding: 18px 0; position: sticky; top: 0; background: var(--ink); z-index: 20; border-bottom: 1px solid var(--line-soft); margin-bottom: 8px; }
.nav::-webkit-scrollbar { display: none; }
.pill {
  flex: 0 0 auto; padding: 8px 14px; border: 1px solid var(--line);
  border-radius: 999px; background: transparent; color: var(--muted);
  font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap;
  transition: all .15s ease; display: flex; align-items: center; gap: 7px;
}
.pill:hover { border-color: var(--gold-dim); color: var(--text); }
.pill.active { background: var(--gold); color: #1a1408; border-color: var(--gold); }
.pill-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; opacity: .8; }
.pill .check { color: var(--green); font-size: 13px; }
.pill.active .check { color: #1a1408; }

/* Sections */
.module { padding: 26px 0; animation: rise .35s ease; }
@keyframes rise { from { opacity: 0; transform: translateY(8px);} to {opacity:1; transform:none;} }
.mod-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--faint); margin-bottom: 8px; }
.mod-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 14px; line-height: 1.1; }
.lede { color: var(--muted); font-size: 15px; margin-bottom: 22px; }

.card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 20px; margin-bottom: 18px; }
.card-2 { background: var(--panel-2); }
.card h4 { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; margin-bottom: 12px; }
.card p { font-size: 14.5px; color: var(--text); margin-bottom: 10px; }
.card p.note { color: var(--muted); font-size: 13.5px; }

.tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; padding: 3px 9px; border-radius: 5px; border: 1px solid var(--line); color: var(--muted); margin: 0 6px 6px 0; }
.tag.gold { color: var(--gold); border-color: var(--gold-dim); }

.datablock { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; background: #0e0e15; border: 1px solid var(--line-soft); border-left: 2px solid var(--gold); border-radius: 8px; padding: 14px 16px; color: var(--text); white-space: pre-wrap; line-height: 1.7; }
.datablock .k { color: var(--gold); }
.datablock .c { color: var(--blue); }

label.field-label { display: block; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }

textarea, input.txt {
  width: 100%; background: #0e0e15; border: 1px solid var(--line);
  border-radius: 9px; color: var(--text); font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px; padding: 13px 14px; resize: vertical; line-height: 1.6;
}
textarea:focus, input.txt:focus { outline: none; border-color: var(--gold); }
textarea::placeholder, input.txt::placeholder { color: var(--faint); }

.btn {
  background: var(--gold); color: #1a1408; border: none; border-radius: 9px;
  padding: 12px 20px; font-family: 'Hanken Grotesk', sans-serif; font-weight: 700;
  font-size: 14px; cursor: pointer; transition: all .15s; letter-spacing: .01em;
}
.btn:hover { background: #ecb95f; }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.btn.ghost { background: transparent; color: var(--gold); border: 1px solid var(--gold-dim); }
.btn.ghost:hover { background: rgba(224,166,77,0.08); }
.btn.small { padding: 8px 14px; font-size: 12.5px; }

.btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; align-items: center; }

.output { background: #0e0e15; border: 1px solid var(--line); border-radius: 10px; padding: 16px; margin-top: 16px; font-size: 14px; white-space: pre-wrap; line-height: 1.65; }
.output .out-label { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; display: block; }

.spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(26,20,8,0.3); border-top-color: #1a1408; border-radius: 50%; animation: spin .7s linear infinite; vertical-align: -2px; margin-right: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }

.bar { border: 1px solid var(--gold-dim); border-radius: 12px; padding: 18px 20px; margin-top: 22px; background: linear-gradient(180deg, rgba(224,166,77,0.06), rgba(224,166,77,0.01)); }
.bar .bar-h { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
.bar p { font-size: 14.5px; color: var(--text); font-style: italic; font-family: 'Fraunces', serif; }

.step-row { display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid var(--line-soft); flex-wrap: wrap; }
.step-row:last-child { border-bottom: none; }
.step-name { flex: 1; min-width: 140px; font-size: 13.5px; font-weight: 600; }
.step-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--faint); width: 22px; }
.seg-toggle { display: flex; gap: 4px; }
.seg-btn { padding: 5px 9px; font-size: 11px; font-weight: 600; border: 1px solid var(--line); background: transparent; color: var(--muted); border-radius: 6px; cursor: pointer; }
.seg-btn.sel { color: #1a1408; }
.seg-btn.sel.det { background: var(--blue); border-color: var(--blue); }
.seg-btn.sel.agt { background: var(--gold); border-color: var(--gold); }
.seg-btn.sel.hil { background: var(--green); border-color: var(--green); }

.matrix-cell { margin-bottom: 14px; }
.matrix-cell .vname { font-weight: 700; font-size: 14px; margin-bottom: 6px; font-family: 'Fraunces', serif; }

.score-table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px; }
.score-table th { text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); padding: 8px; border-bottom: 1px solid var(--line); }
.score-table td { padding: 10px 8px; border-bottom: 1px solid var(--line-soft); vertical-align: top; }

.saved-flag { font-size: 12px; color: var(--green); font-weight: 600; }
.err { color: var(--red); font-size: 13px; margin-top: 10px; }

.intro-grid { display: grid; gap: 12px; }
.fact { display: flex; gap: 12px; align-items: baseline; }
.fact .fk { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); flex: 0 0 92px; padding-top: 2px; }
.fact .fv { font-size: 14px; }

.hint { font-size: 13px; color: var(--muted); border-left: 2px solid var(--line); padding-left: 12px; margin: 12px 0; }
.foot { margin-top: 40px; padding-top: 22px; border-top: 1px solid var(--line); font-size: 12.5px; color: var(--faint); }
a.lnk { color: var(--gold); }
`;

// ---- Northwind scenario data ----
const COMPANY = {
  name: "Northwind Cloud",
  facts: [
    ["Profile", "$420M ARR enterprise SaaS — a data-observability platform. ~1,400 employees."],
    ["GTM motion", "Enterprise + mid-market. AE / SE / SDR teams. Salesforce CRM, HubSpot marketing, 6sense intent in trial."],
    ["The pain", "Inbound leads routed by hand. Qualification is inconsistent. SDR capacity is maxed. The board wants 'AI in GTM' this quarter."],
    ["Data reality", "~30% of CRM accounts are duplicate or stale. Enrichment is patchy. There is no single source of truth across marketing and CRM."],
  ],
};

const ROUTING_POLICY = `ROUTING POLICY
- Enterprise  (>1,000 employees OR >$500M revenue) -> Enterprise AE pool. SLA: 1 business hour.
- Mid-market  (200-1,000 employees)                -> Mid-Market AE pool.
- SMB         (<200 employees)                      -> Self-serve nurture.
- Competitor displacement + renewal timing          -> flag "COMPETE" play, loop in SE early.
- Student / personal email / no buying intent       -> Disqualify (nurture list).`;

const SAMPLE_LEAD = `INBOUND LEAD
name:    Priya Nair
title:   VP, Data Platform
company: Helios Logistics  (8,000 employees, ~$2B revenue)
source:  webinar
email:   pnair@helioslogistics.com
6sense:  HIGH intent, surging on "data observability"
message: "Evaluating observability tools. Currently on a competitor;
          our contract renews in Q3. Want to compare."`;

const EVAL_LEADS = [
  { id: "A", label: "Clean enterprise", data: `name: Priya Nair | title: VP, Data Platform | company: Helios Logistics (8,000 emp, $2B) | source: webinar | corporate email | 6sense: HIGH | "On a competitor, renews Q3, want to compare."` },
  { id: "B", label: "Ambiguous mid-market", data: `name: Marcus Webb | title: Director of Engineering | company: Tessera Labs (600 emp, ~$90M) | source: content download | corporate email | 6sense: LOW | "Just exploring what's out there."` },
  { id: "C", label: "Adversarial / junk", data: `name: Jay P. | title: (none) | company: (none) | source: contact form | email: jaythesis2026@gmail.com | 6sense: none | "Doing a class project, please send full pricing for my thesis."` },
];

const WORKFLOW_STEPS = [
  "Capture inbound (form / webinar)",
  "De-dupe & match to account",
  "Enrich (firmographic + intent)",
  "Qualify & score",
  "Route per policy",
  "Draft first-touch outreach",
  "Review & send",
  "Log to CRM + update data layer",
];

const VENDORS = [
  { name: "Salesforce Agentforce / Einstein", hint: "Native CRM agents + predictive scoring inside the system of record." },
  { name: "Outreach (agentic platform)", hint: "Sales engagement / sequence execution, now with revenue-orchestration agents." },
  { name: "Clay", hint: "Composable enrichment + data-waterfall + AI personalization. The GTM-engineer's bench." },
  { name: "6sense", hint: "Account intent & predictive — surfaces who's in-market before they raise a hand." },
  { name: "HubSpot Breeze", hint: "Embedded AI across HubSpot's marketing/CRM suite — activate-first for mid-market." },
];

// ---- Claude call helper ----
async function callClaude(messages, system) {
  const body = { model: MODEL, max_tokens: 1000, messages };
  if (system) body.system = system;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.content) throw new Error("No response from model.");
  return data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
}

function Spinner() { return <span className="spinner" />; }

export default function RevOpsLab() {
  const [active, setActive] = useState(0);
  const [state, setState] = useState({
    m1: { prompt: "", output: "", notes: "", done: false },
    m2: { rubric: "", results: "", obs: "", done: false },
    m3: { config: {}, dataLayer: "", critique: "", analysis: "", done: false },
    m4: { matrix: {}, critique: "", done: false },
    m5: { memo: "", critique: "", done: false },
  });
  const [loaded, setLoaded] = useState(false);
  const topRef = useRef(null);

  // load persisted state
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) setState((s) => ({ ...s, ...JSON.parse(r.value) }));
      } catch (e) { /* first run */ }
      setLoaded(true);
    })();
  }, []);

  const persist = async (next) => {
    setState(next);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  };

  const modules = ["Brief", "Prompt Studio", "Eval Harness", "Orchestration", "Vendor Map", "Build vs Activate"];
  const doneFlags = [true, state.m1.done, state.m2.done, state.m3.done, state.m4.done, state.m5.done];

  const go = (i) => { setActive(i); if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="lab">
      <style>{styles}</style>
      <div className="wrap" ref={topRef}>
        <header className="masthead">
          <div className="kicker">RevOps AI Lab · Hands-On</div>
          <h1 className="title">The Un-Bullshittable<br />Operator's Workbench</h1>
          <p className="subtitle">
            One company. Five builds. You design the prompts, measure them, architect the agents, and make the build-vs-activate call — against a live model, so it actually runs. Your work saves automatically.
          </p>
          <div className="progress-row">
            {doneFlags.slice(1).map((d, i) => (
              <div key={i} className={"progress-seg" + (d ? " done" : "")} />
            ))}
          </div>
        </header>

        <nav className="nav">
          {modules.map((m, i) => (
            <button key={i} className={"pill" + (active === i ? " active" : "")} onClick={() => go(i)}>
              <span className="pill-num">{i === 0 ? "00" : "0" + i}</span>
              {m}
              {i > 0 && doneFlags[i] && <span className="check">✓</span>}
            </button>
          ))}
        </nav>

        {!loaded ? (
          <div className="module"><p className="lede">Loading your workbench…</p></div>
        ) : (
          <>
            {active === 0 && <Brief go={go} />}
            {active === 1 && <Module1 state={state} persist={persist} go={go} />}
            {active === 2 && <Module2 state={state} persist={persist} go={go} />}
            {active === 3 && <Module3 state={state} persist={persist} go={go} />}
            {active === 4 && <Module4 state={state} persist={persist} go={go} />}
            {active === 5 && <Module5 state={state} persist={persist} />}
          </>
        )}

        <div className="foot">
          RevOps AI Lab · scenario: {COMPANY.name}. Model calls run live; treat outputs as you would any AI system — verify, don't trust. Your deliverables persist across sessions on this device.
        </div>
      </div>
    </div>
  );
}

// ---------------- MODULE 0: BRIEF ----------------
function Brief({ go }) {
  return (
    <section className="module">
      <div className="mod-label">Module 00 · Orientation</div>
      <h2 className="mod-title">Meet {COMPANY.name}</h2>
      <p className="lede">Everything you build runs against this one company. Same context, five angles — so by the end you have a connected story, not five toy demos.</p>
      <div className="card">
        <div className="intro-grid">
          {COMPANY.facts.map(([k, v], i) => (
            <div className="fact" key={i}><span className="fk">{k}</span><span className="fv">{v}</span></div>
          ))}
        </div>
      </div>
      <div className="card card-2">
        <h4>What you'll walk away able to defend</h4>
        <span className="tag gold">Prompt design</span>
        <span className="tag gold">Eval harness</span>
        <span className="tag gold">Agent orchestration</span>
        <span className="tag gold">Vendor landscape</span>
        <span className="tag gold">Build vs. activate</span>
        <p className="note" style={{ marginTop: 12 }}>Each module ends with a one-line bar. If you can say that line in an interview and back it with the artifact you built here, you've cleared it.</p>
      </div>
      <div className="btn-row"><button className="btn" onClick={() => go(1)}>Start Module 01 →</button></div>
    </section>
  );
}

// ---------------- MODULE 1: PROMPT STUDIO ----------------
function Module1({ state, persist, go }) {
  const m = state.m1;
  const [prompt, setPrompt] = useState(m.prompt);
  const [output, setOutput] = useState(m.output);
  const [notes, setNotes] = useState(m.notes);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const run = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setErr(""); setOutput("");
    try {
      const sys = prompt;
      const user = `Here is the routing policy and an inbound lead. Qualify the lead and decide where it routes.\n\n${ROUTING_POLICY}\n\n${SAMPLE_LEAD}`;
      const res = await callClaude([{ role: "user", content: user }], sys);
      setOutput(res);
    } catch (e) { setErr("Run failed: " + e.message); }
    setLoading(false);
  };

  const save = () => {
    persist({ ...state, m1: { prompt, output, notes, done: !!(prompt && output && notes) } });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="module">
      <div className="mod-label">Module 01</div>
      <h2 className="mod-title">Prompt Design Studio</h2>
      <p className="lede">You're standing up Northwind's AI lead-qualification assistant. The whole game: turn a fuzzy instruction into a system prompt that routes <em>consistently</em> — with structure and guardrails. Write it, run it against a real lead, watch where it slips, tighten it.</p>

      <div className="card">
        <h4>The inputs the assistant will receive</h4>
        <div className="datablock">{ROUTING_POLICY}</div>
        <div className="datablock" style={{ marginTop: 12 }}>{SAMPLE_LEAD}</div>
      </div>

      <div className="hint">Watch for: does it catch that Priya is enterprise <em>and</em> a competitor-displacement / renewal play that needs an SE? A vague prompt routes her as a generic enterprise lead and drops the COMPETE signal. Force the structure you want in the output.</div>

      <div className="card">
        <label className="field-label">Your system prompt</label>
        <textarea rows={8} value={prompt} onChange={(e) => setPrompt(e.target.value)}
          placeholder={`You are Northwind's lead-qualification assistant. For each lead, return:\n1. Segment (Enterprise / Mid-Market / SMB) + the rule that decided it\n2. Plays to flag (e.g. COMPETE) with the signal you used\n3. Routing destination + SLA\n4. Whether an SE should be looped in, and why\nIf data is missing or the lead looks like junk, say so — do not guess.`} />
        <div className="btn-row">
          <button className="btn" onClick={run} disabled={loading || !prompt.trim()}>
            {loading ? <><Spinner />Running…</> : "Run against the lead"}
          </button>
          {output && <span className="note" style={{ fontSize: 12 }}>Re-run after each edit and compare.</span>}
        </div>
        {err && <div className="err">{err}</div>}
        {output && (
          <div className="output">
            <span className="out-label">Assistant output</span>{output}
          </div>
        )}
      </div>

      <div className="card card-2">
        <label className="field-label">Deliverable — what changed the output?</label>
        <p className="note">In 2–3 sentences: which edit most improved consistency, and what guardrail did you add to stop it guessing?</p>
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ marginTop: 10 }}
          placeholder="e.g. Forcing a numbered structure + 'cite the rule that decided the segment' eliminated drift. Added 'if email is personal and no buying intent, disqualify — do not infer a company' to kill hallucinated firmographics." />
        <div className="btn-row">
          <button className="btn ghost" onClick={save}>Save deliverable</button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </div>

      <div className="bar">
        <div className="bar-h">The un-bullshittable bar</div>
        <p>"I can explain why a vague prompt produces inconsistent routing, and exactly which specificity and guardrails fix it — because I built it and watched it drift."</p>
      </div>
      <div className="btn-row"><button className="btn" onClick={() => go(2)}>Next: Eval Harness →</button></div>
    </section>
  );
}

// ---------------- MODULE 2: EVAL HARNESS ----------------
function Module2({ state, persist, go }) {
  const m = state.m2;
  const [rubric, setRubric] = useState(m.rubric);
  const [results, setResults] = useState(m.results ? JSON.parse(m.results) : null);
  const [obs, setObs] = useState(m.obs);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);
  const prompt = state.m1.prompt;

  const run = async () => {
    if (!rubric.trim()) return;
    if (!prompt) { setErr("Build your prompt in Module 01 first — the harness runs it."); return; }
    setLoading(true); setErr(""); setResults(null);
    try {
      const rows = [];
      for (const lead of EVAL_LEADS) {
        const user = `${ROUTING_POLICY}\n\nINBOUND LEAD\n${lead.data}`;
        const out = await callClaude([{ role: "user", content: user }], prompt);
        rows.push({ id: lead.id, label: lead.label, lead: lead.data, out });
      }
      const scorePrompt = `You are a strict QA evaluator for a RevOps AI assistant. Score each output against the user's rubric. Be skeptical and specific. Return ONLY valid JSON, no markdown, no prose: an array of objects with keys: "id", "score" (PASS / PARTIAL / FAIL), "why" (one sentence on the single biggest issue or strength).\n\nRUBRIC:\n${rubric}\n\nOUTPUTS TO SCORE:\n${rows.map((r) => `[Lead ${r.id} — ${r.label}]\n${r.out}`).join("\n\n---\n\n")}`;
      const raw = await callClaude([{ role: "user", content: scorePrompt }]);
      let scores = [];
      try { scores = JSON.parse(raw.replace(/```json|```/g, "").trim()); } catch (e) { scores = []; }
      const merged = rows.map((r) => {
        const s = scores.find((x) => x.id === r.id) || {};
        return { ...r, score: s.score || "—", why: s.why || raw.slice(0, 160) };
      });
      setResults(merged);
    } catch (e) { setErr("Harness failed: " + e.message); }
    setLoading(false);
  };

  const save = () => {
    persist({ ...state, m2: { rubric, results: results ? JSON.stringify(results) : "", obs, done: !!(rubric && results && obs) } });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const color = (s) => s === "PASS" ? "var(--green)" : s === "FAIL" ? "var(--red)" : "var(--gold)";

  return (
    <section className="module">
      <div className="mod-label">Module 02</div>
      <h2 className="mod-title">Eval Harness</h2>
      <p className="lede">You can't govern what you can't measure. Define what "good" means as a rubric, then run your Module 01 prompt against three leads — a clean one, an ambiguous one, and a junk one designed to break it — and get every output scored. This is the discipline that separates "we use AI" from "we govern AI."</p>

      <div className="card">
        <h4>The three test cases</h4>
        {EVAL_LEADS.map((l) => (
          <div className="datablock" key={l.id} style={{ marginBottom: 10 }}>
            <span className="k">Lead {l.id} — {l.label}</span>{"\n"}{l.data}
          </div>
        ))}
      </div>

      <div className="card">
        <label className="field-label">Your rubric — define ~4 criteria for a "good" output</label>
        <textarea rows={6} value={rubric} onChange={(e) => setRubric(e.target.value)}
          placeholder={`1. Correct segment, with the deciding rule cited.\n2. Catches the COMPETE play when displacement + renewal timing are present.\n3. Refuses to invent firmographics; disqualifies junk instead of guessing.\n4. Output is structured and consistent enough to route automatically.`} />
        <div className="btn-row">
          <button className="btn" onClick={run} disabled={loading}>
            {loading ? <><Spinner />Running 3 leads + scoring…</> : "Run the harness"}
          </button>
        </div>
        {err && <div className="err">{err}</div>}
      </div>

      {results && (
        <div className="card">
          <h4>Eval results</h4>
          <table className="score-table">
            <thead><tr><th>Lead</th><th>Score</th><th>Finding</th></tr></thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong><br /><span style={{ color: "var(--muted)", fontSize: 11 }}>{r.label}</span></td>
                  <td><span className="mono" style={{ color: color(r.score), fontWeight: 600 }}>{r.score}</span></td>
                  <td style={{ color: "var(--muted)" }}>{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note" style={{ marginTop: 14 }}>The junk lead (C) is the real test. If your prompt invented a company or routed it as a real lead, your guardrails aren't tight enough — go back to Module 01.</p>
        </div>
      )}

      <div className="card card-2">
        <label className="field-label">Deliverable — failure-mode observations</label>
        <textarea rows={4} value={obs} onChange={(e) => setObs(e.target.value)}
          placeholder="Where did it break, and what would you change in the prompt or add as a downstream check before trusting this in production?" />
        <div className="btn-row">
          <button className="btn ghost" onClick={save}>Save deliverable</button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </div>

      <div className="bar">
        <div className="bar-h">The un-bullshittable bar</div>
        <p>"I can define what 'good' means for an AI revenue task, run it against adversarial cases, and produce evidence of exactly where it breaks — not a vibe, a scored table."</p>
      </div>
      <div className="btn-row"><button className="btn" onClick={() => go(3)}>Next: Orchestration →</button></div>
    </section>
  );
}

// ---------------- MODULE 3: ORCHESTRATION ----------------
function Module3({ state, persist, go }) {
  const m = state.m3;
  const [config, setConfig] = useState(m.config && Object.keys(m.config).length ? m.config : {});
  const [dataLayer, setDataLayer] = useState(m.dataLayer);
  const [critique, setCritique] = useState(m.critique);
  const [analysis, setAnalysis] = useState(m.analysis);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const setStep = (i, val) => setConfig((c) => ({ ...c, [i]: val }));

  const run = async () => {
    setLoading(true); setErr(""); setCritique("");
    const lines = WORKFLOW_STEPS.map((s, i) => `${i + 1}. ${s} — ${config[i] || "UNSET"}`).join("\n");
    const user = `I'm architecting Northwind's inbound revenue workflow as an agent orchestration. Each step is classified as Deterministic, Agentic, or Human-in-loop. Here is my design, plus the shared data layer I named.\n\nSTEPS:\n${lines}\n\nSHARED DATA LAYER: ${dataLayer || "(none specified)"}\n\nAs a skeptical Head of GTM Engineering, critique this in under 180 words. Specifically: (1) flag any step mis-classified (e.g. something agentic that should be deterministic for auditability, or vice versa); (2) identify the single biggest failure point; (3) call out whether the shared data layer is real or whether this risks the "single-purpose agents with no shared data layer" trap. Be direct.`;
    try {
      const res = await callClaude([{ role: "user", content: user }]);
      setCritique(res);
    } catch (e) { setErr("Critique failed: " + e.message); }
    setLoading(false);
  };

  const save = () => {
    persist({ ...state, m3: { config, dataLayer, critique, analysis, done: !!(Object.keys(config).length >= 6 && dataLayer && critique && analysis) } });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const segLabel = { det: "Determ.", agt: "Agentic", hil: "Human" };

  return (
    <section className="module">
      <div className="mod-label">Module 03</div>
      <h2 className="mod-title">Agent Orchestration Designer</h2>
      <p className="lede">Now the architecture call. Classify every step of the inbound workflow: deterministic (rules/code — auditable), agentic (the model decides), or human-in-loop (a person approves). Then name the <em>shared data layer</em> every step reads and writes. Get it wrong and you've built the most common 2026 failure: clever agents sitting on conflicting data.</p>

      <div className="card">
        <h4>Classify the workflow</h4>
        {WORKFLOW_STEPS.map((s, i) => (
          <div className="step-row" key={i}>
            <span className="step-num">{i + 1}</span>
            <span className="step-name">{s}</span>
            <div className="seg-toggle">
              {["det", "agt", "hil"].map((k) => (
                <button key={k} className={"seg-btn " + k + (config[i] === segLabel[k] ? " sel" : "")}
                  onClick={() => setStep(i, segLabel[k])}>{segLabel[k]}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hint">Auditability test: anything touching money, compliance, or the system of record usually wants to be <strong>deterministic</strong> so it's reviewable. The model is great at enrich, score, and draft — less so at "decide the official account state."</div>

      <div className="card">
        <label className="field-label">Name the shared data layer</label>
        <input className="txt" value={dataLayer} onChange={(e) => setDataLayer(e.target.value)}
          placeholder="e.g. A unified account/contact graph as the single source of truth — every step reads & writes here, not its own copy." />
        <div className="btn-row">
          <button className="btn" onClick={run} disabled={loading || Object.keys(config).length < 4}>
            {loading ? <><Spinner />Stress-testing…</> : "Stress-test the architecture"}
          </button>
        </div>
        {err && <div className="err">{err}</div>}
        {critique && <div className="output"><span className="out-label">Head of GTM Eng — critique</span>{critique}</div>}
      </div>

      <div className="card card-2">
        <label className="field-label">Deliverable — your failure-mode analysis</label>
        <textarea rows={4} value={analysis} onChange={(e) => setAnalysis(e.target.value)}
          placeholder="After the critique: where does this break, and what changed in your design? State the one thing that keeps the agents from drifting out of sync." />
        <div className="btn-row">
          <button className="btn ghost" onClick={save}>Save deliverable</button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </div>

      <div className="bar">
        <div className="bar-h">The un-bullshittable bar</div>
        <p>"I can draw the agent architecture on a whiteboard, say what's agentic vs. deterministic vs. human and why, and name exactly where it breaks without a shared data layer."</p>
      </div>
      <div className="btn-row"><button className="btn" onClick={() => go(4)}>Next: Vendor Map →</button></div>
    </section>
  );
}

// ---------------- MODULE 4: VENDOR MAP ----------------
function Module4({ state, persist, go }) {
  const m = state.m4;
  const [matrix, setMatrix] = useState(m.matrix && Object.keys(m.matrix).length ? m.matrix : {});
  const [critique, setCritique] = useState(m.critique);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const set = (v, field, val) => setMatrix((mx) => ({ ...mx, [v]: { ...mx[v], [field]: val } }));

  const run = async () => {
    setLoading(true); setErr(""); setCritique("");
    const lines = VENDORS.map((v) => {
      const e = matrix[v.name] || {};
      return `${v.name}\n  primary use case: ${e.use || "(blank)"}\n  build vs activate: ${e.ba || "(blank)"}\n  fit for Northwind: ${e.fit || "(blank)"}`;
    }).join("\n\n");
    const user = `I'm a RevOps leader mapping the AI GTM vendor landscape for Northwind Cloud (messy CRM data, no engineers yet, board wants AI in GTM this quarter). Here is my mapping. Critique it in under 200 words: where am I right, where am I off (especially on the build-vs-activate axis), and what's the sharpest one-line stack recommendation you'd give me to defend in a board meeting?\n\n${lines}`;
    try {
      const res = await callClaude([{ role: "user", content: user }]);
      setCritique(res);
    } catch (e) { setErr("Critique failed: " + e.message); }
    setLoading(false);
  };

  const save = () => {
    const filled = VENDORS.filter((v) => matrix[v.name] && matrix[v.name].ba).length;
    persist({ ...state, m4: { matrix, critique, done: !!(filled >= 4 && critique) } });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="module">
      <div className="mod-label">Module 04</div>
      <h2 className="mod-title">Vendor Landscape Map</h2>
      <p className="lede">You don't need to have run all of these. You need a defensible POV: what each is <em>for</em>, and where it sits on the build-vs-activate spectrum. "Build" = composable, you wire it (engineering-heavy). "Activate" = pre-connected, faster to value, less control. For each, place it — then have it pressure-tested.</p>

      <div className="card">
        {VENDORS.map((v) => {
          const e = matrix[v.name] || {};
          return (
            <div className="matrix-cell" key={v.name}>
              <div className="vname">{v.name}</div>
              <p className="note" style={{ marginBottom: 8 }}>{v.hint}</p>
              <label className="field-label">Build or Activate?</label>
              <div className="seg-toggle" style={{ marginBottom: 8 }}>
                {["Activate", "Lean activate", "Build"].map((b) => (
                  <button key={b} className={"seg-btn" + (e.ba === b ? " sel agt" : "")} onClick={() => set(v.name, "ba", b)}>{b}</button>
                ))}
              </div>
              <input className="txt" style={{ marginBottom: 6 }} value={e.use || ""} onChange={(ev) => set(v.name, "use", ev.target.value)} placeholder="Primary use case in one line" />
              <input className="txt" value={e.fit || ""} onChange={(ev) => set(v.name, "fit", ev.target.value)} placeholder="Fit for Northwind — yes/no/later, and why" />
            </div>
          );
        })}
        <div className="btn-row">
          <button className="btn" onClick={run} disabled={loading}>
            {loading ? <><Spinner />Pressure-testing…</> : "Pressure-test my mapping"}
          </button>
        </div>
        {err && <div className="err">{err}</div>}
        {critique && <div className="output"><span className="out-label">Skeptical advisor — critique</span>{critique}</div>}
      </div>

      <div className="card card-2">
        <div className="btn-row">
          <button className="btn ghost" onClick={save}>Save deliverable</button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </div>

      <div className="bar">
        <div className="bar-h">The un-bullshittable bar</div>
        <p>"I can place every major AI GTM platform on the build-vs-activate spectrum, say what each is genuinely for, and justify a stack choice for a company at a specific data and team maturity."</p>
      </div>
      <div className="btn-row"><button className="btn" onClick={() => go(5)}>Final: Build vs Activate →</button></div>
    </section>
  );
}

// ---------------- MODULE 5: BUILD VS ACTIVATE CAPSTONE ----------------
function Module5({ state, persist }) {
  const m = state.m5;
  const [memo, setMemo] = useState(m.memo);
  const [critique, setCritique] = useState(m.critique);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const run = async () => {
    if (!memo.trim()) return;
    setLoading(true); setErr(""); setCritique("");
    const user = `You are a skeptical CRO reading a decision memo from your RevOps leader. The context: Northwind Cloud ($420M ARR), CRM data is ~30% stale/duplicate, the GTM team has one analyst and zero engineers, and the board wants "AI in GTM" by end of quarter.\n\nHere is the memo:\n\n${memo}\n\nCritique it in under 220 words as the CRO would: Is the build-vs-activate recommendation defensible given the data, team, and timeline? Where is the reasoning thin? What risk did they underweight (hint: the data layer)? End with whether you'd approve it and the one change that would make you say yes.`;
    try {
      const res = await callClaude([{ role: "user", content: user }]);
      setCritique(res);
    } catch (e) { setErr("Critique failed: " + e.message); }
    setLoading(false);
  };

  const save = () => {
    persist({ ...state, m5: { memo, critique, done: !!(memo && critique) } });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="module">
      <div className="mod-label">Module 05 · Capstone</div>
      <h2 className="mod-title">The Build-vs-Activate Call</h2>
      <p className="lede">This is the VP-level decision everything else was prep for. Write the decision memo. Northwind's board wants AI in GTM this quarter. Data is messy, you have one analyst and no engineers, the clock is one quarter. Make the call, defend it, and name the risk — then face a skeptical CRO.</p>

      <div className="card">
        <h4>The brief</h4>
        <div className="datablock"><span className="k">Company:</span> Northwind Cloud, $420M ARR{"\n"}<span className="k">Data:</span> ~30% of CRM accounts stale or duplicate; no single source of truth{"\n"}<span className="k">Team:</span> 1 RevOps analyst, 0 engineers{"\n"}<span className="k">Timeline:</span> board wants visible AI-in-GTM impact this quarter{"\n"}<span className="k">Your task:</span> recommend build vs. activate (vs. fix-data-first) and own it</div>
      </div>

      <div className="hint">A strong memo usually leads with the recommendation, ties it to the three constraints (data / team / timeline), names what you'd <em>de-scope</em>, and addresses the data layer before promising agents. "Activate fast on a thin slice while we fix the data foundation in parallel" beats "build the whole engine" almost every time at this maturity — but defend whatever you choose.</div>

      <div className="card">
        <label className="field-label">Your decision memo</label>
        <textarea rows={12} value={memo} onChange={(e) => setMemo(e.target.value)}
          placeholder={`RECOMMENDATION:\n\nWHY (tied to data / team / timeline):\n\nWHAT WE WILL NOT DO THIS QUARTER:\n\nTHE KEY RISK & HOW WE CONTAIN IT:\n\n90-DAY PLAN (3 milestones):`} />
        <div className="btn-row">
          <button className="btn" onClick={run} disabled={loading || !memo.trim()}>
            {loading ? <><Spinner />The CRO is reading…</> : "Send to the skeptical CRO"}
          </button>
        </div>
        {err && <div className="err">{err}</div>}
        {critique && <div className="output"><span className="out-label">CRO response</span>{critique}</div>}
      </div>

      <div className="card card-2">
        <div className="btn-row">
          <button className="btn ghost" onClick={save}>Save deliverable</button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </div>

      <div className="bar">
        <div className="bar-h">The un-bullshittable bar</div>
        <p>"I can make the build-vs-activate call with a rationale tied to data maturity, team, and timeline — defend it to a skeptical CRO, and name the data-layer risk before I'm asked."</p>
      </div>

      <div className="card" style={{ marginTop: 22, borderColor: "var(--gold-dim)" }}>
        <h4>You've cleared the lab.</h4>
        <p className="note">Five artifacts now live in your workbench: a tuned prompt, a scored eval, an agent architecture, a vendor POV, and a board memo. That's your evidence. The line you can now say in any interview: <em>"I don't just sponsor AI in GTM — I've designed the prompts, measured them against adversarial cases, architected the orchestration, and made the build-vs-activate call. Here's the data-layer risk most teams miss."</em></p>
      </div>
    </section>
  );
}
