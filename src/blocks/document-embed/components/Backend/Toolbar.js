import { PanelBody, ToggleControl, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Notice } from "../../../../../../bpl-tools/Components";

const Toolbar = ({ attributes, setAttributes }) => {
  const { toolbar } = attributes;
  const { showName, download, _de_download_position } = toolbar;

  const updateToolbar = (key, value) => {
    setAttributes({
      toolbar: {
        ...toolbar,
        [key]: value,
      },
    });
  };

  return (
    <PanelBody
      className="bPlPanelBody"
      title = {
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
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          <span>{__("Toolbar", "document-emberdder")}</span>
        </div>
      }
      initialOpen={false}
    >
      <ToggleControl
        className="mt10"
        label={__("Display File Name", "document-emberdder")}
        checked={showName}
        onChange={(val) => updateToolbar("showName", val)}
        help={__("Enable to display the document name. Not available for Google Drive and Dropbox.", "document-emberdder")}
      />

      <ToggleControl
        className="mt10"
        label={__("Enable Download Button", "document-emberdder")}
        checked={download}
        onChange={(val) => updateToolbar("download", val)}
        help={__("Enable to show a download button for the document. Not available for Google Drive and Dropbox.", "document-emberdder")}
      />

      {(download || showName) && (
        <SelectControl
          className="mt10"
          label={__("Toolbar Position", "document-emberdder")}
          value={_de_download_position}
          options={[
            { label: __("Toolbar (Default)", "document-emberdder"), value: "toolbar" },
            { label: __("Below Embed", "document-emberdder"), value: "below" },
          ]}
          onChange={(val) => updateToolbar("_de_download_position", val)}
        />
      )}

      <Notice status="info" isIcon={true} className="mt10">
        {__("Toolbar themes (Dark, Light, Custom) and custom colors are available in the Premium version.", "document-emberdder")}
      </Notice>
    </PanelBody>
  );
};

export default Toolbar;
