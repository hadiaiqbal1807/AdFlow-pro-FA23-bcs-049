"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ModeratorPage() {
  const [pendingAds, setPendingAds] = useState<any[]>([])

  useEffect(() => {
    fetchPendingAds()
  }, [])

  async function fetchPendingAds() {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('status', 'submitted')
    
    if (error) {
      console.error(error)
    } else {
      setPendingAds(data || [])
    }
  }

  async function approveAd(id: string) {
    const { error } = await supabase
      .from('ads')
      .update({ status: 'published' })
      .eq('id', id)

    if (error) {
      alert("Error approving ad")
    } else {
      alert("Ad Approved and Live!")
      fetchPendingAds() // List refresh karein
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Moderator Dashboard</h1>
      <div className="grid gap-4">
        {pendingAds.length === 0 ? (
          <p className="text-gray-500 italic">No pending ads for now.</p>
        ) : (
          pendingAds.map((ad) => (
            <div key={ad.id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm bg-white">
              <div>
                <h3 className="font-bold text-lg text-black">{ad.title}</h3>
                <p className="text-gray-600">{ad.description}</p>
                <span className="text-blue-600 font-bold">Rs. {ad.price}</span>
              </div>
              <button 
                onClick={() => approveAd(ad.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Approve & Publish
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}