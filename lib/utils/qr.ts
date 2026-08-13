/* eslint-disable @typescript-eslint/no-explicit-any */
import vCard from "vcf";
import { IFormattedVCardData } from "@/lib/type-interface";

export const getVCardData = (vcardString: string) => {
  try {
    const cards = vCard.parse(vcardString);
    return cards[0] ?? null;
  } catch (error) {
    console.error("Error parsing vCard:", error);
    return null;
  }
};

export const isVCard = (str: string): boolean => {
  return str.includes("BEGIN:VCARD") && str.includes("END:VCARD");
};

function readField(card: any, key: string): string {
  const entries = card?.get?.(key) ?? card?.[key];
  if (!entries) return "";
  const first = Array.isArray(entries) ? entries[0] : entries;
  if (typeof first === "string") return first;
  if (first?.value !== undefined) {
    return Array.isArray(first.value) ? first.value.filter(Boolean).join(" ") : String(first.value);
  }
  return "";
}

export const formatVCardData = (card: any): IFormattedVCardData | null => {
  if (!card) return null;

  const name =
    readField(card, "fn") ||
    [readField(card, "n")].filter(Boolean).join(" ").trim();
  const organization = readField(card, "org");
  const title = readField(card, "title");
  let url = readField(card, "url");
  if (url && !url.startsWith("http")) url = `https://${url}`;
  const telephone = readField(card, "tel");
  const email = readField(card, "email");

  const fields = [
    { label: "Name", copy: false, link: "" as const, value: name },
    { label: "Organization", copy: false, link: "" as const, value: organization },
    { label: "Title", copy: false, link: "" as const, value: title },
    { label: "URL", copy: true, link: "web" as const, value: url },
    { label: "Telephone", copy: true, link: "tel" as const, value: telephone },
    { label: "Email", copy: true, link: "email" as const, value: email },
  ].filter((field) => field.value);

  if (fields.length === 0) return null;

  return { fields, errors: null };
};
