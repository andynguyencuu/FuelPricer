from django.shortcuts import render
from rest_framework import permissions, viewsets
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer, FuelQuoteSerializer
from .models import FuelQuote, CustomUser
from .pricing import Pricer

# Create your views here.
class ObtainTokenPairWithFullnameView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserUpdate(RetrieveUpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomUserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)


class FuelQuoteView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = FuelQuoteSerializer
    user_serializer_class = CustomUserSerializer
    queryset = FuelQuote.objects.all()

    def patch(self, request):
        serializer = self.serializer_class(request.user) # will be used to acuire state, history presence, etc
        new_quote = Pricer(request.data['gallonsRequested'], 1.5)
        return Response(data={"generated":new_quote.generate()}, status=status.HTTP_200_OK)
    
    def post(self, request, format='json'):
        serializer = FuelQuoteSerializer(data=request.data)
        if serializer.is_valid():
            fuel = serializer.save(REQUESTOR=request.user)
            if fuel:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self):
        pass
