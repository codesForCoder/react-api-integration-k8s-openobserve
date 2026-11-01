
import { useState } from "react";
import { Link } from "react-router-dom";

const initialProduct = {
  name: "Sample Product",
  price: 100
};

const secondProduct = {
  name: "Sample Product 2",
  price: 200
};

function GolangApp() {
  const [productPayload, setProductPayload] = useState(
      JSON.stringify(initialProduct, null, 2)
  );

  const [productId, setProductId] = useState("1");

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [traceId, setTraceId] = useState(null);

  // Common API executor
  const executeRequest = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setTraceId(null);

    try {
      const res = await fetch(url, options);

      const responseTraceId =
          res.headers.get("trace-id") ||
          res.headers.get("x-trace-id") ||
          res.headers.get("trace_id");

      setTraceId(responseTraceId);

      const contentType = res.headers.get("content-type") || "";

      const data = contentType.includes("application/json")
          ? await res.json()
          : await res.text();

      if (!res.ok) {
        setError(
            typeof data === "object" && data !== null
                ? data
                : { message: data }
        );
        return;
      }

      setResponse(data);
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // POST /products
  const createProduct = async () => {
    let payload;

    try {
      payload = JSON.parse(productPayload);
    } catch {
      setError({
        message: "Invalid JSON payload. Please check your product data."
      });
      setResponse(null);
      return;
    }

    await executeRequest("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  };

  // GET /products
  const getAllProducts = async () => {
    await executeRequest("/products");
  };

  // GET /products/{id}
  const getProductById = async () => {
    if (!productId.trim()) {
      setError({ message: "Please enter a product ID." });
      return;
    }

    await executeRequest(
        `/products/${encodeURIComponent(productId.trim())}`
    );
  };

  // Load sample product payload
  const loadSample = (sample) => {
    setProductPayload(JSON.stringify(sample, null, 2));
  };

  const buttonClass =
      "mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95";

  const inputClass =
      "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500";

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

        {/* API Operations */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              API Operations
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Trigger requests and generate telemetry from the Go service.
            </p>
          </div>

          {/* POST Product */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center gap-3">
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-400 ring-1 ring-purple-500/20">
              POST
            </span>
              <code className="text-sm text-slate-300">/products</code>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Create a product. Edit the pre-populated JSON payload before submitting.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                  type="button"
                  onClick={() => loadSample(initialProduct)}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Load Sample 1
              </button>

              <button
                  type="button"
                  onClick={() => loadSample(secondProduct)}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Load Sample 2
              </button>
            </div>

            <textarea
                value={productPayload}
                onChange={(e) => setProductPayload(e.target.value)}
                rows={7}
                spellCheck={false}
                className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-6 text-green-300 outline-none focus:border-cyan-500"
            />

            <button
                type="button"
                onClick={createProduct}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </div>

          {/* GET All Products */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>
              <code className="text-sm text-slate-300">/products</code>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Fetch all products from the Go REST API.
            </p>

            <button
                type="button"
                onClick={getAllProducts}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Fetching Products..." : "Get All Products"}
            </button>
          </div>

          {/* GET Product by ID */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>
              <code className="text-sm text-slate-300">
                /products/{`{id}`}
              </code>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Retrieve a product by ID. Default ID is 1111.
            </p>

            <label className="mt-4 block text-xs font-medium text-slate-400">
              Product ID
            </label>

            <input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
                className={`${inputClass} mt-2 max-w-sm`}
            />

            <button
                type="button"
                onClick={getProductById}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Fetching Product..." : "Get Product By ID"}
            </button>
          </div>
        </section>

        {/* Trace ID */}
        {traceId && (
            <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                Trace ID
              </p>
              <code className="mt-3 block break-all rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-indigo-300">
                {traceId}
              </code>
            </section>
        )}

        {/* API Error */}
        {error && (
            <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-red-400">
                  API Request Failed
                </p>

                {error.statusCode && (
                    <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                HTTP {error.statusCode}
              </span>
                )}
              </div>

              {error.message && (
                  <p className="mt-3 text-sm font-semibold text-red-300">
                    {error.message}
                  </p>
              )}

              {error.data && (
                  <p className="mt-2 rounded-lg border border-red-500/10 bg-slate-950 p-4 text-sm text-red-300">
                    {typeof error.data === "string"
                        ? error.data
                        : JSON.stringify(error.data)}
                  </p>
              )}

              {!error.message && !error.data && (
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-red-300">
              {JSON.stringify(error, null, 2)}
            </pre>
              )}
            </section>
        )}

        {/* API Response */}
        {response !== null && (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                  API Response
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Response returned by the Go service.
                </p>
              </div>

              <pre className="max-h-[500px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-300">
            {typeof response === "string"
                ? response
                : JSON.stringify(response, null, 2)}
          </pre>
            </section>
        )}

        {/* Service Architecture */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-white">
              Service Architecture
            </h2>
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

        {/* OpenTelemetry */}
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
