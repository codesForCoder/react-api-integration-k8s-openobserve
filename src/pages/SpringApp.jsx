
import { useState } from "react";
import { Link } from "react-router-dom";

const initialBook = {
  title: "This Is Fine",
  author: "Aniket Roy",
  price: 100.23,
  publishedYear: 2020,
  genre: "Friction",
  availability: true
};

const secondBook = {
  title: "This Is Fine 2",
  author: "Aniket Roy",
  price: 110.23,
  publishedYear: 2020,
  genre: "Friction1",
  availability: true
};

function SpringApp() {
  // Book API state
  const [bookPayload, setBookPayload] = useState(
      JSON.stringify(initialBook, null, 2)
  );
  const [bookId, setBookId] = useState("-100");

  // GET Book by ID query parameters
  const [bookIdQueryParams, setBookIdQueryParams] = useState([
    { key: "tutorial", value: "1" },
    { key: "product", value: "1" }
  ]);

  // API response state
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [traceId, setTraceId] = useState(null);

  // Kafka state
  const [kafkaLoading, setKafkaLoading] = useState(false);
  const [kafkaMessage, setKafkaMessage] = useState(null);
  const [kafkaError, setKafkaError] = useState(null);
  const [kafkaTraceId, setKafkaTraceId] = useState(null);

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
        // Preserve the complete API error response
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

  // POST /api/books
  const createBook = async () => {
    let payload;

    try {
      payload = JSON.parse(bookPayload);
    } catch {
      setError("Invalid JSON payload. Please check your book data.");
      setResponse(null);
      return;
    }

    await executeRequest("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  };

  // GET /api/books
  const getAllBooks = async () => {




    const url = "/api/books";

    await executeRequest(url);
  };

  // GET /api/books/{id}
// GET /api/books/{id}
  const getBookById = async () => {
    if (!bookId.trim()) {
      setError("Please enter a book ID.");
      return;
    }

    const params = new URLSearchParams();

    bookIdQueryParams.forEach(({ key, value }) => {
      if (key.trim()) {
        params.append(key.trim(), value);
      }
    });

    const queryString = params.toString();

    const url = `/api/books/${encodeURIComponent(bookId.trim())}${
        queryString ? `?${queryString}` : ""
    }`;

    await executeRequest(url);
  };





  // Load sample payloads
  const loadSample = (sample) => {
    setBookPayload(JSON.stringify(sample, null, 2));
  };

  // Kafka batch publishing
  const publishKafkaBatch = async () => {
    setKafkaLoading(true);
    setKafkaMessage(null);
    setKafkaError(null);

    try {
      const res = await fetch("/api/kafka/publish", {
        method: "POST"
      });
      // Extract trace ID from response headers
      const responseTraceId =
          res.headers.get("trace-id") ||
          res.headers.get("x-trace-id") ||
          res.headers.get("trace_id");

      setKafkaTraceId(responseTraceId);
      const data = await res.text();

      if (!res.ok) {
        throw new Error(
            data || `Kafka publish failed with status ${res.status}`
        );
      }

      setKafkaMessage(data);
    } catch (err) {
      setKafkaError(err.message);
    } finally {
      setKafkaLoading(false);
    }
  };

  const buttonClass =
      "mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50";

  const inputClass =
      "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500";

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

        {/* Technology Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              category: "RUNTIME",
              name: "Spring Boot",
              description: "Java REST API"
            },
            {
              category: "DATABASE",
              name: "PostgreSQL",
              description: "Book persistence"
            },
            {
              category: "MESSAGING",
              name: "Apache Kafka",
              description: "Event producer"
            }
          ].map((item) => (
              <div
                  key={item.category}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <p className="text-xs font-medium tracking-wider text-slate-500">
                  {item.category}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
          ))}
        </div>

        {/* Book API operations */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Book API Operations
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create, retrieve and test book APIs.
            </p>
          </div>

          {/* POST Book */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-400 ring-1 ring-purple-500/20">
              POST
            </span>
              <code className="text-sm text-slate-300">
                /api/books
              </code>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Create a new book. Edit the pre-populated JSON payload before submitting.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                  type="button"
                  onClick={() => loadSample(initialBook)}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Load Sample 1
              </button>

              <button
                  type="button"
                  onClick={() => loadSample(secondBook)}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Load Sample 2
              </button>
            </div>

            <textarea
                value={bookPayload}
                onChange={(e) => setBookPayload(e.target.value)}
                rows={12}
                spellCheck={false}
                className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-6 text-green-300 outline-none focus:border-indigo-500"
            />

            <button
                type="button"
                onClick={createBook}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Creating Book..." : "Create Book"}
            </button>
          </div>

          {/* GET All Books */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>
              <code className="text-sm text-slate-300">
                /api/books
              </code>
            </div>
            <button
                type="button"
                onClick={getAllBooks}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Fetching Books..." : "Get All Books"}
            </button>
          </div>

          {/* GET Book by ID */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 ring-1 ring-blue-500/20">
              GET
            </span>
              <code className="text-sm text-slate-300">
                /api/books/{`{id}`}
              </code>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Retrieve a book by ID. The default ID is -100 for testing a not-found response.
            </p>
            {/* Query Parameters */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-medium text-slate-300">
                Query Parameters
              </h3>

              <div className="space-y-3">
                {bookIdQueryParams.map((param, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">
                          Key
                        </label>
                        <input
                            value={param.key}
                            onChange={(e) =>
                                setBookIdQueryParams((current) =>
                                    current.map((item, i) =>
                                        i === index
                                            ? { ...item, key: e.target.value }
                                            : item
                                    )
                                )
                            }
                            className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-500">
                          Value
                        </label>
                        <input
                            value={param.value}
                            onChange={(e) =>
                                setBookIdQueryParams((current) =>
                                    current.map((item, i) =>
                                        i === index
                                            ? { ...item, value: e.target.value }
                                            : item
                                    )
                                )
                            }
                            className={inputClass}
                        />
                      </div>
                    </div>
                ))}
              </div>
            </div>
            <label className="mt-4 block text-xs font-medium text-slate-400">
              Book ID
            </label>

            <input
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="Enter book ID"
                className={`${inputClass} mt-2 max-w-sm`}
            />

            <button
                type="button"
                onClick={getBookById}
                disabled={loading}
                className={buttonClass}
            >
              {loading ? "Fetching Book..." : "Get Book By ID"}
            </button>
          </div>
        </section>

        {/* API response */}
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
                    {error.data}
                  </p>
              )}

              {!error.message && !error.data && (
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-red-300">
        {JSON.stringify(error, null, 2)}
      </pre>
              )}
            </section>
        )}


        {response !== null && (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                  API Response
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Response returned by the Spring Boot service.
                </p>
              </div>

              <pre className="max-h-[500px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-300">
            {typeof response === "string"
                ? response
                : JSON.stringify(response, null, 2)}
          </pre>
            </section>
        )}

        {/* Kafka Publisher */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-xl">
              ⚡
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Kafka Publisher
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                This service publishes tutorial and product events to Kafka.
                Node.js consumes these events and processes them asynchronously.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Kafka Producer", "Trace Context", "Batch Publishing", "Async Messaging"].map((item) => (
                    <span
                        key={item}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-400"
                    >
            {item}
          </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kafka Publisher */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Kafka Operations
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Publish tutorial and product events to your Kafka cluster.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-400 ring-1 ring-purple-500/20">
              POST
            </span>
              <code className="text-sm text-slate-300">
                /api/kafka/publish
              </code>
            </div>

            <button
                type="button"
                onClick={publishKafkaBatch}
                disabled={kafkaLoading}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {kafkaLoading ? "Publishing Kafka Events..." : "Publish Kafka Batch"}
            </button>
          </div>

          {kafkaMessage && (
              <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                  Kafka Publish Successful
                </p>
                <p className="mt-2 text-sm text-green-300">
                  {kafkaMessage}
                </p>
              </div>
          )}

          { kafkaTraceId && (
              <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Kafka Publish Trace ID
                </p>

                <code className="mt-2 block break-all rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-indigo-300">
                  {kafkaTraceId}
                </code>

                <p className="mt-2 text-xs text-slate-500">
                  Copy this ID and search for the trace in Grafana Tempo.
                </p>
              </div>
          )}

          {kafkaError && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Kafka Publish Failed
                </p>
                <p className="mt-2 text-sm text-red-300">
                  {kafkaError}
                </p>
              </div>
          )}
        </section>

        {/* Service Architecture */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-base font-semibold text-white">
            Service Architecture
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Spring Boot participates in synchronous REST API calls and asynchronous Kafka event publishing.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">

            {/* Main synchronous flow */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="w-36 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center">
                <p className="text-sm font-semibold text-white">React RUM</p>
                <p className="mt-1 text-xs text-slate-500">Browser</p>
              </div>

              <span className="text-slate-500">→</span>

              <div className="w-36 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
                <p className="text-sm font-semibold text-yellow-400">Spring Boot</p>
                <p className="mt-1 text-xs text-slate-500">Java REST API</p>
              </div>

              <span className="text-slate-500">→</span>

              <div className="w-36 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center">
                <p className="text-sm font-semibold text-white">PostgreSQL</p>
                <p className="mt-1 text-xs text-slate-500">Database</p>
              </div>
            </div>

            {/* Asynchronous flow */}
            <div className="flex flex-col items-center">
              <span className="text-slate-500">↓</span>

              <div className="w-36 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">
                <p className="text-sm font-semibold text-purple-300">Kafka</p>
                <p className="mt-1 text-xs text-slate-500">app-events</p>
              </div>

              <span className="text-slate-500">↓</span>

              <div className="w-36 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center">
                <p className="text-sm font-semibold text-white">Node.js</p>
                <p className="mt-1 text-xs text-slate-500">Event Consumer</p>
              </div>

              <span className="text-slate-500">↓</span>

              <div className="w-36 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center">
                <p className="text-sm font-semibold text-white">PostgreSQL</p>
                <p className="mt-1 text-xs text-slate-500">Sequelize ORM</p>
              </div>
            </div>
          </div>
        </section>

        {/* OpenTelemetry */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-xl">
              ✦
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                OpenTelemetry
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                HTTP requests, database operations and Kafka publishing
                generate distributed telemetry through the OpenTelemetry Java Agent.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "HTTP Traces",
                  "Spring Boot",
                  "JDBC",
                  "Kafka Producer",
                  "JVM Metrics",
                  "OTLP"
                ].map((item) => (
                    <span
                        key={item}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-400"
                    >
            {item}
          </span>
                ))}
              </div>
            </div>
          </div>
        </section>

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
