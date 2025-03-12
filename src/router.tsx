import React from 'react';
import Navigo from 'navigo';
import Home from './pages/Home';
import { createRoot } from 'react-dom/client';
import BankAccounts from './pages/BankAccounts';
import IDs from './pages/IDs';
import Shelters from './pages/Shelters';
import Resources from './pages/Resources';

// Create router instance
const router = new Navigo('/');

export function initRouter() {
  const mainElement = document.getElementById('main');
  
  if (!mainElement) {
    console.error('Main element not found');
    return;
  }
  
  // Define routes
  router
    .on('/', () => {
      mainElement.innerHTML = '';
      createRoot(mainElement).render(<Home />);
    })
    .on('/about', () => {
      mainElement.innerHTML = '<div class="container-custom py-8"><h1 class="page-title">About Us</h1><p>Information about Leonard\'s Light will go here.</p></div>';
    })
    .on('/resources', () => {
      mainElement.innerHTML = '';
      createRoot(mainElement).render(<Resources />);
    })
    .on('/summaries', () => {
      mainElement.innerHTML = '<div class="container-custom py-8"><h1 class="page-title">Yearly and Monthly Summaries</h1><p>Summary listings will go here.</p></div>';
    })
    .on('/bank-accounts', () => {
      mainElement.innerHTML = '';
      createRoot(mainElement).render(<BankAccounts />);
    })
    .on('/ids', () => {
      mainElement.innerHTML = '';
      createRoot(mainElement).render(<IDs />);
    })
    .on('/shelters', () => {
      mainElement.innerHTML = '';
      createRoot(mainElement).render(<Shelters />);
    })
    .notFound(() => {
      mainElement.innerHTML = '<div class="container-custom py-8 text-center"><h1 class="page-title">Page Not Found</h1><p>The page you are looking for doesn\'t exist.</p><a href="/" class="btn mt-4">Go Home</a></div>';
    });

  // Initialize the router
  router.resolve();
}

export function navigateTo(path: string) {
  router.navigate(path);
}
