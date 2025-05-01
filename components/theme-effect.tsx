export const themeEffect = function () {
  // `null` preference implies system (auto)
  const pref = localStorage.getItem('theme');

  if (null === pref) {
    document.documentElement.classList.add('theme-system');
  } else {
    document.documentElement.classList.remove('theme-system');
  }

  const updateMetaThemeColor = (color: string) => {
    // Find all theme-color meta tags and update them
    const metaTags = document.head.querySelectorAll('meta[name=theme-color]');
    
    if (metaTags.length > 0) {
      metaTags.forEach(tag => tag.setAttribute('content', color));
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  };

  if (
    pref === 'dark' ||
    (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.add('dark');
    updateMetaThemeColor('#111111');

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'dark';
  } else {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.remove('dark');
    updateMetaThemeColor('#ffffff');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'light';
  }
};
