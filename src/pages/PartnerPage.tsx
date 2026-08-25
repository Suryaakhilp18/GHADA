import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Users, TrendingUp, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';

export const PartnerPage: React.FC = () => {
  const { partnerData } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-dark-card via-dark-elevated to-dark-card border border-gold/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-gold" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
              B2B2C Enterprise Partner Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-ivory tracking-tight">
            {partnerData.companyName}
          </h1>
          <p className="text-xs text-ivory-dark">
            Worker Financial Resilience & Emergency Safety Impact Analytics
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-gold/10 border border-gold/30 text-gold text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Aggregated & Anonymized Privacy Shield</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          label="Workers Enrolled"
          value={partnerData.totalEnrolled.toLocaleString('en-IN')}
          subtext="Active workforce accounts"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Active Savers"
          value={partnerData.activeSavers.toLocaleString('en-IN')}
          subtext={`${Math.round((partnerData.activeSavers / partnerData.totalEnrolled) * 100)}% monthly participation`}
          icon={<TrendingUp className="w-5 h-5" />}
          highlight={true}
        />
        <StatCard
          label="Avg Safety Progress"
          value={`${partnerData.avgProgressPercent}%`}
          subtext="Of ₹5,000 emergency goal"
          icon={<ShieldCheck className="w-5 h-5" />}
        />
        <StatCard
          label="First Goal Reached"
          value={partnerData.firstGoalReachedCount.toLocaleString('en-IN')}
          subtext="Workers with full ₹1,000+ shield"
          icon={<Award className="w-5 h-5" />}
        />
      </div>

      {/* Total Impact Card */}
      <div className="p-8 rounded-3xl bg-dark-card border border-dark-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-2xl font-bold text-ivory">Collective Workforce Financial Safety</h3>
          <p className="text-xs text-ivory-dark leading-relaxed">
            By offering Ghada to your construction crew, your workers have built over ₹9.8 Lakhs in combined emergency reserves. This dramatically reduces emergency absenteeism and workplace distress.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border text-xs">
              <span className="text-ivory-dark">Total Reserves Built</span>
              <div className="text-xl font-bold text-gold mt-0.5">
                ₹{partnerData.totalSavedByWorkers.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border text-xs">
              <span className="text-ivory-dark">Monthly Growth Rate</span>
              <div className="text-xl font-bold text-gold mt-0.5">
                +{partnerData.monthlyGrowthPercent}%
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-dark-elevated border border-gold/30 text-xs space-y-3">
          <h4 className="font-bold text-gold uppercase tracking-wider">Enterprise Impact Summary</h4>
          <ul className="space-y-2 text-ivory-muted">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span>Reduced informal wage advance requests by 42%</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span>Higher worker retention across project sites</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span>Zero administrative burden on contractor payroll</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
