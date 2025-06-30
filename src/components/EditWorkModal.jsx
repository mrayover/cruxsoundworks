import React, { useState, useEffect } from 'react';

export default function EditWorkModal({ work, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [instrumentation, setInstrumentation] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (work) {
      setTitle(work.title || '');
      setInstrumentation(work.instrumentation || '');
      setDuration(work.duration || '');
      setDescription(work.description || '');
      setImageURL(work.imageURL || '');
      setAudioURL(work.audioURL || '');
      setPublished(work.published ?? false);
    }
  }, [work]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...work,
      title,
      instrumentation,
      duration,
      description,
      imageURL,
      audioURL,
      published,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Edit Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Instrumentation</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={instrumentation}
              onChange={(e) => setInstrumentation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Duration</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (e.g. 7:30)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image URL</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Audio URL</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={audioURL}
              onChange={(e) => setAudioURL(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
