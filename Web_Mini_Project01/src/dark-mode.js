
(function() {
  const html = document.documentElement;
  
  // Get the saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Determine initial theme
  let initialTheme = savedTheme;
  if (!initialTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    initialTheme = prefersDark ? 'dark' : 'light';
  }
  
  // Apply theme without transition on page load
  function applyTheme(theme, isInitial = false) {
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateIcons();
  }
  
  // Update moon/sun icons visibility
  function updateIcons() {
    const isDark = html.classList.contains('dark');
    
    document.querySelectorAll('.theme-icon-moon').forEach(icon => {
      icon.style.display = isDark ? 'none' : 'block';
    });
    
    document.querySelectorAll('.theme-icon-sun').forEach(icon => {
      icon.style.display = isDark ? 'block' : 'none';
    });
  }
  
  // Toggle theme
  function toggleTheme() {
    const isDark = html.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  }
  
  // Initialize theme on page load
  function initTheme() {
    // Apply initial theme
    applyTheme(initialTheme, true);
    
    // Find and attach click listeners to all theme toggle buttons
    setTimeout(() => {
      const buttons = document.querySelectorAll('button[aria-label]');
      let foundButton = false;
      
      buttons.forEach(btn => {
        const label = btn.getAttribute('aria-label');
        const hasMoonIcon = btn.querySelector('[data-lucide="moon"]');
        
        if (hasMoonIcon || label.includes('បិទបើក') || label.includes('theme')) {
          btn.addEventListener('click', toggleTheme);
          foundButton = true;
        }
      });
    }, 100);
  }
  
  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // Listen for storage changes (sync across tabs)
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue) {
      applyTheme(e.newValue);
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
