//http link permite conectarse con el servidor de apollo
import fetch from 'node-fetch'
import {setContext} from 'apollo-link-context'
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient as createWsClient } from 'graphql-ws';
import { getAccessToken } from '../auth/auth';

const httpLink = new HttpLink({
    // uri: 'https://server.crissol.link/graphql',
    uri : 'http://localhost:9000/graphql'
  });
  

const wsLink =
    typeof window !== 'undefined'
        
        ?

    new GraphQLWsLink(createWsClient({
        // url: 'ws://server.crissol.link/graphql',
        url : 'ws://localhost:9000/graphql',
        // connectionParams: () => ({ accessToken: getAccessToken() }),
    }))

        :
    
    null


function isSubscription({ query }) {
    const definition = getMainDefinition(query);
    return definition.kind === Kind.OPERATION_DEFINITION
        && definition.operation === OperationTypeNode.SUBSCRIPTION;
}
  
const authLink = setContext((_,{headers}) => {
    //Leer el storage almacenado
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const client = new ApolloClient({
    сonnectToDevTools: true,
    cache: new InMemoryCache(),
    link: 
    typeof window !== 'undefined'
        
        ?

    split(isSubscription, wsLink, authLink.concat(httpLink) )

        :

    null
});

export default client
