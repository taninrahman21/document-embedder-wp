import React from "react";

const DocToolbar = ({
  filename,
  showName,
  download,
  position = "toolbar",
  limitReached,
  isRestricted,
  downloadAccessMessage = "Access Denied",
  downloadButtonText = "Download",
  downloadShowCount,
  downloadCount,
  handleDownloadClick,
  doc,
  downloadFilename,
  behavior = "download",
  theme = "dark",
}) => {
  if (!showName && !download) return null;

  const renderDownloadButton = () => {
    if (limitReached) {
      return (
        <button
          disabled
          style={{
            background: "transparent",
            padding: "4px 10px",
            borderRadius: "4px",
            border: "1px solid #ff4d4d",
            color: "#ff4d4d",
            cursor: "not-allowed",
          }}
          title="Download limit reached for your IP."
        >
          Limit Reached
        </button>
      );
    }

    if (isRestricted) {
      return (
        <span className="de-access-denied-msg">
          {downloadAccessMessage}
        </span>
      );
    }

    const btnLabel = downloadButtonText || "Download";
    const downloadCountHtml = downloadShowCount ? (
      <span
        className="ppv-download-count"
        style={{
          marginLeft: "8px",
          fontSize: "12px",
          color: "#999",
          fontWeight: "500",
        }}
      >
        ({downloadCount} {downloadCount === 1 ? "download" : "downloads"})
      </span>
    ) : null;

    const dlAttr = downloadFilename ? downloadFilename : true;
    const isNewTab = behavior === "newtab";

    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <a
          className="s_pdf_download_link"
          style={{ display: "flex", textDecoration: "none" }}
          href={doc}
          target={isNewTab ? "_blank" : undefined}
          rel={isNewTab ? "noopener noreferrer" : undefined}
          download={isNewTab ? undefined : dlAttr}
        >
          <button
            style={{
              background: "transparent",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid #cececf",
              color: "#cececf",
              cursor: "pointer",
              fontSize: "12px",
            }}
            className="ppv_download_bttn"
            onClick={handleDownloadClick}
          >
            {btnLabel}
          </button>
        </a>
        {downloadCountHtml}
      </div>
    );
  };

  const justify = !showName ? "flex-end" : "space-between";

  if (position === "lightbox" || position === "toolbar") {
    return (
      <div className={`ppv-toolbar ${theme}`} style={{ display: "flex", justifyContent: justify }}>
        {showName && <span className="ppv-filename">{filename}</span>}
        {download && (
          <div className="ppv-toolbar-right">
            {renderDownloadButton()}
          </div>
        )}
      </div>
    );
  }

  if (position === "below") {
    return (
      <div className={`ppv-toolbar ${theme}`} style={{ display: "flex", justifyContent: justify, marginTop: 0 }}>
        {showName && <span className="ppv-filename">{filename}</span>}
        {download && (
          <div className="ppv-toolbar-right">
            {renderDownloadButton()}
          </div>
        )}
      </div>
    );
  }

  if (position === "above") {
    return (
      <div style={{ marginBottom: "10px" }}>
        {showName && <p style={{ paddingLeft: "10px", margin: "0 0 10px 0" }}>{filename}</p>}
        {download && (
          <div style={{ marginBottom: "10px" }}>
            {renderDownloadButton()}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default DocToolbar;
