from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.db.models import CheckConstraint, Q, F
from  time import time
# Create your models here.
class Offre (models.Model):
    published_at = models.DateField(auto_now_add = True)
    title = models.CharField(max_length = 35)
    # slug = models.SlugField(unique = True)
    description = models.TextField()
    max_participants = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    cover = models.ImageField(upload_to='%Y/%m/%d' )
   
    # def save(self, *args, **kwargs):
    #     if self.slug == "":
    #         strtime = "".join(str(time()).split("."))
    #         string = "%s-%s" % ( self.title.lower(),strtime[7:])
    #         self.slug = slugify(string)
    #     super(Offre, self).save(*args, **kwargs)
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("offre_detail", kwargs={"pk": self.pk})