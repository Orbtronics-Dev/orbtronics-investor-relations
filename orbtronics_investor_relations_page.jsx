import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FileText,
  TrendingUp,
  Building2,
  Search,
  ChevronRight,
  BarChart2,
  DollarSign,
  BookOpen,
  Download,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const financialData = [
  {
    period: "2022",
    basis: "6 months",
    revenue: 48075,
    netIncome: 5146,
    assets: 33441,
    liabilities: 5616,
    equity: 27825,
  },
  {
    period: "2023",
    basis: "annual",
    revenue: 296952,
    netIncome: 57556,
    assets: 162594,
    liabilities: 44902,
    equity: 117692,
  },
  {
    period: "2024",
    basis: "annual",
    revenue: 410445,
    netIncome: 40758,
    assets: 381436,
    liabilities: 180609,
    equity: 200827,
  },
  {
    period: "2025",
    basis: "annual",
    revenue: 1229911,
    netIncome: 204925,
    assets: 673953,
    liabilities: 271553,
    equity: 402400,
  },
];

const valuationData = [
  {
    year: "2024",
    label: "2024 valuation report",
    valuation: 550529,
    methodology: "Independent report",
    currency: "XCD",
  },
  {
    year: "2025",
    label: "2025 valuation report",
    valuation: 1002687,
    methodology: "Independent report",
    currency: "XCD",
  },
  {
    year: "2026",
    label: "2026 Equidam valuation",
    valuation: 1777397,
    low: 1264000,
    high: 2291000,
    methodology: "Weighted multi-method",
    currency: "USD",
  },
];

const documents = [
  {
    title: "Orbtronics Investor Presentation",
    category: "Investor Presentation",
    year: "2026",
    status: "Available",
    description: "Corporate investor deck focused on the 2035 vision, operating model, and growth story.",
    fileName: "Orbtronics Investor Presentation.pdf",
  },
  {
    title: "Audited Financial Statements 2022",
    category: "Audited Financials",
    year: "2022",
    status: "Available",
    description: "Six-month audited financial statements ending December 31, 2022.",
    fileName: "Audited_Financial Statements_2022 (4).pdf",
  },
  {
    title: "Audited Financial Statements 2023",
    category: "Audited Financials",
    year: "2023",
    status: "Available",
    description: "Full-year audited financial statements ending December 31, 2023.",
    fileName: "Orbtronics Ltd 2023- ecopy (7).pdf",
  },
  {
    title: "Audited Financial Statements 2024",
    category: "Audited Financials",
    year: "2024",
    status: "Available",
    description: "Full-year audited financial statements ending December 31, 2024.",
    fileName: "Orbtronics Ltd - 2024 Financial Statement (6).pdf",
  },
  {
    title: "Audited Financial Statements 2025",
    category: "Audited Financials",
    year: "2025",
    status: "Available",
    description: "Full-year audited financial statements ending December 31, 2025.",
    fileName: "Orbtronics Ltd - 2025 (IDB version) (1).pdf",
  },
  {
    title: "Valuation Report 2024",
    category: "Valuation Report",
    year: "2024",
    status: "Available",
    description: "Independent valuation estimating Orbtronics at XCD 550,529.",
    fileName: "Orbtronics Valuation Report_2023.pdf",
  },
  {
    title: "Valuation Report 2025",
    category: "Valuation Report",
    year: "2025",
    status: "Available",
    description: "Independent valuation estimating Orbtronics at XCD 1,002,687.",
    fileName: "Orbtronics Valuation Report_2024 (1).pdf",
  },
  {
    title: "Valuation Report 2026",
    category: "Valuation Report",
    year: "2026",
    status: "Available",
    description: "Equidam valuation showing a central value of USD 1,777,397 with a low and high range.",
    fileName: "Orbtronics Valuation Report_2025 (3).pdf",
  },
];

const ROCKET_STARS = [
  { top: "4%",  left: "6%",  size: 2,   maxOpacity: 0.55, duration: 3.2, delay: 0 },
  { top: "9%",  left: "83%", size: 2.5, maxOpacity: 0.6,  duration: 2.5, delay: 0.5 },
  { top: "15%", left: "55%", size: 1.5, maxOpacity: 0.45, duration: 4,   delay: 1 },
  { top: "22%", left: "27%", size: 2,   maxOpacity: 0.5,  duration: 3.5, delay: 0.3 },
  { top: "30%", left: "91%", size: 3,   maxOpacity: 0.4,  duration: 2,   delay: 0.8 },
  { top: "37%", left: "13%", size: 1.5, maxOpacity: 0.6,  duration: 4.5, delay: 0.2 },
  { top: "44%", left: "68%", size: 2,   maxOpacity: 0.45, duration: 3,   delay: 1.2 },
  { top: "51%", left: "41%", size: 2.5, maxOpacity: 0.5,  duration: 2.8, delay: 0.6 },
  { top: "58%", left: "79%", size: 1.5, maxOpacity: 0.4,  duration: 3.2, delay: 0.4 },
  { top: "64%", left: "21%", size: 2,   maxOpacity: 0.55, duration: 2.5, delay: 0.9 },
  { top: "71%", left: "89%", size: 3,   maxOpacity: 0.45, duration: 3.8, delay: 0.1 },
  { top: "78%", left: "50%", size: 1.5, maxOpacity: 0.5,  duration: 4,   delay: 0.7 },
  { top: "84%", left: "11%", size: 2,   maxOpacity: 0.4,  duration: 3,   delay: 0.3 },
  { top: "90%", left: "63%", size: 2.5, maxOpacity: 0.55, duration: 2.2, delay: 1.1 },
  { top: "96%", left: "34%", size: 1.5, maxOpacity: 0.45, duration: 3.5, delay: 0.5 },
  { top: "11%", left: "44%", size: 2,   maxOpacity: 0.5,  duration: 4.2, delay: 0.8 },
  { top: "47%", left: "96%", size: 1.5, maxOpacity: 0.4,  duration: 3,   delay: 0.2 },
  { top: "63%", left: "4%",  size: 2.5, maxOpacity: 0.55, duration: 2.7, delay: 1.3 },
  { top: "75%", left: "73%", size: 2,   maxOpacity: 0.45, duration: 3.5, delay: 0.6 },
  { top: "87%", left: "42%", size: 3,   maxOpacity: 0.5,  duration: 2.3, delay: 0.4 },
];

const RocketBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["92vh", "-130vh"]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {ROCKET_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-slate-400"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.05, star.maxOpacity, 0.05] }}
          transition={{ repeat: Infinity, duration: star.duration, delay: star.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div style={{ y, right: "4%", position: "absolute" }}>
        {/* Rocket body */}
        <svg width="52" height="116" viewBox="0 0 52 116" fill="none" style={{ opacity: 0.22 }}>
          <path d="M26 2 L10 36 L42 36 Z" fill="#0f172a" />
          <rect x="10" y="34" width="32" height="56" rx="4" fill="#1e293b" />
          <rect x="10" y="54" width="32" height="7" fill="#dc2626" opacity="0.85" />
          <circle cx="26" cy="46" r="7" fill="#0ea5e9" opacity="0.75" />
          <circle cx="26" cy="46" r="4.5" fill="#bae6fd" opacity="0.55" />
          <path d="M10 74 L1 98 L10 92 Z" fill="#0f172a" />
          <path d="M42 74 L51 98 L42 92 Z" fill="#0f172a" />
          <rect x="18" y="88" width="16" height="10" rx="3" fill="#334155" />
        </svg>

        {/* Animated flame */}
        <motion.div
          style={{ position: "absolute", bottom: -32, left: "50%", x: "-50%", transformOrigin: "top center" }}
          animate={{
            scaleY: [1, 1.5, 0.8, 1.4, 0.9, 1],
            scaleX: [1, 0.88, 1.12, 0.92, 1.08, 1],
          }}
          transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
        >
          <svg width="26" height="52" viewBox="0 0 26 52" fill="none" style={{ opacity: 0.85 }}>
            <defs>
              <linearGradient id="rkt-flame-outer" x1="13" y1="0" x2="13" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rkt-flame-inner" x1="13" y1="0" x2="13" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M8 0 C5 10 2 24 13 52 C24 24 21 10 18 0 Z" fill="url(#rkt-flame-outer)" />
            <path d="M10.5 0 C9 10 8 18 13 34 C18 18 17 10 15.5 0 Z" fill="url(#rkt-flame-inner)" />
          </svg>
        </motion.div>

        {/* Exhaust smoke trail */}
        <motion.div
          style={{ position: "absolute", bottom: -68, left: "50%", x: "-50%", transformOrigin: "top center" }}
          animate={{ opacity: [0.12, 0.28, 0.08, 0.22, 0.12], scaleX: [1, 1.25, 0.8, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 0.45 }}
        >
          <svg width="18" height="56" viewBox="0 0 18 56" fill="none">
            <defs>
              <linearGradient id="rkt-smoke" x1="9" y1="0" x2="9" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M6 0 C3 16 2 32 9 56 C16 32 15 16 12 0 Z" fill="url(#rkt-smoke)" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

const formatCurrency = (value, currency = "XCD") => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
};

const yoy = (current, previous) => {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
};

const StatCard = ({ title, value, subtext, icon: Icon }) => (
  <Card className="rounded-3xl border-slate-200 shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          {subtext ? <p className="mt-2 text-sm text-slate-500">{subtext}</p> : null}
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function OrbtronicsInvestorRelationsPage() {
  const [documentQuery, setDocumentQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [displayCurrency, setDisplayCurrency] = useState("USD");

  const XCD_TO_USD = 1 / 2.7;
  const convertToDisplay = (value, sourceCurrency = "XCD") => {
    if (displayCurrency === sourceCurrency) return value;
    return sourceCurrency === "XCD" ? value * XCD_TO_USD : value / XCD_TO_USD;
  };
  const fmt = (value, sourceCurrency = "XCD") =>
    formatCurrency(convertToDisplay(value, sourceCurrency), displayCurrency);

  const latestFinancial = financialData[financialData.length - 1];
  const previousFinancial = financialData[financialData.length - 2];
  const latestValuation = valuationData[valuationData.length - 1];

  const revenueGrowth = yoy(latestFinancial.revenue, previousFinancial.revenue);
  const netIncomeGrowth = yoy(latestFinancial.netIncome, previousFinancial.netIncome);
  const valuationGrowth = yoy(
    latestValuation.currency === "USD" ? latestValuation.valuation * 2.7 : latestValuation.valuation,
    valuationData[valuationData.length - 2].valuation
  );

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesQuery = `${doc.title} ${doc.category} ${doc.year} ${doc.description} ${doc.fileName}`
        .toLowerCase()
        .includes(documentQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [documentQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <RocketBackground />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {["USD", "XCD"].map((c) => (
                <button
                  key={c}
                  onClick={() => setDisplayCurrency(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    displayCurrency === c ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
          >
            <div>
              <Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">
                Orbtronics Investor Relations
              </Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                The Growth of the Silicon Forest
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Explore audited financial performance, valuation history, investor materials, and a searchable
                document library for Orbtronics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="rounded-2xl px-5 py-6 text-sm">View financial performance</Button>
                <Button variant="outline" className="rounded-2xl px-5 py-6 text-sm">
                  Browse document library
                </Button>
              </div>
            </div>

            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium text-slate-700">Latest headline metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 p-6 pt-0">
                <div>
                  <p className="text-sm text-slate-500">FY2025 revenue</p>
                  <p className="mt-1 text-3xl font-semibold">{fmt(latestFinancial.revenue)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Net income</p>
                    <p className="mt-1 text-xl font-semibold">{fmt(latestFinancial.netIncome)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Assets</p>
                    <p className="mt-1 text-xl font-semibold">{fmt(latestFinancial.assets)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 col-span-2">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Equity</p>
                    <p className="mt-1 text-xl font-semibold">{fmt(latestFinancial.equity)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Revenue growth"
            value={`${revenueGrowth?.toFixed(1)}%`}
            subtext="FY2025 vs FY2024"
            icon={TrendingUp}
          />
          <StatCard
            title="Net income growth"
            value={`${netIncomeGrowth?.toFixed(1)}%`}
            subtext="FY2025 vs FY2024"
            icon={DollarSign}
          />
          <StatCard
            title="Latest valuation"
            value={fmt(latestValuation.valuation, latestValuation.currency)}
            subtext={valuationGrowth ? `${valuationGrowth.toFixed(1)}% vs prior report` : latestValuation.methodology}
            icon={Building2}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <Tabs defaultValue="financials" className="space-y-6">
          <TabsList className="grid w-full max-w-xl grid-cols-3 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger value="financials" className="rounded-xl">Financial performance</TabsTrigger>
            <TabsTrigger value="valuation" className="rounded-xl">Valuation history</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-xl">Document library</TabsTrigger>
          </TabsList>

          <TabsContent value="financials" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl"><BarChart2 className="h-5 w-5" /> Revenue and net income</CardTitle>
                </CardHeader>
                <CardContent className="h-[380px] p-6 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => fmt(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="netIncome" strokeWidth={3} name="Net income" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Capital structure snapshot</CardTitle>
                </CardHeader>
                <CardContent className="h-[380px] p-6 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => fmt(Number(value))} />
                      <Legend />
                      <Bar dataKey="assets" name="Assets" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="liabilities" name="Liabilities" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="equity" name="Equity" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Audited financial timeline</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 p-6 pt-0 md:grid-cols-2 xl:grid-cols-4">
                {financialData.map((item) => (
                  <div key={item.period} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold">{item.period}</p>
                      <Badge variant="secondary" className="rounded-full">{item.basis}</Badge>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between gap-4"><span>Revenue</span><span className="font-medium text-slate-900">{fmt(item.revenue)}</span></div>
                      <div className="flex justify-between gap-4"><span>Net income</span><span className="font-medium text-slate-900">{fmt(item.netIncome)}</span></div>
                      <div className="flex justify-between gap-4"><span>Assets</span><span className="font-medium text-slate-900">{fmt(item.assets)}</span></div>
                      <div className="flex justify-between gap-4"><span>Equity</span><span className="font-medium text-slate-900">{fmt(item.equity)}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Valuation trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[360px] p-6 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valuationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, _name, props) => fmt(Number(value), props?.payload?.currency || "XCD")} />
                      <Area type="monotone" dataKey="valuation" strokeWidth={3} fillOpacity={0.2} name="Valuation" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Latest valuation range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-6 pt-0">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Central value</p>
                    <p className="mt-1 text-3xl font-semibold">{fmt(latestValuation.valuation, latestValuation.currency)}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-5">
                      <p className="text-sm text-slate-500">Low bound</p>
                      <p className="mt-1 text-2xl font-semibold">{fmt(latestValuation.low, latestValuation.currency)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-5">
                      <p className="text-sm text-slate-500">High bound</p>
                      <p className="mt-1 text-2xl font-semibold">{fmt(latestValuation.high, latestValuation.currency)}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-600">
                    The most recent valuation uses a weighted multi-method approach with DCF and market-oriented methods,
                    while earlier reports were standalone independent valuation reports.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {valuationData.map((item) => (
                <Card key={item.year} className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold">{fmt(item.valuation, item.currency)}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.methodology}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={documentQuery}
                      onChange={(e) => setDocumentQuery(e.target.value)}
                      placeholder="Search audited financials, valuation reports, and decks"
                      className="h-12 rounded-2xl border-slate-200 pl-11"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-500" />
                        <SelectValue placeholder="Filter by category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All documents</SelectItem>
                      <SelectItem value="Audited Financials">Audited Financials</SelectItem>
                      <SelectItem value="Valuation Report">Valuation Reports</SelectItem>
                      <SelectItem value="Investor Presentation">Investor Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <motion.div key={`${doc.title}-${doc.year}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="h-full rounded-3xl border-slate-200 shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-2xl bg-slate-100 p-3">
                          <FileText className="h-5 w-5 text-slate-700" />
                        </div>
                        <Badge variant="secondary" className="rounded-full">{doc.year}</Badge>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-500">{doc.category}</p>
                        <h3 className="mt-1 text-xl font-semibold tracking-tight">{doc.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{doc.description}</p>
                      </div>
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
                        {doc.fileName}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-5">
                        <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          {doc.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <BookOpen className="mr-2 h-4 w-4" /> Preview
                          </Button>
                          <Button size="sm" className="rounded-xl">
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          </TabsContent>
        </Tabs>

        <Card className="mt-6 rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-semibold">Interested in investing?</p>
              <p className="mt-1 text-sm text-slate-600">
                Join us in accelerating the creation and adoption of technology in emerging markets.
              </p>
            </div>
            <Button className="rounded-2xl">
              Contact investor relations <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
