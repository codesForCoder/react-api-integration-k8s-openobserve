import { Link } from "react-router-dom";

function NodeApp() {
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

            <span className="text-slate-400">Node.js</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-sm font-bold text-yellow-400 ring-1 ring-yellow-500/20">
              JS
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Node.js App
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Node.js · Express · Sequelize · PostgreSQL · Kafka
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
        <InfoCard label="Runtime" value="Node.js" description="Express API" />

        <InfoCard
          label="Database"
          value="PostgreSQL"
          description="Sequelize ORM"
        />

        <InfoCard
          label="Messaging"
          value="Kafka"
          description="Event consumer"
        />
      </div>

      {/* API Operations */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">API Operations</h2>

          <p className="mt-1 text-sm text-slate-500">
            Trigger requests and generate telemetry from the Node.js service.
          </p>
        </div>

        {/* GET Tutorials */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>

            <code className="text-sm text-slate-300">/api/tutorials</code>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Fetch tutorials from the Node.js REST API.
          </p>

          <button
            type="button"
            className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-400 active:scale-95"
          >
            Execute Request
          </button>
        </div>
      </section>

      {/* Kafka */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20">
            ⚡
          </div>

          <div>
            <h2 className="font-semibold text-white">Kafka Consumer</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              This service consumes application events from Kafka and processes
              tutorial events asynchronously.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <TelemetryBadge label="Kafka Consumer" />
              <TelemetryBadge label="Trace Context" />
              <TelemetryBadge label="Span Links" />
              <TelemetryBadge label="Async Processing" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Architecture */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-white">Service Architecture</h2>

          <p className="mt-1 text-sm text-slate-500">
            Node.js participates in both synchronous API calls and asynchronous
            Kafka processing.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <ArchitectureNode title="React RUM" subtitle="Browser" />

          <Arrow />

          <ArchitectureNode title="Node.js" subtitle="Express" highlighted />

          <Arrow />

          <ArchitectureNode title="PostgreSQL" subtitle="Sequelize" />
        </div>

        <div className="my-5 flex justify-center">
          <span className="text-slate-600">↓</span>
        </div>

        <div className="flex justify-center">
          <ArchitectureNode title="Kafka" subtitle="app-events" />
        </div>
      </section>

      {/* OpenTelemetry */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
            ✦
          </div>

          <div>
            <h2 className="font-semibold text-white">OpenTelemetry</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              HTTP requests, database operations and Kafka processing generate
              distributed telemetry through the OpenTelemetry Collector.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <TelemetryBadge label="HTTP Trace" />
              <TelemetryBadge label="Express" />
              <TelemetryBadge label="Sequelize" />
              <TelemetryBadge label="Kafka" />
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
          ? "border-yellow-500/30 bg-yellow-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          highlighted ? "text-yellow-400" : "text-white"
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

export default NodeApp;
