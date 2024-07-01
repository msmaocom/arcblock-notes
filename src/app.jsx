import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
import Layout from './layouts/StickyLayout';
import Home from './pages/home';
import Notes from './pages/notes';
import Write from './pages/write';
import View from './pages/view';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Layout />}>  
          <Route path="/" element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/view/:id" element={<View />} />
          <Route path="notes/write/:id" element={<Write />} />
          <Route path="notes/write" element={<Write />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
