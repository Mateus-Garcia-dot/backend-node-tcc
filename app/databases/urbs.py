from typing import Optional
import httpx
import os
import dotenv

dotenv.load_dotenv()

class URBSWebService:
    def __init__(self, api_key: str):
        self.client = httpx.Client(base_url="https://transporteservico.urbs.curitiba.pr.gov.br")
        self.api_key = api_key

    def get_pontos_linha(self, linha: str):
        response = self.client.get(f"/getPontosLinha.php?linha={linha}&c={self.api_key}")
        return response.json()
    
    def get_linhas(self):
        response = self.client.get(f"/getLinhas.php?c={self.api_key}")
        return response.json()

    def get_shape(self, line_id: str):
        response = self.client.get(f"/getShapeLinha.php?linha={line_id}&c={self.api_key}")
        return response.json()
    
    def get_veiculos(self, line_id: str):
        response = self.client.get(f"/getVeiculos.php?linha={line_id}&c={self.api_key}")
        return response.json()
    
    def get_tabela_linha(self, line_id: str):
        response = self.client.get(f"/getTabelaLinha.php?linha={line_id}&c={self.api_key}")
        print(response.read())
        return response.json()

    
urbs_service = URBSWebService(os.getenv("URBS_API_KEY"))
