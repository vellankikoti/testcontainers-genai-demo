from testcontainers.postgres import PostgresContainer
import sqlalchemy
from sqlalchemy import Table, Column, Integer, Text, JSON, MetaData

def test_database_interaction():
    with PostgresContainer("postgres:latest") as postgres:
        engine = sqlalchemy.create_engine(postgres.get_connection_url())
        metadata = MetaData()

        chat_history = Table(
            'ChatHistory', metadata,
            Column('id', Integer, primary_key=True),
            Column('user_message', Text),
            Column('ai_responses', JSON)
        )

        metadata.create_all(engine)
        connection = engine.connect()

        # Insert data
        insert_query = chat_history.insert().values(
            user_message="What is Testcontainers?",
            ai_responses={"Normal": "Testcontainers is a testing framework."}
        )
        connection.execute(insert_query)

        # Retrieve data
        select_query = chat_history.select()
        result = connection.execute(select_query).fetchone()

        assert result['user_message'] == "What is Testcontainers?"
        assert result['ai_responses']["Normal"] == "Testcontainers is a testing framework."
