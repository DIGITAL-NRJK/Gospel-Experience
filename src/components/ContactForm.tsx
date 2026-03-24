"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/contact/actions";

type FormState = { success: boolean; error: string | null } | null;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      const result = await sendContactMessage(formData);
      return result;
    },
    null
  );

  if (state?.success) {
    return (
      <div className="bg-white rounded-[20px] p-7 border border-[rgba(43,27,94,0.06)]">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-teal-light)] flex items-center justify-center mx-auto mb-4 text-[var(--color-teal-dark)] text-2xl font-bold">
            ✓
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--color-teal-dark)] mb-2">
            Message envoyé !
          </h3>
          <p className="text-[13px] text-[var(--color-text-muted)]">
            Nous vous répondrons dans les meilleurs délais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] p-7 border border-[rgba(43,27,94,0.06)]">
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[1px] block mb-1.5">
            Nom complet
          </label>
          <input
            name="name"
            required
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-xl border border-[rgba(43,27,94,0.1)] text-[13px] outline-none focus:border-[var(--color-coral)] transition-colors"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[1px] block mb-1.5">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="w-full px-4 py-3 rounded-xl border border-[rgba(43,27,94,0.1)] text-[13px] outline-none focus:border-[var(--color-coral)] transition-colors"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[1px] block mb-1.5">
            Sujet
          </label>
          <select
            name="subject"
            className="w-full px-4 py-3 rounded-xl border border-[rgba(43,27,94,0.1)] text-[13px] bg-white outline-none"
          >
            <option>Festival — Billetterie</option>
            <option>École GEI — Inscription</option>
            <option>Partenariat</option>
            <option>Presse</option>
            <option>Autre</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[1px] block mb-1.5">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Votre message..."
            className="w-full px-4 py-3 rounded-xl border border-[rgba(43,27,94,0.1)] text-[13px] outline-none resize-y focus:border-[var(--color-coral)] transition-colors"
          />
        </div>

        {state?.error && (
          <p className="text-[12px] text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-coral self-start disabled:opacity-50"
        >
          {isPending ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}