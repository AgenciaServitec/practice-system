import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const practicesStatus = {
  pending: {
    icon: faClock,
    color: "orange",
    value: "Pendiente",
  },
  approved: {
    icon: faCheckCircle,
    color: "green",
    value: "Aprobado",
  },
  refused: {
    icon: faXmarkCircle,
    color: "red",
    value: "Rechazado",
  },
};
