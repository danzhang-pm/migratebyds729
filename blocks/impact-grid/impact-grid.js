export default function decorate(block) {
  const wrapper = block.firstElementChild;
  if (!wrapper) return;

  const items = [...wrapper.children];

  // Determine which item is "Our Impact" featured card
  // The first 2 items are title/desc cards, then stats
  let featuredCount = 0;
  items.forEach((item, i) => {
    const firstP = item.querySelector('p');
    const h2 = item.querySelector('h2');
    const strong = item.querySelector('strong');

    if (firstP && firstP.textContent.trim() === 'Our Impact' && i < 2) {
      item.classList.add('impact-card', 'featured');
      featuredCount++;
    } else if (firstP && firstP.textContent.trim().toLowerCase() === 'impact report') {
      item.classList.add('impact-card', 'featured');
      featuredCount++;
    } else if (strong) {
      // It's a stat item
      item.classList.add('impact-card', 'stat');
    } else if (i === items.length - 1 && item.querySelector('a[href*="Impact"]')) {
      item.classList.add('impact-card', 'dark');
    } else {
      item.classList.add('impact-card');
    }
  });

  // If last item has link to report PDF, mark it as report
  const lastItem = items[items.length - 1];
  if (lastItem && lastItem.querySelector('a[href*="impact-report"]') || lastItem && lastItem.querySelector('a[href*=".pdf"]')) {
    lastItem.classList.remove('stat', 'dark');
    lastItem.classList.add('impact-card', 'report');
  }
}
