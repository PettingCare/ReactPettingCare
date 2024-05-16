from test import cursor


def init_db():
    create_table_query = """
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                emailEwelink VARCHAR(100),   
                passwordEwelink VARCHAR(100)
            )
        """
    return create_table_query
