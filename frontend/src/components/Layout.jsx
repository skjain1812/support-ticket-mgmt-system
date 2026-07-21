import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/tickets">Support Tickets</Link>
          <Link to="/tickets/new" className="btn btn-primary">
            Create Ticket
          </Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
