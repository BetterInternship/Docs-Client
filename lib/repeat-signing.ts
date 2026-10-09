import type { SigningPartyMapParty } from "@/components/docs/forms/SignignPartyTimeline";

/** Lists completed roles for the inline forward-only notice. */
export function getPreviousCompletedRoles(
  parties: SigningPartyMapParty[] | undefined,
  currentPartyId: string | undefined,
  email: string | undefined
) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return [];
  return (parties ?? [])
    .filter(
      (party) =>
        party._id !== currentPartyId &&
        party.signed &&
        party.signatory_email?.trim().toLowerCase() === normalizedEmail
    )
    .map((party) => party.signatory_title?.trim() || `Signing party ${party.order}`);
}
