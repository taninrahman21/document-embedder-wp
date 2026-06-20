import { InspectorControls } from "@wordpress/block-editor";
import { Panel } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ProModal, AdvertiseCard } from "../../../../../../bpl-tools/ProControls";
import DocumentSource from "./DocumentSource";
import Toolbar from "./Toolbar";
import DisplayDimension from "./DisplayDimension";
import SecurityRestriction from "./SecurityRestriction";
import DownloadManagement from "./DownloadManagement";
import Lightbox from "./Lightbox";

const Settings = ({ attributes, setAttributes }) => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  console.log(isProModalOpen)
  return (
    <>
      <InspectorControls> 
        <Panel>
          <DocumentSource
            attributes={attributes}
            setAttributes={setAttributes}
            setIsProModalOpen={setIsProModalOpen}
          />
          <Toolbar attributes={attributes} setAttributes={setAttributes}
            setIsProModalOpen={setIsProModalOpen}/>
          <DisplayDimension attributes={attributes} setAttributes={setAttributes} />
          <SecurityRestriction attributes={attributes} setAttributes={setAttributes} setIsProModalOpen={setIsProModalOpen} />
          <Lightbox attributes={attributes} setAttributes={setAttributes} setIsProModalOpen={setIsProModalOpen} />
          <DownloadManagement attributes={attributes} setAttributes={setAttributes} setIsProModalOpen={setIsProModalOpen} /> 
          <AdvertiseCard planLink="/wp-admin/edit.php?post_type=ppt_viewer&page=bplde-dashboard#/pricing" />
        </Panel>

      </InspectorControls>

        <ProModal
          isProModalOpen={isProModalOpen}
          setIsProModalOpen={setIsProModalOpen}
          link="/wp-admin/edit.php?post_type=ppt_viewer&page=bplde-dashboard#/pricing"
          title={__("Unlock Custom PDF Viewer & More with PRO!")}
          description={__("Upgrade to Document Embedder PRO to unlock the advanced Custom PDF viewer engine, allowing you to theme the toolbar and personalize the user experience.")}
          features={[
            __("Advanced Custom PDF Viewer Engine"),
            __("Custom Toolbar Themes & Color Customizer"),
            __("Download access control & restrictions"),
            __("Secure email gate for PDF downloads"),
            __("Premium customer support"),
            __("Fluid & fast document rendering")
          ]}
        />
      
    </>
  );
};

export default Settings;
