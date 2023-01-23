const pharos = typeof window !== `undefined` ? require('@ithaka/pharos') : null;
const registerComponents =
  typeof window !== `undefined` ? require('@ithaka/pharos/lib/utils/registerComponents') : null;

if (typeof window !== `undefined`) {
  registerComponents.default('site', [
    pharos.PharosAlert,
    pharos.PharosBreadcrumb,
    pharos.PharosBreadcrumbItem,
    pharos.PharosButton,
    pharos.PharosCheckbox,
    pharos.PharosCheckboxGroup,
    pharos.PharosCombobox,
    pharos.PharosDropdownMenu,
    pharos.PharosDropdownMenuItem,
    pharos.PharosDropdownMenuNav,
    pharos.PharosDropdownMenuNavLink,
    pharos.PharosFooter,
    pharos.PharosHeader,
    pharos.PharosHeading,
    pharos.PharosIcon,
    pharos.PharosImageCard,
    pharos.PharosInputGroup,
    pharos.PharosInputGroupSelect,
    pharos.PharosLayout,
    pharos.PharosLink,
    pharos.PharosLoadingSpinner,
    pharos.PharosModal,
    pharos.PharosPagination,
    pharos.PharosProgressBar,
    pharos.PharosRadioButton,
    pharos.PharosRadioGroup,
    pharos.PharosSelect,
    pharos.PharosSidenav,
    pharos.PharosSidenavLink,
    pharos.PharosSidenavMenu,
    pharos.PharosSidenavSection,
    pharos.PharosTabs,
    pharos.PharosTab,
    pharos.PharosTabPanel,
    pharos.PharosTextInput,
    pharos.PharosTextarea,
    pharos.PharosToast,
    pharos.PharosToaster,
    pharos.PharosToastButton,
    pharos.PharosToggleButton,
    pharos.PharosToggleButtonGroup,
    pharos.PharosTooltip,
  ]);
}
