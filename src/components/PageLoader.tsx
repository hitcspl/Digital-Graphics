export function PageLoader() {
  return (
    <div
      className="
      min-h-screen
      bg-background
      text-foreground
      overflow-hidden
      animate-pulse
    "
    >
      {/* Hero */}
      <section className="relative h-screen border-b border-border">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-12 lg:px-20">

          <div className="mb-8 h-3 w-28 rounded-full bg-muted" />

          <div className="space-y-5 max-w-5xl">
            <div className="h-16 w-[92%] rounded-md bg-muted md:h-24" />
            <div className="h-16 w-[78%] rounded-md bg-muted md:h-24" />
            <div className="h-16 w-[60%] rounded-md bg-muted md:h-24" />
          </div>

          <div className="mt-10 h-px w-full bg-border overflow-hidden">
            <div className="h-full w-40 bg-foreground/20 animate-[loader_1.5s_linear_infinite]" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="h-10 w-32 rounded-full bg-muted" />
            <div className="h-10 w-40 rounded-full bg-muted" />
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-2">

          <div className="space-y-5">
            <div className="h-3 w-24 rounded-full bg-muted" />
            <div className="h-12 w-3/4 rounded bg-muted" />

            <div className="space-y-3 pt-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full rounded bg-muted"
                />
              ))}
            </div>
          </div>

          <div className="aspect-[4/5] rounded-2xl bg-muted" />
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:px-20">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-6
              "
            >
              <div className="aspect-[4/3] rounded-xl bg-muted" />

              <div className="mt-6 space-y-3">
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="h-12 w-72 rounded bg-muted mb-8" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>

            <div className="space-y-4">
              <div className="h-28 rounded bg-muted" />
              <div className="h-12 w-40 rounded bg-muted" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}