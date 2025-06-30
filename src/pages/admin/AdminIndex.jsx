import { useNavigate } from 'react-router-dom';

export default function AdminIndex() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-serif mb-8">Admin Portal</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/composer')}
          className="w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          🎼 Composer Dashboard
        </button>
        <button
          onClick={() => navigate('/admin/lessons')}
          className="w-full bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
        >
          🎓 Lessons Admin (Coming Soon)
        </button>
      </div>
    </div>
  );
}
