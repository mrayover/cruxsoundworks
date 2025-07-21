import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function LessonsAdmin() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('lessons_waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching:', error);
      else setEntries(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-serif mb-6">🎓 Lessons Waitlist Submissions</h1>
      {entries.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <ul className="space-y-6">
          {entries.map((entry) => (
            <li key={entry.id} className="bg-white border p-4 rounded shadow">
              <p className="text-sm text-gray-600">{new Date(entry.created_at).toLocaleString()}</p>
              <h2 className="font-bold text-lg">{entry.name} &lt;{entry.email}&gt;</h2>
              <p><strong>Experience:</strong> {entry.experience}</p>
              <p><strong>Styles:</strong> {entry.styles?.join(', ') || '—'}</p>
              {entry.other_style && <p><strong>Other:</strong> {entry.other_style}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
