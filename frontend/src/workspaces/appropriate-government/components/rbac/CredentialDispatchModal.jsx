import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Mail, 
  Key, 
  ShieldCheck, 
  Printer, 
  ExternalLink,
  Layers
} from 'lucide-react';

export default function CredentialDispatchModal({
  isOpen,
  onClose,
  data
}) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen || !data) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-[#1B365D] text-white rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#C5A059] rounded text-slate-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight">
                  Downstream Workspace Created &amp; Credentials Issued
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500 text-white px-2 py-0.5 rounded">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Statutory delegation under {data.section || 'RFCTLARR Act 2013'} &bull; {data.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          
          {/* Notification banner */}
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-md flex items-start gap-2.5 text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm">
                Login Credentials Successfully Dispatched to Members' Gmail Addresses
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                The downstream workspace has been provisioned. Each designated officer has been sent their individual secure login credentials and SSO access link via official government email notification.
              </p>
            </div>
          </div>

          {/* Workspace Summary Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50 p-3 rounded border border-slate-200">
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">Workspace Role:</span>
              <strong className="text-slate-800 font-bold">{data.title}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">Statutory Section:</span>
              <strong className="text-[#1B365D] font-mono">{data.section}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">Statutory Project:</span>
              <strong className="text-slate-800 truncate block" title={data.projectName}>
                {data.projectId}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">Gazette / Order Ref:</span>
              <strong className="font-mono text-slate-800">{data.gazetteOrderNo}</strong>
            </div>
          </div>

          {/* Member Credentials Table */}
          <div className="border border-slate-200 rounded overflow-hidden">
            <div className="bg-[#1B365D] text-white p-2.5 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#C5A059]" />
                Generated Member Login Credentials &amp; Gmail Dispatch Status ({data.members?.length || 0})
              </span>
              <span className="text-[10px] text-blue-200 font-mono">
                Encrypted &bull; Audit Trail Logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Officer Name</th>
                    <th className="py-2 px-3">Registered Gmail</th>
                    <th className="py-2 px-3">Generated User ID</th>
                    <th className="py-2 px-3">Temporary Password</th>
                    <th className="py-2 px-3 text-center">Gmail Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {data.members?.map((mem, i) => {
                    const tempPass = mem.password || `NLAMS#${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + i * 3)}`;
                    const username = mem.email || `officer.${mem.id?.toLowerCase()}@nlams.gov.in`;
                    return (
                      <tr key={mem.id || i} className="hover:bg-slate-50">
                        <td className="py-2 px-3">
                          <div className="font-bold text-[#1B365D]">{mem.name}</div>
                          <div className="text-[10px] text-slate-500">{mem.role || mem.category || 'Member'}</div>
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-blue-700">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-rose-600" />
                            <span>{mem.email}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{mem.phone}</div>
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] font-semibold text-slate-800">
                          {username}
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] bg-amber-50/60 text-amber-900 font-bold px-2 py-0.5 rounded">
                          {tempPass}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Dispatched
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => handleCopy(`User: ${username}\nPass: ${tempPass}\nLink: https://nlams.gov.in/workspace-auth/login`, mem.id || i)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded font-medium text-[10px] inline-flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === (mem.id || i) ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Granted Menus List */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 mb-2">
              <span className="font-bold text-xs uppercase tracking-wide text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                Accessible Menus Provisioned ({data.grantedMenus?.length || 0})
              </span>
              <span className="text-[10px] text-slate-500">
                Menus configured with [ View ] permission in the new workspace
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.grantedMenus?.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-white border border-slate-300 font-medium text-[11px] text-slate-800 flex items-center gap-1 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {m.name || m}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Workspace Access URL */}
          <div className="p-3 bg-blue-50/60 border border-blue-200 rounded flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-blue-900 block">Universal Authenticated Workspace URL:</span>
              <code className="text-xs font-mono text-blue-800 truncate block">
                https://nlams.gov.in/workspace-auth/login?token={Date.now()}&amp;role={encodeURIComponent(data.title)}
              </code>
            </div>
            <button
              onClick={() => handleCopy(`https://nlams.gov.in/workspace-auth/login?token=${Date.now()}&role=${encodeURIComponent(data.title)}`, 'universal_url')}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'universal_url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 rounded-b-lg border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Formal Authorization Order</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold text-xs cursor-pointer"
          >
            Close &amp; Return to RBAC Hub
          </button>
        </div>

      </div>
    </div>
  );
}
