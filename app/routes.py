from flask import Flask, render_template
import daoTC
import flask
import flask_cors
from flask_cors import CORS
import requests
from flask import Flask, redirect, url_for, request, render_template
from flask import request
from random import randint
import numpy as np
import json
import aibril_chatbot
import pymssql, json
import time


app = Flask(__name__)
CORS(app)

mybot = aibril_chatbot.ChatBot()
question = ''
answer = ''
keyword_list = []

@app.route('/', methods=['GET', 'POST'])
@app.route('/index')
def home():
#    return render_template('home.html')
    return render_template('index.html')


#diary.html을 불러오기 위한 함수
@app.route('/goDiary', methods=['GET', 'POST'])
def goDiary():
    mybot = aibril_chatbot.ChatBot()
    return render_template('diary.html')

#페이지네이션을 위한 함수 + 새로운 다이어리 목록을 db에서 가져와 diary.html에 띄워주는 함수
@app.route('/requestDiary', methods=['GET', 'POST'])
def requestDiary():
    
    req = request.get_json()
    page = req['page']
    planner_name="박수민"

    lst=daoTC.getSchedule_planner(planner_name, page)
    res = json.dumps(lst, ensure_ascii=False)
    print(res)
    return res

#자신이 쓴 다이어리 상세내용을 띄워주는 함수
@app.route('/requestDiaryDetail', methods=['GET', 'POST'])
def requestDiaryDetail():
    ##########내용##########
    return 0

#다이어리 제작 페이지로 이동하는 함수
@app.route('/createDiary', methods=['GET', 'POST'])
def createDiary():
    return render_template('create_diary.html')

# 투어 신청 및 스케줄 검색페이지로 이동하는 함수
@app.route('/goTravler', methods=['GET', 'POST'])
def goTravler():
    return render_template('travler.html')

#@app.route('/makeplan', methods=['GET', 'POST'])
#def makePlan():
#    #설정한 플랜을 디비에 입력
#    return redirect(url_for('plannerPage'))

#스케줄 검색 시, 결과로 이동하는 함수
@app.route('/search', methods=['GET', 'POST'])
def search():
    ########내용######
    return 0

#이동한 검색결과 페이지에서, db의 내용을 가져와 화면에 보여주는 함수
@app.route('/goResult', methods=['GET', 'POST'])
def goResult():
    
    #req = request.get_json()
    
    placetag = request.form['input-location']
    hashtags = request.form['tags'].split(",")
    # todo: 아큐인사이트랑 통신
    #placetag = req['placetag']
    #hashtags = req['hashtags']
    lst_place = daoTC.getSchedule_place(placetag)
#    print(lst_place)
    placetag=list(placetag)
    searchlist = []
    for i in range(len(lst_place)):
        targettags = lst_place[i]["hashtags"]
        match = len(set(targettags) & set(hashtags))
#        print(hashtags, targettags, match)
        searchlist.append(match)
    
    
    recommend = []
    for i in range(len(lst_place)):
        if searchlist[i] != 0:
            numcourse = searchlist.index(max(searchlist))
            recommend.append(lst_place[numcourse])
            searchlist[numcourse] = -1
    if len(recommend) == 0:
        recommend.append('none')
    
    
    # pick: 0
    # course[pick]: [p i t u h]
    
    res = json.dumps(recommend, ensure_ascii=False)
    print(res)
    
    #return res
    return render_template('result.html', res=res)
################################################################챗봇 임시#########################################




@app.route('/requestChat', methods=['GET', 'POST'])
def requestChat():
    question = ''
    chattext = {}
    cquestion = []
    ctext = []

    if mybot.q_index == 0:
        question = mybot.first_interface()
#    mybot.q_index = 1
#    question = mybot.first_interface()
#    print('C2: ' + question)

#    time.sleep(10)

    answer_json = request.get_json()
#    print(answer_json)
    answer = str(answer_json['text'])
    

    # text = input("You: ")

#    print('you: ' + answer)

    if answer.strip() == "초기화":
        mybot.clear()
    former_q = question
    question, keyword_list = mybot.interface(answer)

    print('C2: ' + question)

    cquestion.append(question)
    ctext.append(answer)

    chattext['answer'] = ctext
    chattext['question'] = cquestion
    chattext['keyword'] = keyword_list

#    print(question)
    lst = question
#    lst = "hello"
##    res = json.dumps(lst, ensure_ascii=False)
    test = json.dumps(lst, ensure_ascii=False)
#    print(test)

    return test
#"잠시만 기다려주세요."
################################################################챗봇 결과 리턴#########################################
@app.route('/requestChatResult', methods=['GET', 'POST'])
def ChatResult():
    #챗봇에서 나온 결과 받기


    return result


################################################################스케쥴 하나 뽑아오기#########################################
@app.route('/requestPlanDetail', methods=['GET', 'POST'])
def PlanDetail():

    #plan하나 고르면 ajax로 열어주는 페이지
    # plan_num=1
    # daoTC
    # res={data:0}

    return res

if __name__ == '__main__':
    app.run(debug=True, port='8000')

