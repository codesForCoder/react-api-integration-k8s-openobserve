
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import SpringApp from "./pages/SpringApp";
import GolangApp from "./pages/GolangApp";
import NodeApp from "./pages/NodeApp";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold shadow-lg shadow-indigo-600/20">
              O
            </div>

            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                Observability Demo
              </h1>

              <p className="text-xs text-slate-400">
                OpenTelemetry · LGTM Stack · RUM - Grafana Alloy
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/70 p-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/spring" label="Spring" />
            <NavLink to="/golang" label="Golang" />
            <NavLink to="/node" label="Node.js" />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto min-h-[calc(100vh-7rem)] max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 text-xs text-slate-500">
          <span>Observability Demo</span>

          <span>
            OpenTelemetry <span className="mx-1">·</span> LGTM Stack
          </span>
        </div>
      </footer>
    </div>
  );
}

/**
 * Navigation link with active-state styling.
 */
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        rounded-lg
        px-3.5 py-2
        text-sm font-medium
        text-slate-400
        transition
        hover:bg-slate-800
        hover:text-white
      "
    >
      {label}
    </Link>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/spring" element={<SpringApp />} />
          <Route path="/golang" element={<GolangApp />} />
          <Route path="/node" element={<NodeApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
