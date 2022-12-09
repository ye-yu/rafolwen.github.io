import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faFolderOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
library.add(faAddressCard, faFolderOpen, faEnvelope, faUser, faLinkedin);

export const IconName: Record<string, FontAwesomeIconProps["icon"]> = {
  addressCard: "address-card",
  folderOpen: "folder-open",
  envelope: "envelope",
  linked: ["fab", "linkedin"],
  project: "diagram-project",
  user: "user",
};
