export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;
  
  // First row = heading, rest = cards
  const headingRow = rows[0];
  const cards = rows.slice(1);
  
  // Create carousel tray
  const tray = document.createElement('div');
  tray.className = 'carousel-tray';
  
  cards.forEach((card) => {
    const cells = [...card.children];
    const slide = document.createElement('div');
    slide.className = 'carousel-card';
    
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        cell.classList.add('carousel-card-image');
      } else {
        cell.classList.add('carousel-card-body');
      }
      slide.appendChild(cell);
    });
    tray.appendChild(slide);
  });
  
  block.appendChild(tray);
}
