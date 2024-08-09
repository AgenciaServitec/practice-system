import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const practicesStatus = {
  approved: {
    icon: faCheckCircle,
    color: "green",
    name: "Aprobado",
    value: "approved",
    type: "success",
  },
  refused: {
    icon: faXmarkCircle,
    color: "red",
    value: "refused",
    type: "error",
  },
  pending: {
    icon: faClock,
    color: "orange",
    name: "Pendiente",
    value: "pending",
    type: "warning",
  },
};
