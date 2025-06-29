// src/pages/WorkDetail.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const WorkDetail = () => {
  const { slug } = useParams();
  const [work, setWork] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      const snapshot = await getDocs(collection(db, 'works'));
      const works = snapshot.docs.map(doc => doc.data());
      const match = works.find(w => w.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug);
      setWork(match || null);
    };

    fetchWork();
  }, [slug]);

  if (!work) return <p className="text-center mt-20 text-gray-500">Loading or not found...</p>;

  return (
    <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
      {work.imageURL && (
      <img
          src={work.imageURL}
          alt={`${work.title} cover`}
          className="w-full h-auto max-w-3xl mx-auto mb-6 rounded-xl shadow"
        />
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-2">{work.title}</h2>
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
          {work.instrumentation} · {work.year}
        </p>
        <ReactMarkdown
          className="prose prose-lg text-gray-800 mb-6"
          rehypePlugins={[rehypeRaw]}
        >
          {work.description}
        </ReactMarkdown>

        {work.audioURL && (
          <div className="mb-6">
            <iframe
              src={work.audioURL}
              className="w-full h-40 md:h-60 rounded"
              allow="autoplay"
              allowFullScreen
              title="audio-player"
            />
          </div>
        )}

        {work.pastPerformances?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm tracking-widest uppercase text-gray-500 mb-2">Past Performances</h4>
            <ul className="list-disc list-inside text-gray-700 text-base">
              {work.pastPerformances.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {work.scoreLink && (
          <a
            href={work.scoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
          >
            View Score
          </a>
        )}
      </div>
    </section>
  );
};

export default WorkDetail;
