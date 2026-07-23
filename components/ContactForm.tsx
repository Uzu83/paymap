"use client";

import { type FormEvent, useState } from "react";

const INTENTS = [
  { value: "商店街", label: "商店街" },
  { value: "観光", label: "観光" },
  { value: "市・FGN", label: "市・FGN" },
  { value: "その他", label: "その他" },
] as const;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<string>(INTENTS[0].value);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Paymap] ${intent} — ${org || name || "お問い合わせ"}`,
    );
    const body = encodeURIComponent(
      [
        "Paymap（使えるペイ）へのお問い合わせ",
        "",
        `お名前: ${name}`,
        `所属: ${org}`,
        `返信先メール: ${email}`,
        `ご用件: ${intent}`,
        "",
        "— メッセージ —",
        message,
        "",
        "※ MVP 連絡フォーム（mailto）。送信はお使いのメールアプリが開きます。",
      ].join("\n"),
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <p className="rounded-lg bg-[var(--wash)] px-3 py-2 text-sm text-[var(--muted)] ring-1 ring-[var(--line)]">
        MVP 版の連絡フォームです。送信ボタンでメールアプリが開き、内容を確認してから送ってください。サーバー側への保存はまだありません。
      </p>

      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">お名前</span>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">
          所属（商店街・団体名など）
        </span>
        <input
          type="text"
          name="org"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
          autoComplete="organization"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">
          返信先メール
        </span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">ご用件</span>
        <select
          name="intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          {INTENTS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">メッセージ</span>
        <textarea
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-[var(--pay)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:opacity-90"
      >
        メールアプリで送信
      </button>

      <p className="text-xs text-[var(--muted)]">
        宛先: {CONTACT_EMAIL}
        {CONTACT_EMAIL === "contact@example.com"
          ? "（本番では NEXT_PUBLIC_CONTACT_EMAIL を設定してください）"
          : null}
      </p>
    </form>
  );
}
