# chat/consumers.py
import json
import time

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # message = text_data_json["message"]
        message = "Hello"

        self.send(text_data=json.dumps({"message": message}))
        time.sleep(3)
        message = " "
        self.send(text_data=json.dumps({"message": message}))
