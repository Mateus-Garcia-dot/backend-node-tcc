
import elasticsearch from '@elastic/elasticsearch';

export class ElasticsearchService {
  private static instance: ElasticsearchService;
  private client: elasticsearch.Client;

  private constructor() {
    this.client = new elasticsearch.Client({
      node: 'https://elastic.tccurbstads.com/',
      auth: { username: "elastic", password: "!@ContaElastic" },
      headers: { 'Content-Type': 'application/json',  'Accept': 'application/json'}
    });
  }

  public static getInstance(): ElasticsearchService {
    if (!ElasticsearchService.instance) {
      ElasticsearchService.instance = new ElasticsearchService();
    }

    return ElasticsearchService.instance;
  }

  public async search(index: string, query: any): Promise<any> {

    return await this.client.indices.get({ index: '*' });


    return this.client.search({
      index: 'my_index',
      body: {
        query: {
          match: {
            field: 'value'
          }
        }
      },
    })
      .then(response => {
        // Lida com a resposta da pesquisa
        console.log(response);
      })
      .catch(error => {
        // Trata erros
        console.error(error);
      });
  }
}