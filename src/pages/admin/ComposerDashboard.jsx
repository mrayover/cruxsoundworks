import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ComposerDashboard() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const querySnapshot = await getDocs(collection(db, 'works'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorks(items);
    };
    fetchWorks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-serif mb-6">Composer Admin Panel</h1>
      <div className="grid gap-4">
        {works.map(work => (
          <div key={work.id} className="p-4 border rounded bg-gray-50">
            <h2 className="font-bold text-lg">{work.title}</h2>
            <p className="text-sm text-gray-600">{work.instrumentation}</p>
            <button className="mt-2 text-blue-600 underline">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
