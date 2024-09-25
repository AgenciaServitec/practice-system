import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiPracticeReviewResubmissionPost = () => {
  const { post, loading, response } = useApi(`/practice-review-resubmission`);

  const postPracticeReviewResubmission = useCallback(
    async (practiceId) => {
      return post(practiceId);
    },
    [post]
  );

  return {
    postPracticeReviewResubmission,
    postPracticeReviewResubmissionLoading: loading,
    postPracticeReviewResubmissionResponse: response,
  };
};
