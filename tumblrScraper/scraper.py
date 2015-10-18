
apiKey = "fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"

minimumFeed = 2000

import urllib2
import json
import re
import codecs

lasttime = 0
blogs = []
while(len(blogs) < minimumFeed):
    url = "https://api.tumblr.com/v2/tagged?tag=poem&filter=text&api_key=" + apiKey
    if (lasttime != 0):
        url += "&before=" + str(lasttime)
    response = urllib2.urlopen(url)
    text = json.loads(response.read())
    posts = text[u'response']
    for i in posts:
        if (i[u'type'] == "text"):
            post = i[u'body']
            blogs.append(re.sub("(</?[^>]+>)*", "", post));
            lasttime = i[u'timestamp']
    print str(len(blogs)) + "/" + str(minimumFeed)

files = ["freud.txt", "edgar.txt", "edgar2.txt"];
for fd in files:
    f = codecs.open(fd, 'r', 'utf-8');
    blogs.append(f.read());
    f.close();

words = {}
words["."] = {}
for post in blogs:
    last = "^"
    for line in re.split("[\n.]+", post.lower()):
        for word in line.split(" "):
            if (last not in words):
                words[last] = {}
            if (word not in words[last]):
                words[last][word] = 1;
            else:
                words[last][word] += 1;
            last = word
        if (last not in words["."]):
            words["."][last] = 1
        else:
            words["."][last] += 1;

f = codecs.open('poems.dat', 'w', 'utf-8');
for key in words:
    f.write(key + "\t")
    for rec in words[key]:
        f.write(rec + ":::" + str(words[key][rec]) + "\t")
    f.write("\n")
f.close()
