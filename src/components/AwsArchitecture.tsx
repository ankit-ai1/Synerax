/* ─────────────────────────────────────────────────────────────
   AwsArchitecture — the reference three-tier AWS topology.

   Structure mirrors the source diagram exactly:
     User → Internet Gateway → public ALB → web-tier EC2 (ASG)
     → internal ALB → app-tier EC2 (ASG) → RDS
     plus NAT Gateway and a bastion host in the public subnet.

   Two availability zones (us-east-1a / 1b) run down the diagram
   as dashed columns; the three tiers cross them as bands. Route
   tables and security groups sit where the source places them.

   Everything is one static SVG — the motion is CSS, so there is
   no timer and nothing to keep in sync.
   ───────────────────────────────────────────────────────────── */

/* Node glyphs, drawn inline so each keeps the same stroke system. */
const Glyph = {
  igw: (
    <g>
      <path d="M-9 7v-8a9 9 0 0118 0v8" />
      <path d="M-9 7h18" />
    </g>
  ),
  alb: (
    <g>
      <rect x="-8" y="-9" width="16" height="8" rx="1.5" />
      <path d="M0 -1v4M-6 3v3M6 3v3M-6 6h12" />
    </g>
  ),
  ec2: (
    <g>
      <rect x="-8" y="-8" width="16" height="16" rx="1.5" />
      <path d="M-4 0h8M0 -4v8M-2 -2l-2 2 2 2M2 -2l2 2-2 2" />
    </g>
  ),
  rds: (
    <g>
      <ellipse cx="0" cy="-5" rx="8" ry="3" />
      <path d="M-8 -5v10c0 1.7 3.6 3 8 3s8-1.3 8-3V-5" />
      <path d="M-8 0c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </g>
  ),
  nat: (
    <g>
      <rect x="-8" y="-8" width="16" height="16" rx="1.5" />
      <path d="M-4 -3h8l-3-3M4 3h-8l3 3" />
    </g>
  ),
  bastion: (
    <g>
      <rect x="-8" y="-7" width="16" height="14" rx="1.5" />
      <path d="M-4 -2h8M-4 2h5" />
      <circle cx="0" cy="-10" r="2.5" />
    </g>
  ),
  rtb: (
    <g>
      <rect x="-9" y="-7" width="18" height="14" rx="1.5" />
      <path d="M-9 -2h18M-3 -7v14M3 -7v14" />
    </g>
  ),
  user: (
    <g>
      <circle cx="0" cy="-6" r="5" />
      <path d="M-9 8a9 9 0 0118 0" />
    </g>
  ),
}

type NodeProps = { x: number; y: number; glyph: keyof typeof Glyph; label: string; sub?: string; tone?: 'db' }

const Node = ({ x, y, glyph, label, sub, tone }: NodeProps) => (
  <g className={`awsa__node${tone ? ` awsa__node--${tone}` : ''}`} transform={`translate(${x} ${y})`}>
    <circle className="awsa__node-disc" r="19" />
    <g className="awsa__node-glyph">{Glyph[glyph]}</g>
    <text className="awsa__node-lbl" y="34">{label}</text>
    {sub && <text className="awsa__node-sub" y="46">{sub}</text>}
  </g>
)

export default function AwsArchitecture() {
  /* Column centres for the two availability zones, and the gutter
     between them where the shared components sit. */
  const AZ_A = 236
  const AZ_B = 724
  const MID = 480

  return (
    <svg
      className="awsa"
      viewBox="0 0 960 980"
      role="img"
      aria-label="Three-tier AWS architecture across two availability zones"
    >
      {/* ── User, outside the cloud ─────────────────────────── */}
      <g className="awsa__user" transform={`translate(${MID} 30)`}>
        {Glyph.user}
        <text className="awsa__node-lbl" y="26">User</text>
      </g>

      {/* ── AWS Cloud ───────────────────────────────────────── */}
      <rect className="awsa__cloud" x="14" y="70" width="932" height="892" rx="6" />
      <text className="awsa__zone-lbl" x="34" y="90">AWS Cloud</text>

      {/* ── Region ──────────────────────────────────────────── */}
      <rect className="awsa__region" x="32" y="102" width="896" height="846" rx="5" />
      <text className="awsa__zone-lbl awsa__zone-lbl--region" x="52" y="122">Region · us-east-1</text>

      {/* ── VPC ─────────────────────────────────────────────── */}
      <rect className="awsa__vpc" x="50" y="134" width="860" height="800" rx="5" />
      <text className="awsa__zone-lbl awsa__zone-lbl--vpc" x="70" y="154">VPC · 10.0.0.0/16</text>

      {/* ── Tier bands, drawn behind the AZ columns ─────────── */}
      <rect className="awsa__tier awsa__tier--web" x="66" y="224" width="828" height="212" rx="4" />
      <rect className="awsa__tier awsa__tier--app" x="66" y="472" width="828" height="212" rx="4" />
      <rect className="awsa__tier awsa__tier--db"  x="66" y="720" width="828" height="196" rx="4" />

      <text className="awsa__tier-lbl" transform="translate(58 330) rotate(-90)">Web Tier</text>
      <text className="awsa__tier-lbl" transform="translate(58 578) rotate(-90)">Application Tier</text>
      <text className="awsa__tier-lbl" transform="translate(58 818) rotate(-90)">Database Tier</text>

      {/* ── Availability zones ──────────────────────────────── */}
      <rect className="awsa__az" x="76" y="196" width="360" height="726" rx="4" />
      <text className="awsa__az-lbl" x="256" y="214" textAnchor="middle">AZ: us-east-1a</text>

      <rect className="awsa__az" x="524" y="196" width="360" height="726" rx="4" />
      <text className="awsa__az-lbl" x="704" y="214" textAnchor="middle">AZ: us-east-1b</text>

      {/* ── Subnets ─────────────────────────────────────────── */}
      <rect className="awsa__subnet awsa__subnet--pub" x="90" y="238" width="332" height="184" rx="3" />
      <text className="awsa__subnet-lbl awsa__subnet-lbl--pub" x="104" y="256">Public Subnet 1 · 10.0.0.0/20</text>

      <rect className="awsa__subnet awsa__subnet--pub" x="538" y="238" width="332" height="184" rx="3" />
      <text className="awsa__subnet-lbl awsa__subnet-lbl--pub" x="552" y="256">Public Subnet 2 · 10.0.16.0/20</text>

      <rect className="awsa__subnet" x="90" y="486" width="332" height="184" rx="3" />
      <text className="awsa__subnet-lbl" x="104" y="504">Private subnet 1 · 10.0.128.0/20</text>

      <rect className="awsa__subnet" x="538" y="486" width="332" height="184" rx="3" />
      <text className="awsa__subnet-lbl" x="552" y="504">Private subnet 2 · 10.0.144.0/20</text>

      <rect className="awsa__subnet" x="90" y="734" width="332" height="168" rx="3" />
      <text className="awsa__subnet-lbl" x="104" y="752">Private subnet 3 · 10.0.160.0/20</text>

      <rect className="awsa__subnet" x="538" y="734" width="332" height="168" rx="3" />
      <text className="awsa__subnet-lbl" x="552" y="752">Private subnet 4 · 10.0.176.0/20</text>

      {/* ── Auto Scaling groups ─────────────────────────────── */}
      <rect className="awsa__asg" x="150" y="292" width="660" height="124" rx="3" />
      <text className="awsa__asg-lbl" x="164" y="308">Auto Scaling group</text>

      <rect className="awsa__asg" x="150" y="540" width="660" height="124" rx="3" />
      <text className="awsa__asg-lbl" x="164" y="556">Auto Scaling group</text>

      {/* ── Security groups ─────────────────────────────────── */}
      {/* sg captions hug the left edge of their box — centred under the
          balancer they collided with its two-line label */}
      <rect className="awsa__sg" x="166" y="326" width="628" height="84" rx="3" />
      <text className="awsa__sg-lbl" x="180" y="342">webserver-sg</text>

      <rect className="awsa__sg" x="166" y="574" width="628" height="84" rx="3" />
      <text className="awsa__sg-lbl" x="180" y="590">appserver-sg</text>

      <rect className="awsa__sg" x="166" y="800" width="628" height="84" rx="3" />
      <text className="awsa__sg-lbl" x="180" y="816">database-sg</text>

      {/* ── Static wiring ───────────────────────────────────── */}
      <g className="awsa__wire">
        <path d={`M${MID} 62 V134`} />
        <path d={`M${MID} 154 V262`} />
        <path d={`M${MID} 282 H${AZ_A} V348`} />
        <path d={`M${MID} 282 H${AZ_B} V348`} />
        <path d={`M${MID} 148 H150 V300 H128 V318`} />
        <path d={`M${AZ_A} 386 V510`} />
        <path d={`M${AZ_B} 386 V510`} />
        <path d={`M${MID} 530 H${AZ_A} V596`} />
        <path d={`M${MID} 530 H${AZ_B} V596`} />
        <path d={`M128 396 V596 H${AZ_A - 40}`} />
        <path d={`M${AZ_A} 634 V824`} />
      </g>

      {/* ── Animated traffic, same routes as the wiring ─────── */}
      <g className="awsa__flow">
        <path d={`M${MID} 62 V134`} />
        <path d={`M${MID} 154 V262`} style={{ animationDelay: '.35s' }} />
        <path d={`M${MID} 282 H${AZ_A} V348`} style={{ animationDelay: '.7s' }} />
        <path d={`M${MID} 282 H${AZ_B} V348`} style={{ animationDelay: '.85s' }} />
        <path d={`M${AZ_A} 386 V510`} style={{ animationDelay: '1.2s' }} />
        <path d={`M${AZ_B} 386 V510`} style={{ animationDelay: '1.35s' }} />
        <path d={`M${MID} 530 H${AZ_A} V596`} style={{ animationDelay: '1.7s' }} />
        <path d={`M${MID} 530 H${AZ_B} V596`} style={{ animationDelay: '1.85s' }} />
        <path d={`M${AZ_A} 634 V824`} style={{ animationDelay: '2.2s' }} />
      </g>

      {/* ── Route tables ────────────────────────────────────── */}
      <g className="awsa__rtb" transform={`translate(${MID} 368)`}>
        {Glyph.rtb}
        <text className="awsa__node-sub" y="24">public-rtb</text>
      </g>
      <g className="awsa__rtb" transform={`translate(${MID} 616)`}>
        {Glyph.rtb}
        <text className="awsa__node-sub" y="24">private-rtb</text>
      </g>

      {/* ── Nodes ───────────────────────────────────────────── */}
      <Node x={MID} y={262} glyph="alb" label="Application" sub="Load Balancer" />
      <Node x={MID} y={510} glyph="alb" label="Application" sub="Load Balancer" />

      <Node x={128} y={318} glyph="nat" label="NAT Gateway" />
      <Node x={128} y={396} glyph="bastion" label="Bastion host" />

      <Node x={AZ_A} y={368} glyph="ec2" label="EC2" />
      <Node x={AZ_B} y={368} glyph="ec2" label="EC2" />
      <Node x={AZ_A} y={616} glyph="ec2" label="EC2" />
      <Node x={AZ_B} y={616} glyph="ec2" label="EC2" />

      <Node x={AZ_A} y={842} glyph="rds" label="RDS" tone="db" />

      {/* Internet Gateway straddles the VPC boundary, as in the source */}
      <g className="awsa__node awsa__node--igw" transform={`translate(${MID} 134)`}>
        <circle className="awsa__node-disc" r="19" />
        <g className="awsa__node-glyph">{Glyph.igw}</g>
        <text className="awsa__node-lbl" y="34">Internet Gateway</text>
      </g>
    </svg>
  )
}
