export const useBrowserLocale = () => {
  const currentLocale = ref("");

  const setLocale = () => {
    currentLocale.value = navigator.language;
  };

  const isEnUsLocale = computed(() => currentLocale.value === "en-US");

  onMounted(() => {
    setLocale();
    window.addEventListener("languagechange", setLocale);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("languagechange", setLocale);
  });

  return {
    isEnUsLocale,
  };
};
