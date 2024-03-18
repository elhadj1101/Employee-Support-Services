from rest_framework import serializers
from .models import Offre


class OffresSerializer(serializers.ModelSerializer):
    max_participants = serializers.IntegerField(min_value = 1)
    title = serializers.CharField(max_length = 35)
    # slug = serializers.SlugField(default= "")
    cover = serializers.ImageField()
    class Meta: 
        model = Offre
        fields = [
           'id', 'title' ,  'description' , 'max_participants' , 'start_date' , 'end_date',
           'published_at', 'cover',
        #    'slug'
        ]
       
    def validate(self, attrs):
        data = super().validate(attrs)
        if data.get('start_date') > data.get('end_date'):
            raise serializers.ValidationError({"start_date":"Start date must be before end date"})
        return data
