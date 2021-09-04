import { resetKeywordDatabase } from './KeywordDatabase';
import { resetKeywordReverse } from './KeywordReverse';

export const resetKeywordResearch = () => async (dispatch: any) => {
  // reset keyword database
  dispatch(resetKeywordDatabase());

  // reset keyword reverse
  dispatch(resetKeywordReverse());
};
