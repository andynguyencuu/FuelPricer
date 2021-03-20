from django.contrib import admin
from .models import CustomUser, FuelQuote

# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

admin.site.register(CustomUser, CustomUserAdmin)

class FuelQuoteAdmin(admin.ModelAdmin):
    list_display =(
        'gallonsRequested',
        'pricePerGallon',
        'dateOfQuote',
        'dateRequested',
        'address',
        'address_2',
        'quotePrice'
    )

admin.site.register(FuelQuote, FuelQuoteAdmin)
