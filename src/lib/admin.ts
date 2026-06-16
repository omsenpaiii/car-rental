export function getAdminEmails(raw = process.env.ADMIN_EMAILS ?? "") {
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isConfiguredAdminEmail(email?: string | null, raw?: string) {
  if (!email) {
    return false;
  }

  return getAdminEmails(raw).includes(email.trim().toLowerCase());
}
