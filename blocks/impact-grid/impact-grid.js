import { createOptimizedPicture } from '../../scripts/aem.js';

function createArrowSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.setAttribute('fill', 'none');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('fill', '#4A7DFF');
  g.setAttribute('stroke', 'white');
  g.setAttribute('stroke-width', '1.5');
  g.setAttribute('stroke-linejoin', 'round');
  g.setAttribute('stroke-miterlimit', '10');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '16');
  circle.setAttribute('cy', '16');
  circle.setAttribute('r', '15.12');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98');
  g.appendChild(circle);
  g.appendChild(path);
  svg.appendChild(g);
  return svg;
}

function decorateOurImpact(block, cells) {
  block.classList.add('impact-grid--our-impact');
  let idx = 0;
  cells.forEach((cell) => {
    if (idx === 0) { idx += 1; return; }
    if (idx === cells.length - 1) {
      const pictures = cell.querySelectorAll('picture');
      pictures.forEach((pic) => {
        const img = pic.querySelector('img');
        if (img) {
          const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          pic.replaceWith(optimized);
        }
      });
      const firstPicture = cell.querySelector('picture');
      if (firstPicture) {
        const contentDiv = document.createElement('div');
        let sibling = firstPicture.nextElementSibling;
        while (sibling) {
          const next = sibling.nextElementSibling;
          contentDiv.appendChild(sibling);
          sibling = next;
        }
        if (contentDiv.children.length > 0) {
          cell.appendChild(contentDiv);
        }
      }
    } else {
      const pictures = cell.querySelectorAll('picture');
      pictures.forEach((pic) => {
        const img = pic.querySelector('img');
        if (img) {
          const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
          pic.replaceWith(optimized);
        }
      });
      const links = cell.querySelectorAll('a');
      links.forEach((link) => {
        if (!link.querySelector('svg, img, picture')) {
          link.appendChild(createArrowSvg());
        }
      });
    }
    idx += 1;
  });
  const gradientLinks = cells[0].querySelectorAll('a');
  gradientLinks.forEach((link) => {
    if (!link.querySelector('svg, img, picture')) {
      link.appendChild(createArrowSvg());
    }
  });
}

function decorateCareers(block, cells) {
  block.classList.add('impact-grid--careers');
  const section = block.closest('.section');
  if (section) {
    const bgImage = section.dataset.backgroundImage
      || section.style.backgroundImage
      || getComputedStyle(section).backgroundImage;
    if (bgImage && bgImage !== 'none') {
      block.style.setProperty('--careers-bg', bgImage);
    }
  }
  if (cells.length === 1) {
    const cell = cells[0];
    const paragraphs = [...cell.querySelectorAll('p')];
    const links = [...cell.querySelectorAll('a')];
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const eyebrow = cell.querySelector('p:first-child');
    if (eyebrow) leftDiv.appendChild(eyebrow.cloneNode(true));
    const firstHeading = cell.querySelector('h2, h3');
    if (firstHeading) leftDiv.appendChild(firstHeading.cloneNode(true));
    let descAdded = false;
    paragraphs.forEach((p) => {
      if (p === eyebrow) return;
      if (p.querySelector('a')) return;
      if (!descAdded) { leftDiv.appendChild(p.cloneNode(true)); descAdded = true; }
    });
    links.forEach((link) => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('join the team')) {
        const p = document.createElement('p');
        const clonedLink = link.cloneNode(true);
        if (!clonedLink.querySelector('svg, img, picture')) clonedLink.appendChild(createArrowSvg());
        p.appendChild(clonedLink);
        leftDiv.appendChild(p);
      }
    });
    const careerLinksContainer = document.createElement('div');
    links.forEach((link) => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('join the team')) return;
      const a = link.cloneNode(true);
      if (!a.querySelector('svg, img, picture')) a.appendChild(createArrowSvg());
      a.classList.add('career-link');
      careerLinksContainer.appendChild(a);
    });
    rightDiv.appendChild(careerLinksContainer);
    if (!leftDiv.children.length) {
      leftDiv.appendChild(eyebrow ? eyebrow.cloneNode(true) : document.createTextNode(''));
    }
    block.firstElementChild.innerHTML = '';
    block.firstElementChild.appendChild(leftDiv);
    block.firstElementChild.appendChild(rightDiv);
  } else {
    const leftDiv = cells[0];
    const rightDiv = cells.length > 1 ? cells[1] : document.createElement('div');
    const row = document.createElement('div');
    row.appendChild(leftDiv);
    if (cells.length > 1) row.appendChild(rightDiv);
    block.firstElementChild.innerHTML = '';
    block.firstElementChild.appendChild(row);
    leftDiv.querySelectorAll('a').forEach((link) => {
      if (!link.querySelector('svg, img, picture')) link.appendChild(createArrowSvg());
    });
    rightDiv.querySelectorAll('a').forEach((link) => {
      if (!link.querySelector('svg, img, picture')) link.appendChild(createArrowSvg());
    });
  }
}

export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (!firstRow) return;
  const cells = [...firstRow.children];
  if (cells.length === 0) return;
  const firstCell = cells[0];
  const firstP = firstCell.querySelector('p');
  const eyebrowText = firstP ? firstP.textContent.trim() : '';
  if (eyebrowText === 'Careers') {
    decorateCareers(block, cells);
  } else {
    decorateOurImpact(block, cells);
  }
}
