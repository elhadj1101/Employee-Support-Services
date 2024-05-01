from django.core.files.storage import default_storage
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
    inst = kwargs["instance"]

    field = getattr(inst, "doc_field", "cover")

    f = getattr(inst, field)

    m = inst.__class__._default_manager
    if f:
        if (
            hasattr(f, "path")
            and os.path.exists(f.path)
            and not m.filter(**{"%s__exact" % field: getattr(inst, field)}).exclude(
                pk=inst._get_pk_val()
            )
        ):
            try:
                default_storage.delete(f.path)
            except:
                pass


def get_path(instance, filename):
    extension = filename.split(".")[-1]
    name = filename.split(".")[0]

    import os, random, string

    path = (
        "meetings_pv"
        if instance.__class__.__name__ == "Meeting"
        else instance.employee.pk
    )
    length = 13
    chars = string.ascii_letters + string.digits + "!@#$%^&*()"
    random.seed = os.urandom(1024)
    a = "".join(random.choice(chars) for i in range(length))
    rndm_filename = "%s%s.%s" % (name, str(a), extension)
    return f"{path}/docs/{rndm_filename}"
