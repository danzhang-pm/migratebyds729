export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row, index) => {
    if (index === 0) row.classList.add('hero-image');
    else if (index === 1) row.classList.add('hero-content');
  });
  const img = block.querySelector('.hero-image img');
  if (img && img.src) {
    block.style.setProperty('--hero-bg', `url(${img.src})`);
  }
}
