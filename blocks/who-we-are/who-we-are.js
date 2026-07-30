export default function decorate(block) {
  const children = [...block.children];
  if (children.length >= 2) {
    children[0].classList.add('who-we-are-left');
    children[1].classList.add('who-we-are-right');

    // Decorate right column stat items
    const rightCol = children[1];
    const items = [...rightCol.children];
    items.forEach((item) => {
      item.classList.add('stat-item');
    });
  }
}
