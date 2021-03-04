import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
            userId: null,
        });
    });
    it('should store token upon login', () => {
        expect(
            reducer(
                {
                    token: null,
                    error: null,
                    loading: false,
                    authRedirectPath: '/',
                    userId: null,
                },
                { type: actionTypes.AUTH_SUCCESS, idToken: 'idToken', userId: 'userId' }
            )
        ).toEqual({
            token: 'idToken',
            error: null,
            loading: false,
            authRedirectPath: '/',
            userId: 'userId',
        });
    });
});
