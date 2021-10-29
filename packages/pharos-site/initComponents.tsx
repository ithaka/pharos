(async () => {
  const pharos = typeof window !== `undefined` ? await import('@ithaka/pharos') : null;

  if (pharos) {
    customElements.define('pharos-alert', pharos.PharosAlert);
    customElements.define('pharos-breadcrumb', pharos.PharosBreadcrumb);
    customElements.define('pharos-breadcrumb-item', pharos.PharosBreadcrumbItem);
    customElements.define('pharos-button', pharos.PharosButton);
    customElements.define('pharos-checkbox', pharos.PharosCheckbox);
    customElements.define('pharos-checkbox-group', pharos.PharosCheckboxGroup);
    customElements.define('pharos-combobox', pharos.PharosCombobox);
    customElements.define('pharos-dropdown-menu', pharos.PharosDropdownMenu);
    customElements.define('pharos-dropdown-menu-item', pharos.PharosDropdownMenuItem);
    customElements.define('pharos-dropdown-menu-nav', pharos.PharosDropdownMenuNav);
    customElements.define('pharos-dropdown-menu-nav-link', pharos.PharosDropdownMenuNavLink);
    customElements.define('pharos-footer', pharos.PharosFooter);
    customElements.define('pharos-header', pharos.PharosHeader);
    customElements.define('pharos-heading', pharos.PharosHeading);
    customElements.define('pharos-icon', pharos.PharosIcon);
    customElements.define('pharos-image-card', pharos.PharosImageCard);
    customElements.define('pharos-input-group', pharos.PharosInputGroup);
    customElements.define('pharos-input-group-select', pharos.PharosInputGroupSelect);
    customElements.define('pharos-layout', pharos.PharosLayout);
    customElements.define('pharos-link', pharos.PharosLink);
    customElements.define('pharos-loading-spinner', pharos.PharosLoadingSpinner);
    customElements.define('pharos-modal', pharos.PharosModal);
    customElements.define('pharos-pagination', pharos.PharosPagination);
    customElements.define('pharos-progress-bar', pharos.PharosProgressBar);
    customElements.define('pharos-radio-button', pharos.PharosRadioButton);
    customElements.define('pharos-radio-group', pharos.PharosRadioGroup);
    customElements.define('pharos-select', pharos.PharosSelect);
    customElements.define('pharos-sidenav', pharos.PharosSidenav);
    customElements.define('pharos-sidenav-button', pharos.PharosSidenavButton);
    customElements.define('pharos-sidenav-link', pharos.PharosSidenavLink);
    customElements.define('pharos-sidenav-menu', pharos.PharosSidenavMenu);
    customElements.define('pharos-sidenav-section', pharos.PharosSidenavSection);
    customElements.define('pharos-tabs', pharos.PharosTabs);
    customElements.define('pharos-tab', pharos.PharosTab);
    customElements.define('pharos-tab-panel', pharos.PharosTabPanel);
    customElements.define('pharos-text-input', pharos.PharosTextInput);
    customElements.define('pharos-textarea', pharos.PharosTextarea);
    customElements.define('pharos-toast', pharos.PharosToast);
    customElements.define('pharos-toaster', pharos.PharosToaster);
    customElements.define('pharos-toast-button', pharos.PharosToastButton);
    customElements.define('pharos-toggle-button', pharos.PharosToggleButton);
    customElements.define('pharos-toggle-button-group', pharos.PharosToggleButtonGroup);
    customElements.define('pharos-tooltip', pharos.PharosTooltip);
  }
})();
