import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const { kycState, updateKyc, submitKyc } = useAuth();
  
  const [activeTab, setActiveTab] = useState('pan');
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // PAN Simulation States
  const [panOcrStatus, setPanOcrStatus] = useState('idle'); // idle, scanning, success
  const [panLogs, setPanLogs] = useState([]);
  const [panData, setPanData] = useState({ pan: 'AMDPB1827K', name: 'Suresh Kumar Sharma', dob: '15/08/1988' });

  // Aadhaar Simulation States
  const [aadhaarStatus, setAadhaarStatus] = useState('idle'); // idle, processing, otp_sent, success
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [aadhaarData, setAadhaarData] = useState({ number: '', address: 'Waiting for verification...', name: '' });

  // General uploading state for photo/signature
  const [uploading, setUploading] = useState(null);

  // Constants
  const tabs = [
    { id: 'pan', label: 'PAN & OCR', icon: 'badge' },
    { id: 'aadhaar', label: 'AADHAAR VERIFY', icon: 'account_balance' },
    { id: 'photo', label: 'WEBCAM SELFIE', icon: 'photo_camera' },
    { id: 'signature', label: 'SIGNATURE', icon: 'draw' },
  ];

  const processImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSimulatePan = async (userType, file = null) => {
    setPanOcrStatus('scanning');
    setPanLogs([]);
    
    if (file) {
      // REAL OCR FLOW
      processImage(file, (base64) => {
        updateKyc('panImage', base64);
      });
      
      setPanLogs(prev => [...prev, "Initializing Tesseract OCR Engine..."]);
      try {
        const { data: { text } } = await Tesseract.recognize(
          file,
          'eng',
          {
            logger: m => {
              if (m.status === 'recognizing text') {
                setPanLogs(prev => {
                  const newLogs = [...prev];
                  const last = newLogs[newLogs.length - 1];
                  if (last && last.startsWith("Recognizing text:")) {
                    newLogs[newLogs.length - 1] = `Recognizing text: ${Math.round(m.progress * 100)}%`;
                  } else {
                    newLogs.push(`Recognizing text: ${Math.round(m.progress * 100)}%`);
                  }
                  return newLogs;
                });
              } else {
                setPanLogs(prev => [...prev, `[Tesseract] ${m.status}`]);
              }
            }
          }
        );
        
        setPanLogs(prev => [...prev, "OCR Extraction SUCCESS. Raw text obtained."]);
        setPanLogs(prev => [...prev, "Regex matching PAN details..."]);
        
        const panMatch = text.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
        const extractedPan = panMatch ? panMatch[0] : "NOT_FOUND";
        
        const dobMatch = text.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
        const extractedDob = dobMatch ? dobMatch[0] : "NOT_FOUND";
        
        let extractedName = "NOT_FOUND";
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        const dobLineIndex = lines.findIndex(l => dobMatch && l.includes(dobMatch[0]));
        if (dobLineIndex > 0) {
           const nameLine = lines[dobLineIndex - 1].replace(/[^a-zA-Z\s]/g, '').trim();
           if (nameLine.length > 3) extractedName = nameLine;
        }
        
        setPanData({ pan: extractedPan, name: extractedName, dob: extractedDob });
        
        updateKyc('extractedName', extractedName);
        
        setPanOcrStatus('success');
        updateKyc('pan', 'verified');
      } catch (err) {
        console.error(err);
        setPanLogs(prev => [...prev, `ERROR: ${err.message || 'OCR processing failed'}`]);
        setPanOcrStatus('idle');
      }
    } else {
      // SIMULATED OCR FLOW
      const logs = [
        "Initializing Simulated OCR Engine...",
        "Reading image text layout...",
        "Extracting text segments...",
        "Regex matching PAN number signature...",
        "Validating against Income Tax Database...",
        "OCR Extraction SUCCESS."
      ];

      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < logs.length) {
          setPanLogs(prev => [...prev, logs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(interval);
          setPanData({ pan: 'AMDPB1827K', name: 'Suresh Kumar Sharma', dob: '15/08/1988' });
          updateKyc('extractedName', 'Suresh Kumar Sharma');
          setPanOcrStatus('success');
          updateKyc('pan', 'verified');
        }
      }, 400);
    }
  };

  const handleSendAadhaarOtp = async () => {
    if (aadhaarNumber.length < 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setAadhaarStatus('processing');
    
    // In a real scenario, this calls: await kycService.sendAadhaarOtp({ aadhaarNumber })
    // We simulate the backend delay:
    setTimeout(() => {
      setAadhaarStatus('otp_sent');
    }, 1500);
  };

  const handleVerifyAadhaarOtp = async () => {
    if (otpCode.length < 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    setAadhaarStatus('processing');
    
    // In a real scenario, this calls: await kycService.verifyAadhaarOtp({ aadhaarNumber, otpCode })
    setTimeout(() => {
      setAadhaarData({ 
        number: aadhaarNumber, 
        address: '123 Tech Park, Bangalore, Karnataka 560001', 
        name: kycState.extractedName || 'Verified User' 
      });
      setAadhaarStatus('success');
      updateKyc('aadhaar', 'verified');
    }, 1500);
  };

  const handleUploadBasic = (docType, file = null) => {
    if (file) {
      processImage(file, (base64) => {
        if (docType === 'signature') updateKyc('signatureImage', base64);
        if (docType === 'photo') updateKyc('photoImage', base64);
      });
    }
    
    setUploading(docType);
    setTimeout(() => {
      updateKyc(docType, 'verified');
      setUploading(null);
    }, 1500);
  };

  // Camera logic
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      }, 100);
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Camera access denied or unavailable. Please use a device with a camera.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      updateKyc('photoImage', dataUrl);
    }
    stopCamera();
    handleUploadBasic('photo');
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  const handleSubmit = () => {
    submitKyc();
    navigate('/kyc/status');
  };

  const isReadyToSubmit = kycState.pan === 'verified' && kycState.aadhaar === 'verified' && kycState.photo === 'verified' && kycState.signature === 'verified';

  return (
    <div className="max-w-6xl mx-auto pb-12 relative animate-fade-in">
      <header className="mb-8 text-center">
        <p className="font-[Inter] text-[16px] text-slate-400">Complete the standard regulatory onboarding to unlock mutual fund investments.</p>
      </header>

      {/* Horizontal Tab Navigation */}
      <div className="flex items-center justify-between relative mb-12 px-10">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -z-10 translate-y-[-50%]"></div>
        {tabs.map((tab, idx) => {
          const isCompleted = kycState[tab.id] === 'verified';
          const isActive = activeTab === tab.id;
          
          return (
            <div 
              key={tab.id} 
              className={`flex flex-col items-center gap-3 cursor-pointer ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-70'} transition-opacity bg-[#0f172a] px-4`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isCompleted 
                  ? 'bg-primary-fixed text-[#0f172a] shadow-[0_0_15px_rgba(15,110,86,0.5)]' 
                  : isActive 
                    ? 'bg-secondary-fixed text-[#0f172a] shadow-[0_0_15px_rgba(255,180,0,0.5)]'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                <span className="material-symbols-outlined text-[20px]">
                  {isCompleted ? 'check' : tab.icon}
                </span>
              </div>
              <span className={`font-[Outfit] text-[12px] font-bold tracking-widest uppercase ${
                isCompleted ? 'text-primary-fixed' : isActive ? 'text-secondary-fixed' : 'text-slate-500'
              }`}>
                {tab.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-8 min-h-[500px]">
        {/* SUCCESS BANNER */}
        {kycState[activeTab] === 'verified' && (
          <div className="mb-6 bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-medium text-sm">Successfully authenticated and verified against regulatory databases.</span>
          </div>
        )}

        {/* PAN TAB */}
        {activeTab === 'pan' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-[Outfit] font-bold text-white mb-2">PAN Card OCR Extraction</h2>
            <p className="text-slate-400 mb-8 text-sm">Upload your Permanent Account Number (PAN) Card. The system automatically reads details using OCR and validates it with the Income Tax Department database.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Upload */}
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Upload PAN Card Image File</h3>
                <label 
                  htmlFor="upload-pan-real"
                  className={`border-2 border-dashed ${kycState.pan === 'verified' ? 'border-primary-fixed/30 bg-primary-fixed/5' : 'border-slate-700 hover:border-slate-500 bg-slate-800/30'} rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[200px] mb-6 block w-full`}
                >
                  <span className={`material-symbols-outlined text-4xl mb-3 ${kycState.pan === 'verified' ? 'text-primary-fixed' : 'text-indigo-400'}`}>upload</span>
                  <p className="text-white font-medium mb-1">Click to Browse Files</p>
                  <p className="text-xs text-slate-500">Supports PNG, JPG, JPEG up to 5MB</p>
                  <input id="upload-pan-real" type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleSimulatePan('real', e.target.files[0]);
                    }
                  }} />
                </label>
                
                <h3 className="text-sm font-medium text-slate-400 mb-3">Or test with preloaded sample cards:</h3>
                <div className="flex gap-4">
                  <button onClick={() => handleSimulatePan('suresh')} disabled={panOcrStatus === 'scanning'} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                    <span className="material-symbols-outlined text-[16px]">description</span> Sample PAN: Suresh
                  </button>
                  <button onClick={() => handleSimulatePan('priya')} disabled={panOcrStatus === 'scanning'} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                    <span className="material-symbols-outlined text-[16px]">description</span> Sample PAN: Priya
                  </button>
                </div>
              </div>
              
              {/* Right Column - OCR Console */}
              <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 flex flex-col">
                <h3 className="text-sm font-medium text-slate-300 mb-4">OCR Scanning Log & Results</h3>
                
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 flex-1 font-[JetBrains_Mono] text-xs text-emerald-400 overflow-y-auto mb-6 min-h-[150px] shadow-inner flex flex-col">
                  {panOcrStatus === 'idle' && (
                    <div className="text-slate-600 italic">Waiting for document upload...</div>
                  )}
                  {panLogs.map((log, i) => (
                    <div key={i} className="mb-1 animate-fade-in">&gt; {log}</div>
                  ))}
                  {panOcrStatus === 'scanning' && (
                    <div className="animate-pulse mt-auto">&gt; Processing...</div>
                  )}
                </div>
                
                {kycState.pan === 'verified' && (
                  <div className="bg-primary-fixed/5 border border-primary-fixed/20 rounded-xl p-6 grid grid-cols-3 gap-4 animate-fade-in">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Extracted PAN</p>
                      <p className="text-primary-fixed font-bold tracking-widest text-lg">{panData.pan}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Verified Name</p>
                      <p className="text-white font-bold text-lg uppercase">{panData.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Date of Birth</p>
                      <p className="text-white font-bold text-sm">{panData.dob}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between border-t border-slate-800 pt-6">
              <button onClick={() => navigate('/kyc')} className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Back
              </button>
              <button 
                onClick={() => setActiveTab('aadhaar')}
                disabled={kycState.pan !== 'verified'}
                className="px-8 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
              >
                Continue <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* AADHAAR TAB */}
        {activeTab === 'aadhaar' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-[Outfit] font-bold text-white mb-2">Aadhaar eKYC Verification</h2>
            <p className="text-slate-400 mb-8 text-sm">Enter your 12-digit Aadhaar number and verify it via UIDAI OTP. This is a paperless flow.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Left Column - Input */}
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Aadhaar Card Number</h3>
                <input 
                  type="text" 
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="0000 0000 0000"
                  disabled={aadhaarStatus === 'otp_sent' || kycState.aadhaar === 'verified'}
                  className="w-full bg-[#0f172a] border border-slate-700 text-white font-[JetBrains_Mono] tracking-widest text-lg p-4 rounded-xl focus:border-indigo-500 outline-none mb-4 disabled:opacity-50"
                />
                
                {aadhaarStatus === 'idle' && kycState.aadhaar !== 'verified' && (
                  <button 
                    onClick={handleSendAadhaarOtp}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                  >
                    Send OTP via UIDAI
                  </button>
                )}

                {aadhaarStatus === 'processing' && (
                  <div className="w-full py-3 bg-slate-800 text-indigo-400 font-medium rounded-xl flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Processing...
                  </div>
                )}

                {aadhaarStatus === 'otp_sent' && kycState.aadhaar !== 'verified' && (
                  <div className="animate-fade-in mt-4">
                    <div className="bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed p-3 rounded-lg mb-4 text-sm">
                      OTP sent to your registered mobile number ending in ********89.
                    </div>
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Enter 6-Digit OTP</h3>
                    <input 
                      type="text" 
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-full bg-[#0f172a] border border-slate-700 text-white font-[JetBrains_Mono] tracking-widest text-lg p-4 rounded-xl focus:border-primary-fixed outline-none mb-4 text-center"
                    />
                    <button 
                      onClick={handleVerifyAadhaarOtp}
                      className="w-full py-3 bg-primary-fixed hover:bg-primary-fixed-dim text-[#0f172a] font-bold rounded-xl transition-colors"
                    >
                      Verify OTP & Continue
                    </button>
                  </div>
                )}
                
                {kycState.aadhaar === 'verified' && (
                  <div className="bg-[#0f172a] border border-primary-fixed/30 rounded-xl p-4 flex items-center gap-4 animate-fade-in shadow-[0_0_20px_rgba(15,110,86,0.1)] mt-4">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary-fixed">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Aadhaar eKYC Verified</h4>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">{aadhaarData.name || 'User Name'}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column - Status */}
              <div>
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 min-h-[150px] flex flex-col justify-center">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">UIDAI Central Data Repository (CIDR) Record:</h3>
                   
                   {kycState.aadhaar === 'verified' ? (
                     <div className="animate-fade-in">
                       <p className="text-sm text-slate-300 leading-relaxed mb-3">{aadhaarData.address}</p>
                       <div className="inline-block bg-primary-fixed/10 text-primary-fixed text-xs px-2 py-1 rounded border border-primary-fixed/20">
                         Address Verified
                       </div>
                     </div>
                   ) : (
                     <div className="text-center text-slate-600 italic">
                       <span className="material-symbols-outlined text-4xl mb-2 opacity-50">cloud_off</span>
                       <p className="text-sm">Connects to UIDAI databases after successful OTP verification.</p>
                     </div>
                   )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between border-t border-slate-800 pt-6">
              <button onClick={() => setActiveTab('pan')} className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Back
              </button>
              <button 
                onClick={() => setActiveTab('photo')}
                disabled={kycState.aadhaar !== 'verified'}
                className="px-8 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
              >
                Continue <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* PHOTO TAB */}
        {activeTab === 'photo' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-2xl font-[Outfit] font-bold text-white mb-2 text-center">Live Webcam Selfie</h2>
            <p className="text-slate-400 mb-8 text-sm text-center">We need to take a quick live photo to match with your documents for fraud prevention.</p>
            
            <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center mb-8">
               {kycState.photo === 'verified' ? (
                 <>
                   <div className="w-24 h-24 rounded-full bg-primary-fixed/20 text-primary-fixed flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-[48px]">how_to_reg</span>
                   </div>
                   <h3 className="text-white text-xl font-bold mb-2">Identity Verified</h3>
                   <p className="text-slate-400 text-sm">Your live selfie matches the uploaded documents.</p>
                 </>
               ) : uploading === 'photo' ? (
                 <>
                   <div className="w-12 h-12 border-4 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin mb-4"></div>
                   <p className="text-white font-medium">Processing biometrics...</p>
                 </>
               ) : (
                 <>
                   <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 shadow-inner text-slate-400">
                     <span className="material-symbols-outlined text-[40px]">photo_camera</span>
                   </div>
                   <button 
                     onClick={startCamera}
                     className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                   >
                     Initialize Webcam
                   </button>
                   <p className="mt-4 text-xs text-slate-500 font-medium">Or upload a photo directly:</p>
                   <label className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg cursor-pointer text-sm font-medium transition-colors border border-slate-700 hover:border-indigo-500/50">
                     Browse Image
                     <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadBasic('photo', e.target.files[0]);
                        }
                      }} />
                   </label>
                 </>
               )}
            </div>

            <div className="mt-8 flex justify-between border-t border-slate-800 pt-6">
              <button onClick={() => setActiveTab('aadhaar')} className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Back
              </button>
              <button 
                onClick={() => setActiveTab('signature')}
                disabled={kycState.photo !== 'verified'}
                className="px-8 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
              >
                Continue <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* SIGNATURE TAB */}
        {activeTab === 'signature' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-2xl font-[Outfit] font-bold text-white mb-2 text-center">Digital Signature</h2>
            <p className="text-slate-400 mb-8 text-sm text-center">Upload a clear photo of your signature on white paper.</p>
            
            <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center mb-8">
               {kycState.signature === 'verified' ? (
                 <>
                   <div className="w-full h-[150px] bg-white rounded-xl mb-4 flex items-center justify-center p-4">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/John_Hancock_Signature.svg" className="max-h-full opacity-80" alt="signature" />
                   </div>
                   <div className="flex items-center gap-2 text-primary-fixed bg-primary-fixed/10 px-4 py-2 rounded-lg">
                     <span className="material-symbols-outlined text-[18px]">verified</span>
                     <span className="font-bold text-sm">Signature Processed</span>
                   </div>
                 </>
               ) : uploading === 'signature' ? (
                 <>
                   <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                   <p className="text-white font-medium">Analyzing signature...</p>
                 </>
               ) : (
                 <label className="w-full h-full border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-800/30">
                   <span className="material-symbols-outlined text-slate-400 text-4xl mb-4">draw</span>
                   <p className="text-white font-medium mb-1">Upload Signature</p>
                   <p className="text-xs text-slate-500 mb-6">JPEG or PNG format</p>
                   
                   <div className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors pointer-events-none">Browse File</div>
                   
                   <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUploadBasic('signature', e.target.files[0]);
                      }
                    }} />
                 </label>
               )}
            </div>

            <div className="mt-8 flex justify-between border-t border-slate-800 pt-6">
              <button onClick={() => setActiveTab('photo')} className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!isReadyToSubmit}
                className="px-8 py-2.5 rounded-lg bg-primary-fixed hover:bg-primary-fixed-dim text-[#0f172a] font-bold transition-colors disabled:opacity-50 disabled:hover:bg-primary-fixed flex items-center gap-2 shadow-[0_0_20px_rgba(15,110,86,0.3)]"
              >
                Submit All Documents <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-md animate-fade-in">
          <div className="bg-[#1e293b] rounded-3xl border border-slate-700 w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-full">
            <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-[#0f172a]">
              <h3 className="font-[Outfit] text-xl font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed">face</span>
                Live Verification
              </h3>
              <button onClick={stopCamera} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="relative bg-black w-full aspect-[3/4] sm:aspect-[4/3] flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover transform scale-x-[-1]"
              ></video>
              
              <div className="absolute inset-0 border-[40px] border-[#0f172a]/60 pointer-events-none transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[60%] h-[70%] border-2 border-dashed border-primary-fixed/80 rounded-[120px] shadow-[0_0_0_9999px_rgba(15,23,42,0.6)]"></div>
              </div>
            </div>
            
            <div className="p-6 bg-[#0f172a] flex flex-col items-center border-t border-slate-700">
              <p className="text-[15px] text-slate-300 mb-6 text-center font-medium max-w-xs">
                Position your face inside the oval frame and ensure good lighting.
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-2 rounded-full bg-primary-fixed/20 animate-ping group-hover:bg-primary-fixed/40 transition-colors"></div>
                <button 
                  onClick={capturePhoto} 
                  className="relative z-10 w-16 h-16 rounded-full bg-primary-fixed hover:bg-primary-fixed-dim border-4 border-[#0f172a] outline outline-2 outline-primary-fixed transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(15,110,86,0.5)] cursor-pointer"
                >
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
