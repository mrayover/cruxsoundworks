import { lazy, Suspense, useEffect, useState } from 'react';

const SidePanelInner = lazy(() => import('./SidePanelInner'));

const SidePanel = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 if (!mounted) return (
  <aside className="text-sm text-gray-400 p-4">
    Loading sidebar...
  </aside>
);

  return (
    <Suspense fallback={null}>
      <SidePanelInner {...props} />
    </Suspense>
  );
};

export default SidePanel;
