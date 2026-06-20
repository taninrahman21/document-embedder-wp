// eslint-disable-next-line no-unused-vars
import { createRoot } from "react-dom";

import Viewer from "./components/Common/Viewer";
import "./style.scss";

const init = (container = document) => {
  const blocks = container.querySelectorAll(".bplde-document-embed-frontend");

  blocks.forEach((block) => {
    if (block.hasAttribute('data-bplde-initialized')) {
       return;
    }

    let attributesData = block.dataset.attributes;
    if (!attributesData) {
        const attrEl = block.querySelector("[data-attributes]");
        if (attrEl) attributesData = attrEl.dataset.attributes;
    }

    if (!attributesData) {
        return;
    }

    block.setAttribute('data-bplde-initialized', 'true');

    try {
        const attributes = JSON.parse(attributesData);
        
        let userData = {};
        if (block.dataset.user) {
            userData = JSON.parse(block.dataset.user);
        }
        
        const pluginUrl = block.dataset.pluginUrl || "";
        const postId = parseInt(block.dataset.postId || 0, 10);
        
        const root = createRoot(block);
        root.render(
          <Viewer 
            attributes={attributes} 
            userData={userData} 
            pluginUrl={pluginUrl}
            postId={postId}
            id={block.id} 
          />
        );
    } catch (e) {
        console.error("Failed to initialize Document Embed block:", e);
    }
  });
};

// Start initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});

// Elementor Support
const runElementor = () => {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
        window.elementorFrontend.hooks.addAction('frontend/element_ready/global', ($scope) => {
            init($scope[0]);
        });
        return true;
    }
    return false;
};

// Robust Elementor hook registration
let elementorRetryCount = 0;
const setupElementor = () => {
    if (runElementor()) return;
    
    if (elementorRetryCount < 20) { // Retry for 10 seconds
        elementorRetryCount++;
        setTimeout(setupElementor, 500);
    }
};

setupElementor();

if (typeof jQuery !== 'undefined') {
    jQuery(window).on('elementor/frontend/init', runElementor);
}
