import psycopg2

# Create a connection to the PostgreSQL database
conn = psycopg2.connect(
    user='postgres',
    host='db',
    database='postgres',
    password='postgres',
    port=5432
)

###################### User Table #######################

# Create table
async def create_user_table():
    user_table = """
    CREATE TABLE IF NOT EXISTS Users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      userpassword VARCHAR(50) NOT NULL
    )
    """
    try:
        cur = conn.cursor()
        cur.execute(user_table)
        conn.commit()
        print('Created "Users" table')
        cur.close()
    except Exception as error:
        print('Error creating "Users" table:', error)
        conn.rollback()
        raise error

# Insert
async def insert_user(username='teste', userpassword='teste123'):
    insert_query = "INSERT INTO Users (username, userpassword) VALUES (%s, %s)"
    values = (username, userpassword)
    
    try:
        cur = conn.cursor()
        cur.execute(insert_query, values)
        conn.commit()
        print('User inserted')
        cur.close()
    except Exception as error:
        print('Error inserting user:', error)
        conn.rollback()
        raise error

# Read
async def get_user(username, userpassword):
    get_query = 'SELECT * FROM Users WHERE username = %s AND userpassword = %s'
    values = (username, userpassword)
    
    try:
        cur = conn.cursor()
        cur.execute(get_query, values)
        result = cur.fetchall()
        print('User fetched')
        cur.close()
        return result
    except Exception as error:
        print('Error fetching Users: ', error)
        raise error

# Update
async def update_user(user_id, updates):
    username, userpassword = updates
    update_query = 'UPDATE Users SET username = %s, userpassword = %s WHERE user_id = %s'
    values = (username, userpassword, user_id)
    
    try:
        cur = conn.cursor()
        cur.execute(update_query, values)
        conn.commit()
        cur.close()
        return cur.rowcount > 0
    except Exception as error:
        print('Error updating Users: ', error)
        conn.rollback()
        raise error

# Delete
async def delete_user(user_id):
    delete_query = 'DELETE FROM Users WHERE user_id = %s'
    values = (user_id,)
    
    try:
        cur = conn.cursor()
        cur.execute(delete_query, values)
        conn.commit()
        cur.close()
        return cur.rowcount > 0
    except Exception as error:
        print('Error deleting user:', error)
        conn.rollback()
        raise error

# Close the cursor and connection when done
def close_connection():
    conn.close()
