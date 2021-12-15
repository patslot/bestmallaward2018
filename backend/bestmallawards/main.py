#!/usr/bin/env python
# encoding: utf-8
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2,jinja2,os,csv,logging,json,time
from google.appengine.ext import db
from google.appengine.ext import blobstore
from google.appengine.api import images
from google.appengine.api import users
import re 
import datetime
import logging
import json
import random

JINJA_ENVIRONMENT = jinja2.Environment(
loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],
autoescape=True)

COUNTER_NAME = "CURRENT"
NOMINATECOUNTER_NAME = "NOMINATECURRENT"
PUBLICCOUNTER_NAME = "PUBLICCURRENT"

@db.transactional(xg=True)
def addCounterAndSave(currentIndex,**kwds):
    Counter(key_name=COUNTER_NAME,INDEX=currentIndex).put()
    userkey = SecretUser(**kwds).put()
    return userkey.id()
    #entity = User.get_by_key_name(str(currentIndex))
    #if entity is None:
    #    Counter(key_name=COUNTER_NAME,INDEX=currentIndex).put()
    #    User(**kwds).put()
    #    #Location(key_name=poption,NAME=poption,SLOT=total_slot,SELECTED=total_selected+1).put()
    #    return "SUCCESS"
    #else :
    #    return "FAIL"

@db.transactional(xg=True)
def addPublicCounterAndSave(currentIndex,**kwds):
    PublicCounter(key_name=PUBLICCOUNTER_NAME,INDEX=currentIndex).put()
    Publickey = PublicUser(**kwds).put()
    return Publickey.id()

@db.transactional(xg=True)
def addNominateCounterAndSave(currentIndex,**kwds):
    NominateCounter(key_name=NOMINATECOUNTER_NAME,INDEX=currentIndex).put()
    Nominatekey = Nominate(**kwds).put()
    return Nominatekey.id()

@db.transactional()       
def getPublicCount():
    key_name = PUBLICCOUNTER_NAME
    entity = PublicCounter.get_by_key_name(key_name)
    if entity is None:
        return 0
    else:
        return entity.INDEX + 1

@db.transactional()       
def getNominateCount():
    key_name = NOMINATECOUNTER_NAME
    entity = NominateCounter.get_by_key_name(key_name)
    if entity is None:
        return 0
    else:
        return entity.INDEX + 1

@db.transactional()       
def getCurrentCount():
    key_name = COUNTER_NAME
    entity = Counter.get_by_key_name(key_name)
    if entity is None:
        return 0
    else:
        return entity.INDEX + 1

class PublicCounter(db.Model):
    INDEX = db.IntegerProperty(default=0)

class NominateCounter(db.Model):
    INDEX = db.IntegerProperty(default=0)

class Counter(db.Model):
    INDEX = db.IntegerProperty(default=0)

class SecretUser(db.Model):
    DATE_ADDED = db.DateTimeProperty(auto_now_add=True)
    DATE_MODIFIED = db.DateTimeProperty(auto_now=True)
    PLAYTIME = db.DateTimeProperty(default='')
    NAME = db.StringProperty(default='')
    AGE = db.StringProperty(default='')
    SEX = db.StringProperty(default='')
    AREA = db.StringProperty(default='')
    PHONE = db.StringProperty(default='')
    EMAIL = db.StringProperty(default='')
    Q1 = db.StringProperty(default='')
    Q2 = db.StringProperty(default='')
    Q3 = db.StringProperty(default='')
    Q4 = db.StringProperty(default='')
    Q5 = db.StringProperty(default='')
    Q6 = db.StringProperty(default='')
    Q7 = db.StringProperty(default='')
    Q8 = db.StringProperty(default='')

class PublicUser(db.Model):
    DATE_ADDED = db.DateTimeProperty(auto_now_add=True)
    DATE_MODIFIED = db.DateTimeProperty(auto_now=True)
    PLAYTIME = db.DateTimeProperty(default='')
    NAME = db.StringProperty(default='')
    SEX = db.StringProperty(default='')
    PHONE = db.StringProperty(default='')
    EMAIL = db.StringProperty(default='')
    VOTE = db.StringProperty(default='')
    PROMOTION1 = db.StringProperty(default='')
    PROMOTION2 = db.StringProperty(default='')
    Q1 = db.StringProperty(default='')
    Q2 = db.StringProperty(default='')
    Q3 = db.StringProperty(default='')
    Q4 = db.StringProperty(default='')
    Q5 = db.StringProperty(default='')
    Q6 = db.StringProperty(default='')

class Nominate(db.Model):
    DATE_ADDED = db.DateTimeProperty(auto_now_add=True)
    DATE_MODIFIED = db.DateTimeProperty(auto_now=True)
    PLAYTIME = db.DateTimeProperty(default='')
    NAME = db.StringProperty(default='')
    URL = db.StringProperty(default='')
    FBURL = db.StringProperty(default='')
    DESCRIPTION = db.StringProperty(default='')
    PHOTOINDEX = db.StringProperty(default='')
    PHOTO = db.BlobProperty(default=None)
    PHOTOURL = db.StringProperty(default='')

def getuser(mobile):
    user_record = SecretUser.all().filter("MOBILE = ",mobile).get()
    if user_record != None :
        return user_record 
    else :
        return None

  

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world!')
        user_record = SecretUser.all().filter("EMAIL = ","ram@ram.com").get()
        print user_record == None
        
class GetUserHandler(webapp2.RequestHandler):     
    def get(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        print getuser("ram@ram.com")
    def post(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        return_data = {}
        pmobile = self.request.get('mobile')
        user = getuser(pmobile)
        if user == None :
            logging.info("no record")
            return_data['status'] = 'SUCCESS'
            return_data['detail'] = 'no record'
        else :
            logging.info("have record")
            return_data['status'] = 'SUCCESS'
            return_data['detail'] = 'have record'
            return_data['email'] = user.EMAIL
            return_data['familyname'] = user.FAMILYNAME
            return_data['givenname'] = user.GIVENNAME
            return_data['gender'] = user.GENDER
            return_data['date'] = user.DOB
            return_data['mobile'] = user.MOBILE
            return_data['salary'] = user.SALARY
            return_data['interest'] = user.INTEREST
            return_data['promotion'] = user.PROMOTION
        self.response.out.write(json.dumps(return_data))
     
class SubmitHandler(webapp2.RequestHandler):
    def get(self):
        self.submit()
    def post(self):
        self.submit()
    def submit(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        jsonstring = self.request.body
        jsonobject = json.loads(jsonstring)
        logging.info(jsonobject['secret_4'])
        pname = jsonobject["name"]
        page = jsonobject['age']
        psex = jsonobject['sex']
        parea = jsonobject['area']
        pphone = jsonobject['phone']
        pemail = jsonobject['email']
        pq1 = jsonobject['secret_1']
        pq2 = jsonobject['secret_2']
        pq3 = jsonobject['secret_3']
        pq4 = jsonobject['secret_4']
        pq5 = jsonobject['secret_5']
        pq6 = jsonobject['secret_6']
        pq7 = jsonobject['secret_7']
        pq8 = jsonobject['secret_8']
        ptime = datetime.datetime.now() + datetime.timedelta(hours=8)
        return_data = {}
        try:
            currentIndex = getCurrentCount()
            userkey = addCounterAndSave(currentIndex,MEMBER_NO=str(currentIndex),PLAYTIME=ptime,NAME=pname,AGE=page,SEX=psex,AREA=parea,PHONE=pphone,EMAIL=pemail,Q1=pq1,Q2=pq2,Q3=pq3,Q4=pq4,Q5=pq5,Q6=pq6,Q7=pq7,Q8=pq8)
            logging.info(userkey)
            logging.info("create new item")
            return_data['status'] = 'SUCCESS'
            return_data['detail'] = '您已成功提交！'
            return_data['userid'] = userkey 
        except:
            logging.info('FAIL')
            return_data['status'] = 'FAIL'
            return_data['detail'] = '提交失敗！'
        self.response.out.write(json.dumps(return_data))

class PublicHandler(webapp2.RequestHandler):
    def get(self):
        self.submit()
    def post(self):
        self.submit()
    def submit(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        jsonstring = self.request.body
        jsonobject = json.loads(jsonstring)
        logging.info(jsonobject['malls'])
        logging.info(jsonobject['name'])
        pname = jsonobject["name"]
        psex = jsonobject['sex']
        pphone = jsonobject['phone']
        pemail = jsonobject['email']
        pvote = jsonobject['malls']
        pq1 = jsonobject['q1']
        pq2 = jsonobject['q2']
        pq3 = jsonobject['q3']
        pq4 = jsonobject['q4']
        pq5 = jsonobject['q5']
        pq6 = jsonobject['q6']
        ppromotion1 = jsonobject['public_promotion1']
        ppromotion2 = jsonobject['public_promotion2']
        ptime = datetime.datetime.now() + datetime.timedelta(hours=8)
        return_data = {}
        try:
            currentIndex = getPublicCount()
            userkey = addPublicCounterAndSave(currentIndex,MEMBER_NO=str(currentIndex),PLAYTIME=ptime,NAME=pname, SEX=psex, PHONE=pphone,EMAIL=pemail,VOTE=pvote,Q1=pq1,Q2=pq2,Q3=pq3,Q4=pq4,Q5=pq5,Q6=pq6,PROMOTION1=ppromotion1,PROMOTION2=ppromotion2)
            logging.info(userkey)
            logging.info("create new item")
            return_data['status'] = 'SUCCESS'
            return_data['detail'] = '您已成功提交！'
            return_data['userid'] = userkey 
        except:
            logging.info('FAIL')
            return_data['status'] = 'FAIL'
            return_data['detail'] = '提交失敗！'
        self.response.out.write(json.dumps(return_data))        

class NominateHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world!')
    def post(self):
        logging.info('Hello world!')
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        pname = self.request.get('name')
        purl = self.request.get('url')
        pfburl = self.request.get('fburl')
        pdescription = self.request.get('description')
        pphoto = self.request.get('photo')
        data_to_64 = re.search(r'base64,(.*)', pphoto).group(1)      
        decoded = data_to_64.decode('base64')
        ppicture = db.Blob(decoded)
        # logging.info(pphoto)
        pindex = str(random.randint(1000000,9999999)) + str(random.randint(1000000,9999999))
        
        pphotourl = "https://bestmallawards.appspot.com//loadImage?index=%s" % pindex 
        # pphotourl = "http://localhost:16080/loadImage?index=%s" % pindex 
        ptime = datetime.datetime.now() + datetime.timedelta(hours=8)
        return_data = {}
        try:
            currentIndex = getNominateCount()
            nominatekey = addNominateCounterAndSave(currentIndex,MEMBER_NO=str(currentIndex),PLAYTIME=ptime,NAME=pname,URL=purl,FBURL=pfburl,DESCRIPTION=pdescription,PHOTOINDEX=pindex,PHOTO=ppicture,PHOTOURL=pphotourl)
            logging.info(nominatekey)
            logging.info("create new item")
            return_data['status'] = 'SUCCESS'
            return_data['detail'] = '您已成功提交！'
            return_data['userid'] = nominatekey 
        except:
            logging.info('FAIL')
            return_data['status'] = 'FAIL'
            return_data['detail'] = '提交失敗！'
        self.response.out.write(json.dumps(return_data))

class loginHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            nickname = user.nickname()
            logout_url = users.create_logout_url('/')
            greeting = 'Welcome, {}! (<a href="{}">sign out</a>)'.format(
                nickname, logout_url)
        else:
            login_url = users.create_login_url('/')
            greeting = '<a href="{}">Sign in</a>'.format(login_url)
        template_values = {
            	'greeting': greeting
            }    
        template = JINJA_ENVIRONMENT.get_template('login.html')
        self.response.write(template.render(template_values))
   

class adminHandler(webapp2.RequestHandler):
    def get(self):
        self.checklogin()
    def post(self):
        self.checklogin()    
    def checklogin(self):    
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        username = self.request.get('username')
        password = self.request.get('password')
        print username
        if (username=="admin" and password=="123456"):
            print "OK"
            secretUsers = SecretUser.all()
            secretUsers.order('PLAYTIME')
            nominates = Nominate.all()
            nominates.order('DATE_ADDED')
            publicUsers = PublicUser.all()
            publicUsers.order('PLAYTIME')
            if nominates == None :
                nominates = {}    
            # else:
            #     events.order('DATE_ADDED')
            template_values = {
            	'secretUsers': secretUsers,
            	'publicUsers': publicUsers,
                'nominates': nominates
            }
            template = JINJA_ENVIRONMENT.get_template('admin.html')
            self.response.write(template.render(template_values))  
        else:    
            print "fail"
            template = JINJA_ENVIRONMENT.get_template('login.html')
            self.response.write(template.render()) 


class LoadHandler(webapp2.RequestHandler):
    def get(self): 
            #get image name from user
            index = self.request.get('index')
            #search picture with name provided
            picture = self.getPicture(index)
            logging.info(picture.PHOTO)
            if (picture and picture.PHOTO):
                self.response.headers['Content-Type'] = 'image/*'
                self.response.out.write(picture.PHOTO)
            else:
                self.redirect('/static/noimage.jpg')
                
    def getPicture(self,index):
        result = db.GqlQuery("SELECT * FROM Nominate WHERE PHOTOINDEX = :1 LIMIT 1",index).fetch(1)
        
        if (len(result) > 0):
            return result[0]
        else:
            return None


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/SecretSubmit', SubmitHandler),
    ('/NominSubmit', NominateHandler),
    ('/PublicSubmit', PublicHandler),
    ('/loadImage', LoadHandler),
    ('/login', loginHandler),
    ('/admin', adminHandler)
], debug=True)
