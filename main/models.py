from django.db import models
from django.conf import settings

class VaultEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vault_entries')
    title = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)
    url = models.URLField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
