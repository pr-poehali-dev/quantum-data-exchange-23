import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Обучение через нейроинтерфейс",
    description: "Программы для студентов: осваивайте нейросети, BCI-технологии и ИИ напрямую через практику с реальными данными.",
    icon: "brain",
    badge: "Студентам",
  },
  {
    title: "Корпоративное развитие",
    description: "Повышение квалификации сотрудников с применением нейро-технологий для ускорения обучения и роста продуктивности.",
    icon: "zap",
    badge: "Команды",
  },
  {
    title: "Безопасная среда",
    description: "Все данные участников защищены. Доступ строго персональный, без передачи третьим лицам.",
    icon: "lock",
    badge: "Защита",
  },
  {
    title: "Индивидуальный темп",
    description: "Умные алгоритмы адаптируют программу под каждого — студента или специалиста — без стресса и перегрузки.",
    icon: "target",
    badge: "Адаптивно",
  },
  {
    title: "Реальные проекты",
    description: "Практика на живых кейсах: от лаборатории до производства. Навыки, которые сразу применяются в работе.",
    icon: "globe",
    badge: "Практика",
  },
  {
    title: "Карьерные треки",
    description: "Чёткие пути роста: от стажёра до эксперта в области нейроинтерфейсов и brain-computer технологий.",
    icon: "link",
    badge: "Карьера",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Что получают участники</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            SynapseAI открывает доступ к технологиям будущего — для тех, кто учится и работает уже сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}