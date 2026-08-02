import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * The differentiator, so it gets the only dark panel on the page.
 * The graphic is an abstract node network — deliberately NOT a map
 * illustration and not clipart. Dots and hairlines, the same vocabulary as
 * the tracking rail.
 */
const NODES: [number, number, number][] = [
  [12, 30, 2], [22, 18, 1.5], [26, 46, 2.5], [34, 28, 1.5], [38, 62, 2],
  [44, 40, 3.5], [52, 22, 1.5], [55, 55, 2], [61, 36, 2.5], [66, 68, 1.5],
  [70, 24, 2], [74, 50, 1.5], [80, 34, 2.5], [84, 60, 1.5], [88, 42, 2],
  [18, 58, 1.5], [30, 72, 1.5], [48, 76, 1.5], [58, 12, 1.5], [76, 14, 1.5],
];

const LINKS: [number, number][] = [
  [0, 1], [1, 3], [3, 5], [5, 6], [6, 10], [10, 12], [12, 14],
  [0, 2], [2, 4], [4, 7], [7, 8], [8, 11], [11, 13],
  [5, 8], [3, 15], [15, 16], [16, 17], [17, 9], [9, 13], [6, 18], [18, 19], [19, 12],
];

const STATS = [
  { value: 1240, unit: "شهر تحت پوشش" },
  { value: 31, unit: "استان" },
  { value: "۹۸٪", unit: "جمعیت کشور" },
];

export function Coverage() {
  return (
    <section id="coverage" className="pb-20 md:pb-28 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <div className="bg-ink-900 relative overflow-hidden rounded-xl">
          {/* node network */}
          <svg
            viewBox="0 0 100 90"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full opacity-70"
            aria-hidden="true"
          >
            <g stroke="#374350" strokeWidth="0.15">
              {LINKS.map(([a, b], i) => (
                <line
                  key={i}
                  x1={NODES[a][0]}
                  y1={NODES[a][1]}
                  x2={NODES[b][0]}
                  y2={NODES[b][1]}
                />
              ))}
            </g>
            {NODES.map(([x, y, r], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r * 0.22}
                fill={r >= 2.5 ? "#fe731a" : "#4c5866"}
              />
            ))}
          </svg>

          <div className="relative px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <p className="text-overline font-mono text-brand-400">NATIONWIDE COVERAGE</p>
            <h2 className="text-h1 text-ink-0 mt-4 max-w-[22ch]">
              گسترده‌ترین پوشش جغرافیایی بین پلتفرم‌های ارسال
            </h2>
            <p className="text-body-lg text-ink-300 mt-5 max-w-[54ch]">
              فرقی نمی‌کنه مشتریت توی مرکز استانه یا یک شهر کوچیک؛ مرسوله رو تحویل می‌گیریم و
              پولش رو برات جمع می‌کنیم.
            </p>

            <dl className="mt-12 grid gap-8 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.unit} className="border-border-inverse border-t pt-5">
                  <dd className="text-num-xl text-ink-0 tnum font-display" data-numeric>
                    {typeof s.value === "number" ? (
                      <Figure value={s.value} size="xl" className="[&>span]:text-ink-0" />
                    ) : (
                      s.value
                    )}
                  </dd>
                  <dt className="text-body-sm text-ink-400 mt-2">{s.unit}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <Button
                href="/coverage"
                variant="secondary"
                iconEnd={<Icon name="arrow" size={18} />}
                className="border-border-inverse bg-transparent text-ink-0 hover:bg-ink-800 active:bg-ink-800"
              >
                شهرهای تحت پوشش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
