"use client";
import { useEffect, useState } from 'react';

export default function StudentPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedAds = async () => {
      try {
        // Backend se sirf approved ads mangwane ki request
        const res = await fetch('http://localhost:5000/api/ads?status=approved'); 
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setAds(data);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setAds([]);
      } finally {
        // Ye line loading ko khatam karegi
        setLoading(false); 
      }
    };
    
    fetchApprovedAds();
  }, []);

  if (loading) {
    return <div className="p-10 text-center font-bold text-xl text-blue-600">Loading Notices...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700">Campus Notice Board</h1>
      <div className="grid gap-6">
        {ads.length > 0 ? (
          ads.map((ad: any) => (
            <div key={ad.id} className="p-6 border-l-8 border-green-500 bg-white shadow-lg rounded-r-xl">
              <h2 className="text-2xl font-bold text-gray-800 uppercase">{ad.title}</h2>
              <p className="text-gray-600 mt-3 text-lg">{ad.description}</p>
              <div className="mt-4 text-xs text-gray-400 font-semibold italic">✓ Official Campus Announcement</div>
            </div>
          ))
        ) : (
          <div className="text-center p-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-500 text-xl font-medium">Abhi koi approved notices nahi hain.</p>
            <p className="text-sm text-gray-400 mt-2">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}