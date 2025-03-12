import { navigateTo } from '../router';

export function renderHeader() {
  const headerElement = document.getElementById('header');
  
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }
  
  headerElement.innerHTML = `
    <div class="bg-secondary text-white shadow-md">
      <div class="container-custom py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          <h1 class="text-2xl font-bold font-serif">Leonard's Light</h1>
        </div>
        <nav>
          <ul class="flex gap-6">
            <li><a href="/" class="hover:text-primary transition-colors" data-navigo>Home</a></li>
            <li><a href="/about" class="hover:text-primary transition-colors" data-navigo>About</a></li>
            <li><a href="/resources" class="hover:text-primary transition-colors" data-navigo>Resources</a></li>
            <li><a href="/summaries" class="hover:text-primary transition-colors" data-navigo>Summaries</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `;
  
  // Add event listeners to prevent default navigation
  headerElement.querySelectorAll('a[data-navigo]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).getAttribute('href') || '/');
    });
  });
}
