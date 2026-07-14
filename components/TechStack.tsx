import {
  SiCplusplus,
  SiDart,
  SiPhp,
  SiPython,
  SiLaravel,
  SiVuedotjs,
  SiFlutter,
  SiFastapi,
  SiApachekafka,
  SiDocker,
  SiKotlin,
  SiSwift,
  SiArduino,
  SiEspressif,
  SiTailwindcss,
  SiChartdotjs,
  SiInertia,
  SiTelegram,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiGo,
  SiSqlite,
  SiBluetooth,
  SiApple,
  SiAndroid,
  SiLinux,
  SiOpenssl,
  SiJson,
  SiPostman,
} from "react-icons/si";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  // Languages
  "C++": SiCplusplus,
  Dart: SiDart,
  PHP: SiPhp,
  Python: SiPython,
  "TypeScript": SiTypescript,
  Go: SiGo,
  Kotlin: SiKotlin,
  Swift: SiSwift,

  // Frameworks & Runtimes
  "Laravel": SiLaravel,
  "Vue 3": SiVuedotjs,
  "Vue.js": SiVuedotjs,
  "Flutter": SiFlutter,
  "FastAPI": SiFastapi,
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Chart.js": SiChartdotjs,
  "Inertia.js": SiInertia,
  "Inertia": SiInertia,

  // Infrastructure
  "Apache Kafka": SiApachekafka,
  Kafka: SiApachekafka,
  Docker: SiDocker,
  "Docker Compose": SiDocker,

  // Hardware
  ESP32: SiEspressif,
  Arduino: SiArduino,
  LoRa: SiEspressif,

  // Mobile
  iOS: SiApple,
  "Wear OS": SiAndroid,
  Android: SiAndroid,
  "HealthKit": SiApple,
  "CoreBluetooth": SiBluetooth,
  Bluetooth: SiBluetooth,

  // Tools
  Linux: SiLinux,
  SQLite: SiSqlite,
  Turso: SiSqlite,
  "AES Encryption": SiOpenssl,
  JSON: SiJson,
  Postman: SiPostman,
  "Telegram Bot": SiTelegram,
  Telegram: SiTelegram,
};

interface TechStackProps {
  items: string[];
  size?: number;
}

export default function TechStack({ items, size = 20 }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const Icon = iconMap[item];
        return (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            {Icon ? <Icon size={size} className="shrink-0" /> : null}
            {item}
          </span>
        );
      })}
    </div>
  );
}
