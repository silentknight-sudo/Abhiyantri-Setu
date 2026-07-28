"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Users,
  FileText,
  ClipboardCheck,
  Lock,
  Package,
  Truck,
  UserSquare2,
  Wrench,
  Building2,
  Search,
  ClipboardList,
  Handshake,
  Award,
  Star,
  ChevronDown,
  ArrowRight,
  Compass,
  // Linkedin,
  ShieldQuestion,
  Eye,
  Lightbulb,
  RadioTower,
} from "lucide-react";

/* ---------------------------------------------------------
   Shared motion variants
--------------------------------------------------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* Reveal wrapper: animates once when scrolled into view */
function Reveal({
  children,
  className = "",
  variants = fadeUp,
  custom = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  custom?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Eyebrow pill
--------------------------------------------------------- */
function Eyebrow({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-700">
      {icon}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   1. HERO
--------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white px-5 pt-6 pb-8 sm:px-8 sm:pt-8 md:pt-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left copy */}
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Eyebrow icon={<Compass className="h-3.5 w-3.5" />}>About Abhiyantri Setu</Eyebrow>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
          >
            Building Trust
            <br />
            Between Homeowners
            <br />
            and{" "}
            <span className="text-amber-500">
              Construction
              <br />
              Professionals
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg"
          >
            Abhiyantri Setu is India&apos;s trusted construction and home
            services marketplace helping homeowners find verified
            professionals, compare quotations, manage projects, and complete
            work with confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-neutral-900 shadow-sm shadow-amber-500/30 transition-all hover:bg-amber-400 hover:shadow-md hover:shadow-amber-500/40 active:scale-[0.98]">
              Find a Professional
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98]">
              Become a Service Provider
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-500" /> 100% Verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-amber-500" /> Secure Platform
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" /> Trusted by Thousands
            </span>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-neutral-900/10">
            <img
              src="hero-house.jpg"
              alt="Modern home at sunset"
              className="h-[320px] w-full object-cover sm:h-[400px] md:h-[460px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-4 right-3 flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-3 shadow-lg sm:-top-5 sm:right-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
              <ShieldCheck className="h-4 w-4 text-neutral-900" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white">100%</span>
              <span className="block text-[11px] text-neutral-300">
                Verified Network
              </span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="absolute -bottom-5 left-3 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:left-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
              <Users className="h-4 w-4 text-amber-500" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-neutral-900">
                5,000+
              </span>
              <span className="block text-[11px] text-neutral-500">
                Verified Pros
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   2. OUR STORY (zigzag timeline)
--------------------------------------------------------- */
const storyItems = [
  {
    tag: "PROBLEM",
    title: "Homeowners struggle",
    desc: "Finding trustworthy professionals is hard, slow, and risky.",
  },
  {
    tag: "GAP",
    title: "Professionals struggle",
    desc: "Quality experts depend entirely on word-of-mouth and referrals.",
  },
  {
    tag: "INDUSTRY",
    title: "Fragmented market",
    desc: "Construction services remain unorganized, opaque and unpredictable.",
  },
  {
    tag: "SETU",
    title: "We built the bridge",
    desc: "Technology, verification and transparency unite both sides — at last.",
    dark: true,
  },
];

function OurStory() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Our Story</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Why We Built Abhiyantri Setu
          </h2>
          <p className="mt-4 text-neutral-500">
            The construction industry has always operated on trust — but
            trust was hard to find. We set out to change that.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* center line, desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neutral-200 md:block" />

          <div className="space-y-6 md:space-y-0">
            {storyItems.map((item, i) => (
              <div
                key={item.title}
                className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-10 md:py-6"
              >
                {i % 2 === 0 ? (
                  <>
                    <Reveal custom={i}>
                      <StoryCard {...item} />
                    </Reveal>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <Reveal custom={i}>
                      <StoryCard {...item} />
                    </Reveal>
                  </>
                )}

                {/* center dot */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 md:block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  tag,
  title,
  desc,
  dark,
}: {
  tag: string;
  title: string;
  desc: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-shadow hover:shadow-md ${
        dark
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-200 bg-white"
      }`}
    >
      <span
        className={`text-xs font-bold tracking-wide ${
          dark ? "text-amber-400" : "text-amber-500"
        }`}
      >
        {tag}
      </span>
      <h3
        className={`mt-1 text-lg font-bold ${
          dark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-1 text-sm ${dark ? "text-neutral-300" : "text-neutral-500"}`}>
        {desc}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   3. THE CHALLENGE
--------------------------------------------------------- */
function TheChallenge() {
  const homeowners = [
    "Difficulty finding reliable professionals",
    "Lack of transparency in pricing",
    "Inconsistent quality of work",
    "No way to compare quotations",
    "Poor project tracking & updates",
  ];
  const professionals = [
    "Limited visibility to new clients",
    "Dependence on referrals only",
    "Unqualified and time-wasting leads",
    "Lack of digital presence",
    "Difficulty showcasing past work",
  ];

  return (
    <section className="bg-neutral-50/60 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>The Challenge</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            The Problem We Solve
          </h2>
          <p className="mt-4 text-neutral-500">
            Two sides of the same broken industry we fix it for both.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal custom={0}>
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-7">
              <span className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <ShieldQuestion className="h-5 w-5 text-amber-500" />
              </span>
              <p className="mt-3 text-xs font-bold tracking-wide text-amber-500">
                FOR HOMEOWNERS
              </p>
              <h3 className="mt-1 text-xl font-bold text-neutral-900">
                Trust &amp; Transparency
              </h3>
              <ul className="mt-4 space-y-3">
                {homeowners.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-neutral-600"
                  >
                    <span className="mt-0.5 text-amber-500">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal custom={1}>
            <div className="h-full rounded-2xl bg-neutral-900 p-7 text-white">
              <span className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500">
                <Wrench className="h-5 w-5 text-neutral-900" />
              </span>
              <p className="mt-3 text-xs font-bold tracking-wide text-amber-400">
                FOR PROFESSIONALS
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                Growth &amp; Visibility
              </h3>
              <ul className="mt-4 space-y-3">
                {professionals.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-neutral-300"
                  >
                    <span className="mt-0.5 text-amber-400">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   4. OUR SOLUTION
--------------------------------------------------------- */
const solutionItems = [
  { icon: ShieldCheck, title: "Verified Professionals", desc: "Every provider passes Aadhar, GST & portfolio checks." },
  { icon: FileText, title: "Compare Multiple Quotes", desc: "Receive and compare quotations side by side." },
  { icon: ClipboardCheck, title: "Project Tracking", desc: "Track progress, milestones and payments in one place." },
  { icon: Lock, title: "Secure Communication", desc: "Direct messaging with verified providers — privately." },
  { icon: Package, title: "Material Marketplace", desc: "Buy cement, steel, tiles, paints and more from trusted suppliers." },
  { icon: Truck, title: "Equipment Rentals", desc: "JCBs, mixers, scaffolding and machinery, on-demand.", accent: true },
  { icon: UserSquare2, title: "Expert Consultation", desc: "Talk to architects, engineers and designers before you begin." },
  { icon: Wrench, title: "Home Services Booking", desc: "Plumbing, electrical, painting & cleaning at your fingertips." },
  { icon: Building2, title: "Construction Management", desc: "End-to-end project execution support, start to finish." },
];

function OurSolution() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Our Solution</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            One Platform. Endless Possibilities.
          </h2>
          <p className="mt-4 text-neutral-500">
            Everything you need to build, renovate, repair and maintain —
            unified into a single trusted ecosystem.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionItems.map((item, i) => (
            <Reveal key={item.title} custom={i % 3}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-neutral-900/5"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    item.accent ? "bg-amber-500" : "bg-amber-50"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      item.accent ? "text-neutral-900" : "text-amber-500"
                    }`}
                  />
                </span>
                <h3 className="mt-4 text-base font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  {item.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   5. THE JOURNEY (5 steps)
--------------------------------------------------------- */
const journeySteps = [
  { icon: Search, title: "Choose Service", desc: "Pick from 100+ professional categories." },
  { icon: FileText, title: "Submit Requirement", desc: "Describe your project in a few simple steps." },
  { icon: Users, title: "Receive Quotes", desc: "Get multiple competitive quotations within hours." },
  { icon: Handshake, title: "Hire Verified Pro", desc: "Choose with confidence — every pro is verified." },
  { icon: ClipboardList, title: "Track Progress", desc: "Stay updated until your project is complete." },
];

function TheJourney() {
  return (
    <section className="bg-neutral-50/60 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>The Journey</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            How Abhiyantri Setu Works
          </h2>
          <p className="mt-4 text-neutral-500">
            A simple 5-step process designed for clarity, speed, and trust.
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {journeySteps.map((step, i) => (
            <Reveal key={step.title} custom={i} className="relative">
              <div className="relative h-full rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                {i < journeySteps.length - 1 && (
                  <span className="absolute right-[-18px] top-11 hidden h-px w-9 border-t border-dashed border-neutral-300 lg:block" />
                )}
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500">
                  <step.icon className="h-6 w-6 text-neutral-900" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-neutral-500">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   6. OUR IMPACT (animated counters)
--------------------------------------------------------- */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useRefCounter(inView, target, setValue);

  return (
    <span ref={ref} className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
      {value.toLocaleString()}
      <span className="text-amber-500">{suffix}</span>
    </span>
  );
}

// small helper hook kept local so this file stays a single drop-in component
function useRefCounter(
  inView: boolean,
  target: number,
  setValue: (n: number) => void
) {
  const started = useRef(false);
  if (inView && !started.current) {
    started.current = true;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

const impactStats = [
  { icon: Users, value: 5000, suffix: "+", label: "Service Providers" },
  { icon: Wrench, value: 100, suffix: "+", label: "Services" },
  { icon: Building2, value: 1000, suffix: "+", label: "Projects Completed" },
  { icon: Package, value: 50, suffix: "+", label: "Material Suppliers" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Verified Professionals" },
];

function OurImpact() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Our Impact</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Numbers That Build Trust
          </h2>
          <p className="mt-4 text-neutral-500">
            Real impact calculated from our live marketplace.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {impactStats.map((stat, i) => (
            <Reveal key={stat.label} custom={i}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                  <stat.icon className="h-5 w-5 text-amber-500" />
                </span>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="mt-1.5 text-sm text-neutral-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   7. TRUST & VERIFICATION
--------------------------------------------------------- */
const verificationItems = [
  { icon: ShieldCheck, label: "Aadhaar Verification" },
  { icon: FileText, label: "GST Verification" },
  { icon: Building2, label: "Business Verification" },
  { icon: ClipboardList, label: "Portfolio Review" },
  { icon: Award, label: "Experience Validation" },
  { icon: Star, label: "Client Reviews" },
];

function TrustVerification() {
  return (
    <section className="px-5 py-10 sm:px-8 lg:px-12">
      <Reveal
        variants={scaleIn}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-neutral-900 p-8 sm:p-12"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow icon={<ShieldCheck className="h-3.5 w-3.5" />}>
              Trust &amp; Verification
            </Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Trust Comes First.
            </h2>
            <p className="mt-4 max-w-md text-neutral-400">
              Every professional on Abhiyantri Setu passes a strict
              multi-step verification process before they can take on your
              project.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {verificationItems.map((item, i) => (
              <Reveal key={item.label} custom={i}>
                <div className="flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-3.5 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500">
                    <item.icon className="h-4 w-4 text-neutral-900" />
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------
   8 & 9. FOR HOMEOWNERS / FOR PROFESSIONALS
--------------------------------------------------------- */
function SplitFeature({
  eyebrow,
  title,
  items,
  image,
  cta,
  reverse,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  image: string;
  cta: string;
  reverse?: boolean;
}) {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal variants={scaleIn}>
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-neutral-900/10">
              <img
                src={image}
                alt={title}
                className="h-[280px] w-full object-cover sm:h-[360px]"
              />
            </div>
          </Reveal>

          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {title}
            </h2>
            <ul className="mt-6 space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-neutral-700 sm:text-base"
                >
                  <ShieldCheck className="h-4.5 w-4.5 flex-shrink-0 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]">
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   10. VISION BANNER
--------------------------------------------------------- */
function VisionBanner() {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-12">
      <Reveal variants={scaleIn} className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-300 px-6 py-14 text-center sm:px-10">
          <motion.div
            initial={{ rotate: -8, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-neutral-900"
          >
            <Compass className="h-5 w-5 text-neutral-900" />
          </motion.div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Building India&apos;s Largest
            <br />
            Construction Ecosystem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-800/80 sm:text-base">
            Our vision is to become the most trusted platform connecting
            homeowners, professionals, suppliers, contractors, consultants,
            and service providers across India — digitizing construction
            services, simplifying project execution, and empowering
            professionals to grow their businesses.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------
   11. OUR VALUES
--------------------------------------------------------- */
const values = [
  { icon: ShieldCheck, title: "Trust", desc: "Every interaction backed by verification." },
  { icon: Eye, title: "Transparency", desc: "Open quotes, open communication.", accent: true },
  { icon: Award, title: "Quality", desc: "Only the best professionals make the cut." },
  { icon: Lightbulb, title: "Innovation", desc: "Modern tech for an age-old industry." },
  { icon: Users, title: "Community", desc: "A network that lifts everyone up." },
  { icon: RadioTower, title: "Reliability", desc: "We deliver on every promise, on time." },
];

function OurValues() {
  return (
    <section className="bg-neutral-50/60 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Our Values</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            What We Stand For
          </h2>
          <p className="mt-4 text-neutral-500">
            The principles that guide every decision we make.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} custom={i % 3}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`h-full rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md ${
                  v.accent ? "border-amber-400" : "border-neutral-200"
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    v.accent ? "bg-amber-500" : "bg-neutral-900"
                  }`}
                >
                  <v.icon
                    className={`h-5 w-5 ${
                      v.accent ? "text-neutral-900" : "text-amber-400"
                    }`}
                  />
                </span>
                <h3 className="mt-4 text-base font-bold text-neutral-900">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm text-neutral-500">{v.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   12. FOUNDER
--------------------------------------------------------- */
function Founder() {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-12">
      <Reveal className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 md:grid-cols-[220px_1fr] md:gap-10">
          <div className="relative mx-auto w-44 md:w-full">
            <img
              src="founder.png"
              alt="Founder & CEO"
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500 px-3.5 py-1 text-xs font-bold text-neutral-900 shadow-md md:left-1/2">
              Founder &amp; CEO
            </span>
          </div>

          <div className="text-center md:text-left">
            <Eyebrow>Meet the Founder</Eyebrow>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              A builder&apos;s mission.
            </h2>
            <p className="mt-4 text-neutral-500">
              After years inside India&apos;s construction industry, our
              founder saw the same story repeat — talented professionals
              without visibility, and homeowners without trust. Abhiyantri
              Setu was born to close that gap with technology and integrity.
            </p>
            <p className="mt-3 text-neutral-700">
              <span className="font-semibold text-neutral-900">
                Our mission:
              </span>{" "}
              empower every homeowner to build with confidence and every
              professional to grow with dignity.
            </p>
            {/* <button className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50 md:mx-0">
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </button> */}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------
   13. FAQ
--------------------------------------------------------- */
const faqs = [
  {
    q: "How does Abhiyantri Setu work?",
    a: "Choose a service, submit your requirement, receive quotes from verified professionals, hire the one you trust, and track your project until completion — all in one place.",
  },
  {
    q: "Are professionals verified?",
    a: "Yes. Every professional passes Aadhaar verification, GST verification, business checks, and a portfolio review before they can accept work on the platform.",
  },
  {
    q: "How much does it cost?",
    a: "Browsing, posting requirements, and receiving quotes is free for homeowners. Professionals can join with a free profile and optional paid plans for extra visibility.",
  },
  {
    q: "Can I compare multiple quotations?",
    a: "Yes, you can receive and compare quotations from multiple verified professionals side by side before making a decision.",
  },
  {
    q: "How do professionals register?",
    a: "Professionals sign up, complete Aadhaar and GST verification, add their portfolio and experience, and get listed once approved.",
  },
  {
    q: "Can I hire locally?",
    a: "Absolutely — you can filter professionals by location to find trusted experts near you, including in Greater Noida and across India.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral-500">
            Everything you need to know before getting started.
          </p>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={i !== 0 ? "border-t border-neutral-200" : ""}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between px-5 py-4.5 text-left transition-colors sm:px-6 ${
                    isOpen ? "bg-amber-50/40" : "hover:bg-neutral-50"
                  }`}
                >
                  <span
                    className={`text-sm font-bold sm:text-base ${
                      isOpen ? "text-neutral-900" : "text-neutral-800"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 flex-shrink-0 text-neutral-500"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4.5 text-sm leading-relaxed text-neutral-500 sm:px-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   14. FINAL CTA
--------------------------------------------------------- */
function FinalCTA() {
  return (
    <section className="px-5 pb-24 pt-6 sm:px-8 lg:px-12">
      <Reveal variants={scaleIn} className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-16 text-center sm:px-10 sm:py-20">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-amber-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative mx-auto mb-5 flex h-11 w-11 items-center justify-center text-amber-400"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
              <path
                d="M13 2 3 14h7l-1 8 11-14h-7l0-6z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <h2 className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
            Ready to Build, Renovate, Repair
            <br className="hidden sm:block" /> or Maintain?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm text-neutral-400 sm:text-base">
            Join thousands of homeowners and professionals building with
            confidence on India&apos;s most trusted construction marketplace.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-amber-400 active:scale-[0.98]">
              Find a Professional
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 active:scale-[0.98]">
              Become a Service Provider
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------
   PAGE EXPORT
--------------------------------------------------------- */
export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Hero />
      <OurStory />
      <TheChallenge />
      <OurSolution />
      <TheJourney />
      <OurImpact />
      <TrustVerification />
      <SplitFeature
        eyebrow="For Homeowners"
        title="Build with total peace of mind."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
        cta="Find Professionals"
        items={[
          "Access thousands of verified professionals",
          "Compare quotations transparently",
          "Save time and avoid endless calls",
          "Avoid scams with verified profiles",
          "Track every step of your project",
          "Get expert support whenever you need it",
        ]}
      />
      <SplitFeature
        eyebrow="For Professionals"
        title="Grow your business, digitally."
        image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop"
        cta="Join as Professional"
        reverse
        items={[
          "Generate qualified, high-intent leads",
          "Build a professional digital presence",
          "Showcase your projects beautifully",
          "Earn verified client reviews",
          "Grow revenue with repeat business",
          "Reach clients across India",
        ]}
      />
      <VisionBanner />
      <OurValues />
      <Founder />
      <FAQ />
      <FinalCTA />
    </main>
  );
}