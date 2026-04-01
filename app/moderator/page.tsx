"use client";
import { useEffect, useState } from 'react';

export default function ModeratorDashboard() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    setLoading(true); // Loading shuru
    try {
      const res = await fetch('http://localhost:5000/api/ads');
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
      setLoading(false); // Loading khatam (yahan hona zaroori hai)
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`http://localhost:5000/api/ads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchAds(); 
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-xl font-bold">Loading Dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Moderator Control Panel</h1>
      <div className="grid gap-6">
        {ads.length > 0 ? (
          ads.map((ad: any) => (
            <div key={ad.id} className="bg-white border p-6 rounded-xl shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-blue-900 uppercase">{ad.title}</h2>
                <p className="text-gray-600 my-2">{ad.description}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  ad.status === 'approved' ? 'bg-green-100 text-green-700' : 
                  ad.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ad.status?.toUpperCase() || 'SUBMITTED'}
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleStatus(ad.id, 'approved')} className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold">Approve</button>
                <button onClick={() => handleStatus(ad.id, 'rejected')} className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold">Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Koi ads nahi mile.</p>
        )}
      </div>
    </div>
  );
}