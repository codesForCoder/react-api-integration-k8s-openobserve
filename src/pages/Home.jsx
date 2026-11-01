import { Link } from "react-router-dom";

const apps = [
  {
    name: "Spring Boot",
    description: "Java REST API with PostgreSQL, Kafka and OpenTelemetry.",
    path: "/spring",
    badge: "JAVA",
    badgeClass: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    name: "Golang",
    description: "Go REST API with Gin, GORM, PostgreSQL and OpenTelemetry.",
    path: "/golang",
    badge: "GO",
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    name: "Node.js",
    description:
      "Node.js API with Express, Sequelize, Kafka and OpenTelemetry.",
    path: "/node",
    badge: "NODE",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
];

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 p-8 shadow-2xl sm:p-12">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Observability Lab
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Explore your
            <span className="text-indigo-400"> telemetry stack.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            A hands-on observability demo connecting React RUM - Grafana Alloy with Spring Boot,
            Golang and Node.js services using OpenTelemetry and LGTM Stack.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300">
              OpenTelemetry
            </span>

            <span className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300">
              LGTM Stack
            </span>

            <span className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300">
              Browser RUM
            </span>

            <span className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300">
              Distributed Tracing
            </span>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Backend Services</h3>

          <p className="mt-1 text-sm text-slate-500">
            Choose a service to generate telemetry and explore its APIs.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {apps.map((app) => (
            <Link
              key={app.path}
              to={app.path}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-950/30"
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-lg font-bold text-white">
                  {app.name.charAt(0)}
                </div>

                <span
                  className={`rounded-md border px-2 py-1 text-[10px] font-bold tracking-wider ${app.badgeClass}`}
                >
                  {app.badge}
                </span>
              </div>

              {/* Card content */}
              <h4 className="mt-6 text-lg font-semibold text-white">
                {app.name}
              </h4>

              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                {app.description}
              </p>

              {/* Action */}
              <div className="mt-6 flex items-center text-sm font-medium text-indigo-400">
                Open service
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-white">Observability Pipeline</h3>

            <p className="mt-1 text-sm text-slate-500">
              Generate telemetry from the browser and backend services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <PipelineItem label="React RUM" />
            <Arrow />
            <PipelineItem label="OpenTelemetry" />
            <Arrow />
            <PipelineItem label="LGTM Stack" />
          </div>
        </div>
      </section>
    </div>
  );
}

function PipelineItem({ label }) {
  return (
    <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-300">
      {label}
    </span>
  );
}

function Arrow() {
  return <span className="text-slate-600">→</span>;
}

export default Home;
