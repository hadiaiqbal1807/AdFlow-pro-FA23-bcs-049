"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdForm() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Status default 'submitted' hoga taake moderator approve kare (Stage 2)
    const { data, error } = await supabase
      .from('ads')
      .insert([{ title, description: desc, price: parseInt(price), status: 'submitted' }])

    if (error) alert(error.message)
    else {
      alert("Notice submitted for approval!")
      setTitle(''); setDesc(''); setPrice('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <input type="text" placeholder="Ad Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" required />
      <textarea placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Post Notice</button>
    </form>
  )
}