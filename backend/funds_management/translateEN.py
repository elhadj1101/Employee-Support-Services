import re 
import os
from googletrans import Translator

regex = re.compile(r'\{"[a-z_A-Z]+":\s+"([^\}]+)"\}')
app  = "requests/"

translator = Translator()

if (os.path.exists(app)):
    for f in os.listdir(app):
        if f.endswith(".py"):
            print(f)
            with open (os.path.join(app, f)) as file:
                content = file.read()
                
            if content:
                messages = []
                for k in re.finditer(regex, content):
                    if (len(k.groups()) > 0):
                        messages.append((str(k.groups()[0]), translator.translate(k.groups()[0], src='en', dest='fr').text))
                if (len(messages) == 0):
                    continue
                for m in messages:
                    content = content.replace(m[0], m[1])
                with open (os.path.join(app, f), "w") as file:
                    file.write(content)
