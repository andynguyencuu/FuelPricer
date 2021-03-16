# based off https://gist.github.com/dakotalillie

from fuelpricer.serializers import UserSerializer

def jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }