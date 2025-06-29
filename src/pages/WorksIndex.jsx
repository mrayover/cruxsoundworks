import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const WorksIndex = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const querySnapshot = await getDocs(collection(db, 'works'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorks(data);
    };

    fetchWorks();
  }, []);

  return (
    <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6">Works</h2>
      <ul className="space-y-6">
        {works.map((work) => (
          <li key={work.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow transition">
            <Link to={`/works/${work.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}>
              <h3 className="text-xl font-serif font-semibold mb-1">{work.title}</h3>
              <p className="text-sm text-gray-600">{work.instrumentation} · {work.year}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorksIndex;
