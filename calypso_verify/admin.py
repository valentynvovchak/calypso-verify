from django.contrib import admin

from calypso_verify.models import QR


class QRAdmin(admin.ModelAdmin):

    list_display = ['id', 'serial', 'verifications', 'created_at', 'first_verified']
    list_display_links = ['serial']
    search_fields = ('serial',)
    date_hierarchy = 'first_verified'


admin.site.register(QR, QRAdmin)
