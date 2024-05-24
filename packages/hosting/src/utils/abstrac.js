export const getAcademicYearBySemester = (semester) => {
  if (["I", "II", "III"].includes(semester)) {
    return "I";
  }

  return "II";
};
