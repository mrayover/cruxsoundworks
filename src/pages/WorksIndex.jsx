import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';


function WorksIndex() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const worksQuery = query(
        collection(db, 'works'),
        where('published', '==', true)
      );
      
const snapshot = await getDocs(worksQuery);
const items = snapshot.docs.map(doc => doc.data());
      setWorks(items);
    };
    fetchWorks();
  }, []);

  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-10">Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {works.map((work) => (
          <Link key={work.title} to={`/works/${slugify(work.title)}`}>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition">
              {work.imageURL && (
                <img
                  src={work.imageURL}
                  alt={work.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-serif text-xl font-semibold">{work.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {work.instrumentation} · {work.year}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {work.description?.split('\n')[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default WorksIndex;
