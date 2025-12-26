declare module 'react-facebook-login/dist/facebook-login-render-props' {
    import { Component } from 'react';

    export interface ReactFacebookLoginInfo {
        id?: string;
        accessToken?: string;
        name?: string;
        email?: string;
        picture?: {
            data: {
                is_silhouette?: boolean;
                url?: string;
            };
        };
    }

    export interface ReactFacebookLoginProps {
        appId: string;
        callback(userInfo: ReactFacebookLoginInfo): void;
        onFailure?(response: any): void;
        autoLoad?: boolean;
        fields?: string;
        scope?: string;
        size?: 'small' | 'medium' | 'metro';
        textButton?: string;
        typeButton?: string;
        icon?: any;
        language?: string;
        onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
        reAuthenticate?: boolean;
        redirectUri?: string;
        state?: string;
        xfbml?: boolean;
        cookie?: boolean;
        authType?: string;
        disableMobileRedirect?: boolean;
        isMobile?: boolean;
        returnScopes?: boolean;
        render(props: {
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
            isDisabled: boolean;
            isProcessing: boolean;
            isSdkLoaded: boolean;
        }): React.ReactNode;
    }

    export default class FacebookLogin extends Component<ReactFacebookLoginProps> { }
}
