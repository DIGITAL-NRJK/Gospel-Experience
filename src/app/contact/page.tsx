"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
      setStatus("error");
    }
  }

  return (
    <>
      <Header />

      <section className="py-11 px-7">
        <div className="section-tag text-[var(--color-coral)]">Nous contacter</div>
        <h1 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-6">
          Restons en contact
        </h1>

        <div className="grid grid-cols-2 gap-6">
          {/* FORMULAIRE */}
          <div className="bg-white rounded-[20px] p-7 border border-[rgba(43,27,94,0.06)]">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="text-[40px] mb-4">✓</div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-teal-dark)] mb-2">
                  Message envoyé !
                </h3>
                <p className="text-[13px] text-[var(--color-text-muted)]">
                  Nous vous répondrons dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-teal mt-6 text-[12px]"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                {status === "error" && (
                  <p className="text-[12px] text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-coral self-start disabled:opacity-50"
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>

          {/* INFOS */}
          <div>
            <div className="bg-[var(--color-indigo)] rounded-[20px] p-7 mb-4">
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Informations
              </h3>
              {[
                ["Téléphone", "07 88 51 96 52"],
                ["Email", "goslym69@gmail.com"],
                ["Adresse", "Carré Fourvière\n5 place de Fourvière\n69005 Lyon"],
              ].map(([label, value]) => (
                <div key={label} className="mb-3.5">
                  <div className="text-[10px] tracking-[1px] uppercase text-[var(--color-gold)] font-bold mb-0.5">
                    {label}
                  </div>
                  <div className="text-[13px] text-white/70 whitespace-pre-line">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-[var(--color-lavender-light)] to-[var(--color-peach)] rounded-[20px] min-h-[180px] flex items-center justify-center">
              <span className="text-[12px] text-[var(--color-indigo)] font-bold">
                Carte Google Maps
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
