import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import Style from "./Style";
import DocToolbar from "./DocToolbar";

const Viewer = ({ attributes, userData = {}, pluginUrl = "", postId = 0, id = "" }) => {
  const {
    documentSource = {},
    toolbar = {},
    securityRestrictions = {},
    downloadManagement = {},
  } = attributes;

  const { doc = "", viewer = "default", googleDrive = false } = documentSource;
  const { showName = false, download = false, _de_download_position = "toolbar" } = toolbar;
  const { disablePopout = false } = securityRestrictions;
  const {
    downloadButtonText = "Download",
    _de_download_behavior = "download",
    _de_download_filename = "",
    _de_download_show_count = false,
    _de_download_limit = 0,
    _de_download_access = "everyone",
    _de_download_access_roles = [],
    _de_download_access_message = "Access Denied",
  } = downloadManagement;

  const [downloadCount, setDownloadCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (userData.limitReached) {
      setLimitReached(true);
    }
    if (userData.downloadCount) {
      setDownloadCount(userData.downloadCount);
    }
  }, [userData]);

  const filename = doc ? doc.substring(doc.lastIndexOf("/") + 1) : "";

  const getFileExtension = (url) => {
    if (!url) return "";
    try {
      const cleanUrl = url.split(/[?#]/)[0];
      return cleanUrl.substring(cleanUrl.lastIndexOf(".") + 1).toLowerCase();
    } catch (e) {
      return "";
    }
  };

  const ext = getFileExtension(doc);
  let frameUrl = "";

  const isGoogleUrl = doc.includes("drive.google.com") || doc.includes("docs.google.com");

  if (doc.includes("dropbox.com")) {
    frameUrl = doc.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  } else if (isGoogleUrl) {
    frameUrl = doc.replace("/view", "/preview");
  } else if (googleDrive) {
    frameUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(doc)}`;
  } else if (ext === "pdf") {
    frameUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(doc)}`;
  } else if (["ppt", "pptx", "xls", "xlsx", "doc", "docx"].includes(ext)) {
    frameUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(doc)}`;
  } else {
    frameUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(doc)}`;
  }

  const isDownloadRestricted = () => {
    if (_de_download_access === "loggedin" && !userData.isLoggedIn) {
      return true;
    }
    if (_de_download_access === "roles") {
      if (!userData.isLoggedIn) return true;
      const allowedRoles = Array.isArray(_de_download_access_roles) ? _de_download_access_roles : [];
      const userRoles = Array.isArray(userData.userRoles) ? userData.userRoles : [];
      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
      return !hasAccess;
    }
    return false;
  };

  const trackDownload = (behavior, newTab) => {
    if (typeof window.bplde_obj === "undefined") {
      if (behavior === "newtab") {
        if (newTab) newTab.location.href = doc;
        else window.open(doc, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = doc;
        link.download = _de_download_filename || doc.substring(doc.lastIndexOf("/") + 1);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return;
    }

    const formData = new FormData();
    formData.append("action", "de_track_download");
    formData.append("nonce", window.bplde_obj.track_nonce);
    formData.append("document_id", postId);

    fetch(window.bplde_obj.ajax_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setDownloadCount(res.data.count);
          if (res.data.limit_reached || (res.data.count >= parseInt(_de_download_limit) && parseInt(_de_download_limit) > 0)) {
            setLimitReached(true);
          }
          const downloadUrl = `${window.bplde_obj.rest_url}download/${postId}?de_nonce=${res.data.nonce}&behavior=${encodeURIComponent(behavior)}&filename=${encodeURIComponent(_de_download_filename)}`;
          if (behavior === "newtab" && newTab) {
            newTab.location.href = downloadUrl;
          } else {
            window.location.href = downloadUrl;
          }
        } else {
          if (behavior === "newtab") {
            if (newTab) newTab.location.href = doc;
            else window.open(doc, "_blank");
          } else {
            const link = document.createElement("a");
            link.href = doc;
            link.download = _de_download_filename || doc.substring(doc.lastIndexOf("/") + 1);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      })
      .catch(() => {
        if (behavior === "newtab") {
          if (newTab) newTab.location.href = doc;
          else window.open(doc, "_blank");
        } else {
          const link = document.createElement("a");
          link.href = doc;
          link.download = _de_download_filename || doc.substring(doc.lastIndexOf("/") + 1);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    let newTab = null;
    if (_de_download_behavior === "newtab") {
      newTab = window.open("about:blank", "_blank");
    }
    trackDownload(_de_download_behavior, newTab);
  };


  const isRestricted = isDownloadRestricted();
  const toolbarPosition = _de_download_position || "toolbar";



  const renderPreviewContent = () => {
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
    const isVideo = ["mp4", "webm", "ogg"].includes(ext);

    if (doc.includes("dropbox.com")) {
      return (
        <a
          href={doc}
          className="dropbox-embed"
          data-height="100%"
          data-width="100%"
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      );
    }

    if (isGoogleUrl || googleDrive) {
      return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <iframe
            id={`frame-${id}`}
            height="100%"
            width="100%"
            src={frameUrl}
            frameBorder="0"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
          {disablePopout && (
            <div style={{ width: "80px", height: "80px", position: "absolute", opacity: 0, right: "0px", top: "0px", zIndex: 9999 }} />
          )}
        </div>
      );
    }

    // Standard Library file types
    if (isImage) {
      return (
        <img
          src={doc}
          alt={filename}
          className="bplDl-preview-image"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={doc}
          controls
          className="bplDl-preview-video"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      );
    }

    if (ext === "pdf") {
      return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <iframe
            src={frameUrl}
            frameBorder="0"
            className="bplDl-preview-iframe"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
          {disablePopout && (
            <div style={{ width: "70px", height: "70px", position: "absolute", opacity: 0, right: "5px", top: "0px", zIndex: 99999 }} />
          )}
        </div>
      );
    }

    if (["ppt", "pptx", "xls", "xlsx", "doc", "docx"].includes(ext)) {
      return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <iframe
            src={frameUrl}
            frameBorder="0"
            className="bplDl-preview-iframe"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
          {disablePopout && (
            <div style={{ width: "70px", height: "70px", position: "absolute", opacity: 0, right: "5px", top: "0px", zIndex: 99999 }} />
          )}
        </div>
      );
    }

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <p style={{ paddingLeft: "10px" }}>Preview not available for this file type.</p>
        {disablePopout && (
          <div style={{ width: "70px", height: "70px", position: "absolute", opacity: 0, right: "5px", top: "0px", zIndex: 99999 }} />
        )}
      </div>
    );
  };

  return (
    <>
      <Style attributes={attributes} id={id} uniqueId={id} />

      <div
        id={`ppv_frame_wrapper${id}`}
        className={`ppv_container ${id}`}
      >
        {doc === "" ? (
          <div style={{ padding: "20px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "4px" }}>
            <h2>
              Ooops... You forgot to Select a document. Please select a file or paste a external document link to show
              here.{" "}
            </h2>
          </div>
        ) : (
          <>
            {toolbarPosition === "toolbar" && (
              <DocToolbar
                filename={filename}
                showName={showName}
                download={download}
                position="toolbar"
                limitReached={limitReached}
                isRestricted={isRestricted}
                downloadAccessMessage={_de_download_access_message}
                downloadButtonText={downloadButtonText}
                downloadShowCount={_de_download_show_count}
                downloadCount={downloadCount}
                handleDownloadClick={handleDownloadClick}
                doc={doc}
                downloadFilename={_de_download_filename}
                behavior={_de_download_behavior}
              />
            )}

            {doc.includes("dropbox.com") ? (
              <div className="dropbox-preview" style={{ width: "inherit", height: "inherit", position: "relative" }}>
                {renderPreviewContent()}
              </div>
            ) : isGoogleUrl ? (
              <div className="drive-preview" style={{ width: "inherit", height: "inherit", position: "relative" }}>
                {renderPreviewContent()}
              </div>
            ) : (
              <div className="document-preview" style={{ height: "inherit", width: "inherit", position: "relative" }}>
                {renderPreviewContent()}
              </div>
            )}

            {toolbarPosition === "below" && (
              <DocToolbar
                filename={filename}
                showName={showName}
                download={download}
                position="below"
                limitReached={limitReached}
                isRestricted={isRestricted}
                downloadAccessMessage={_de_download_access_message}
                downloadButtonText={downloadButtonText}
                downloadShowCount={_de_download_show_count}
                downloadCount={downloadCount}
                handleDownloadClick={handleDownloadClick}
                doc={doc}
                downloadFilename={_de_download_filename}
                behavior={_de_download_behavior}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Viewer;
