import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Wallet,
  Building2,
  Search,
  ChevronRight,
  ChartColumn,
  BadgeDollarSign,
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
    cash: 21447,
  },
  {
    period: "2023",
    basis: "annual",
    revenue: 296952,
    netIncome: 57556,
    assets: 162594,
    liabilities: 44902,
    equity: 117692,
    cash: 99963,
  },
  {
    period: "2024",
    basis: "annual",
    revenue: 410445,
    netIncome: 40758,
    assets: 381436,
    liabilities: 180609,
    equity: 200827,
    cash: 338191,
  },
  {
    period: "2025",
    basis: "annual",
    revenue: 1229911,
    netIncome: 204925,
    assets: 673953,
    liabilities: 271553,
    equity: 402400,
    cash: 477732,
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
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
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
                  <p className="mt-1 text-3xl font-semibold">{formatCurrency(latestFinancial.revenue, "XCD")}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Net income</p>
                    <p className="mt-1 text-xl font-semibold">{formatCurrency(latestFinancial.netIncome, "XCD")}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Cash</p>
                    <p className="mt-1 text-xl font-semibold">{formatCurrency(latestFinancial.cash, "XCD")}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Assets</p>
                    <p className="mt-1 text-xl font-semibold">{formatCurrency(latestFinancial.assets, "XCD")}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Equity</p>
                    <p className="mt-1 text-xl font-semibold">{formatCurrency(latestFinancial.equity, "XCD")}</p>
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
            icon={BadgeDollarSign}
          />
          <StatCard
            title="Cash balance"
            value={formatCurrency(latestFinancial.cash, "XCD")}
            subtext="Audited FY2025"
            icon={Wallet}
          />
          <StatCard
            title="Latest valuation"
            value={formatCurrency(latestValuation.valuation, latestValuation.currency)}
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
                  <CardTitle className="flex items-center gap-2 text-xl"><ChartColumn className="h-5 w-5" /> Revenue, net income, and cash</CardTitle>
                </CardHeader>
                <CardContent className="h-[380px] p-6 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value), "XCD")} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="netIncome" strokeWidth={3} name="Net income" />
                      <Line type="monotone" dataKey="cash" strokeWidth={3} name="Cash" />
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
                      <Tooltip formatter={(value) => formatCurrency(Number(value), "XCD")} />
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
                      <div className="flex justify-between gap-4"><span>Revenue</span><span className="font-medium text-slate-900">{formatCurrency(item.revenue, "XCD")}</span></div>
                      <div className="flex justify-between gap-4"><span>Net income</span><span className="font-medium text-slate-900">{formatCurrency(item.netIncome, "XCD")}</span></div>
                      <div className="flex justify-between gap-4"><span>Cash</span><span className="font-medium text-slate-900">{formatCurrency(item.cash, "XCD")}</span></div>
                      <div className="flex justify-between gap-4"><span>Assets</span><span className="font-medium text-slate-900">{formatCurrency(item.assets, "XCD")}</span></div>
                      <div className="flex justify-between gap-4"><span>Equity</span><span className="font-medium text-slate-900">{formatCurrency(item.equity, "XCD")}</span></div>
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
                      <Tooltip formatter={(value, _name, props) => formatCurrency(Number(value), props?.payload?.currency || "XCD")} />
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
                    <p className="mt-1 text-3xl font-semibold">{formatCurrency(latestValuation.valuation, latestValuation.currency)}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-5">
                      <p className="text-sm text-slate-500">Low bound</p>
                      <p className="mt-1 text-2xl font-semibold">{formatCurrency(latestValuation.low, latestValuation.currency)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-5">
                      <p className="text-sm text-slate-500">High bound</p>
                      <p className="mt-1 text-2xl font-semibold">{formatCurrency(latestValuation.high, latestValuation.currency)}</p>
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
                    <p className="mt-2 text-3xl font-semibold">{formatCurrency(item.valuation, item.currency)}</p>
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

            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
                <div>
                  <p className="text-lg font-semibold">Interested in investing?</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Expand this page with governance documents, cap table materials, KPI disclosures, and segmented business reporting.
                  </p>
                </div>
                <Button className="rounded-2xl">
                  Contact investor relations <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
