import Home from './Home';
import CruxWorks from './pages/CruxWorks/Index';
import FresnoComposersSociety from './pages/FresnoComposersSociety/Index';

function App() {
  return <Home />;
}
<Routes>
  {/* other routes */}
  <Route path="/cruxworks" element={<CruxWorks />} />
  <Route path="/fresnocomposersociety" element={<FresnoComposersSociety />} />
  <Route path="/fresno" element={<Navigate to="/fresnocomposersociety" />} />
  <Route path="/fcs" element={<Navigate to="/fresnocomposersociety" />} />
</Routes>

export default App;
