import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function ComposerContact() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const snapshot = await getDocs(collection(db, 'contactSubmissions'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = items.sort((a, b) => b.timestamp - a.timestamp);
      setSubmissions(sorted);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="py-10 px-4">
      <h2 className="text-xl font-serif mb-6">📨 Contact Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((s) => (
            <li key={s.id} className="p-4 border rounded bg-white">
              <p className="text-sm text-gray-600">{new Date(s.timestamp?.toDate?.()).toLocaleString()}</p>
              <h3 className="font-bold">{s.name} &lt;{s.email}&gt;</h3>
              {s.subject && <p className="italic">Subject: {s.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap">{s.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
