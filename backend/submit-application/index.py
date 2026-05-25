import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


HEADERS = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
NOTIFY_EMAIL = 'puhoi125@mail.ru'
SMTP_HOST = 'smtp.mail.ru'
SMTP_PORT = 465
TYPE_LABELS = {'student': 'Студент', 'employee': 'Сотрудник'}


def send_notification(name: str, email: str, type_: str):
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Новая заявка на участие — SynapseAI'
    msg['From'] = f'Помощник.ру <{NOTIFY_EMAIL}>'
    msg['To'] = NOTIFY_EMAIL

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #ef4444; margin-bottom: 4px;">Здравствуйте, это Помощник.ру</h2>
      <p style="color: #555; margin-bottom: 24px;">Поступила новая заявка на участие в программе SynapseAI.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888; width: 120px;">Имя</td>
          <td style="padding: 10px 0; font-weight: bold; color: #111;">{name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Email</td>
          <td style="padding: 10px 0; font-weight: bold; color: #111;">{email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Тип</td>
          <td style="padding: 10px 0; font-weight: bold; color: #111;">{TYPE_LABELS.get(type_, type_)}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
      <p style="color: #aaa; font-size: 12px;">SynapseAI — платформа для сотрудников и студентов</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(NOTIFY_EMAIL, smtp_password)
        server.sendmail(NOTIFY_EMAIL, NOTIFY_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    """Принимает заявку на участие (имя, email, тип участника), сохраняет в БД и отправляет уведомление."""

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

    send_notification(name, email, type_)

    return {'statusCode': 200, 'headers': HEADERS, 'body': {'success': True, 'message': 'Заявка принята!'}}