export default function decorate(block) {
  // The hero block has two direct children:
  // 1. First div: contains the picture/image
  // 2. Second div: contains the text content (eyebrow, h1, desc, CTA)
  const children = [...block.children];

  // Find the image div (first one with picture) and content div
  let imageDiv = null;
  let contentDiv = null;

  children.forEach((child) => {
    if (child.querySelector('picture') || child.querySelector('img')) {
      imageDiv = child;
    } else {
      contentDiv = child;
    }
  });

  // Wrap content in a card structure
  if (contentDiv) {
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('hero-content');
    const card = document.createElement('div');
    card.classList.add('hero-card');
    card.innerHTML = contentDiv.innerHTML;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(contentWrapper);
    contentWrapper.appendChild(card);
  }
}
