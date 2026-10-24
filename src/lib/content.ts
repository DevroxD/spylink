export type ServiceIconName = "pentest" | "audit" | "forensics" | "reverse";

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  icon: ServiceIconName;
  tags: string[];
  scope: string[];
  deliverables: string[];
  meta: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "penetration-testing",
    index: "01",
    title: "Penetration Testing",
    short: "Adversary-led testing against your real attack surface.",
    description:
      "We attack the way a determined adversary would — chained, patient, and outside the checklist. Every engagement is scoped to your threat model, executed by hand, and reported with the proof your engineers need to fix it.",
    icon: "pentest",
    tags: ["Web & API", "Internal network", "Cloud & identity", "Social engineering"],
    scope: [
      "External and internal infrastructure testing",
      "Web applications, APIs, and authentication flows",
      "Cloud configuration and identity-path abuse",
      "Assumed-breach and lateral movement simulations",
    ],
    deliverables: [
      "Executive summary with business-impact narrative",
      "Prioritised findings with reproducible proof-of-concept",
      "Remediation guidance reviewed with your engineers",
      "Retest and closure letter at no additional cost",
    ],
    meta: [
      { label: "Typical window", value: "2–4 weeks" },
      { label: "Team", value: "2 senior operators" },
      { label: "Output", value: "Report + retest" },
    ],
  },
  {
    slug: "security-audit",
    index: "02",
    title: "Security Audit",
    short: "A hard look at the systems, controls, and decisions behind the perimeter.",
    description:
      "An audit is not a vulnerability scan with a cover page. We map your architecture against a defensible baseline, trace how data actually moves, and identify the control gaps that no scanner will ever see.",
    icon: "audit",
    tags: ["Architecture", "IAM", "Compliance readiness", "Supply chain"],
    scope: [
      "Architecture and data-flow review",
      "Identity, access, and privilege analysis",
      "Cloud and container configuration baselines",
      "Vendor and software supply-chain exposure",
    ],
    deliverables: [
      "Control gap register with severity and owners",
      "Target-state architecture recommendations",
      "Prioritised 30 / 60 / 90-day remediation roadmap",
      "Board-ready summary and technical appendix",
    ],
    meta: [
      { label: "Typical window", value: "1–3 weeks" },
      { label: "Team", value: "1 lead + 1 reviewer" },
      { label: "Output", value: "Audit pack" },
    ],
  },
  {
    slug: "digital-forensics",
    index: "03",
    title: "Digital Forensics",
    short: "Evidence-grade investigations when the logs are all you have left.",
    description:
      "From a single suspicious endpoint to a full-scope incident, we acquire, preserve, and reconstruct. Our work is built for the room where it matters: court, counsel, or a very uncomfortable board meeting.",
    icon: "forensics",
    tags: ["Incident response", "Disk & memory", "Timeline analysis", "Expert reporting"],
    scope: [
      "Forensically sound acquisition of disk, memory, and mobile",
      "Host and network timeline reconstruction",
      "Malware and persistence analysis",
      "Data-exfiltration and insider-threat investigation",
    ],
    deliverables: [
      "Chain-of-custody and evidence manifest",
      "Technical findings with timelines and artefacts",
      "Plain-language incident narrative",
      "Expert witness support where required",
    ],
    meta: [
      { label: "Response", value: "Under 24h" },
      { label: "Team", value: "DFIR lead + analyst" },
      { label: "Output", value: "Evidence pack" },
    ],
  },
  {
    slug: "reverse-engineering",
    index: "04",
    title: "Reverse Engineering",
    short: "Understand what the binary is really doing before you trust it.",
    description:
      "Firmware, packed malware, undocumented protocols, abandoned vendor software. We take apart the things that will not come with source, document how they work, and tell you exactly where they break.",
    icon: "reverse",
    tags: ["Malware", "Firmware", "Protocols", "Binary diffing"],
    scope: [
      "Static and dynamic binary analysis",
      "Malware family identification and capability mapping",
      "Firmware extraction and filesystem review",
      "Protocol and file-format reverse engineering",
    ],
    deliverables: [
      "Annotated analysis with function-level notes",
      "Indicators of compromise and detection logic",
      "Custom scripts or YARA rules where useful",
      "Knowledge-transfer session with your team",
    ],
    meta: [
      { label: "Typical window", value: "1–6 weeks" },
      { label: "Team", value: "1–2 analysts" },
      { label: "Output", value: "Technical dossier" },
    ],
  },
];

export type EntryKind = "article" | "doc";

export type ContentSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  code?: { label: string; lines: string[] };
};

export type Entry = {
  slug: string;
  kind: EntryKind;
  title: string;
  excerpt: string;
  category: string;
  level: "Foundational" | "Intermediate" | "Advanced";
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  sections: ContentSection[];
};

export const categories = ["All", "Offensive", "Defensive", "Forensics", "Reverse Engineering"] as const;

export const entries: Entry[] = [
  {
    slug: "quiet-cost-of-a-forgotten-subdomain",
    kind: "article",
    title: "The quiet cost of a forgotten subdomain",
    excerpt:
      "Most breaches do not start with a zero-day. They start with an asset nobody remembered owning. Here is how to find your forgotten surface before someone else does.",
    category: "Offensive",
    level: "Intermediate",
    date: "2026-10-18",
    readTime: "9 min",
    tags: ["Recon", "Attack surface", "DNS"],
    featured: true,
    sections: [
      {
        heading: "The asset you forgot is still running",
        body: [
          "Every organisation has a shadow inventory: the staging environment from 2021, the marketing microsite owned by an agency that no longer exists, the VPN concentrator that predates the current identity provider. None of these appear in the architecture diagram. All of them resolve.",
          "Attackers do not begin with your crown jewels. They begin with a spreadsheet of names and a resolver. The first meaningful advantage in an engagement is almost always an asset that the defender did not know was in scope.",
        ],
      },
      {
        heading: "Start with the certificate transparency logs",
        body: [
          "Certificate transparency is the closest thing to a public index of everything your organisation has ever TLS-terminated. Issued certificates leak hostnames, internal naming conventions, and sometimes environments that were never meant to face the internet.",
        ],
        code: {
          label: "recon / ct-logs",
          lines: [
            "curl -s 'https://crt.sh/?q=%25.example.com&output=json' \\",
            "  | jq -r '.[].name_value' \\",
            "  | tr ',' '\\n' \\",
            "  | sort -u",
          ],
        },
      },
      {
        heading: "Resolve, then de-duplicate",
        body: [
          "Passive data is only a lead. Resolve each name, group by IP and ASN, and note which ones share infrastructure with production. A subdomain pointing at a stale cloud IP is not an asset — it is a subdomain takeover waiting for a purchase order.",
          "Keep a living inventory rather than a one-time list. The half-life of an accurate asset register is measured in weeks, not quarters.",
        ],
        bullets: [
          "Resolve A, AAAA, and CNAME records; flag dangling CNAMEs.",
          "Group assets by certificate, ASN, and favicon hash.",
          "Check for cloud storage buckets and forgotten serverless endpoints.",
          "Diff the inventory monthly against the previous snapshot.",
        ],
      },
      {
        heading: "Make ownership non-optional",
        body: [
          "An asset without an owner is an asset without patching, monitoring, or decommissioning. The technical fix is straightforward; the organisational fix is the hard part. Tie every hostname in your inventory to a team, a business purpose, and an expiry date.",
          "When we run external reconnaissance for a client, the most valuable output is rarely the exploit. It is the list of seven services that should have been switched off two years ago.",
        ],
      },
    ],
  },
  {
    slug: "detection-lab-that-survives-real-traffic",
    kind: "article",
    title: "Building a detection lab that survives real traffic",
    excerpt:
      "A detection rule that only fires on your synthetic test is a liability. Design a lab that reproduces noise, drift, and the messy reality of production.",
    category: "Defensive",
    level: "Advanced",
    date: "2026-10-09",
    readTime: "12 min",
    tags: ["Detection engineering", "SIEM", "Purple team"],
    sections: [
      {
        heading: "The demo trap",
        body: [
          "Most detection labs are built to prove that a rule can fire. A clean VM, a single malicious command, a screenshot of an alert. This proves nothing about production, where the same rule will be buried under ten thousand legitimate events before lunch.",
          "A useful lab has three properties: realistic noise, realistic identity, and a repeatable way to replay both. Without them you are testing a rule against a vacuum.",
        ],
      },
      {
        heading: "Reproduce the noise floor first",
        body: [
          "Before you add a single attack technique, instrument a representative workstation: browser traffic, software updates, endpoint agents, backup jobs, and the service accounts that never sleep. Capture at least a full business week.",
          "Then measure. A rule that produces forty alerts a day is not a detection, it is a subscription to fatigue.",
        ],
        bullets: [
          "Capture baseline telemetry for five business days minimum.",
          "Tag known-good sources so tuning does not blind you to real signal.",
          "Track alerts per rule per day, not just true positives.",
          "Version your baseline alongside the detection content.",
        ],
      },
      {
        heading: "Test the chain, not the step",
        body: [
          "Atomic tests are useful for coverage mapping, but adversaries chain behaviour. Replay a sequence: initial access, discovery, credential access, lateral movement. Then ask which of your rules fired, in what order, and whether an analyst could reconstruct the story from the alerts alone.",
          "The goal is not a wall of red. The goal is a coherent narrative that arrives early enough to act on.",
        ],
        code: {
          label: "lab / replay",
          lines: [
            "# replay a captured scenario against the rule set",
            "sigma convert -t splunk rules/ \\",
            "  | tee build/detections.spl",
            "",
            "# score: fired, missed, noisy",
            "./score.py --scenario lateral-movement \\",
            "  --expect 4 --max-alerts 12",
          ],
        },
      },
      {
        heading: "Close the loop with the people who respond",
        body: [
          "Detection engineering is not finished when the rule is merged. Sit with the analyst who receives it. If they cannot tell what to do in the first thirty seconds, the rule is not done.",
          "Every rule should carry a hypothesis, a severity rationale, a response runbook link, and a named owner. That metadata is the difference between a detection programme and a folder of YAML.",
        ],
      },
    ],
  },
  {
    slug: "timeline-like-you-mean-it",
    kind: "article",
    title: "Timeline like you mean it: forensic triage on Linux",
    excerpt:
      "A practical, defensible workflow for turning a compromised host into a timeline — without breaking the evidence you will need later.",
    category: "Forensics",
    level: "Intermediate",
    date: "2026-09-27",
    readTime: "11 min",
    tags: ["DFIR", "Linux", "Timeline", "Evidence"],
    sections: [
      {
        heading: "Preserve before you poke",
        body: [
          "The instinct on a live host is to run commands and look around. Every command mutates state: atime updates, process table changes, temporary files. If the host may become evidence, acquire first and investigate second.",
          "At minimum, capture memory, the disk image, and volatile network state. Record the acquisition in a signed, timestamped log with hashes computed at the point of capture.",
        ],
        code: {
          label: "acquisition / order of volatility",
          lines: [
            "date -u +'%Y-%m-%dT%H:%M:%SZ' | tee acquisition.log",
            "sha256sum /dev/sdb | tee -a acquisition.log",
            "dd if=/dev/sdb of=/evidence/host.img bs=4M status=progress",
            "sha256sum /evidence/host.img | tee -a acquisition.log",
          ],
        },
      },
      {
        heading: "Build the timeline from independent sources",
        body: [
          "A single log is a narrator with an agenda. Correlate filesystem metadata, authentication records, process execution artefacts, and network logs. Disagreement between sources is not a problem — it is often the most interesting finding.",
          "Normalise everything to UTC before you merge. Timezone drift has derailed more investigations than any sophisticated anti-forensic technique.",
        ],
        bullets: [
          "Filesystem: bodyfile, inode changes, deleted-entry carving.",
          "Authentication: journald, wtmp/btmp, sudo and SSH logs.",
          "Execution: auditd, shell history, systemd unit timestamps.",
          "Network: flow records, DNS logs, proxy and firewall events.",
        ],
      },
      {
        heading: "Let the tool do the sorting, not the thinking",
        body: [
          "Plaso, log2timeline, and similar tools handle the tedious normalisation. They do not tell you what matters. Reserve your attention for clusters: what happened in the ninety seconds after the first successful login?",
          "Annotate as you go. A timeline with no analyst notes is just a very expensive CSV.",
        ],
      },
      {
        heading: "Write for two audiences",
        body: [
          "Your technical appendix will be read by engineers and, potentially, by opposing counsel. Your narrative will be read by people who need to make a decision by Friday. Write both, and make sure they agree on the facts.",
          "State uncertainty explicitly. 'The account was used from 203.0.113.42 at 02:14 UTC' is defensible. 'The attacker logged in' is a conclusion that requires evidence you may not have.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-stripped-binary",
    kind: "article",
    title: "Reading a stripped binary: a first pass",
    excerpt:
      "Symbols are gone, the vendor is silent, and the thing is running in production. A methodical approach to understanding an unknown executable.",
    category: "Reverse Engineering",
    level: "Advanced",
    date: "2026-09-12",
    readTime: "14 min",
    tags: ["RE", "Ghidra", "Malware", "Linux"],
    sections: [
      {
        heading: "Resist the decompiler",
        body: [
          "The decompiler is the most seductive tool in reverse engineering and the fastest way to get lost. Before you open a single function, establish the shape of the program: file type, architecture, linkage, sections, imports, and strings.",
          "These low-effort observations eliminate entire categories of hypotheses. A Go binary looks nothing like a packed C implant, and you should know which one you have before spending an hour on entry-point analysis.",
        ],
        code: {
          label: "triage / first five minutes",
          lines: [
            "file sample.bin",
            "readelf -hS sample.bin",
            "readelf -d sample.bin | head -40",
            "strings -n 8 sample.bin | less",
            "rabin2 -I sample.bin",
          ],
        },
      },
      {
        heading: "Find the edges of the program",
        body: [
          "Imports and cross-references to them are a map of capability. A binary that imports socket, connect, and execve is telling you what it intends to do. A binary that imports almost nothing is either statically linked, packed, or both.",
          "Strings are cheap intelligence: URLs, mutex names, error messages, and library versions often reveal the author's toolchain and intent before you read a line of assembly.",
        ],
        bullets: [
          "Map imports to capability: network, persistence, crypto, process control.",
          "Inspect section entropy for packing and embedded payloads.",
          "Look for known library fingerprints and compiler artefacts.",
          "Check timestamps and build paths for provenance.",
        ],
      },
      {
        heading: "Follow data, not control flow",
        body: [
          "In a stripped binary, function names are gone but data is honest. Start at a string you care about, find its cross-references, and walk backwards to the function that consumes it. This gives you anchors in an otherwise anonymous address space.",
          "Rename aggressively as you learn. A binary that starts as sub_4012A0 and ends as decrypt_config is a binary you understand.",
        ],
      },
      {
        heading: "Confirm with dynamic analysis",
        body: [
          "Static analysis produces hypotheses; a debugger produces evidence. Set breakpoints on the functions you identified, inspect arguments and buffers, and verify your model against runtime behaviour.",
          "Run untrusted samples in an isolated environment with no route to production, and snapshot before execution. Curiosity is not a substitute for containment.",
        ],
      },
    ],
  },
  {
    slug: "threat-modelling-for-shipping-teams",
    kind: "article",
    title: "Threat modelling for teams that ship weekly",
    excerpt:
      "The 90-minute workshop that fits inside a sprint, produces decisions instead of documents, and does not require a security team in the room.",
    category: "Defensive",
    level: "Foundational",
    date: "2026-08-30",
    readTime: "8 min",
    tags: ["Threat modelling", "AppSec", "Process"],
    sections: [
      {
        heading: "Threat modelling is a design activity",
        body: [
          "If your threat model is a PDF that nobody opens after the kickoff, it failed. The useful output of threat modelling is a set of decisions: we will validate this at the edge, we will not store that token, we accept this risk until Q2.",
          "That means the right people in the room are the ones who can change the design — usually two engineers and a product owner, not a committee.",
        ],
      },
      {
        heading: "A ninety-minute structure",
        body: [
          "Draw the system in five boxes: user, edge, application, data, and the third parties you depend on. Mark the trust boundaries. Then ask four questions for each boundary: who can reach it, what can they send, what does it trust, and what happens if it lies?",
        ],
        bullets: [
          "0–15 min: draw the system and its boundaries, no security jargon.",
          "15–45 min: enumerate what could go wrong at each crossing.",
          "45–70 min: score by impact and ease, discard the theatre.",
          "70–90 min: assign owners and dates to the top five.",
        ],
      },
      {
        heading: "Keep a living register",
        body: [
          "Store threats next to the code they concern, not in a wiki graveyard. When a pull request touches an authentication path, it should be able to reference the threat it addresses or accepts.",
          "Review the register when the architecture changes, not on a calendar. The calendar review becomes a ritual; the change-triggered review stays honest.",
        ],
      },
      {
        heading: "What to ignore",
        body: [
          "Do not model every theoretical attack. A team that ships weekly cannot act on forty findings. Focus on the three boundaries where a mistake would be expensive and the five threats that are plausible for your actual users.",
          "Coverage is not the goal. Better decisions are the goal.",
        ],
      },
    ],
  },
  {
    slug: "your-waf-is-not-an-audit",
    kind: "article",
    title: "Why your WAF is not a security audit",
    excerpt:
      "A blocking rule is not a control, and a clean scan is not assurance. On the gap between looking defended and being defended.",
    category: "Offensive",
    level: "Foundational",
    date: "2026-08-21",
    readTime: "7 min",
    tags: ["AppSec", "WAF", "Risk"],
    sections: [
      {
        heading: "The dashboard is not the system",
        body: [
          "A WAF sits in front of your application and makes guesses about intent. It is useful. It is also blind to business logic, authentication design, and the API endpoint someone shipped on Friday without a route through the proxy.",
          "When a scan returns green, it means the scanner did not know how to ask the right question. That is a statement about the scanner.",
        ],
      },
      {
        heading: "What a real audit looks at",
        body: [
          "An audit examines the system's design against a threat model: how identity is established, how privilege is bounded, how data moves between trust zones, and what happens when a dependency is compromised. Most of these questions cannot be answered from outside the perimeter.",
          "The overlap with a WAF is narrow. The overlap with a vulnerability scan is narrower.",
        ],
        bullets: [
          "Authentication and session lifecycle, including recovery flows.",
          "Authorisation at the object level, not just the route level.",
          "Data flow across services, queues, and third parties.",
          "Failure modes: what the system does when a control is unavailable.",
        ],
      },
      {
        heading: "Use each tool for what it is",
        body: [
          "Keep the WAF for what it does well: absorbing commodity traffic and buying time. Keep the scanner for regression coverage. Then invest in design review and hands-on testing, because those are the activities that find the things that matter.",
          "Defence in depth does not mean stacking tools with overlapping blind spots.",
        ],
      },
    ],
  },
  {
    slug: "engagement-scoping-checklist",
    kind: "doc",
    title: "Engagement scoping checklist",
    excerpt:
      "The questions we ask before a single packet is sent. Rules of engagement, scope boundaries, escalation paths, and the things clients forget to mention.",
    category: "Offensive",
    level: "Foundational",
    date: "2026-10-02",
    readTime: "6 min read",
    tags: ["Scoping", "Rules of engagement", "Template"],
    sections: [
      {
        heading: "Scope must be written, not implied",
        body: [
          "An engagement begins with a shared document that both sides sign: what is in scope, what is explicitly out, who can authorise changes, and how to stop the test immediately. Verbal scope is how testers end up in a production database at 2 a.m.",
        ],
        bullets: [
          "In-scope hosts, domains, applications, and accounts.",
          "Out-of-scope third parties and shared infrastructure.",
          "Testing windows and blackout periods.",
          "Emergency stop contact, available during the window.",
        ],
      },
      {
        heading: "Rules of engagement",
        body: [
          "Define what techniques are permitted: social engineering, physical access, denial-of-service, data exfiltration, and use of real customer data all carry different risk. Default to the least invasive technique that proves the finding.",
        ],
      },
      {
        heading: "Access and credentials",
        body: [
          "Decide up front whether the test is black-box, grey-box, or assumed-breach. If credentials are provided, specify their privilege level and whether privilege escalation is in scope. If source code is available, say where it lives and who can answer questions.",
        ],
      },
      {
        heading: "What happens after",
        body: [
          "Agree on the reporting format, the disclosure timeline, and who receives the draft before it is final. Include a retest window. Confirm data-handling and deletion requirements for any evidence collected during the test.",
        ],
      },
    ],
  },
  {
    slug: "evidence-handling-sop",
    kind: "doc",
    title: "Evidence handling standard operating procedure",
    excerpt:
      "A short, practical SOP for acquiring, labelling, storing, and transferring digital evidence so it survives scrutiny.",
    category: "Forensics",
    level: "Intermediate",
    date: "2026-09-20",
    readTime: "8 min read",
    tags: ["Chain of custody", "DFIR", "SOP"],
    sections: [
      {
        heading: "Acquisition",
        body: [
          "Capture volatile data first, then persistent storage. Record the tool, version, command line, operator, host, and UTC timestamp for every action. Hash at the point of acquisition and again after transfer.",
        ],
      },
      {
        heading: "Labelling",
        body: [
          "Every item receives a unique evidence ID, a description, the source host, the acquisition time, and the hash. Labels must be legible without the case management system.",
        ],
      },
      {
        heading: "Storage and access",
        body: [
          "Store evidence on encrypted media with access logging. Work from verified copies, never originals. Record every access: who, when, why, and what was done.",
        ],
        bullets: [
          "Originals are write-once and stored offline.",
          "Working copies are verified against the original hash.",
          "Access is logged and reviewed weekly.",
          "Destruction requires written authorisation and a certificate.",
        ],
      },
      {
        heading: "Transfer and disclosure",
        body: [
          "Use encrypted transfer with out-of-band key exchange. Produce a manifest with hashes before and after. Confirm receipt in writing. Redact only with a documented, reproducible method.",
        ],
      },
    ],
  },
  {
    slug: "pentest-report-template",
    kind: "doc",
    title: "Pentest report template",
    excerpt:
      "The structure we use for reports that engineers actually read: impact first, reproduction second, remediation third.",
    category: "Offensive",
    level: "Foundational",
    date: "2026-09-04",
    readTime: "5 min read",
    tags: ["Reporting", "Template", "Remediation"],
    sections: [
      {
        heading: "Structure",
        body: [
          "A report is a decision document. Put the executive summary and risk posture first, then a findings register sorted by risk, then the technical detail. Appendices hold methodology, tooling, and raw evidence.",
        ],
        bullets: [
          "Executive summary: what we tested, what we found, what to do.",
          "Findings: title, severity, impact, evidence, remediation.",
          "Methodology and coverage: what was and was not tested.",
          "Appendix: artefacts, commands, and scope confirmation.",
        ],
      },
      {
        heading: "Writing findings",
        body: [
          "Lead with impact in the client's language. Then reproduce the issue precisely enough for an engineer who was not in the room. Avoid CVSS as a substitute for judgement; use it as one input.",
        ],
      },
      {
        heading: "Remediation that lands",
        body: [
          "Give a specific fix, a compensating control if the fix is slow, and a verification step. Where possible, reference the exact file, endpoint, or configuration. Do not write 'sanitise input' and call it guidance.",
        ],
      },
    ],
  },
  {
    slug: "secure-baseline-linux-servers",
    kind: "doc",
    title: "Secure baseline: Linux servers",
    excerpt:
      "A pragmatic hardening baseline for Linux hosts — SSH, kernel, logging, patching, and the controls auditors ask about.",
    category: "Defensive",
    level: "Intermediate",
    date: "2026-08-14",
    readTime: "10 min read",
    tags: ["Hardening", "Linux", "Baseline"],
    sections: [
      {
        heading: "Identity and access",
        body: [
          "Disable password authentication for SSH, require keys or short-lived certificates, and restrict which accounts may log in. Centralise sudo policy and log every escalation. Remove accounts that no longer map to a person.",
        ],
        code: {
          label: "/etc/ssh/sshd_config",
          lines: [
            "PermitRootLogin no",
            "PasswordAuthentication no",
            "KbdInteractiveAuthentication no",
            "AllowGroups ssh-users",
            "MaxAuthTries 3",
            "LoginGraceTime 20",
          ],
        },
      },
      {
        heading: "Attack surface",
        body: [
          "Every listening service is a decision. Inventory sockets, bind management interfaces to private networks, and remove packages that exist only because they were in the base image.",
        ],
        bullets: [
          "Run `ss -tulpn` and justify every listener.",
          "Default-deny ingress; allow only required flows.",
          "Disable unused filesystems and kernel modules.",
          "Remove compilers and debug tools from production images.",
        ],
      },
      {
        heading: "Logging and recovery",
        body: [
          "Ship authentication, audit, and application logs off-host. Verify that you can reconstruct a session from logs alone. Back up configuration and data, then test restoration — an untested backup is a rumour.",
        ],
      },
      {
        heading: "Patching without heroics",
        body: [
          "Define a cadence, an owner, and an exception process. Reboot windows should be routine, not events. Track kernel and userland separately; the kernel is not patched by a package manager alone.",
        ],
      },
    ],
  },
];

export const articles = entries.filter((entry) => entry.kind === "article");
export const docs = entries.filter((entry) => entry.kind === "doc");

export const featuredEntry = entries.find((entry) => entry.featured) ?? entries[0];

export const stats = [
  { value: "120+", label: "systems tested" },
  { value: "24h", label: "incident response" },
  { value: "0", label: "client data retained" },
  { value: "9", label: "years in the field" },
];

export const principles = [
  {
    index: "01",
    title: "Adversary-led, not checklist-led",
    body: "Frameworks are the floor, not the ceiling. We chain weaknesses the way a real operator would, so the finding reflects the risk rather than the tool's opinion.",
  },
  {
    index: "02",
    title: "Evidence over adjectives",
    body: "Every claim is reproducible. You get commands, captures, and reasoning — not a severity score with no provenance.",
  },
  {
    index: "03",
    title: "Fix the system, not the symptom",
    body: "We stay for the remediation conversation. A closed ticket is not the same as a control that holds under pressure.",
  },
];

export const process = [
  {
    index: "01",
    title: "Scope",
    body: "We map the surface, agree rules of engagement, and define what a successful outcome looks like.",
    time: "Week 0",
  },
  {
    index: "02",
    title: "Recon",
    body: "Passive and active discovery. Certificates, DNS, cloud storage, leaked credentials, exposed services.",
    time: "Week 1",
  },
  {
    index: "03",
    title: "Exploit",
    body: "Hands-on testing against the highest-risk paths. Proof-of-concept or it did not happen.",
    time: "Weeks 1–3",
  },
  {
    index: "04",
    title: "Report",
    body: "Impact, evidence, and a remediation plan your engineers can act on the same week.",
    time: "Week 3",
  },
  {
    index: "05",
    title: "Retest",
    body: "We verify the fixes, close the loop, and sign the closure letter.",
    time: "Week 5",
  },
];

export const engagements = [
  {
    name: "Sprint",
    price: "Fixed scope",
    description: "A focused test of one application or network segment with a clear deadline.",
    points: ["1–2 week window", "Web, API, or internal network", "Report and retest included", "Direct engineer access"],
  },
  {
    name: "Retainer",
    price: "Monthly",
    description: "Continuous offensive coverage and a security partner who knows your architecture.",
    points: ["Quarterly testing cycles", "On-call security advice", "Detection tuning support", "Priority incident response"],
    featured: true,
  },
  {
    name: "Incident",
    price: "By response",
    description: "Forensic response and containment when something has already gone wrong.",
    points: ["24-hour mobilisation", "Evidence-grade acquisition", "Root-cause reconstruction", "Expert reporting"],
  },
];

export const faqs = [
  {
    question: "How long does a penetration test take?",
    answer:
      "Most application assessments run two to four weeks including reporting; internal network tests are typically one to two weeks. We confirm the window during scoping and reserve retest time up front, so fixes are verified rather than assumed.",
  },
  {
    question: "Do you test production?",
    answer:
      "Only with explicit written authorisation. We default to staging or a production-like environment, and when production is the only realistic target we agree on techniques that avoid disruption, plus a stop condition your team controls.",
  },
  {
    question: "What do we receive at the end?",
    answer:
      "An executive summary, a prioritised findings register with reproducible evidence, remediation guidance, and a walkthrough session with your engineers. A retest and closure letter are included on all engagements.",
  },
  {
    question: "How do you handle sensitive data?",
    answer:
      "We collect the minimum required to prove a finding, encrypt evidence at rest, and delete client data on an agreed schedule. Access is limited to the engagement team and every access is logged.",
  },
  {
    question: "Can you work with our compliance requirements?",
    answer:
      "Yes. We map findings to frameworks such as ISO 27001, SOC 2, PCI DSS, and NIST CSF, and can produce the evidence artefacts auditors ask for. We are testers, not certification bodies, and we say so plainly.",
  },
];

export const toolkit = [
  "Burp Suite",
  "Nmap",
  "BloodHound",
  "Impacket",
  "Ghidra",
  "IDA Pro",
  "Volatility",
  "Plaso",
  "Sigma",
  "YARA",
  "Wireshark",
  "Frida",
];

export const timeline = [
  { year: "2019", title: "Independent practice", body: "Started with application assessments for early-stage product teams." },
  { year: "2021", title: "DFIR capability", body: "Added forensic acquisition and incident response after a ransomware case." },
  { year: "2023", title: "Research lab", body: "Built an isolated reverse-engineering lab for firmware and malware work." },
  { year: "2025", title: "Detection engineering", body: "Began pairing offensive tests with purple-team detection validation." },
  { year: "2026", title: "Spylink", body: "Consolidated the practice into a small, deliberately senior studio." },
];

export const certifications = [
  "OSCP",
  "OSEP",
  "GCFA",
  "GXPN",
  "CISSP",
  "CRTO",
];
