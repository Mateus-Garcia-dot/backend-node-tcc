import elasticsearch from '@elastic/elasticsearch';

// @TODO: Extrair pro enviroments 
function getClient() {
  const client = new elasticsearch.Client({
    node: 'https://elastic.tccurbstads.com/',
    auth: {username: "elastic", password: "!@ContaElastic"},
    
  });

  return client;
}

export default getClient;
