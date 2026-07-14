import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-4">
          Alif Hakimie
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Telecom Engineering grad who{" "}
          <span className="text-primary-500">speaks fluent C++</span> and makes
          things talk to each other.
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl leading-relaxed">
          Fresh graduate by paper, developer by <strong>vibe</strong>. I break
          things in <strong>C++</strong>, fix them in <strong>Dart</strong>, and
          occasionally bribe them with <strong>PHP</strong>. Built{" "}
          <strong>SmartPonic</strong> because my plants deserved better IoT
          than my ISP&apos;s customer service.
        </p>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
          Built <strong>WearLink</strong>, because iPhone and Wear OS refusing
          to talk to each other was personally offensive. Also fluent in
          SolidWorks, AutoCAD, Linux, and asking Cisco equipment why it&apos;s
          mad this time.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            See my work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
