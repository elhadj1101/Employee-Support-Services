from django.db import models
from django.urls import reverse
from django.core.files.storage import default_storage
from django.db.models.signals import post_delete
import os

def file_cleanup(sender, **kwargs):
    """
    File cleanup callback used to emulate delete file fields when deleting instances.
    change the field variable to the name of the file field you want to cleanup.
    behavior using signals. Initially django deleted linked
    files when an object containing a File/ImageField was deleted.

    Usage:
    >>> from django.db.models.signals import post_delete
    >>> post_delete.connect(file_cleanup, sender=MyModel, dispatch_uid="mymodel.file_cleanup")
    """
    field = "cover"
    inst = kwargs["instance"]
    f = getattr(inst, field)
    m = inst.__class__._default_manager
    if (
        hasattr(f, "path")
        and os.path.exists(f.path)
        and not m.filter(
            **{"%s__exact" % field: getattr(inst, field)}
            ).exclude(pk=inst._get_pk_val())
        ):
        try:
            default_storage.delete(f.path)
        except:
            pass


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
    
post_delete.connect(
    file_cleanup, sender=Offre, dispatch_uid="offre.file_cleanup"
)