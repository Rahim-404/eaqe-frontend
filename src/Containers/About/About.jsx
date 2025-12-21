"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Target, Eye, Award } from "lucide-react"
import { getStoredLanguage } from "../../lib/i18n"

export default function AboutPage() {
  const [lang, setLang] = useState("fr")

  useEffect(() => {
    setLang(getStoredLanguage())
  }, [])

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "اكتشف مهمتنا والتزامنا بالجودة في الجزائر",
      historyTitle: "قصتنا",
      historyP1:
        "تم إنشاء المنصة الجزائرية للجودة والتميز برؤية واضحة: رفع معايير جودة المنتجات والخدمات الجزائرية إلى المستوى الدولي.",
      historyP2:
        "منذ إنشائنا، رافقنا أكثر من 1200 شركة في مسيرتها نحو الجودة، وأصدرنا أكثر من 350 شهادة، ودربنا أكثر من 1000 خبير معتمد.",
      historyP3:
        "يعمل فريقنا من الخبراء المؤهلين كل يوم لتقديم خدمات شهادات واستشارات عالية الجودة، مُكيفة مع الاحتياجات الخاصة لكل شركة.",
      missionTitle: "مهمتنا",
      missionText: "تعزيز التميز والجودة في جميع قطاعات الاقتصاد الجزائري من خلال تقديم شهادات معترف بها دولياً.",
      visionTitle: "رؤيتنا",
      visionText: "أن نصبح المرجع في مجال الشهادات والاستشارات في الجودة في الجزائر ومنطقة الشرق الأوسط وشمال أفريقيا.",
      valuesTitle: "قيمنا",
      valuesText: "التميز، النزاهة، الابتكار والالتزام تجاه عملائنا وشركائنا.",
      joinTitle: "انضم إلينا",
      joinText: "معاً، لنبني مستقبلاً حيث يتم الاعتراف بالجودة الجزائرية وتقديرها في جميع أنحاء العالم.",
    },
    fr: {
      title: "À propos de nous",
      subtitle: "Découvrez notre mission et notre engagement pour la qualité en Algérie",
      historyTitle: "Notre histoire",
      historyP1:
        "La Plateforme Algérienne de Qualité et d'Excellence a été créée avec une vision claire : élever les standards de qualité des produits et services algériens au niveau international.",
      historyP2:
        "Depuis notre création, nous avons accompagné plus de 1200 entreprises dans leur démarche qualité, délivré plus de 350 certifications, et formé plus de 1000 experts certifiés.",
      historyP3:
        "Notre équipe d'experts qualifiés travaille chaque jour pour offrir des services de certification et de conseil de la plus haute qualité, adaptés aux besoins spécifiques de chaque entreprise.",
      missionTitle: "Notre Mission",
      missionText:
        "Promouvoir l'excellence et la qualité dans tous les secteurs de l'économie algérienne en offrant des certifications reconnues internationalement.",
      visionTitle: "Notre Vision",
      visionText:
        "Devenir la référence en matière de certification et de conseil en qualité en Algérie et dans la région MENA.",
      valuesTitle: "Nos Valeurs",
      valuesText: "Excellence, intégrité, innovation et engagement envers nos clients et partenaires.",
      joinTitle: "Rejoignez-nous",
      joinText:
        "Ensemble, construisons un avenir où la qualité algérienne est reconnue et appréciée dans le monde entier.",
    },
    en: {
      title: "About Us",
      subtitle: "Discover our mission and commitment to quality in Algeria",
      historyTitle: "Our Story",
      historyP1:
        "The Algerian Quality and Excellence Platform was created with a clear vision: to elevate Algerian products and services to international quality standards.",
      historyP2:
        "Since our inception, we have supported over 1200 companies in their quality journey, issued more than 350 certifications, and trained over 1000 certified experts.",
      historyP3:
        "Our team of qualified experts works daily to provide the highest quality certification and consulting services, tailored to each company's specific needs.",
      missionTitle: "Our Mission",
      missionText:
        "To promote excellence and quality across all sectors of the Algerian economy by offering internationally recognized certifications.",
      visionTitle: "Our Vision",
      visionText: "To become the reference for certification and quality consulting in Algeria and the MENA region.",
      valuesTitle: "Our Values",
      valuesText: "Excellence, integrity, innovation, and commitment to our clients and partners.",
      joinTitle: "Join Us",
      joinText: "Together, let's build a future where Algerian quality is recognized and appreciated worldwide.",
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative  bg-gray-900 text-white pt-32 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2),transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{t.historyTitle}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t.historyP1}</p>
                <p>{t.historyP2}</p>
                <p>{t.historyP3}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="aspect-video bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center"
            >
              <Award className="h-32 w-32 text-red-600" />
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Target, title: t.missionTitle, text: t.missionText, delay: 0 },
              { icon: Eye, title: t.visionTitle, text: t.visionText, delay: 0.1 },
              { icon: Award, title: t.valuesTitle, text: t.valuesText, delay: 0.2 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <item.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-red-600 text-white rounded-lg shadow-xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">{t.joinTitle}</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">{t.joinText}</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
