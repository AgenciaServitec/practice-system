import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const practicesStatus = {
  approved: {
    icon: faCheckCircle,
    color: "green",
    value: "Aprobado",
    type: "success",
  },
  refused: {
    icon: faXmarkCircle,
    color: "red",
    value: "Rechazado",
    type: "error",
  },
  pending: {
    icon: faClock,
    color: "orange",
    value: "Pendiente",
    type: "warning",
  },
};
