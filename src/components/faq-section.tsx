import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Кто может участвовать в программах SynapseAI?",
      answer:
        "Программы открыты для студентов технических и медицинских специальностей, а также для сотрудников компаний, работающих в сфере технологий, медицины, R&D и смежных областях. Предварительные знания в области нейронаук не обязательны.",
    },
    {
      question: "Сколько времени занимает обучение?",
      answer:
        "Базовый трек рассчитан на 8–12 недель при нагрузке 5–7 часов в неделю. Корпоративные программы адаптируются под график команды. Всё обучение доступно онлайн с возможностью очного формата.",
    },
    {
      question: "Нужно ли специальное оборудование?",
      answer:
        "Для большинства модулей достаточно компьютера. Для практических заданий с BCI-устройствами предоставляется доступ к нашей лаборатории или оборудование передаётся в аренду участникам программы.",
    },
    {
      question: "Что я получу по итогам программы?",
      answer:
        "Участники получают именной сертификат SynapseAI, портфолио выполненных проектов и доступ к профессиональному сообществу. Сертификат признаётся партнёрскими компаниями и исследовательскими центрами.",
    },
    {
      question: "Как организовано корпоративное обучение?",
      answer:
        "Мы разрабатываем индивидуальную программу под задачи вашей компании: анализируем потребности, формируем группы, выстраиваем треки. HR-менеджер получает дашборд с прогрессом каждого участника.",
    },
    {
      question: "Как начать?",
      answer:
        "Нажмите кнопку «Присоединиться» — мы свяжемся с вами в течение 24 часов, проведём вводную консультацию и подберём подходящий формат участия.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Ответы на популярные вопросы об участии, обучении и возможностях платформы SynapseAI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}