import { Provider } from "react-redux";
import { store } from "../app/store";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/custom.css";

import { Provider as AuthProvider } from "next-auth/client";
import { ToastContainer } from "react-toastify";

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider session={pageProps.session}>
            {/* Gives the session's info to the components via a Provider */}
            <Provider store={store}>
                <Component {...pageProps} />
                <ToastContainer />
            </Provider>
        </AuthProvider>
    );
};

export default MyApp;
