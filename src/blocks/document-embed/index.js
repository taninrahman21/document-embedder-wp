import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import metadata from "./block.json";
import "./editor.scss";

const iconUrl = "https://ps.w.org/document-emberdder/assets/icon-128x128.png";

const blockIcon = (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <image href={iconUrl} x="0" y="0" height="128" width="128" />
  </svg>
);

registerBlockType(metadata, {
  icon: blockIcon,
  edit: Edit,
  save: () => null,
});
