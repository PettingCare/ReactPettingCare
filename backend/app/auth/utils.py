from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Guardamos tokens JWT inválidos
invalid_tokens = set()

def hash_pass(password:str):
    return pwd_context.hash(password)

def verifica_password(non_hashed_pass, hashed_pass):
    return pwd_context.verify(non_hashed_pass, hashed_pass)


def invalidate_token(token: str):
    # Token invalidado
    invalid_tokens.add(token)

def is_token_invalid(token: str):
    # Token invalidado ?
    return token in invalid_tokens