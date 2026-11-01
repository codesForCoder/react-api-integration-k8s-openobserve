
function FlowNode({ title, subtitle, color = "slate", children }) {
    const colors = {
        slate: "border-slate-700 bg-slate-900",
        blue: "border-blue-500/40 bg-blue-500/10",
        emerald: "border-emerald-500/40 bg-emerald-500/10",
        purple: "border-purple-500/40 bg-purple-500/10",
        orange: "border-orange-500/40 bg-orange-500/10",
    };

    return (
        <div className={`rounded-xl border p-4 ${colors[color]}`}>
            <h3 className="font-semibold text-white">{title}</h3>
            {subtitle && (
                <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
            )}
            {children}
        </div>
    );
}

function Arrow({ label }) {
    return (
        <div className="flex flex-col items-center py-2">
            <div className="h-6 w-px bg-slate-600" />
            <span className="text-xs text-slate-400">{label}</span>
            <span className="text-lg text-slate-500">↓</span>
        </div>
    );
}

export default function TrafficFlow() {
    return (
        <section className="mt-10 space-y-8">
            <div>
                <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
                    Architecture
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                    Application Traffic Flow
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                    Nginx serves the React application and routes API requests
                    to the appropriate backend Kubernetes services.
                </p>
            </div>

            {/* Application traffic */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 md:p-7">
                <h3 className="mb-5 font-semibold text-white">
                    1. User Request Flow
                </h3>

                <div className="mx-auto max-w-3xl">
                    <FlowNode
                        title="User Browser"
                        subtitle="React application · React Router · RUM instrumentation"
                        color="purple"
                    />

                    <Arrow label="HTTP / HTTPS — same origin" />

                    <FlowNode
                        title="Nginx Alpine"
                        subtitle="Single entry point · Static file server · Reverse proxy"
                        color="orange"
                    >
                        <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                            <div className="rounded-lg bg-slate-950/70 p-3">
                <span className="font-semibold text-emerald-300">
                  Static content
                </span>
                                <p className="mt-1 text-slate-400">
                                    / → index.html
                                    <br />
                                    /assets/* → JS, CSS, images
                                </p>
                            </div>
                            <div className="rounded-lg bg-slate-950/70 p-3">
                <span className="font-semibold text-blue-300">
                  API routing
                </span>
                                <p className="mt-1 text-slate-400">
                                    /api/* → Spring
                                    <br />
                                    /products/* → Go
                                    <br />
                                    /node-api/* → Node.js
                                </p>
                            </div>
                        </div>
                    </FlowNode>

                    <Arrow label="Internal Kubernetes Service routing" />

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <FlowNode
                            title="Spring Boot"
                            subtitle="spring-app · Port 8081"
                            color="blue"
                        >
                            <p className="mt-2 text-xs text-slate-400">
                                REST API · Java · OTel Java Agent
                            </p>
                        </FlowNode>

                        <FlowNode
                            title="Go Gin"
                            subtitle="go-app · Port 8084"
                            color="emerald"
                        >
                            <p className="mt-2 text-xs text-slate-400">
                                REST API · Go · OpenTelemetry
                            </p>
                        </FlowNode>

                        <FlowNode
                            title="Node.js Express"
                            subtitle="node-app · Port 9090"
                            color="purple"
                        >
                            <p className="mt-2 text-xs text-slate-400">
                                REST API · Kafka Consumer · OTel SDK
                            </p>
                        </FlowNode>
                    </div>

                    <Arrow label="Database and messaging operations" />

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <FlowNode
                            title="PostgreSQL"
                            subtitle="Spring / Go / Node application data"
                            color="slate"
                        />
                        <FlowNode
                            title="PostgreSQL"
                            subtitle="Application persistence"
                            color="slate"
                        />
                        <FlowNode
                            title="Kafka"
                            subtitle="app-events · Node.js consumer"
                            color="slate"
                        />
                    </div>
                </div>
            </div>

            {/* Telemetry flow */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 md:p-7">
                <h3 className="mb-2 font-semibold text-white">
                    2. Observability & Telemetry Flow
                </h3>
                <p className="mb-5 text-sm text-slate-400">
                    Application telemetry is exported independently of normal
                    business traffic.
                </p>

                <div className="mx-auto max-w-3xl">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <FlowNode
                            title="Frontend RUM"
                            subtitle="Browser traces, page loads and user interactions"
                            color="purple"
                        />
                        <FlowNode
                            title="Backend Instrumentation"
                            subtitle="Spring Java Agent · Go OTel · Node.js OTel SDK"
                            color="blue"
                        />
                    </div>

                    <Arrow label="OTLP · gRPC / HTTP" />

                    <FlowNode
                        title="OpenTelemetry Collector"
                        subtitle="Agent DaemonSet + Gateway Deployment"
                        color="orange"
                    >
                        <p className="mt-2 text-xs text-slate-400">
                            Receivers · Processors · Batching · Exporters
                        </p>
                    </FlowNode>

                    <Arrow label="Telemetry export" />

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <FlowNode
                            title="Tempo"
                            subtitle="Distributed traces"
                            color="purple"
                        />
                        <FlowNode
                            title="Loki"
                            subtitle="Application logs"
                            color="emerald"
                        />
                        <FlowNode
                            title="Prometheus"
                            subtitle="Metrics"
                            color="blue"
                        />
                    </div>

                    <Arrow label="Query and visualization" />

                    <FlowNode
                        title="Grafana"
                        subtitle="Dashboards · Logs · Metrics · Distributed tracing"
                        color="slate"
                    />
                </div>
            </div>
        </section>
    );
}
