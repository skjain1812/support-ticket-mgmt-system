import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import TicketListPage from '../pages/TicketListPage';
import CreateTicketPage from '../pages/CreateTicketPage';
import TicketDetailPage from '../pages/TicketDetailPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/tickets" replace />} />
        <Route path="tickets" element={<TicketListPage />} />
        <Route path="tickets/new" element={<CreateTicketPage />} />
        <Route path="tickets/:id" element={<TicketDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/tickets" replace />} />
    </Routes>
  );
}

export default AppRoutes;
