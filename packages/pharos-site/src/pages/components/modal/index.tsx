export { default as default } from '@guidelines/modal.docs.tsx';
import { PharosHeading } from '@ithaka/pharos/lib/react-components';
<>
  <PharosHeading level={2} preset="5">
    Examples
  </PharosHeading>

  {/* ```jsx live
  <>
    <PharosButton
      onClick={(e) => {
        e.target.focus();
        const modal = document.querySelector('[data-pharos-component="PharosModal"]');
        modal.open = true;
      }}
    >
      Open modal
    </PharosButton>
    <PharosModal header="Pharos modal" footer-divider>
      <p>I am a modal</p>
      <PharosButton slot="footer" type="button" variant="secondary" data-modal-close>
        Cancel
      </PharosButton>
      <PharosButton
        slot="footer"
        type="button"
        onClick={(e) => {
          const modal = document.querySelector('[data-pharos-component="PharosModal"]');
          modal.open = false;
        }}
      >
        Ok
      </PharosButton>
    </PharosModal>
  </>
  ``` */}
</>;
