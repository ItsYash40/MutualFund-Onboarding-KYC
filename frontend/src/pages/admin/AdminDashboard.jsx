import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function AdminDashboard() {
  const { kycState, approveKyc, rejectKyc, user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);

  // For demonstration, we simulate a list of users.
  // In reality, this would be fetched from a backend.
  const pendingUsers = [
    ...(kycState.status === 'pending' ? [{
      id: 'usr_1',
      name: user?.fullName || 'Demo User',
      email: user?.email || 'user@example.com',
      date: new Date().toLocaleDateString(),
      status: 'pending',
      kyc: kycState
    }] : []),
    {
      id: 'usr_2',
      name: 'Rohan Sharma',
      email: 'rohan.s@example.com',
      date: '2023-10-25',
      status: 'verified',
      kyc: { pan: 'verified', aadhaar: 'verified', photo: 'verified', signature: 'verified' }
    }
  ];

  const handleApprove = () => {
    approveKyc();
    setSelectedUser(null);
  };

  const handleReject = () => {
    rejectKyc();
    setSelectedUser(null);
  };

  if (selectedUser) {
    return (
      <div className="space-y-6">
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-[Outfit] text-white font-bold">{selectedUser.name}'s Application</h2>
              <p className="text-slate-400">{selectedUser.email}</p>
            </div>
            <span className="px-3 py-1 bg-secondary-fixed/20 text-secondary-fixed text-sm font-medium rounded-full">
              Pending Review
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">PAN Card</p>
                  <p className="font-semibold text-white">Uploaded Document</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">badge</span>
              </div>
              <button onClick={() => setViewingDoc('PAN Card')} className="w-full py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">visibility</span> View Document
              </button>
            </div>
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Aadhaar Card</p>
                  <p className="font-semibold text-white">Uploaded Document</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">fingerprint</span>
              </div>
              <button onClick={() => setViewingDoc('Aadhaar Card')} className="w-full py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">visibility</span> View Document
              </button>
            </div>
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Live Selfie</p>
                  <p className="font-semibold text-white">Uploaded Document</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">face</span>
              </div>
              <button onClick={() => setViewingDoc('Live Selfie')} className="w-full py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">visibility</span> View Document
              </button>
            </div>
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Signature</p>
                  <p className="font-semibold text-white">Uploaded Document</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">draw</span>
              </div>
              <button onClick={() => setViewingDoc('Signature')} className="w-full py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">visibility</span> View Document
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-slate-700 pt-6">
            <button 
              onClick={() => setSelectedUser(null)}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleReject}
              className="px-6 py-2.5 rounded-lg bg-error/10 text-error font-medium hover:bg-error/20 transition-colors"
            >
              Reject Application
            </button>
            <button 
              onClick={handleApprove}
              className="px-6 py-2.5 rounded-lg bg-primary-fixed text-[#0f172a] font-semibold hover:bg-primary-fixed-dim transition-colors"
            >
              Approve Application
            </button>
          </div>
          
          {/* Document Viewer Modal */}
          {viewingDoc && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-[#1e293b] rounded-2xl border border-slate-700 w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-[#0f172a]">
                  <h3 className="font-[Outfit] text-xl font-semibold text-white">Viewing {viewingDoc}</h3>
                  <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="p-8 flex flex-col items-center justify-center bg-slate-900 min-h-[400px] max-h-[70vh] overflow-y-auto relative">
                  {/* Mock Image Placeholder */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #334155 25%, transparent 25%, transparent 75%, #334155 75%, #334155), repeating-linear-gradient(45deg, #334155 25%, transparent 25%, transparent 75%, #334155 75%, #334155)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                  
                  {viewingDoc === 'Live Selfie' ? (
                    <div className="z-10 max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-800 flex items-center justify-center">
                      {selectedUser?.kyc?.photoImage ? (
                        <img src={selectedUser.kyc.photoImage} alt="Selfie" className="w-full h-auto object-cover" />
                      ) : (
                        <div className="p-12 text-slate-400">No real photo uploaded</div>
                      )}
                    </div>
                  ) : viewingDoc === 'Signature' ? (
                    <div className="z-10 bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full flex justify-center items-center">
                      {selectedUser?.kyc?.signatureImage ? (
                        <img src={selectedUser.kyc.signatureImage} alt="Signature" className="max-h-[300px] w-auto object-contain" />
                      ) : (
                        <div className="p-12 text-slate-400">No real signature uploaded</div>
                      )}
                    </div>
                  ) : viewingDoc === 'PAN Card' ? (
                    <div className="z-10 bg-slate-800 rounded-xl shadow-2xl relative w-full max-w-[500px] overflow-hidden border border-slate-700 flex items-center justify-center min-h-[300px]">
                      {selectedUser?.kyc?.panImage ? (
                        <img src={selectedUser.kyc.panImage} alt="PAN Card" className="w-full h-auto object-contain" />
                      ) : (
                        <div className="text-slate-400">No real PAN uploaded</div>
                      )}
                    </div>
                  ) : (
                    <div className="z-10 w-full max-w-3xl flex flex-col gap-6">
                      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center min-h-[250px]">
                        <div className="w-full bg-slate-900 py-2 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">Front Side</div>
                        {selectedUser?.kyc?.aadhaarFrontImage ? (
                          <img src={selectedUser.kyc.aadhaarFrontImage} alt="Aadhaar Front" className="w-full h-auto object-contain max-h-[300px]" />
                        ) : (
                          <div className="p-12 text-slate-400">No front image uploaded</div>
                        )}
                      </div>
                      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center min-h-[250px]">
                        <div className="w-full bg-slate-900 py-2 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">Back Side</div>
                        {selectedUser?.kyc?.aadhaarBackImage ? (
                          <img src={selectedUser.kyc.aadhaarBackImage} alt="Aadhaar Back" className="w-full h-auto object-contain max-h-[300px]" />
                        ) : (
                          <div className="p-12 text-slate-400">No back image uploaded</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-slate-700 bg-[#0f172a] flex justify-end">
                  <button onClick={() => setViewingDoc(null)} className="px-6 py-2 bg-primary-fixed text-[#0f172a] rounded-lg font-medium hover:bg-primary-fixed-dim transition-colors">
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-[Outfit] text-white font-bold mb-2">Pending Applications</h1>
          <p className="text-slate-400">Review and verify investor KYC documents.</p>
        </div>
      </header>

      <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0f172a] border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-slate-400">Investor</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-400">Submission Date</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-400">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {pendingUsers.map((usr) => (
              <tr key={usr.id} className="hover:bg-[#0f172a]/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{usr.name}</p>
                  <p className="text-sm text-slate-400">{usr.email}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">{usr.date}</td>
                <td className="px-6 py-4">
                  {usr.status === 'pending' ? (
                    <span className="px-3 py-1 bg-secondary-fixed/20 text-secondary-fixed text-sm font-medium rounded-full">
                      Needs Review
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-primary-fixed/20 text-primary-fixed text-sm font-medium rounded-full">
                      Verified
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {usr.status === 'pending' ? (
                    <button 
                      onClick={() => setSelectedUser(usr)}
                      className="px-4 py-2 bg-primary-fixed/10 text-primary-fixed font-medium rounded hover:bg-primary-fixed/20 transition-colors"
                    >
                      Review
                    </button>
                  ) : (
                    <button className="px-4 py-2 text-slate-500 font-medium cursor-not-allowed">
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {pendingUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                  No pending applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
