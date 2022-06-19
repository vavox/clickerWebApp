import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

# app.conf.task_routes = {
#   "tasks.tasks.task1": {"queue": "tasks_queue"},
# }

app.conf.beat_schedule = {
    'task1_10s': {
        'task': 'task1',
        'schedule': 10.0,
        'options': {
            'queue': 'tasks_queue',
        }
    },
    'task2_5s': {
        'task': 'task2',
        'schedule': 5.0,
        'options': {
            'queue': 'tasks_queue',
        }
    },
    'task3_20s': {
        'task': 'task3',
        'schedule': 20.0,
        'options': {
            'queue': 'tasks_queue',
        }
    },
}


app.autodiscover_tasks()