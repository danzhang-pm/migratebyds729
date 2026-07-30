export default async function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cells = [...row.children];

  // Cell 0: background image - hide it, it's used via CSS background
  if (cells[0]) {
    cells[0].style.display = 'none';
  }

  // Cell 1: text content area (eyebrow, heading, description, links)
  if (cells[1]) {
    // Wrap all children of cell 1 in a content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'investors-content';
    const children = [...cells[1].children];
    children.forEach((child) => contentDiv.appendChild(child));
    cells[1].appendChild(contentDiv);
  }

  // Cell 2: icon cards
  if (cells[2]) {
    const iconsRow = document.createElement('div');
    iconsRow.className = 'investors-icons-row';
    const paras = [...cells[2].children];

    paras.forEach((p) => {
      const link = p.querySelector('a');
      if (link) {
        const iconDiv = document.createElement('div');
        // Move the link into the div
        link.parentElement.removeChild(link);
        iconDiv.appendChild(link);
        iconsRow.appendChild(iconDiv);

        // Handle images inside the link
        const img = link.querySelector('img');
        if (img) {
          // EDS may wrap bare img in <p>, unwrap any extra <p>
          const parentP = img.closest('p');
          if (parentP && parentP.parentElement === link) {
            link.insertBefore(img, parentP);
            parentP.remove();
          }
        }
      }
    });

    // Replace cell 2 content with the icons row
    cells[2].innerHTML = '';
    cells[2].appendChild(iconsRow);
  }
}
