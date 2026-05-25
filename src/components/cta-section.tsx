import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SUBMIT_URL = "https://functions.poehali.dev/6d4ea9ef-1d8e-442a-8166-0e4038bb53b2"

export function CTASection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState<"student" | "employee" | "">("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !type) {
      setError("Пожалуйста, заполните все поля")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || "Что-то пошло не так, попробуйте снова")
      }
    } catch {
      setError("Ошибка соединения, попробуйте позже")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="join" className="py-24 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-5xl font-bold text-foreground mb-6 font-sans text-balance">
            Станьте частью SynapseAI
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Присоединяйтесь — как студент или как команда. Нейроинтерфейсы — это уже не будущее,
            это навыки, которые нужны прямо сейчас.
          </p>

          {success ? (
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-10 max-w-md mx-auto">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Заявка принята!</h3>
              <p className="text-muted-foreground">Мы свяжемся с вами в течение 24 часов.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card/50 border border-primary/20 rounded-2xl p-8 max-w-md mx-auto text-left space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Имя</label>
                <Input
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Я — </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("student")}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      type === "student"
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-primary/20 bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    🎓 Студент
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("employee")}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      type === "employee"
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-primary/20 bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    💼 Сотрудник
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-lg"
              >
                {loading ? "Отправляю..." : "Присоединиться"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
