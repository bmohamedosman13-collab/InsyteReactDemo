import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import OrgWorkbench from './pages/OrgWorkbench'
import CaseWorkbench from './pages/CaseWorkbench'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/org" element={<OrgWorkbench />} />
        <Route path="/case" element={<CaseWorkbench />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
