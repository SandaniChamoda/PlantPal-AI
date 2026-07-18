export type KnowledgeEntry = {
  id: string;
  fileName: string;
  knowledgeType: string;
  summary: string;
  uploadedAt: string;
};

const knowledgeEntries: KnowledgeEntry[] = [];

export const addKnowledgeEntry = (entry: Omit<KnowledgeEntry, "id" | "uploadedAt">) => {
  const item: KnowledgeEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    uploadedAt: new Date().toISOString(),
    ...entry,
  };

  knowledgeEntries.unshift(item);
  return item;
};

export const getKnowledgeEntries = () => knowledgeEntries.slice(0, 20);

export const buildKnowledgeContext = () => {
  if (knowledgeEntries.length === 0) {
    return "No uploaded knowledge yet.";
  }

  return knowledgeEntries
    .slice(0, 8)
    .map(
      (entry, index) =>
        `${index + 1}. [${entry.knowledgeType}] ${entry.fileName}\n${entry.summary.slice(0, 1200)}`
    )
    .join("\n\n");
};
