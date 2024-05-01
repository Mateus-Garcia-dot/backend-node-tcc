import re
import datetime

def validate_cpf(cpf: str) -> bool:
    cpf = re.sub(r"\D", "", cpf)
    if (not cpf) or (len(cpf) != 11) or (len(set(cpf)) == 1):
        return False
    cpf = list(map(int, cpf))
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
    return bool(re.match(r"^[a-za-z0-9._%+-]+@[a-za-z0-9.-]+\.[a-za-z]{2,}$", email))


def validate_birthday(birthdate: str) -> bool:
    try:
        datetime.datetime.strptime(birthdate, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def validate_cellphone(cellphone: str) -> bool:
    return bool(re.match(r"^\d{2}\d{5}\d{4}$", cellphone))
