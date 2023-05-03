import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster } from "src/components/toaster";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import { SessionProvider } from "next-auth/react";
// Remove if react-quill is not used
import "react-quill/dist/quill.snow.css";
// Remove if react-draft-wysiwyg is not used
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Remove if simplebar is not used
import "simplebar-react/dist/simplebar.min.css";
// Remove if mapbox is not used
import "mapbox-gl/dist/mapbox-gl.css";
// Remove if locales are not used
import { Provider } from "react-redux";
import { Authstore } from "src/features/AuthStore";
import Protected from "src/guards/Protected";
import { Suspense } from "react";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  // const selector = useSelector((state) => state.Auth);
  const getLayout = Component.getLayout ?? ((page) => page);
  // if (selector.isAuthenticate) {
  //   router.push("/auth/login/moden");
  // }
  const theme = createTheme({
    colorPreset: "indigo",
    contrast: "normal",
    direction: "ltr",
    layout: "vertical",
    navColor: "blend-in",
    paletteMode: "light",
    responsiveFontSizes: true,
    stretch: false,
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Raw Fitness</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta name="color-scheme" />
            <meta name="theme-color" />
          </Head>

          <CssBaseline />
          <SessionProvider session={session}>
            <>
              <Suspense fallback={"loading..."}>
                {getLayout(<Component {...pageProps} />)}
              </Suspense>
            </>
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
