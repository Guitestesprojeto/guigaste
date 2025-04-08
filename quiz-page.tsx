"use client"
import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function QuizPage() {
  const questions = [
    {
      q: "1. Como você se sente quando olha no espelho?",
      a: ["A", "B", "C", "D"],
      t: [
        "Não gosto do que vejo e tento evitar.",
        "Me sinto mal, mas já me acostumei.",
        "Não estou feliz, mas acredito que posso mudar.",
        "Gosto de mim, mas sei que poderia estar melhor.",
      ],
    },
    {
      q: "2. Com que frequência você sente fome ao longo do dia?",
      a: ["A", "B", "C", "D"],
      t: ["Constantemente.", "Algumas vezes.", "Raramente.", "Quase nunca."],
    },
    {
      q: "3. Qual é o seu nível atual de atividade física?",
      a: ["A", "B", "C", "D"],
      t: ["Sedentário.", "Me movimento um pouco.", "Treino às vezes.", "Treino com frequência."],
    },
    {
      q: "4. Com que frequência você consome alimentos processados ou fast food?",
      a: ["A", "B", "C", "D"],
      t: ["Diariamente.", "Algumas vezes por semana.", "Raramente.", "Quase nunca."],
    },
    {
      q: "5. Como você se sente após comer?",
      a: ["A", "B", "C", "D"],
      t: ["Arrependida(o).", "Estufada(o).", "Sei que comi demais.", "Satisfeita(o)."],
    },
    {
      q: "6. O que você costuma fazer quando está estressada(o)?",
      a: ["A", "B", "C", "D"],
      t: ["Como doces.", "Fico parada(o).", "Tento me distrair.", "Faço algo produtivo."],
    },
    {
      q: "7. Você sente que já tentou de tudo para emagrecer?",
      a: ["A", "B", "C", "D"],
      t: ["Sim, e nada funcionou.", "Já tentei, mas paro.", "Emagreci e engordei.", "Nunca tentei sério."],
    },
    {
      q: "8. Qual dessas frases parece mais com sua rotina?",
      a: ["A", "B", "C", "D"],
      t: ["Não tenho tempo pra mim.", "Como qualquer coisa.", "Me cuido às vezes.", "Tenho rotina organizada."],
    },
    {
      q: "9. Como você classificaria a qualidade do seu sono?",
      a: ["A", "B", "C", "D"],
      t: ["Ruim.", "Regular.", "Boa, depende do dia.", "Muito boa."],
    },
    {
      q: "10. Qual dessas opções representa melhor seu tipo de corpo?",
      a: ["A", "B", "C", "D"],
      t: [
        "Engordo fácil e emagreço difícil.",
        "Sempre fui acima do peso.",
        "Já emagreci e engordei.",
        "Consigo mudar com esforço.",
      ],
    },
    {
      q: "11. Você já foi julgada(o) pelo seu corpo?",
      a: ["A", "B", "C", "D"],
      t: ["Sim, frequentemente.", "Já aconteceu e marcou.", "Poucas vezes.", "Nunca diretamente."],
    },
    {
      q: "12. Se alguém te desse um plano realista, você seguiria?",
      a: ["A", "B", "C", "D"],
      t: ["Sim, se for prático.", "Sim, sem passar fome.", "Sim, mas tenho medo.", "Com certeza!"],
    },
  ]

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [resultProfile, setResultProfile] = useState("")

  const handleNext = () => {
    if (!selectedOption) {
      alert("Escolha uma opção antes de continuar.")
      return
    }

    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      // Calculate result
      const count = { A: 0, B: 0, C: 0, D: 0 }
      newAnswers.forEach((ans) => count[ans as keyof typeof count]++)
      const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]
      setResultProfile(top)
      setShowResult(true)
    }
  }

  const progressPercentage = ((current + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <header className="bg-gradient-to-r from-rose-500 to-pink-500 py-12 px-4 text-center shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Descubra o que está te travando no emagrecimento
          </h1>
          <p className="text-white/90 text-lg">Responda com sinceridade para receber um plano personalizado</p>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        {!showResult ? (
          <Card className="border-none shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    Questão {current + 1} de {questions.length}
                  </span>
                  <span>{Math.round(progressPercentage)}% completo</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-rose-600 mb-6">{questions[current].q}</h3>

              <div className="space-y-3 mb-8">
                {questions[current].t.map((text, i) => (
                  <div
                    key={i}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedOption === questions[current].a[i]
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-rose-300 hover:bg-rose-50/50"
                    }`}
                    onClick={() => setSelectedOption(questions[current].a[i])}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedOption === questions[current].a[i] ? "border-rose-500 bg-rose-500" : "border-gray-300"
                      }`}
                    >
                      {selectedOption === questions[current].a[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="w-full py-6 text-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                {current === questions.length - 1 ? (
                  "Ver Resultado"
                ) : (
                  <span className="flex items-center">
                    Próxima <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ResultSection profile={resultProfile} />
        )}
      </main>
    </div>
  )
}

function ResultSection({ profile }: { profile: string }) {
  let title = ""
  let description = ""

  switch (profile) {
    case "A":
      title = "Você está emocionalmente sobrecarregada(o)"
      description = "Seu maior desafio é lidar com emoções como estresse, ansiedade ou tristeza."
      break
    case "B":
      title = "Sua vida está desorganizada"
      description = "A correria faz com que você se coloque sempre por último."
      break
    case "C":
      title = "Você já tentou e perdeu o ritmo"
      description = "Emagrece, mas volta ao ponto de partida por falta de constância."
      break
    case "D":
      title = "Você está pronta(o) pra mudar!"
      description = "Agora só falta alguém te guiar com clareza."
      break
  }

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-white/90">{description}</p>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">O que você vai encontrar no PDF:</h3>
              <ul className="space-y-3">
                <BenefitItem text="Plano alimentar adaptável à sua rotina" />
                <BenefitItem text="Estratégias contra ansiedade e compulsão" />
                <BenefitItem text="Exercícios simples que você faz em casa" />
                <BenefitItem text="Resultados reais sem passar fome" />
                <BenefitItem text="E muito mais" />
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Depoimentos reais:</h3>
              <div className="space-y-4">
                <TestimonialCard
                  quote="Achei que seria só mais um PDF... mas mudei minha vida! Emagreci 7kg sem sofrimento."
                  author="Camila R., 36 anos"
                />
                <TestimonialCard
                  quote="Voltei a ter confiança em mim. Simples, direto e funciona!"
                  author="Patrícia S., 42 anos"
                />
                <TestimonialCard
                  quote="Não tenho tempo nem paciência, mas esse plano me surpreendeu."
                  author="Bruno M., 29 anos"
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="font-bold text-rose-600 text-lg mb-4">
                Chegou sua hora. Não espere o "segunda-feira" de novo. Comece agora:
              </p>
              <Button
                asChild
                className="w-full md:w-auto py-6 px-8 text-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                <a href="https://seulinkdopdf.com" target="_blank" rel="noreferrer">
                  Quero o Plano Agora
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PDFRecommendationSection profile={profile} />
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <div className="mr-3 mt-1 bg-rose-100 rounded-full p-1">
        <CheckCircle2 className="h-4 w-4 text-rose-600" />
      </div>
      <span>{text}</span>
    </li>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
      <p className="italic text-gray-700">{quote}</p>
      <p className="mt-2 font-medium text-rose-600">— {author}</p>
    </div>
  )
}

function PDFRecommendationSection({ profile }: { profile: string }) {
  // Define the content for each profile
  const profileData = {
    A: {
      title: "🔴 Perfil A — Emocionalmente Sobrecarregada",
      description: "Enfrenta compulsão, ansiedade e desconta emoções na comida.",
      content: [
        "Introdução empática",
        "Técnicas de autocontrole emocional",
        "Estratégias para lidar com gatilhos de compulsão",
        "Sugestões de alimentação leve sem culpa",
        "Rotina simples de respiração e relaxamento",
        "Plano alimentar + checklist diário com foco em equilíbrio emocional",
      ],
      buttonClass: "from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
      bgClass: "bg-rose-50 border-l-4 border-rose-500",
    },
    B: {
      title: "🟡 Perfil B — Desorganizada",
      description: "Não tem tempo, come qualquer coisa, vive no automático.",
      content: [
        "Introdução encorajadora com foco em praticidade",
        "Guia &quot;emagrecer com rotina corrida&quot;",
        "Lista de compras e marmitas rápidas",
        "Organização semanal em 3 passos",
        "Plano alimentar rápido + exercícios de 10 minutos/dia",
        "Modelo de rotina adaptável com lembretes e metas",
      ],
      buttonClass: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
      bgClass: "bg-amber-50 border-l-4 border-amber-500",
    },
    C: {
      title: "🔵 Perfil C — Sem Constância",
      description: "Já emagreceu e voltou, sente que começa bem mas desiste.",
      content: [
        "Reflexão sobre ciclos de desistência",
        "Estratégias de motivação realista",
        "Hábitos sustentáveis de longo prazo",
        "Técnica &quot;1% melhor por dia&quot;",
        "Rotina de metas semanais",
        "Plano alimentar com flexibilidade e recompensa saudável",
      ],
      buttonClass: "from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600",
      bgClass: "bg-sky-50 border-l-4 border-sky-500",
    },
    D: {
      title: "🟢 Perfil D — Pronta pra Mudar",
      description: "Já está decidida e só precisa de direção clara.",
      content: [
        "Introdução encorajadora e direta",
        "Plano completo de alimentação e treino funcional",
        "Lista de compras e organização semanal",
        "Exercícios em casa + desafio de 21 dias",
        "Modelo de planner de metas e acompanhamento",
        "Checklist de progresso e hábitos",
      ],
      buttonClass: "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
      bgClass: "bg-emerald-50 border-l-4 border-emerald-500",
    },
  }

  // Get the recommended profile data
  const recommendedProfile = profileData[profile as keyof typeof profileData]

  // Create an array of the other profiles
  const otherProfiles = Object.keys(profileData)
    .filter((key) => key !== profile)
    .map((key) => profileData[key as keyof typeof profileData])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-rose-600 mb-6">COM BASE NAS SUAS RESPOSTAS, O PDF IDEAL PARA VOCÊ É:</h2>

      {/* Recommended Profile */}
      <div className={`mb-8 p-5 rounded-lg ${recommendedProfile.bgClass}`}>
        <h3 className="text-lg font-semibold mb-2">{recommendedProfile.title}</h3>
        <p className="mb-3">{recommendedProfile.description}</p>
        <p className="font-medium mb-2">Conteúdo do PDF:</p>
        <ul className="space-y-1 list-disc pl-5 mb-4">
          {recommendedProfile.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Button
          asChild
          className={`w-full md:w-auto py-4 px-6 text-base bg-gradient-to-r ${recommendedProfile.buttonClass}`}
        >
          <a href="https://seulinkdopdf.com" target="_blank" rel="noreferrer">
            ADQUIRIR PDF
          </a>
        </Button>
      </div>

      <h2 className="text-xl font-bold text-gray-700 mb-4 mt-8">
        ESSES SÃO OS OUTROS PDFS QUE TAMBÉM TEMOS DISPONÍVEIS:
      </h2>

      {/* Other Profiles */}
      {otherProfiles.map((profileInfo, index) => (
        <div key={index} className={`mb-6 p-5 rounded-lg ${profileInfo.bgClass}`}>
          <h3 className="text-lg font-semibold mb-2">{profileInfo.title}</h3>
          <p className="mb-3">{profileInfo.description}</p>
          <p className="font-medium mb-2">Conteúdo do PDF:</p>
          <ul className="space-y-1 list-disc pl-5 mb-4">
            {profileInfo.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <Button
            asChild
            className={`w-full md:w-auto py-4 px-6 text-base bg-gradient-to-r ${profileInfo.buttonClass}`}
          >
            <a href="https://seulinkdopdf.com" target="_blank" rel="noreferrer">
              ADQUIRIR PDF
            </a>
          </Button>
        </div>
      ))}
    </div>
  )
}
