import { Link } from "react-router-dom";

function GolangApp() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="transition hover:text-indigo-400">
              Home
            </Link>

            <span>/</span>

            <span className="text-slate-400">Golang</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl font-bold text-cyan-400 ring-1 ring-cyan-500/20">
              Go
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Golang App
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Go REST API · Gin · GORM · PostgreSQL · OpenTelemetry
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Service available
        </div>
      </div>

      {/* Service overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard label="Runtime" value="Go" description="Gin REST API" />

        <InfoCard label="Database" value="PostgreSQL" description="GORM ORM" />

        <InfoCard
          label="Telemetry"
          value="OpenTelemetry"
          description="Traces & metrics"
        />
      </div>

      {/* API section */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">API Operations</h2>

          <p className="mt-1 text-sm text-slate-500">
            Trigger requests and generate telemetry from the Go service.
          </p>
        </div>

        {/* GET Products */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>

            <code className="text-sm text-slate-300">/products</code>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Fetch products from the Go REST API.
          </p>

          <button
            type="button"
            className="mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500 active:scale-95"
          >
            Execute Request
          </button>
        </div>
      </section>

      {/* Architecture */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-white">Service Architecture</h2>

          <p className="mt-1 text-sm text-slate-500">
            The Go service participates in the distributed application flow.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <ArchitectureNode title="React RUM" subtitle="Browser" />

          <Arrow />

          <ArchitectureNode title="Go API" subtitle="Gin" highlighted />

          <Arrow />

          <ArchitectureNode title="PostgreSQL" subtitle="GORM" />
        </div>
      </section>

      {/* Telemetry */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
            ✦
          </div>

          <div>
            <h2 className="font-semibold text-white">OpenTelemetry</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              HTTP requests, database operations and application spans are
              exported through the OpenTelemetry Collector.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <TelemetryBadge label="HTTP Trace" />
              <TelemetryBadge label="Gin" />
              <TelemetryBadge label="GORM" />
              <TelemetryBadge label="PostgreSQL" />
              <TelemetryBadge label="Metrics" />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-white">{value}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function ArchitectureNode({ title, subtitle, highlighted }) {
  return (
    <div
      className={`w-full rounded-xl border p-4 text-center sm:w-40 ${
        highlighted
          ? "border-cyan-500/30 bg-cyan-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          highlighted ? "text-cyan-400" : "text-white"
        }`}
      >
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function Arrow() {
  return <span className="rotate-90 text-slate-600 sm:rotate-0">→</span>;
}

function TelemetryBadge({ label }) {
  return (
    <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400">
      {label}
    </span>
  );
}

export default GolangApp;
