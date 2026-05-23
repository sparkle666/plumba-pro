import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Search, 
  Trash2, 
  UserCheck, 
  Building, 
  TrendingUp, 
  ArrowLeft, 
  ListFilter,
  RefreshCcw,
  Sparkles,
  Award,
  Lock,
  Download,
  Cloud,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Settings,
  FileSpreadsheet
} from 'lucide-react';
import { Lead, PlumbingBusinessType, RevenueTier } from '../types';

interface AdminDashboardProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  onClearAllLeads: () => void;
  onAddSampleLeads: () => void;
  onExit: () => void;
}

export default function AdminDashboard({ leads, onDeleteLead, onClearAllLeads, onAddSampleLeads, onExit }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  // Local state representation parameters
  
  // Dashboard overall calculations
  const totalLeads = leads.length;
  const bookedMeetings = leads.filter(l => l.booking !== null).length;
  const qualifiedLeads = leads.filter(l => l.qualified).length;
  
  // Calculate average leads growth rate
  const avgSatisfaction = totalLeads > 0 
    ? (leads.reduce((sum, l) => sum + l.answers.leadFlowSatisfaction, 0) / totalLeads).toFixed(1)
    : 'N/A';

  // Apply search & filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.answers.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.answers.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.answers.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.answers.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = filterType === 'All' || lead.answers.businessType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleExportCSV = () => {
    // Generate CSV string
    const headers = 'ID,Date,Business Name,Contact,Email,Phone,Location,Type,Size,Website Status,Revenue,Satisfaction,Qualified,Score,Booking Day,Booking Time\n';
    const rows = leads.map(l => {
      return `"${l.id}","${l.createdTime}","${l.answers.businessName.replace(/"/g, '""')}","${l.answers.fullName.replace(/"/g, '""')}","${l.answers.email}","${l.answers.phone}","${l.answers.location}","${l.answers.businessType}","${l.answers.businessSize}","${l.answers.websiteState}","${l.answers.monthlyRevenue}","${l.answers.leadFlowSatisfaction}","${l.qualified}","${l.score}","${l.booking?.date ?? 'None'}","${l.booking?.timeSlot ?? 'None'}"`;
    }).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plumbgrowth_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] px-6 max-w-7xl mx-auto space-y-8" id="admin_dashboard_root">
      
      {/* Dashboard Top Navigation bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#c3c6d7] pb-6">
        <div>
          <button 
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs text-[#2563eb] font-bold hover:underline mb-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Applet</span>
          </button>
          <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
            Agency Management Workspace
          </h1>
          <p className="font-sans text-xs text-[#737686]">
            Real-time local analytics, funnel flow options, and automated Netlify Forms submissions pipeline
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddSampleLeads}
            className="px-4 py-2 text-xs font-bold text-[#004ac6] bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#eaedff] rounded-xl flex items-center gap-1 transition-all"
            id="inject_demo_btn"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Demo Leads</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
              leads.length === 0 
                ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
            id="export_csv_btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Grid</span>
          </button>

          <button
            onClick={onClearAllLeads}
            disabled={leads.length === 0}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
              leads.length === 0 
                ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
            }`}
            id="clear_leads_btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Wipe Records</span>
          </button>
        </div>
      </div>

      {/* Stats Grid Counters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-[#c3c6d7] rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#f2f3ff] border border-[#eaedff] rounded-xl flex items-center justify-center text-[#2563eb]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#737686] block font-semibold uppercase">Total Leads Audited</span>
            <span className="font-sans font-extrabold text-2xl text-[#131b2e] block leading-none mt-1">{totalLeads}</span>
          </div>
        </div>

        <div className="p-6 bg-white border border-[#c3c6d7] rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#737686] block font-semibold uppercase">Qualified Fit Sites</span>
            <span className="font-sans font-extrabold text-2xl text-emerald-700 block leading-none mt-1">{qualifiedLeads}</span>
          </div>
        </div>

        <div className="p-6 bg-white border border-[#c3c6d7] rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#f2f3ff] border border-[#eaedff] rounded-xl flex items-center justify-center text-[#2563eb]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#737686] block font-semibold uppercase">Strategy Booked Calls</span>
            <span className="font-sans font-extrabold text-2xl text-[#131b2e] block leading-none mt-1">{bookedMeetings}</span>
          </div>
        </div>

        <div className="p-6 bg-[#131b2e] border border-white/10 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#6ffbbe]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#c3c6d7] block font-semibold uppercase">Avg. Inbound Trouble Level</span>
            <span className="font-sans font-extrabold text-2xl text-[#6ffbbe] block leading-none mt-1">{avgSatisfaction} / 5</span>
          </div>
        </div>
      </div>

      {/* Netlify Forms Workspace Integration section */}
      <div className="bg-white border text-left border-[#c3c6d7] rounded-2xl overflow-hidden shadow-sm" id="netlify-forms-panel">
        <div className="border-b border-[#c3c6d7]/50 bg-gradient-to-r from-[#faf8ff] to-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-600 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm text-[#131b2e]">Netlify Forms Active Pipeline</h3>
              <p className="text-xs text-[#737686]">Inbound plumbing contractor diagnostics, contact specs and call preferences routed securely off-site</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-emerald-500 animate-pulse"></span>
              Netlify Form Active
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-xs text-[#434655] leading-relaxed">
                The PlumbGrowth platform utilizes standard <strong>Netlify Forms</strong> to safely capture full onboarding logs. This contains all customized questionnaire metadata and direct request details without requiring complex third-party sheets cookies or workspace access authentication keys.
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 py-1 px-2.5 rounded-lg">
                  ✓ Form Endpoint Registered (leads)
                </span>
                <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 py-1 px-2.5 rounded-lg">
                  ✓ Honeypot Spam Validation Enabled
                </span>
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 py-1 px-2.5 rounded-lg">
                  📋 Diagnostic Scores Persistent
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#faf8ff] border border-[#eaedff] rounded-xl text-xs space-y-2 text-left">
              <h4 className="font-sans font-bold text-[#131b2e] uppercase tracking-wide text-[10px]">Netlify Pipeline Specs</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div>
                  <div className="text-[#737686] text-[9px] uppercase font-bold">Static Form ID:</div>
                  <div className="font-mono text-[11px] text-[#131b2e] font-bold">leads</div>
                </div>
                <div>
                  <div className="text-[#737686] text-[9px] uppercase font-bold">Transport Method:</div>
                  <div className="font-mono text-[11px] text-[#2563eb] font-bold">x-www-form-urlencoded</div>
                </div>
                <div>
                  <div className="text-[#737686] text-[9px] uppercase font-bold">Payload Schema:</div>
                  <div className="font-mono text-[11px] text-[#131b2e] font-bold">13 Parameter Fields</div>
                </div>
                <div>
                  <div className="text-[#737686] text-[9px] uppercase font-bold">Spam Security:</div>
                  <div className="font-mono text-[11px] text-[#00714d] font-bold">Bot Honeypot Armed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Options */}
      <div className="bg-white border border-[#c3c6d7] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search leads by plumber name, city, brand or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <ListFilter className="w-4 h-4 text-[#737686]" />
          <span className="font-sans text-xs text-[#434655] font-semibold whitespace-nowrap">Filter Business Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb] font-semibold"
          >
            <option value="All">All Sectors</option>
            <option value="Residential">Residential Plumber</option>
            <option value="Commercial">Commercial Agency</option>
            <option value="Both">Both Sectors</option>
            <option value="Starting out">Starting Out Focus</option>
          </select>
        </div>
      </div>

      {/* Leads Table Card View */}
      <div className="bg-[#ffffff] border border-[#c3c6d7] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#434655] border-collapse">
            <thead className="bg-[#f2f3ff]/60 border-b border-[#c3c6d7] font-sans font-bold text-[#131b2e] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Plumbing Business Name</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Diagnostics</th>
                <th className="py-4 px-6 text-center">Estimation Score</th>
                <th className="py-4 px-6">Secured Booking Date</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/40 leading-relaxed font-sans">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#737686]">
                    <div className="space-y-2">
                      <p className="font-sans font-bold text-sm">No plumbing records match the currently loaded criteria filter.</p>
                      <p className="text-xs">Submit a qualification or click "Generate Demo Leads" above to populate realistic data parameters!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#faf8ff] transition-colors">
                    <td className="py-4 px-6 space-y-1 text-left">
                      <div className="font-sans font-bold text-sm text-[#131b2e]">{lead.answers.businessName}</div>
                      <div className="text-[11px] text-[#737686] flex flex-wrap items-center gap-1 select-all">
                        <span>Contact: <strong>{lead.answers.fullName}</strong></span>
                        <span>•</span>
                        <span>{lead.answers.email}</span>
                        <span>•</span>
                        <span>{lead.answers.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="font-semibold text-[#131b2e]">{lead.answers.location}</div>
                    </td>
                    <td className="py-4 px-6 text-left space-y-1">
                      <div className="flex flex-wrap gap-1">
                        <span className="font-mono text-[9px] bg-[#eaedff] text-[#2563eb] px-1.5 py-0.5 rounded font-bold uppercase">
                          {lead.answers.businessType}
                        </span>
                        <span className="font-mono text-[9px] bg-neutral-100 text-[#434655] px-1.5 py-0.5 rounded font-bold uppercase">
                          {lead.answers.businessSize}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#737686]">
                        Site: {lead.answers.websiteState} | satisfaction: {lead.answers.leadFlowSatisfaction}/5
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        lead.score >= 80 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {lead.score}% Growth Potential
                      </span>
                    </td>
                    <td className="py-4 px-6 text-left">
                      {lead.booking ? (
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#10B981] flex items-center gap-1 font-mono text-xs">
                            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block animate-pulse"></span>
                            {lead.booking.date}
                          </span>
                          <div className="text-[10px] text-[#737686] font-semibold">{lead.booking.timeSlot}</div>
                        </div>
                      ) : (
                        <span className="text-[#737686] italic text-[11px]">No Meeting Confirmed</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all focus:outline-none cursor-pointer"
                        title="Delete record"
                        id={`delete_lead_${lead.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
