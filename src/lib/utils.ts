/**
 * Helper utility to remove chapter prefixes and numbers from titles.
 * e.g., "Science Ch 1 - Chemical Reactions and Equations" -> "Chemical Reactions and Equations"
 * e.g., "Science Ch1: Chemical Reactions and Equations" -> "Chemical Reactions and Equations"
 * e.g., "Ch1: Chemical Reactions" -> "Chemical Reactions"
 */
export function removeChapterNumber(title: string): string {
  if (!title) return "";
  
  // Match common class/subject prefix + chapter prefix + number + punctuation/spaces
  // Prefix: CBSE, SSC, Class 10, Subject names (Science, Math, Social Studies, SST, History, Civics, Geography, Economics)
  // Chapter: Ch, Chapter, Lesson, Unit
  // Number: digits or Roman Numerals
  // Delimiter: -, :, —, –, dot, space
  const regex = /^(?:(?:cbse|ssc|class\s*\d+|science|maths?|mathematics|social studies|sst|history|civics|geography|economics)\s*[\-\–\—\:\,]*\s*)*(?:ch(?:apter)?|lesson|unit)\s*(?:\d+|[ivxldcm]+)\s*[\-\–\—\:\.]*\s*/i;
  
  let cleaned = title.replace(regex, "");
  
  // If the title starts with an unwanted symbol after that, clean it
  cleaned = cleaned.replace(/^[\-\–\—\:\.\s]+/, "");
  
  // Fallback to original title if everything was stripped
  if (!cleaned.trim()) {
    return title;
  }
  
  // Ensure the first letter is capitalized
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
