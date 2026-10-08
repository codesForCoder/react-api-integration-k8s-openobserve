import { useState } from "react";
import { Link } from "react-router-dom";

function SpringApp() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [traceId, setTraceId] = useState(null);

  const callSpringApi = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setTraceId(null);

    try {
      const res = await fetch("/api/books/1");

      // Check if your backend exposes the trace ID as a response header.
      const responseTraceId =
        res.headers.get("trace-id") ||
        res.headers.get("x-trace-id") ||
        res.headers.get("trace_id");

      setTraceId(responseTraceId);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || `Request failed with status ${res.status}`,
        );
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="transition hover:text-indigo-400">
              Home
            </Link>

            <span>/</span>

            <span className="text-slate-400">Spring Boot</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-xl font-bold text-green-400 ring-1 ring-green-500/20">
              S
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Spring Boot App
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Java REST API · PostgreSQL · Kafka · OpenTelemetry
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Service available
        </div>
      </div>

      {/* API */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">API Operations</h2>

          <p className="mt-1 text-sm text-slate-500">
            Call the locally port-forwarded Spring Boot service.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>

            <code className="text-sm text-slate-300">
              http://localhost:8081/api/books/1
            </code>
          </div>

          <button
            type="button"
            onClick={callSpringApi}
            disabled={loading}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
          >
            {loading ? "Calling Spring Boot..." : "Execute Request"}
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

      {/* Error */}
      {error && (
        <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <p className="text-sm font-semibold text-red-400">Request failed</p>

          <p className="mt-2 text-sm text-red-300">{error}</p>
        </section>
      )}

      {/* Response */}
      {response && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">API Response</h2>

            <p className="mt-1 text-sm text-slate-500">
              Response returned by the Spring Boot service.
            </p>
          </div>

          <pre className="max-h-[500px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-300">
            {JSON.stringify(response, null, 2)}
          </pre>
        </section>
      )}

      {/* Navigation */}
      <div>
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

export default SpringApp;
