from flask import Flask
from flask import request
import requests
import json

app = Flask(__name__)

# the MAIN window
@app.route('/')
def hello_world():
    return 'Hello, World!'


# http://127.0.0.1:5000/ques_generator?amount=1&category=25&difficulty=easy&type=multiple
"""
difficulty: any, easy, medium, hard
q_type(type): any, multi, tf
number of questions(amount): right now one question
category: make a map with key for the category and val with the number associated
"""

# TODO: decide how to read an endless test + where to place the func that read from the category dict


def api_php_request(num_ques, cat, dif, q_type):
    """
    The function get the params from the GET request ang generates an api POST request.
    The POST request returns a data which need to be parsed to a question and answers.
    :param num_ques: The amount of questions
    :type num_ques: int
    :param cat: The category which the player wants to play
    :type cat: string
    :param dif: The difficulty the player wants to play
    :type dif: string
    :param q_type:  The type of the questions the player wants to play
    :type q_type: string
    :return: Dictionary with the data relevant to the question
    :rtype: dictionary
    """

    # TODO: fix the address
    fixed_address = 'https://opentdb.com/api.php?'
    amount = 'amount=' + num_ques
    category = 'category=' + cat
    if dif is not None:
        difficulty = 'difficulty=' + dif
    if q_type is not None:
        type = 'type=' + q_type
    local_address = amount + '&' + category + '&' + difficulty + '&' + type
    api_url = fixed_address + local_address
    response = requests.post(url=api_url)
    response_to_txt = response.text

    response_dict = json.loads(response_to_txt)

    return response_dict


def question_parser(response_from_post_request):
    """
    The function gets the dictionary which "api_php_request" returned and parse it to question and answers.
    :return: A list of the data
    :rtype: list
    """
    if response_from_post_request['response_code'] is 0:
        question = response_from_post_request['results'][0]['question']
        if response_from_post_request['results'][0]['type'] == 'multiple':
            correct_answer = response_from_post_request['results'][0]['correct_answer']
            incorrect_answers_list = response_from_post_request['results'][0]['incorrect_answers']
            incorrect_answers = ''
            for ans in incorrect_answers_list:
                incorrect_answers += ans + ' ; '
            answer = correct_answer + '\\' + incorrect_answers
        else:
            answer = 'boolean'
    else:
        """TODO : Response codes"""
    return question + '\\' + answer


@app.route('/ques_generator', methods=['GET'])
def ques_generator():
    """
    This is the GET request from the player.
    :return: The relevant question
    :rtype: string
    """

    difficulty = request.args.get('difficulty')
    q_type = request.args.get('type')
    category = request.args.get('category')
    amount = request.args.get('amount')

    response_from_post_request = api_php_request(amount, category, difficulty, q_type)
    question = question_parser(response_from_post_request)

    return question


# https://opentdb.com/api.php?amount=10&category=9
# https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple


if __name__ == '__main__':
    app.run()


"""
@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    print(username)
    password = request.args.get('password')
    print(password)
    return username + ' not going show the password'
"""
