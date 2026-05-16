const emails = [
  { id: 1, subject: 'Proposition commerciale Q2 2026', to: 'client@exemple.com', date: '14 mai 2026, 10h23', status: 'delivered', opens: 3 },
  { id: 2, subject: 'Suivi de votre commande #45678', to: 'contact@societe.fr', date: '14 mai 2026, 09h15', status: 'delivered', opens: 1 },
  { id: 3, subject: 'Newsletter mai 2026', to: '128 destinataires', date: '13 mai 2026, 18h00', status: 'delivered', opens: 87 },
  { id: 4, subject: 'Rappel réunion de demain', to: 'equipe@startup.io', date: '13 mai 2026, 14h30', status: 'failed', opens: 0 },
  { id: 5, subject: 'Confirmation de rendez-vous', to: 'rdv@partenaire.com', date: '12 mai 2026, 11h00', status: 'delivered', opens: 2 },
  { id: 6, subject: 'Offre partenariat 2026', to: 'partenaire@business.com', date: '11 mai 2026, 16h45', status: 'delivered', opens: 4 },
  { id: 7, subject: 'Invitation événement mai', to: '45 destinataires', date: '10 mai 2026, 09h00', status: 'delivered', opens: 31 },
  { id: 8, subject: 'Rapport mensuel avril', to: 'direction@entreprise.fr', date: '01 mai 2026, 08h30', status: 'delivered', opens: 5 },
];

export default function SentPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Emails envoyés</h1>
        <p className="text-sm text-slate-500 mt-1">Historique complet de vos envois</p>
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-60 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un email..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          {['Tous', 'Livrés', 'Échecs'].map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-2.5 text-sm font-medium border-r last:border-r-0 border-slate-200 transition-colors ${
                i === 0 ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Objet</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Destinataire</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Ouvertures</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Statut</th>
              <th className="px-6 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {emails.map((email) => (
              <tr key={email.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{email.subject}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{email.to}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-500 whitespace-nowrap">{email.date}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-slate-600">{email.opens}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    email.status === 'delivered'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {email.status === 'delivered' ? 'Livré' : 'Échec'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-slate-500">Affichage de 1 à 8 sur <span className="font-medium text-slate-700">1 284</span> emails</p>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            ← Précédent
          </button>
          {[1, 2, 3, '...', 161].map((page, i) => (
            <button
              key={i}
              className={`min-w-8 h-8 px-2 text-sm rounded-lg font-medium transition-colors ${
                page === 1
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
