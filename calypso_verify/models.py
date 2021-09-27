from django.db import models


class QR(models.Model):

    serial = models.CharField(max_length=40)
    verifications = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)
    first_verified = models.DateTimeField(null=True, blank=True, default=None)

    def __str__(self):
        return self.serial

