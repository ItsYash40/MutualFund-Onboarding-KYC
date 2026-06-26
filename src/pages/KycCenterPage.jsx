import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function KycCenterPage() {
  const navigate = useNavigate();
  const { kycState } = useAuth();
  
  const documents = [
    {
      id: 'pan',
      title: 'PAN Card',
      desc: 'Permanent Account Number',
      icon: 'badge',
      status: kycState.pan,
      link: '/documents'
    },
    {
      id: 'aadhaar',
      title: 'Aadhaar Card',
      desc: 'Address Proof',
      icon: 'fingerprint',
      status: kycState.aadhaar,
      link: '/documents'
    },
    {
      id: 'photo',
      title: 'Live Selfie',
      desc: 'Real-time face verification',
      icon: 'face',
      status: kycState.photo,
      link: '/documents'
    },
    {
      id: 'signature',
      title: 'Signature',
      desc: 'Draw or upload signature',
      icon: 'draw',
      status: kycState.signature,
      link: '/documents'
    }
  ];

  const completedCount = documents.filter(d => d.status !== 'pending').length;

  return (
    <div className="max-w-6xl mx-auto pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary-container/30 dark:bg-primary-fixed/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-container/10 dark:bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      {/* Header Section */}
      <header className="mb-10">
        <div className="bg-primary-container dark:bg-[#1f2b27] text-on-primary-container dark:text-primary-fixed rounded-xl p-6 md:p-8 flex items-center justify-between shadow-[0_8px_30px_rgba(15,110,86,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden border border-transparent dark:border-primary-fixed/10">
          <div className="relative z-10">
            <h2 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold mb-2">Let's complete your KYC</h2>
            <p className="font-[Inter] text-[16px] opacity-90 max-w-xl text-on-primary-container dark:text-outline-variant">Just a few documents stand between you and your first mutual fund investment. We ensure military-grade encryption for your data.</p>
          </div>
          
          {/* Abstract decorative graphic inside banner */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 opacity-20 dark:opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at right, var(--color-secondary-container) 0%, transparent 70%)' }}></div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Column: Tasks */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* FAQ Accordion */}
          <div className="bg-surface dark:bg-[#070e12] rounded-2xl border border-surface-variant dark:border-slate-800 overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-lowest dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary-fixed transition-colors">info</span>
                <span className="font-[Inter] font-medium text-on-surface dark:text-slate-200">Why do we need this?</span>
              </div>
              <span className="material-symbols-outlined text-outline dark:text-slate-500 transition-transform">expand_more</span>
            </button>
          </div>

          {/* Document Checklist */}
          <div>
            <div className="flex items-center gap-3 mb-4 pl-1">
              <h2 className="font-[Outfit] text-[20px] font-semibold text-on-surface dark:text-white">Document Checklist</h2>
              <span className="bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 text-[12px] font-[Inter] px-2 py-0.5 rounded-full font-medium">
                {completedCount}/{documents.length} Done
              </span>
            </div>
            
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-surface dark:bg-[#070e12] rounded-2xl p-5 border border-surface-variant dark:border-slate-800 flex items-center justify-between hover:border-primary/30 dark:hover:border-primary-fixed/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      doc.status === 'verified' ? 'bg-primary-container/50 dark:bg-primary-fixed/10 text-primary dark:text-primary-fixed' :
                      doc.status === 'uploaded' ? 'bg-secondary-container/50 dark:bg-secondary-fixed/10 text-secondary dark:text-secondary-fixed' :
                      'bg-surface-container-high dark:bg-slate-800 text-outline dark:text-slate-400 group-hover:bg-primary-container/30 dark:group-hover:bg-primary-fixed/5 group-hover:text-primary dark:group-hover:text-primary-fixed'
                    }`}>
                      <span className="material-symbols-outlined">{doc.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-[Inter] font-semibold text-[16px] text-on-surface dark:text-slate-200">{doc.title}</h3>
                      <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-slate-400 mt-0.5">{doc.desc}</p>
                    </div>
                  </div>
                  
                  {doc.status === 'verified' ? (
                    <div className="flex items-center gap-1.5 text-primary dark:text-primary-fixed bg-primary-container/30 dark:bg-primary-fixed/10 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Verified</span>
                    </div>
                  ) : doc.status === 'uploaded' ? (
                    <div className="flex items-center gap-1.5 text-secondary dark:text-secondary-fixed bg-secondary-container/30 dark:bg-secondary-fixed/10 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">pending</span>
                      <span>Under Review</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-1.5 text-error dark:text-error px-3 py-1.5 rounded-full text-sm font-medium border border-error/20 dark:border-error/20">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        <span>Pending</span>
                      </div>
                      <Link to={doc.link} className="bg-primary dark:bg-primary-fixed text-on-primary dark:text-[#0f172a] font-[Inter] text-sm font-medium px-5 py-2 rounded-full hover:bg-secondary dark:hover:bg-primary-fixed-dim transition-colors shadow-sm">
                        Upload
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-6">
          {/* Status Tracker */}
          <div className="bg-surface dark:bg-[#070e12] rounded-2xl p-6 border border-surface-variant dark:border-slate-800">
            <h3 className="font-[Outfit] text-[18px] font-semibold text-on-surface dark:text-white mb-6">Application Status</h3>
            <div className="relative border-l-2 border-surface-variant dark:border-slate-700 ml-3 space-y-8">
              <div className="relative pl-6">
                <div className="absolute -left-[11px] top-0 w-[20px] h-[20px] bg-primary dark:bg-primary-fixed rounded-full flex items-center justify-center ring-4 ring-surface dark:ring-[#070e12]">
                  <span className="material-symbols-outlined text-[12px] text-on-primary dark:text-[#0f172a]">check</span>
                </div>
                <h4 className="font-[Inter] text-[14px] font-semibold text-on-surface dark:text-white leading-none mb-1">Documents Submitted</h4>
                <p className="font-[Inter] text-[12px] text-on-surface-variant dark:text-slate-400">Basic details received.</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[11px] top-0 w-[20px] h-[20px] bg-surface dark:bg-[#070e12] border-[3px] border-primary dark:border-primary-fixed rounded-full ring-4 ring-surface dark:ring-[#070e12]"></div>
                <h4 className="font-[Inter] text-[14px] font-semibold text-primary dark:text-primary-fixed leading-none mb-1">Under Review</h4>
                <p className="font-[Inter] text-[12px] text-on-surface-variant dark:text-slate-400">Please complete pending uploads to proceed.</p>
              </div>
              <div className="relative pl-6 opacity-40">
                <div className="absolute -left-[11px] top-0 w-[20px] h-[20px] bg-surface-variant dark:bg-slate-700 rounded-full ring-4 ring-surface dark:ring-[#070e12]"></div>
                <h4 className="font-[Inter] text-[14px] font-semibold text-on-surface dark:text-white leading-none mb-1">SEBI Verification</h4>
                <p className="font-[Inter] text-[12px] text-on-surface-variant dark:text-slate-400">Automated background check.</p>
              </div>
              <div className="relative pl-6 opacity-40">
                <div className="absolute -left-[11px] top-0 w-[20px] h-[20px] bg-surface-variant dark:bg-slate-700 rounded-full ring-4 ring-surface dark:ring-[#070e12]"></div>
                <h4 className="font-[Inter] text-[14px] font-semibold text-on-surface dark:text-white leading-none mb-1">KYC Approved</h4>
                <p className="font-[Inter] text-[12px] text-on-surface-variant dark:text-slate-400">Ready to invest.</p>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-surface-container-lowest dark:bg-slate-800/50 rounded-2xl p-5 border border-surface-variant dark:border-slate-700 flex gap-4">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed mt-0.5 text-[20px]">security</span>
            <div>
              <h4 className="font-[Inter] font-semibold text-[14px] text-on-surface dark:text-white mb-1">What happens next?</h4>
              <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-slate-400 leading-relaxed">
                Once all documents are uploaded, verification typically takes less than 24 hours. We will notify you via email and SMS once you are cleared to invest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
