
def portal_processor(request):
    return {'PORTAL_URL': request.build_absolute_uri('/')}
