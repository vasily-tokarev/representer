import { fromJS } from 'immutable';
import { selectHomePageDomain } from '../selectors';

describe('selectHomePageDomain', () => {
  it('should select the home state', () => {
    const homeState = fromJS(
      {
        posts: [],
      },
    );
    const mockedState = fromJS({
      homePage: homeState,
    });
    expect(selectHomePageDomain(mockedState)).toEqual(homeState);
  });
});

