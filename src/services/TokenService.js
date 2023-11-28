import { jwtDecode } from "jwt-decode";


export const userData = {
    accessToken: undefined,
    claims: undefined
}

const TokenService = {
    getAccessToken: () => userData.accessToken,
    getClaims: () => {
        if (!userData.claims) {
            return undefined;
        }
        return userData.claims;
    },
    setAccessToken: (token) => {
        userData.accessToken = token;
        const claims = jwtDecode(token);
        userData.claims = claims;
        return claims;
    }
    // ,
    // clear: () => {
    //     userData.accessToken = undefined;
    //     userData.claims = undefined;
    // }
}

export default TokenService;