// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.textContent = isOpen ? '✕' : '☰';
  });
}

// Projects page filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      projectCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project Case Study Modal
const projectDetails = {
  sales: {
    title: 'Executive Sales & Revenue Intelligence Dashboard',
    category: 'BI & Dashboards',
    img: 'project-sales.png',
    summary: 'Built an end-to-end interactive Power BI dashboard consolidating multi-regional retail sales, profit margins, and YoY growth KPIs for executive leadership.',
    highlights: [
      'Automated weekly data refresh across 120K+ transaction records using Power Query & DAX.',
      'Identified underperforming product categories, unlocking an 18% margin improvement opportunity.',
      'Reduced manual monthly reporting time from 14 hours to under 20 minutes.'
    ],
    tools: ['Power BI', 'DAX', 'SQL', 'Excel']
  },
  churn: {
    title: 'Telecom Customer Churn Prediction & Risk Scoring',
    category: 'Python & ML',
    img: 'project-churn.png',
    summary: 'Analyzed customer demographics, billing behavior, and contract types to predict churn probability and prioritize retention outreach.',
    highlights: [
      'Cleaned and engineered 22 behavioral features in Python (Pandas, Scikit-Learn).',
      'Achieved 86% ROC-AUC using a tuned Gradient Boosting classifier with SHAP explainability.',
      'Highlighted month-to-month contracts as 3.8x more likely to churn, guiding targeted retention offers.'
    ],
    tools: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib']
  },
  supply: {
    title: 'Supply Chain Demand & Inventory Optimization',
    category: 'Python & ML',
    img: 'project-supply.png',
    summary: 'Forecasted seasonal SKU demand and recalibrated safety stock thresholds to balance stockout risk against warehouse holding costs.',
    highlights: [
      'Applied time-series decomposition and exponential smoothing across 450+ SKUs.',
      'Projected a 22% reduction in stockout events during peak promotional quarters.',
      'Delivered an interactive reorder-point tracker for operations planners.'
    ],
    tools: ['Python', 'Statsmodels', 'Excel', 'Tableau']
  },
  cohort: {
    title: 'E-Commerce SQL Cohort & Retention Analysis',
    category: 'SQL & Analytics',
    img: 'project-cohort.png',
    summary: 'Authored complex SQL window functions and CTE pipelines to measure customer lifetime value (CLV), repeat purchase velocity, and quarterly retention.',
    highlights: [
      'Processed 500K+ e-commerce order rows in PostgreSQL using optimized CTEs and indexing.',
      'Uncovered a 13-percentage-point Month-1 retention lift following onboarding email redesign.',
      'Segmented top 15% high-LTV buyers using RFM (Recency, Frequency, Monetary) scoring.'
    ],
    tools: ['PostgreSQL', 'SQL', 'RFM Modeling', 'Tableau']
  },
  health: {
    title: 'Hospital Operations & Wait-Time Analytics',
    category: 'BI & Dashboards',
    img: 'project-health.png',
    summary: 'Evaluated outpatient appointment logs and triage bottlenecks across five hospital departments to optimize shift scheduling and patient throughput.',
    highlights: [
      'Analyzed 85K+ patient visit timestamps to isolate peak congestion hours by department.',
      'Recommended staggered shift coverage that modeled a 38% drop in average ER wait times.',
      'Built an executive Tableau scorecard tracking bed utilization and SLA compliance.'
    ],
    tools: ['Tableau', 'SQL', 'Excel', 'Statistics']
  },
  finance: {
    title: 'Quarterly Financial KPI & Expense Variance Tracker',
    category: 'SQL & Analytics',
    img: 'project-finance.png',
    summary: 'Designed an automated budget-vs-actual variance reporting suite to monitor departmental spend, cloud infrastructure costs, and quarterly forecast accuracy.',
    highlights: [
      'Standardized GL expense feeds from 5 cost centers into a single clean analytical model.',
      'Flagged 9% recurring SaaS & cloud spend anomalies for immediate cost optimization.',
      'Enabled one-click drill-downs from executive summary to vendor-level invoices.'
    ],
    tools: ['Excel', 'Power Query', 'SQL', 'Power BI']
  }
};

const modalBackdrop = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data || !modalBackdrop) return;
  document.getElementById('modalImg').src = data.img;
  document.getElementById('modalImg').alt = data.title;
  document.getElementById('modalCategory').textContent = data.category;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSummary').textContent = data.summary;

  const listEl = document.getElementById('modalHighlights');
  listEl.innerHTML = data.highlights.map((h) => `<li>${h}</li>`).join('');

  const toolsEl = document.getElementById('modalTools');
  toolsEl.innerHTML = data.tools.map((t) => `<span class="tag-light">${t}</span>`).join('');

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach((btn) => {
  btn.addEventListener('click', () => openProjectModal(btn.dataset.project));
});

if (modalClose) {
  modalClose.addEventListener('click', closeProjectModal);
}
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeProjectModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});
