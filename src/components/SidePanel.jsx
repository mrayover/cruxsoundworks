import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const SidePanel = ({ type, onClose }) => {
  const isLeft = type === 'works';
  const [works, setWorks] = useState([]);

useEffect(() => {
  if (type === 'works') {
    const fetchWorks = async () => {
      try {
        if (!db) {
          console.warn('[SidePanel] Firebase DB not initialized');
          return;
        }

        const q = query(
          collection(db, 'works'),
          where('published', '==', true),
          orderBy('displayOrder')
        );
        const snapshot = await getDocs(q);

        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          if (!data.title || !data.slug) {
            console.warn('[SidePanel] Skipping invalid work:', data);
            return null;
          }
          return { id: doc.id, ...data };
        }).filter(Boolean);

        console.log('[SidePanel] Loaded works:', items);
        setWorks(items);
      } catch (err) {
        console.error('[SidePanel] Firestore query failed:', err);
        setWorks([]);
      }
    };

    fetchWorks();
  }
}, [type]);


  return (
    <div
      className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-1/3 bg-dark text-neutral p-8 z-40 pt-6 transform transition-transform duration-300 ease-in-out ${
        isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {type === 'works' ? 'Explore Works' : 'Lessons Info'}
        </h2>
        <button
          onClick={onClose}
          className="text-sm font-bold hover:underline text-neutral"
        >
          Close
        </button>
      </div>
{type === 'works' ? (
  <>
    <a href="/works" className="text-xs mb-4 underline hover:opacity-80 block">
      Click to view the full index
    </a>
    {works?.length > 0 ? (
      works.map((work) => (
        <a
          key={work.slug}
          href={`/works/${work.slug}`}
          className="block py-1 hover:underline"
        >
          {work.title}
          {work.instrumentation ? ` – ${work.instrumentation}` : ''}
        </a>
      ))
    ) : (
      <p className="text-sm italic text-neutral-300">No works available.</p>
    )}
  </>
) : (
  <div className="text-sm leading-snug space-y-2">
    <p>Offering private lessons in guitar, composition, and music theory.</p>
    <p>Available for all skill levels, in-person and online.</p>
    <p>Click 'Lessons' above to learn more and book a session.</p>
  </div>
)}
    </div>
  );
};

export default SidePanel;
