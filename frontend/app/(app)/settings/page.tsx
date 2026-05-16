'use client';

import { useState } from 'react';

const tabs = ['Général', 'Gmail API', 'Signature', 'Notifications'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Général');
  const [name, setName] = useState('Maël Ballereau');
  const [email, setEmail] = useState('maelballereau363@gmail.com');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-500 mt-1">Configurez votre compte et vos préférences</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Général */}
      {activeTab === 'Général' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Informations du profil</h2>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-white">MB</span>
              </div>
              <div>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Changer la photo</button>
                <p className="text-xs text-slate-400 mt-0.5">JPG, PNG ou GIF. Max 1 MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Préférences</h2>
            <div className="space-y-5">
              {[
                { label: 'Confirmation avant envoi', description: 'Demander une confirmation avant chaque envoi', enabled: true },
                { label: 'Sauvegarde automatique', description: 'Sauvegarder les brouillons toutes les 5 minutes', enabled: true },
                { label: 'Mode compact', description: 'Afficher plus de contenu dans la liste des emails', enabled: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{pref.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{pref.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                      pref.enabled ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        pref.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      )}

      {/* Gmail API */}
      {activeTab === 'Gmail API' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Configuration Gmail API</h2>
                <p className="text-xs text-slate-500 mt-0.5">Connectez votre compte Google pour envoyer des emails</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Client ID</label>
                <input
                  type="text"
                  placeholder="xxxx.apps.googleusercontent.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Client Secret</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">URI de redirection</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="http://localhost/api/auth/callback"
                    readOnly
                    className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500"
                  />
                  <button className="px-3 py-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-500">Non connecté</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                Connecter avec Google
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature */}
      {activeTab === 'Signature' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-5">Signature email</h2>
          <p className="text-xs text-slate-500 mb-3">Cette signature sera automatiquement ajoutée à la fin de vos emails.</p>
          <textarea
            rows={8}
            defaultValue={`Maël Ballereau\nDéveloppeur Full Stack\nmaelballereau363@gmail.com`}
            className="w-full px-3.5 py-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end mt-4">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'Notifications' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-5">Préférences de notifications</h2>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Confirmations d'envoi", description: 'Notifier quand un email est envoyé avec succès', enabled: true },
              { label: "Échecs d'envoi", description: "Alerter en cas d'erreur lors de l'envoi", enabled: true },
              { label: "Ouvertures d'email", description: 'Notifier quand un destinataire ouvre votre email', enabled: false },
              { label: 'Résumé hebdomadaire', description: "Recevoir un rapport d'activité chaque semaine", enabled: true },
            ].map((notif) => (
              <div key={notif.label} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{notif.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{notif.description}</p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ml-4 ${
                    notif.enabled ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      notif.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
