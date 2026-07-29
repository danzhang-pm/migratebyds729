export default async function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 2) return;

  // Row 0: single cell with all impact card + stats content
  // Row 1: 2 cells for access card (image, content)

  const impactCell = rows[0].children[0];

  // Extract children from the impact cell
  const children = [...impactCell.children];

  // Children structure (flat list):
  // 0: <p>Our Impact</p>
  // 1: <h2>A healthy life...</h2>
  // 2: <p>We believe...</p>
  // 3: <p><strong><a>Learn more</a></strong></p> (CTA)
  // 4: <picture> spent-on-supplier
  // 5: <p>$64M</p>
  // 6: <p>Spent on learning...</p>
  // 7: <picture> patients-reached
  // 8: <p>2.5M+</p>
  // 9: <p>Patients screened...</p>
  // 10: <picture> greenhouse-gas
  // 11: <p>60%</p>
  // 12: <p>Reduction in GHG...</p>
  // 13: <p><strong><a>Impact Report FY25</a></strong></p>

  if (children.length < 14) return;

  // Build the impact card
  const impactCardDiv = document.createElement('div');
  impactCardDiv.classList.add('impact-grid-impact-card');

  const impactContent = document.createElement('div');
  // Our Impact (eyebrow)
  impactContent.appendChild(children[0].cloneNode(true));
  // Headline
  impactContent.appendChild(children[1].cloneNode(true));
  // Copy
  impactContent.appendChild(children[2].cloneNode(true));
  // CTA
  impactContent.appendChild(children[3].cloneNode(true));
  impactCardDiv.appendChild(impactContent);

  // Build stats grid
  const statsDiv = document.createElement('div');
  statsDiv.classList.add('impact-grid-stats');

  // Stat 1
  const stat1 = document.createElement('div');
  stat1.appendChild(children[4].cloneNode(true)); // icon
  stat1.appendChild(children[5].cloneNode(true)); // value
  stat1.appendChild(children[6].cloneNode(true)); // subtext
  statsDiv.appendChild(stat1);

  // Stat 2
  const stat2 = document.createElement('div');
  stat2.appendChild(children[7].cloneNode(true)); // icon
  stat2.appendChild(children[8].cloneNode(true)); // value
  stat2.appendChild(children[9].cloneNode(true)); // subtext
  statsDiv.appendChild(stat2);

  // Stat 3
  const stat3 = document.createElement('div');
  stat3.appendChild(children[10].cloneNode(true)); // icon
  stat3.appendChild(children[11].cloneNode(true)); // value
  stat3.appendChild(children[12].cloneNode(true)); // subtext
  stat3.appendChild(children[13].cloneNode(true)); // PDF link
  statsDiv.appendChild(stat3);

  // Left column
  const leftCol = document.createElement('div');
  leftCol.appendChild(impactCardDiv);
  leftCol.appendChild(statsDiv);

  // Right column - access card
  const rightCol = document.createElement('div');
  const accessCells = [...rows[1].children];
  accessCells.forEach((cell) => {
    rightCol.appendChild(cell.cloneNode(true));
  });

  // Build the container
  const container = document.createElement('div');
  container.appendChild(leftCol);
  container.appendChild(rightCol);

  block.innerHTML = '';
  block.appendChild(container);
}
