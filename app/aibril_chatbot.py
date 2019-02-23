#-*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
import time
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities #for ie
import re
import os


class ChatBot:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('window-size=1920x1080')
        options.add_argument("disable-gpu")
        options.add_argument("no-sandbox")
        options.add_argument("disable-dev-shm-usage")
        #        driver = webdriver.Chrome(os.getcwd()+'/driver/chromedriver_'+myos, chrome_options=options)
    #    driver = webdriver.Chrome(os.getcwd()+'/chromedriver', chrome_options=options)
        self.driver = webdriver.Chrome(os.getcwd()+'/chromedriver', chrome_options=options)
    #    return webdriver.Chrome(os.getcwd()+'/chromedriver', chrome_options=options)


        self.driver.get('https://watson-conversation.sk.kr.bluemix.net/skcc:prod:as-kr/1639018f-4bb9-464d-9697-b2a5e5d70297/login')
        self.driver.implicitly_wait(3)
        
        # login
        login_button = self.driver.find_element_by_xpath('//*[@id="bluemixSignInButton"]')
        login_button.click()
        self.driver.implicitly_wait(3)
        
        id_form = self.driver.find_element_by_xpath('//*[@id="loginbox"]/div[4]/div[3]/input')
        password_form = self.driver.find_element_by_xpath('//*[@id="loginbox"]/div[6]/div[3]/input')
        
        id_form.clear()
        id_form.send_keys('edu_skcc_2019_007@yopmail.com')
        self.driver.implicitly_wait(3)
        
        password_form.clear()
        password_form.send_keys('aibril2019!@')
        self.driver.implicitly_wait(3)
        
        submit_button = self.driver.find_element_by_xpath('//*[@id="login"]')
        submit_button.click()
        self.driver.implicitly_wait(3)
        
        to_workspace = self.driver.find_element_by_xpath('//*[@id="workspace-sideNav__primaryItems--link1"]')
        to_workspace.click()
        self.driver.implicitly_wait(3)
        
        # go to mychatbot
        todaysC2 = self.driver.find_element_by_xpath('//*[@id="workspaces-workspace4"]/div/div[1]/section')
        todaysC2.click()
        self.driver.implicitly_wait(3)
        
        try_it = self.driver.find_element_by_xpath('//*[@id="workspace-actions__tryItOpen"]')
        try_it.click()
        self.driver.implicitly_wait(3)
        
        self.q_index = 0
        self.key_index = 0
    
    def __del__(self):
        self.driver.quit()

    def question_getter(self, index):
        self.q_index = index
        q_content = self.driver.find_element_by_xpath('//*[@id="-chatPanel_exchange' + str(index) + '_part0"]/div/div').text
        added_question = ''
        try:
            added_question = self.driver.find_element_by_xpath('//*[@id="-chatPanel_exchange'+ str(index) +'_part1"]/div/div').text
        except: pass
            
        self.driver.implicitly_wait(3)
        self.q_index += 1

        if added_question:
            return q_content + '\n' + added_question
        else: return q_content

    def keyword_getter(self, index):
        self.key_index = index
        keys = self.driver.find_elements_by_css_selector('#workspace-tryIt-chatPanel > section > div.exchange > div:nth-child(' + str(index + 2) + ') > div:nth-child(1) > div > div > div > span > span')
        self.driver.implicitly_wait(3)
        self.key_index += 1
        
        keyword_list = [keyword.text for keyword in keys]
        
        return keyword_list
        
    def text_setter(self, words):
        input_form = self.driver.find_element_by_xpath('//*[@id="-chatPanel__submitInput"]')
        input_form.clear()
        input_form.send_keys(words)
        self.driver.implicitly_wait(3)
        input_form.send_keys(Keys.ENTER)

    def clear(self):
        clear_button = self.driver.find_element_by_xpath('//*[@id="-chatPanel__clear"]/span')
        clear_button.click()
        self.driver.implicitly_wait(3)
        
        self.q_index = 0
        self.key_index = 0

    def first_interface(self):
        q_content = self.question_getter(self.q_index)
        self.driver.implicitly_wait(3)
        return q_content

    def interface(self, input_text):
        self.text_setter(input_text)
        self.driver.implicitly_wait(3)
        q_content = self.question_getter(self.q_index)
        
        keywords = self.keyword_getter(self.key_index)
            
        return q_content, keywords


if __name__ == "__main__":
    mybot = ChatBot()
    keyword_dict = dict()
    
    while 1:
        if mybot.q_index == 0:
            question = mybot.first_interface()
            print('C2: ' + question)
    
        text = input("You: ")
        
        if text.strip() == "초기화":
            mybot.clear()
            continue
        former_q = question
        question, keyword_list = mybot.interface(text)
        
        keyword_dict[former_q] = keyword_list
    
        print('C2: ' + question)
    # print(keyword_dict)
