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

    
urbs_service = URBSWebService(os.getenv("URBS_API_KEY"))
