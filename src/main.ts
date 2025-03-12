import './style.css';
import { initRouter } from './router';
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';

// Initialize the main application components
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initRouter();
});
