export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const cells = [...row.children];
  if (cells.length >= 2) {
    cells[0].classList.add('careers-left');
    if (cells[1]) cells[1].classList.add('careers-right');
  }
  const img = block.querySelector('img');
  if (img && img.src) {
    block.style.setProperty('--careers-bg', `url(${img.src})`);
    const pic = img.closest('picture');
    if (pic) pic.remove();
  }
}
