from celery import shared_task, Task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from datetime import datetime
from django.db.models import Sum
import random
import math
import time
from scores.models import Score


channel_layer = get_channel_layer()


class CallbackTask(Task):
    def on_success(self, retval, task_id, args, kwargs):
        print(f"Task {task_id} is {retval}")


@shared_task(name="task1", base=CallbackTask)
def task1():
    
    result = random.randint(100000, 1000000000) / math.pow(1024, 3)

    info = {
        'task_name': 'task1',
        'info': 'Random bytes to gigabytes.',
        'result': result,
        'finish time': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
    }
    async_to_sync(channel_layer.group_send)('tasks', {'type': 'send_task_info', 'data': info})
    return result


@shared_task(name="task2", base=CallbackTask)
def task2():
    date_time = datetime.now() - datetime(2000, 1, 1)
    result = date_time.total_seconds()
    info = {
        'task_name': 'task2',
        'info': 'Total seconds from 01:01:2000',
        'result': result,
        'finish time': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
    }
    async_to_sync(channel_layer.group_send)('tasks', {'type': 'send_task_info', 'data': info})
    return result


@shared_task(name="task3", base=CallbackTask)
def task3():
    score_sum = Score.objects.aggregate(Sum('total_bytes'))
    info = {
        'task_name': 'task3',
        'info': 'User`s bytes sum',
        'result': score_sum["total_bytes__sum"],
        'finish time': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
    }
    async_to_sync(channel_layer.group_send)('tasks', {'type': 'send_task_info', 'data': info})
    return score_sum['total_bytes__sum']