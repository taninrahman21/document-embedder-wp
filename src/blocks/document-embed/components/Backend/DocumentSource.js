import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InlineMediaUpload, Notice } from "../../../../../../bpl-tools/Components";
import { isPDF } from "../../utils";

const DocumentSource = ({ attributes, setAttributes }) => {
  const { documentSource } = attributes;
  const { doc } = documentSource;

  const updateSource = (key, value) => {
    setAttributes({
      documentSource: {
        ...documentSource,
        [key]: value,
      },
    });
  };

  const showViewerOption = isPDF(doc);

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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>{__("Document Source", "document-emberdder")}</span>
        </div>
      }
      initialOpen={true}
    >
      <InlineMediaUpload
        className="mt10"
        label={__("Document File", "document-emberdder")}
        value={doc}
        types={[
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ]}
        onChange={(media) => {
          const url = media?.url || media || "";
          const id = media?.id || 0;
          setAttributes({
            docId: id,
            documentSource: {
              ...documentSource,
              doc: url,
            },
          });
        }}
        placeholder={__("Enter URL or upload file", "document-emberdder")}
      />

      <Notice status="info" isIcon={true} className="mt10">
        {__("Embedding files from Google Drive or Dropbox is available in the Premium version.", "document-emberdder")}
      </Notice>

      {showViewerOption && (
        <div className="mt10">
          <Notice status="info" isIcon={true}>
            {__("Custom PDF viewer engine option is available in the Premium version.", "document-emberdder")}
          </Notice>
        </div>
      )}
    </PanelBody>
  );
};

export default DocumentSource;
