const templates = [
  {
    id: 1,
    name: 'Proposition commerciale',
    description: 'Modèle standard pour les propositions clients',
    lastUsed: 'il y a 2 jours',
    usageCount: 47,
    category: 'Commercial',
  },
  {
    id: 2,
    name: 'Newsletter mensuelle',
    description: 'Mise en page pour vos newsletters mensuelles',
    lastUsed: 'il y a 5 jours',
    usageCount: 12,
    category: 'Marketing',
  },
  {
    id: 3,
    name: 'Confirmation de commande',
    description: 'Email transactionnel pour confirmer les commandes',
    lastUsed: 'il y a 1 jour',
    usageCount: 128,
    category: 'Transactionnel',
  },
  {
    id: 4,
    name: 'Relance de paiement',
    description: 'Rappel poli pour les factures impayées',
    lastUsed: 'il y a 3 jours',
    usageCount: 23,
    category: 'Finance',
  },
  {
    id: 5,
    name: 'Invitation événement',
    description: 'Invitations professionnelles à vos événements',
    lastUsed: 'il y a 1 semaine',
    usageCount: 8,
    category: 'Événementiel',
  },
  {
    id: 6,
    name: 'Rapport hebdomadaire',
    description: "Compte-rendu d'activité hebdomadaire",
    lastUsed: 'il y a 2 jours',
    usageCount: 31,
    category: 'Interne',
  },
  {
    id: 7,
    name: 'Bienvenue nouveau client',
    description: 'Email de bienvenue pour les nouveaux clients',
    lastUsed: 'il y a 4 jours',
    usageCount: 19,
    category: 'Onboarding',
  },
  {
    id: 8,
    name: 'Suivi post-vente',
    description: "Follow-up automatique après un achat",
    lastUsed: 'il y a 1 jour',
    usageCount: 64,
    category: 'Commercial',
  },
];

const categoryColor: Record<string, string> = {
  Commercial: 'bg-blue-50 text-blue-700',
  Marketing: 'bg-purple-50 text-purple-700',
  Transactionnel: 'bg-green-50 text-green-700',
  Finance: 'bg-amber-50 text-amber-700',
  Événementiel: 'bg-pink-50 text-pink-700',
  Interne: 'bg-slate-100 text-slate-700',
  Onboarding: 'bg-teal-50 text-teal-700',
};

export default function TemplatesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Modèles</h1>
          <p className="text-sm text-slate-500 mt-1">Gérez vos modèles d'emails réutilisables</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouveau modèle
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher un modèle..."
          className="w-full max-w-xs pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-100 rounded-lg -mr-1 -mt-1">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 mb-1">{template.name}</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">{template.description}</p>

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[template.category] ?? 'bg-slate-100 text-slate-600'}`}>
                {template.category}
              </span>
              <span className="text-xs text-slate-400">{template.usageCount} usages</span>
            </div>
          </div>
        ))}

        {/* New template card */}
        <div className="bg-white rounded-xl border border-dashed border-slate-200 p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all group min-h-40">
          <div className="w-10 h-10 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:border-blue-300 transition-colors">
            <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400 group-hover:text-blue-600 transition-colors">Nouveau modèle</p>
        </div>
      </div>
    </div>
  );
}
