import re
import datetime

def validate_cpf(cpf: str) -> bool:
    # Remove caracteres não numéricos.
    cpf = re.sub(r"\D", "", cpf)
    
    # Verifica se o CPF tem 11 dígitos e se não é uma sequência de dígitos iguais.
    if (not cpf) or (len(cpf) != 11) or (len(set(cpf)) == 1):
        return False
    
    # Converte os dígitos de string para inteiros.
    cpf = list(map(int, cpf))
    
    # Verifica os dois dígitos verificadores.
    for i in range(9, 11):
        valor = sum((cpf[num] * ((i+1) - num) for num in range(i))) % 11
        if valor < 2:
            d = 0
        else:
            d = 11 - valor
        
        if cpf[i] != d:
            return False
            
    return True


def validate_email(email: str) -> bool:
    return bool(re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email))


def validate_birthday(birthdate: str) -> bool:
    try:
        datetime.datetime.strptime(birthdate, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def validate_cellphone(cellphone: str) -> bool:
    return bool(re.match(r"^\d{2}\d{5}\d{4}$", cellphone))
