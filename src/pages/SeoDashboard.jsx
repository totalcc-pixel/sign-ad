import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, TrendingUp, Search, FileText, Globe, BarChart3, ChevronRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SeoDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(28);

  const fetchData = async (rangeDays) => {
    setLoading(true);
    setError(null);
    try {
      const end = new Date();
      const start = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000);
      const res = await base44.functions.invoke("seoDashboard", {
        siteUrl: "sc-domain:signad.co.nz",
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10)
      });
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Failed to load SEO data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(days);
  }, [days]);

  const totalClicks = data?.analytics?.reduce((sum, r) => sum + r.clicks, 0) || 0;
  const totalImpressions = data?.analytics?.reduce((sum, r) => sum + r.impressions, 0) || 0;
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0";
  const avgPosition = data?.analytics?.length > 0
    ? (data.analytics.reduce((sum, r) => sum + r.position, 0) / data.analytics.length).toFixed(1)
    : "—";

  const chartData = data?.analytics?.map(r => ({
    date: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions
  })) || [];

  return (
    <div className="min-h-screen bg-black pt-32 lg:pt-56 pb-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">SEO Dashboard</h1>
            <p className="text-white/50 text-sm">Google Search Console performance data</p>
          </div>
          <div className="flex items-center gap-2">
            {[7, 28, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  days === d
                    ? "bg-[#F39C12] text-black"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-red-400 font-semibold mb-1">Unable to load Search Console data</p>
            <p className="text-white/50 text-sm">{error}</p>
            <p className="text-white/40 text-xs mt-2">
              Make sure your site is verified in Google Search Console.
              Check the connected site URL matches your property.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-[#F39C12] animate-spin" />
          </div>
        ) : data ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-[#F39C12]" />}
                label="Total Clicks"
                value={totalClicks.toLocaleString()}
              />
              <StatCard
                icon={<Search className="w-5 h-5 text-[#F39C12]" />}
                label="Impressions"
                value={totalImpressions.toLocaleString()}
              />
              <StatCard
                icon={<BarChart3 className="w-5 h-5 text-[#F39C12]" />}
                label="Avg CTR"
                value={`${avgCtr}%`}
              />
              <StatCard
                icon={<Globe className="w-5 h-5 text-[#F39C12]" />}
                label="Avg Position"
                value={avgPosition}
              />
            </div>

            {/* Performance Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#F39C12]" />
                Search Performance
              </h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="date"
                      stroke="rgba(255,255,255,0.4)"
                      fontSize={11}
                      tickFormatter={(d) => d.slice(5)}
                    />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px"
                      }}
                      labelStyle={{ color: "#F39C12" }}
                    />
                    <Line type="monotone" dataKey="clicks" stroke="#F39C12" strokeWidth={2} name="Clicks" />
                    <Line type="monotone" dataKey="impressions" stroke="#60a5fa" strokeWidth={2} name="Impressions" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-white/40 text-center py-8">No performance data available for this period.</p>
              )}
            </div>

            {/* Top Queries + Top Pages */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#F39C12]" />
                  Top Search Queries
                </h2>
                {data.topQueries?.length > 0 ? (
                  <div className="space-y-2">
                    {data.topQueries.slice(0, 10).map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-white/30 text-xs w-6">{i + 1}</span>
                          <span className="text-white/70 text-sm truncate">{row.keys[0]}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs flex-shrink-0">
                          <span className="text-[#F39C12] font-medium">{row.clicks}</span>
                          <span className="text-white/40 w-16 text-right">{row.ctr ? (row.ctr * 100).toFixed(1) : 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-center py-8">No query data available.</p>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F39C12]" />
                  Top Pages
                </h2>
                {data.topPages?.length > 0 ? (
                  <div className="space-y-2">
                    {data.topPages.slice(0, 10).map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-white/30 text-xs w-6">{i + 1}</span>
                          <span className="text-white/70 text-sm truncate">{row.keys[0].replace(/^https?:\/\/[^/]+/, '')}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs flex-shrink-0">
                          <span className="text-[#F39C12] font-medium">{row.clicks}</span>
                          <span className="text-white/40 w-16 text-right">{row.ctr ? (row.ctr * 100).toFixed(1) : 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-center py-8">No page data available.</p>
                )}
              </div>
            </div>

            {/* Sitemaps */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#F39C12]" />
                Sitemaps
              </h2>
              {data.sitemaps?.length > 0 ? (
                <div className="space-y-2">
                  {data.sitemaps.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/70 text-sm truncate">{s.path}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          s.errors === "0" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        }`}>
                          {s.errors === "0" ? "OK" : `${s.errors} errors`}
                        </span>
                        <span className="text-white/40 text-xs">{s.submitted || "—"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/40 text-center py-8">No sitemaps found for this property.</p>
              )}
            </div>

            {/* Connected Sites */}
            {data.sites?.length > 0 && (
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-[#F39C12]" />
                  Connected Sites
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.sites.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/70 text-xs">
                      {s.siteUrl}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-white/50 text-xs font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}