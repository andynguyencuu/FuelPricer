from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import CustomUser, FuelQuote

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
    fullname = serializers.CharField(max_length=50)
    address = serializers.CharField(max_length=100)
    address_2 = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=2)
    zipcode = serializers.IntegarField(max_length=9)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'fullname', 'address', 'address_2', 'state', 'zipcode')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # used to be self.Meta.model changed to self.model
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def update(self, validated_data):
        instance = self.Meta.model(**validated_data) # not a param?
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['fullname'] = user.fullname
        return token

def validate_password(self, value: str) -> str:
    """
    Hashes passwords
    """
    return make_password(value)

class FuelQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelQuote
        fields = (
        'amountGallons', 
        'pricePerGallons', 
        'dateOfQuote' ,
        'address' 
    )
