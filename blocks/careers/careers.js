export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];

    // First cell should be the background image - extract and remove
    const firstImg = cells[0]?.querySelector('img');
    if (firstImg) {
      const bgUrl = firstImg.getAttribute('src');
      if (bgUrl) {
        block.style.setProperty('--careers-bg', `url(${bgUrl})`);
      }
      cells[0].remove();
    }

    // Re-query cells after removal
    const remainingCells = [...row.children];

    // First remaining cell = left content
    if (remainingCells[0]) {
      remainingCells[0].classList.add('careers-left');
    }

    // Second remaining cell = right job tiles
    if (remainingCells[1]) {
      remainingCells[1].classList.add('careers-right');
      // Restructure: move each job link into its own wrapper for EDS button decoration
    }
  });
}
