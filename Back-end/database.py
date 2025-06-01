import psycopg2
import os
from dotenv import load_dotenv
from db_info import *
load_dotenv()

def get_db_connection():
    """Get a database connection"""
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        sslmode='require'
    )
    return conn

def get_db_cursor(conn):
    """Get a cursor from the provided connection"""
    return conn.cursor()

def close_db_connection(conn, cursor):
    """Close the cursor and connection manually"""
    cursor.close()
    conn.close()

