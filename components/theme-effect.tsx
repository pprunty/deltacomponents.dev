export const themeEffect = function () {
  // `null` preference implies system (auto)
  const pref = localStorage.getItem('theme');

  if (null === pref) {
    document.documentElement.classList.add('theme-system');
  } else {
    document.documentElement.classList.remove('theme-system');
  }

  if (
    pref === 'dark' ||
    (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.add('dark');
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#0a0a0a');

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'dark';
  } else {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.remove('dark');
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#f3f2eb');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'light';
  }
};
