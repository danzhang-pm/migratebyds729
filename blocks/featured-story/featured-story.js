export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 3) {
      // Ensure cells maintain proper flex layout
      // Cell 1 left (eyebrow + headline) — already wrapped in anchor
      // Cell 2 center (copy text) — already wrapped in anchor
      // Cell 3 right (CTA button) — already wrapped in strong/a
    }
  });
}
