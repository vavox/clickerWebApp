import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import UsersInChat

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'chat'
        self.room_group_name = 'chat_group'
        self.usersInChat = UsersInChat.objects.all()
        self.user = self.scope['user']

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        



        if self.user.is_authenticated:
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name,
            )

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'user_join',
                    'user': self.user.username,
                }
            )
            UsersInChat.objects.create(user=self.user)
            print(self.usersInChat)
            
        self.send(json.dumps({
            'type': 'user_list',
            'users': [user.user.username for user in self.usersInChat],
        }))

    def disconnect(self, close_code):
        # Leave room group        
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        
        if self.user.is_authenticated:
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name,
            )

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'user_leave',
                    'user': self.user.username,
                }
            )
            #self.usersInChat.user.remove(self.user)
            UsersInChat.objects.filter(user=self.user).delete()
            print(self.usersInChat)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'user': self.user.username,
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'chat_message',
            'user': self.user.username,
            'message': message
        }))
        
    def chat_message(self, event):
        self.send(text_data=json.dumps(event))

    def user_join(self, event):
        self.send(text_data=json.dumps(event))
        
    def user_leave(self, event):
        self.send(text_data=json.dumps(event))
