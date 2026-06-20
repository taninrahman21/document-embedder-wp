import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PremiumPanel, PremiumBadge } from "../../../../../../bpl-tools/ProControls";

const SecurityRestriction = () => {
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{__("Security & Restrictions", "document-emberdder")}</span>
          <PremiumBadge />
        </div>
      }
      initialOpen={false}
    >
      <PremiumPanel
        title={__("Security & Restrictions", "document-emberdder")}
        description={__("Protect your files by disabling the popout option to prevent direct file theft and enable a professional loading icon.", "document-emberdder")}
        pricingUrl={pricingUrl}
      />
    </PanelBody>
  );
};

export default SecurityRestriction;
