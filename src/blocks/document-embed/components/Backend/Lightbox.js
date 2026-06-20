import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PremiumPanel, PremiumBadge } from "../../../../../../bpl-tools/ProControls";

const Lightbox = () => {
  const pricingUrl = "/wp-admin/edit.php?post_type=ppt_viewer&page=bplde-dashboard#/pricing";

  return (
    <PanelBody
      className="bPlPanelBody"
      title={
        <div className="bplde-panel-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="#3858E9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <rect x="8" y="8" width="13" height="13" rx="2" ry="2" />
            <path d="M16 8V5a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
          </svg>
          <span>{__("Modal Pop Up (Lightbox)", "document-emberdder")}</span>
          <PremiumBadge />
        </div>
      }
      initialOpen={false}
    >
      <PremiumPanel
        title={__("Modal Pop Up (Lightbox)", "document-emberdder")}
        description={__("Display the document in a beautiful modal popup (lightbox) when a button is clicked instead of embedding it directly on the page.", "document-emberdder")}
        pricingUrl={pricingUrl}
      />
    </PanelBody>
  );
};

export default Lightbox;
