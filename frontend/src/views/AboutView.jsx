import { Target, Eye, ShieldCheck, Tractor, HardHat, ScrollText } from 'lucide-react'

export default function AboutView() {
  return (
    <section className="bg-slate-900 text-white min-h-[calc(100vh-64px-300px)] py-24 animate-in">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-6 text-emerald-400">Acerca de TeMapeo</h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Somos un equipo de agricultura de precisión con sede en <b>Peumo, Región de O'Higgins</b>. Volamos drones certificados por la DGAC para transformar tu campo en datos accionables.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
            {[
              { icon: Target, title: 'Nuestra Misión', text: 'Convertir cada vuelo de dron en decisiones agrícolas claras y oportunas, sin tecnicismos inútiles.' },
              { icon: Eye, title: 'Nuestra Visión', text: 'Ser el aliado tecnológico de la fruticultura chilena, demostrando que la agricultura inteligente está al alcance de cada productor.' },
              { icon: ShieldCheck, title: 'Nuestros Valores', text: 'Transparencia técnica, acompañamiento real y precisión científica en cada entregable que firmamos.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-emerald-400 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
          <h3 className="text-2xl font-bold mb-8 text-center border-b border-slate-700 pb-4">Nuestras 3 Divisiones de Servicio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Tractor,
                iconBg: 'bg-emerald-500/20',
                iconColor: 'text-emerald-400',
                borderActive: 'border-emerald-500/30 hover:border-emerald-500',
                titleColor: 'text-emerald-300',
                title: 'División Agro y Forestal',
                text: 'Liderada por agrónomos e ingenieros forestales. Nos enfocamos en la salud vegetal, el inventario maderero y la eficiencia hídrica. Hablamos en lenguaje de biomasa, dosel y riego.',
              },
              {
                icon: HardHat,
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-400',
                borderActive: 'border-blue-500/30 hover:border-blue-500',
                titleColor: 'text-blue-300',
                title: 'División Ingeniería y Obras',
                text: 'Formada por ingenieros civiles y geomáticos. Aportamos control volumétrico de precisión, seguimiento 3D de avance de obras y detección de anomalías térmicas industriales.',
              },
              {
                icon: ScrollText,
                iconBg: 'bg-purple-500/20',
                iconColor: 'text-purple-400',
                borderActive: 'border-purple-500/30 hover:border-purple-500',
                titleColor: 'text-purple-300',
                title: 'División Topografía Legal',
                text: 'A cargo de topógrafos y geomensores certificados. Realizamos loteos, subdivisiones, rectificación de deslindes e inscripciones con responsabilidad legal y normativa vigente.',
              },
            ].map(({ icon: Icon, iconBg, iconColor, borderActive, titleColor, title, text }) => (
              <div key={title} className={`bg-slate-900/50 p-6 rounded-xl border transition-colors ${borderActive}`}>
                <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`${iconColor} w-6 h-6`} />
                </div>
                <h4 className={`text-xl font-bold mb-3 ${titleColor}`}>{title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
