import json
import os
import psycopg2


HEADERS = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}


def handler(event: dict, context) -> dict:
    """Принимает заявку на участие (имя, email, тип участника) и сохраняет в БД."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': HEADERS, 'body': {'error': 'Method not allowed'}}

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    email = (body.get('email') or '').strip()
    type_ = (body.get('type') or '').strip()

    if not name or not email or type_ not in ('student', 'employee'):
        return {'statusCode': 400, 'headers': HEADERS, 'body': {'error': 'Заполните все поля корректно'}}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p58588261_quantum_data_exchang.applications (name, email, type) VALUES (%s, %s, %s)",
        (name, email, type_)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {'statusCode': 200, 'headers': HEADERS, 'body': {'success': True, 'message': 'Заявка принята!'}}
