from flask import Flask, request, jsonify
from g4f.client import Client
from filelock import FileLock

app = Flask(__name__)

lock = FileLock("app.lock")

@app.route('/api/data', methods=['POST'])
def receive_data():
    try:
        data = request.get_json(force=True)

        messages = data.get('messages', [])

        if not messages:
            return jsonify({"error": "Поле 'messages' не найдено или пусто."}), 400

        client = Client()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            web_search=False
        )

        if not response.choices or not hasattr(response.choices[0], 'message'):
            return jsonify({"error": "Неверный формат ответа от модели."}), 500

        result = response.choices[0].message.content

        return jsonify({"message": result}), 200
    except OpenAIError as e:
        return jsonify({"error": f"Ошибка OpenAI API: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400



if __name__ == '__main__':
    with lock:
        app.run(host='0.0.0.0', port=5005)
