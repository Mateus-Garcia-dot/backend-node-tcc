import elasticsearch from '@elastic/elasticsearch';
import { trace } from '../routes/login-route';

function getClient() {
  const client = new elasticsearch.Client({
    node: 'https://elastic.tccurbstads.com/',
    auth: {username: "elastic", password: "!@ContaElastic"},
  });

  return client;
}

export default getClient;
