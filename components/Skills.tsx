const skillCategories = [
  {
    title: "Coding Languages",
    skills: [
      { name: "C++", level: "Advanced" },
      { name: "Dart", level: "Advanced" },
      { name: "PHP", level: "Intermediate" },
    ],
  },
  {
    title: "Networking",
    skills: [
      { name: "Cisco Networking", level: "Intermediate" },
      { name: "MikroTik Networking", level: "Intermediate" },
    ],
  },
  {
    title: "Technical Drawing",
    skills: [
      { name: "SolidWorks", level: "Advanced" },
      { name: "AutoCAD", level: "Advanced" },
    ],
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Linux", level: "Advanced" },
      { name: "Windows", level: "Advanced" },
    ],
  },
];

export default function Skills() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="section-heading mb-8">Skills</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">
              {cat.title}
            </h3>
            <ul className="space-y-2">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {skill.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      skill.level === "Advanced"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {skill.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
