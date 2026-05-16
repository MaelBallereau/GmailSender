'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComposePage() {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nouveau message</h1>
          <p className="text-sm text-slate-500 mt-1">Composez et envoyez votre email</p>
        </div>
      </div>

      {/* Compose form */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* To */}
        <div className="flex items-center px-5 py-3.5 border-b border-slate-100">
          <label className="text-sm font-medium text-slate-500 w-16 shrink-0">À</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="destinataire@exemple.com"
            className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
          />
          <button
            onClick={() => setShowCc(!showCc)}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 ml-3 transition-colors"
          >
            CC
          </button>
        </div>

        {/* CC */}
        {showCc && (
          <div className="flex items-center px-5 py-3.5 border-b border-slate-100">
            <label className="text-sm font-medium text-slate-500 w-16 shrink-0">CC</label>
            <input
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="copie@exemple.com"
              className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
            />
          </div>
        )}

        {/* Subject */}
        <div className="flex items-center px-5 py-3.5 border-b border-slate-100">
          <label className="text-sm font-medium text-slate-500 w-16 shrink-0">Objet</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Objet de votre email"
            className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
          />
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Rédigez votre message..."
            rows={16}
            className="w-full text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent resize-none leading-relaxed"
          />
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
              </svg>
              Joindre
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Planifier
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium">
              Brouillon
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !to || !subject}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Envoyer
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Template shortcuts */}
      <div className="mt-4 flex items-center gap-2.5 flex-wrap">
        <span className="text-xs text-slate-400">Modèles rapides :</span>
        {['Proposition commerciale', 'Newsletter', 'Relance', 'Confirmation'].map((t) => (
          <button
            key={t}
            className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
