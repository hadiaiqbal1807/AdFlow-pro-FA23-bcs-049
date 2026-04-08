"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'
import Link from 'next/link';

export default function StudentPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search ke liye state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();
  }, []);

  async function fetchAds() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('status', 'published');
        // Note: .order('created_at') ko abhi hata diya hai kyunke column missing tha
      
      if (error) throw error;
      setAds(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Search logic: Ads ko title ke mutabiq filter karein
  const filteredAds = ads.filter(ad => 
    ad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center text-red-500 bg-red-50 min-h-screen">
      <h2 className="text-xl font-bold">Error Loading Data</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campus Notice Board</h1>
            <p className="text-gray-500">Explore latest ads and notices</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input 
                type="text"
                placeholder="Search notices..."
                className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400 text-sm">🔍</span>
            </div>

            <Link href="/create-ad">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium whitespace-nowrap">
                + Post New
              </button>
            </Link>
          </div>
        </div>
        
        {/* Ads Grid */}
        {filteredAds && filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <div 
                key={ad.id} 
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                    {ad.status}
                  </span>

                  <h3 className="font-bold text-xl text-gray-800 mt-3 line-clamp-1">
                    {ad.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 h-10">
                    {ad.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="font-extrabold text-blue-700 text-lg">
                      Rs. {ad.price ? ad.price.toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4 text-gray-300">📢</div>
            <h2 className="text-xl font-semibold text-gray-700">Koi notices nahi mile</h2>
            <p className="text-gray-500 mt-2">Try searching for something else or post a new notice.</p>
          </div>
        )}
      </div>
    </div>
  );
}