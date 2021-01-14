import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { createClient, Provider } from 'urql';


const __IS_PROD__ = process.env.NODE_ENV === "production";
const gql_url = __IS_PROD__ ? 'https://voscars.herokuapp.com/graphql' : 'http://localhost:4000/graphql'

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({ url: gql_url });

  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
