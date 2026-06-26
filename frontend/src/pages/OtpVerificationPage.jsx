import { useNavigate } from 'react-router-dom';

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-grow flex items-center justify-center p-6 text-center h-[60vh]">
      <div>
        <h1 className="text-3xl font-bold mb-4">OTP Verification</h1>
        <button onClick={() => navigate('/dashboard')} className="bg-primary text-white px-6 py-2 rounded-lg">Verify & Proceed</button>
      </div>
    </div>
  );
}
