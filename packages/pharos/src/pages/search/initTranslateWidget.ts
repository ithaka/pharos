const initTranslateWidget = (): void => {
  const scriptId = 'google-translate-script';
  const prevScript = document.head.querySelector(`#${scriptId}`);
  prevScript && document.head.removeChild(prevScript);

  const script = document.createElement('script');
  script.async = true;
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.id = scriptId;
  document.head.appendChild(script);
};

export default initTranslateWidget;
