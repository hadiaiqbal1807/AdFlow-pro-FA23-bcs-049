"use client";
import { useState } from 'react';
import axios from 'axios';

export default function AdForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button dab gaya!"); // Console mein nazar ayega
        
        try {
            const response = await axios.post('http://localhost:5000/api/ads', { 
                title, 
                description 
            });
            console.log("Backend Response:", response.data);
            alert("Ad Submit Ho Gaya! 🎉");
            setTitle(''); 
            setDescription('');
        } catch (err) {
            console.error("Asli Error ye hai:", err);
            alert("Error: Backend se baat nahi ho rahi. F12 daba kar Console check karein.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4 text-black text-center">Post New Ad</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-4 border rounded text-black" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mb-4 border rounded text-black" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Ad</button>
        </form>
    );
}