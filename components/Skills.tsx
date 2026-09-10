const skillCategories = [
  {
    title: "Coding Languages",
    skills: [
      { name: "C++", level: 3 },
      { name: "Dart", level: 3 },
      { name: "PHP", level: 2 },
    ],
  },
  {
    title: "Networking",
    skills: [
      { name: "Cisco Networking", level: 2 },
      { name: "MikroTik Networking", level: 2 },
    ],
  },
  {
    title: "Technical Drawing",
    skills: [
      { name: "SolidWorks", level: 3 },
      { name: "AutoCAD", level: 3 },
    ],
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Linux", level: 3 },
      { name: "Windows", level: 3 },
    ],
  },
];

export default function Skills() {
  return (
    <div className="lg:pt-10">
      <h2 className="section-heading mb-6">Skills</h2>
      <div className="space-y-6 lg:space-y-5">
        {skillCategories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2.5">
              {cat.title}
            </h3>
            <ul className="space-y-2.5">
              {cat.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {skill.name}
                  </span>
                  <span
                    className="flex gap-1 shrink-0"
                    aria-label={`Level ${skill.level} of 3`}
                  >
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`w-1.5 h-1.5 rounded-full ${
                          n <= skill.level
                            ? "bg-primary-500"
                            : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}