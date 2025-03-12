export function renderFooter() {
  const footerElement = document.getElementById('footer');
  
  if (!footerElement) {
    console.error('Footer element not found');
    return;
  }
  
  const currentYear = new Date().getFullYear();
  
  footerElement.innerHTML = `
    <div class="bg-secondary text-white py-6">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-3">Leonard's Light</h3>
            <p class="text-sm text-gray-300">Guiding and supporting individuals seeking a new path since 2023.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-3">Quick Links</h3>
            <ul class="text-sm space-y-2">
              <li><a href="/" class="hover:text-primary transition-colors" data-navigo>Home</a></li>
              <li><a href="/about" class="hover:text-primary transition-colors" data-navigo>About Us</a></li>
              <li><a href="/resources" class="hover:text-primary transition-colors" data-navigo>Resources</a></li>
              <li><a href="/summaries" class="hover:text-primary transition-colors" data-navigo>Summaries</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-3">Contact Info</h3>
            <address class="text-sm text-gray-300 not-italic">
              123 Bright Street<br>
              Luminous City, LC 12345<br>
              contact@leonardslight.com<br>
              (555) 123-4567
            </address>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          &copy; ${currentYear} Leonard's Light. All rights reserved.
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners to prevent default navigation
  footerElement.querySelectorAll('a[data-navigo]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (e.target as HTMLAnchorElement).getAttribute('href') || '/';
      window.history.pushState({}, '', href);
      
      // Manually dispatch the popstate event to trigger the router
      const popStateEvent = new PopStateEvent('popstate', {});
      dispatchEvent(popStateEvent);
    });
  });
}
