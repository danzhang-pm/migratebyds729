export default async function decorate(block) {
  const rows = [...block.children];

  // Wrap card rows (row index 1+) in a scrollable container
  const cardRows = rows.slice(1);
  const scroller = document.createElement('div');
  scroller.className = 'news-scroller-track';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const imgWrapper = cells[0];
    const textWrapper = cells[1];

    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('aria-label', 'Opens in a new window');

    if (imgWrapper) {
      const imgContent = imgWrapper.querySelector('picture, img');
      if (imgContent) link.appendChild(imgContent.cloneNode(true));
    }
    if (textWrapper) {
      const textContent = textWrapper.cloneNode(true);
      link.appendChild(textContent);
    }

    const card = document.createElement('div');
    card.className = 'news-item';
    card.appendChild(link);

    scroller.appendChild(card);
    row.remove();
  });

  block.appendChild(scroller);
}
