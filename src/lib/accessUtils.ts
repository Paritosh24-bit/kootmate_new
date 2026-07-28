export function normalizeSubjectKey(key: string): string {
  if (!key) return '';
  const lower = key.toLowerCase().trim();
  if (lower.includes('science') && !lower.includes('history') && !lower.includes('social')) return 'science';
  if (lower.includes('math') || lower.includes('algebra') || lower.includes('geometry')) return 'mathematics';
  if (lower.includes('history') || lower.includes('civic') || lower.includes('pol') || lower.includes('political')) return 'history_pol_sc';
  if (lower.includes('geo') || lower.includes('eco') || lower.includes('geography') || lower.includes('economic')) return 'geo_eco';
  return lower;
}

export function isProtectedSubject(key: string): boolean {
  const norm = normalizeSubjectKey(key);
  return ['science', 'mathematics', 'history_pol_sc', 'geo_eco'].includes(norm);
}

export function getSubjectDisplayName(key: string): string {
  const norm = normalizeSubjectKey(key);
  switch (norm) {
    case 'science':
      return 'Science';
    case 'mathematics':
      return 'Mathematics';
    case 'history_pol_sc':
      return 'History and Political Science';
    case 'geo_eco':
      return 'Geography & Economics';
    default:
      return key;
  }
}
