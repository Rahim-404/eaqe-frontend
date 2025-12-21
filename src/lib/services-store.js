

const DEFAULT_SERVICES = [
  {
    id: "1",
    nameAr: "تدقيق الجودة",
    nameFr: "Audit de qualité",
    category: "Certification",
    price: "15000",
    descriptionAr: "تدقيق شامل لنظام إدارة الجودة",
    descriptionFr: "Audit complet du système de management de la qualité",
  },
  {
    id: "2",
    nameAr: "شهادة ISO 9001",
    nameFr: "Certification ISO 9001",
    category: "Certification",
    price: "25000",
    descriptionAr: "الحصول على شهادة ISO 9001",
    descriptionFr: "Obtention de la certification ISO 9001",
  },
  {
    id: "3",
    nameAr: "تدريب الموظفين",
    nameFr: "Formation du personnel",
    category: "Formation",
    price: "8000",
    descriptionAr: "برامج تدريبية لتحسين الجودة",
    descriptionFr: "Programmes de formation pour améliorer la qualité",
  },
  {
    id: "4",
    nameAr: "استشارات الجودة",
    nameFr: "Conseil en qualité",
    category: "Conseil",
    price: "12000",
    descriptionAr: "استشارات متخصصة في الجودة",
    descriptionFr: "Conseil spécialisé en qualité",
  },
  {
    id: "5",
    nameAr: "تقييم المخاطر",
    nameFr: "Évaluation des risques",
    category: "Audit",
    price: "10000",
    descriptionAr: "تحليل وتقييم المخاطر",
    descriptionFr: "Analyse et évaluation des risques",
  },
  {
    id: "6",
    nameAr: "إدارة العمليات",
    nameFr: "Gestion des processus",
    category: "Conseil",
    price: "18000",
    descriptionAr: "تحسين وإدارة العمليات",
    descriptionFr: "Amélioration et gestion des processus",
  },
  {
    id: "7",
    nameAr: "شهادة ISO 14001",
    nameFr: "Certification ISO 14001",
    category: "Certification",
    price: "22000",
    descriptionAr: "شهادة الإدارة البيئية",
    descriptionFr: "Certification de management environnemental",
  },
  {
    id: "8",
    nameAr: "تحليل الأداء",
    nameFr: "Analyse de performance",
    category: "Audit",
    price: "9000",
    descriptionAr: "تقييم وتحليل الأداء المؤسسي",
    descriptionFr: "Évaluation et analyse de la performance",
  },
]

export function getServices(){
  if (typeof window === "undefined") return DEFAULT_SERVICES

  const stored = localStorage.getItem("algerian-quality-services")
  if (!stored) {
    localStorage.setItem("algerian-quality-services", JSON.stringify(DEFAULT_SERVICES))
    return DEFAULT_SERVICES
  }

  return JSON.parse(stored)
}

export function saveServices(services){
  if (typeof window === "undefined") return
  localStorage.setItem("algerian-quality-services", JSON.stringify(services))
}

export function addService(service) {
  const services = getServices()
  const newService = {
    ...service,
    id: Date.now().toString(),
  }
  services.push(newService)
  saveServices(services)
  return newService
}

export function updateService(id,updates){
  const services = getServices()
  const index = services.findIndex((s) => s.id === id)
  if (index !== -1) {
    services[index] = { ...services[index], ...updates }
    saveServices(services)
  }
}

export function deleteService(id){
  const services = getServices().filter((s) => s.id !== id)
  saveServices(services)
}
