from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.template import RequestContext
from django.urls import reverse
from django.utils import timezone
from django.views import View
from django.views.generic import TemplateView

from calypso_verify.models import QR

ICON = {
    'SUCCESS': {'class': 'fa-check-circle', 'color': '#4fb360'},
    'WARNING': {'class': 'fa-question-circle', 'color': '#fedd72'},
    'DANGER': {'class': 'fa-times-circle', 'color': 'red'},
}


class IndexView(TemplateView):
    template_name = 'calypso_verify/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.GET.get('serial'):
            context['serial'] = self.request.GET.get('serial')

        return context

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            serial = request.POST.get('serial')

            qr = QR.objects.filter(serial=serial).first()

            answer = dict()

            if qr:
                answer['found'] = '1'

                if not qr.first_verified:
                    answer['status'] = 'SUCCESS'
                    answer['first_verified'] = ''
                    answer['verifications'] = 0
                    qr.first_verified = timezone.now()

                else:
                    answer['status'] = 'WARNING'
                    answer['first_verified'] = qr.first_verified.strftime("%d %B, %Y at %H:%M:%S")
                    answer['verifications'] = qr.verifications
                    if qr.verifications > 99:
                        answer['status'] = 'DANGER'

                qr.verifications = qr.verifications + 1
                qr.save()

            else:
                answer['found'] = ''
                answer['first_verified'] = ''
                answer['status'] = 'DANGER'

            return JsonResponse({
                'serial': serial,
                'icon_class': ICON[f"{answer['status']}"]['class'],
                'icon_color': ICON[f"{answer['status']}"]['color'],
                'verifications': answer.get('verifications') or '',
                'first_verified': answer['first_verified'],
                'found': answer['found'],
                'status': answer['status']
            })



