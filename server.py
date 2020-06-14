from flask import Flask, render_template, request

import requests
import json
import random

app = Flask(__name__)

MAX_QUESTION_AMOUNT = 50
QUESTION_AMOUNT = 1
CORRECT_ANSWER = ''
DIFFICULTY = ''
QUESTION_TYPE = ''
CATEGORY = None
USER_NAME = ''


def response_code_handling(response_code):
    if response_code is 1:
        print("No Results Could not return results. The API doesn't have enough questions for your query.")
    elif response_code is 2:
        print("Invalid Parameter Contains an invalid parameter. Arguments passed in aren't valid.")
    elif response_code is 3:
        print("Token Not Found Session Token does not exist.")
    elif response_code is 4:
        print("Token Empty Session Token has returned all possible questions for the specified query."
              "Resetting the Token is necessary.")


def response_parser_to_amount(response_from_post_request, difficulty):
    total_difficulty_question_count = 'total_' + difficulty + '_question_count'
    if response_from_post_request['category_question_count'][total_difficulty_question_count] <= MAX_QUESTION_AMOUNT:
        amount = response_from_post_request['category_question_count'][total_difficulty_question_count]
    else:
        amount = MAX_QUESTION_AMOUNT
    return amount


def categoryQuestionCount(category, difficulty):
    response_from_post_request = post_request_api('https://opentdb.com/api_count.php?category=' + str(category))
    questionAmount = response_parser_to_amount(response_from_post_request, difficulty)
    return questionAmount


def api_php_request(number_questions, category, difficulty, question_type):
    """
    The function get the params from the GET request ang generates an api POST request.
    The POST request returns a data which need to be parsed to a question and answers.
    :param number_questions: The amount of questions
    :type number_questions: int
    :param category: The category which the player wants to play
    :type category: string
    :param difficulty: The difficulty the player wants to play
    :type difficulty: string
    :param question_type:  The type of the questions the player wants to play
    :type question_type: string
    :return: Dictionary with the data relevant to the question
    :rtype: dictionary
    """

    fixed_address = 'https://opentdb.com/api.php?'
    amount = 'amount=' + str(number_questions)
    category = 'category=' + category

    if difficulty is not None:
        difficulty = 'difficulty=' + difficulty
    if question_type is not None:
        type = 'type=' + question_type

    user_request_address_adjustment = amount + '&' + category + '&' + difficulty + '&' + type
    api_url = fixed_address + user_request_address_adjustment

    return api_url


def post_request_api(api_url):
    response_to_read = requests.post(url=api_url)
    response = json.loads(response_to_read.text)
    return response


def response_parser(response_from_post_request):
    """
    The function gets the json which "api_php_request" returned and parse it to question and answers.
    :return: The question
    :rtype: string
    """
    data = {}
    if response_from_post_request['response_code'] is 0:
        data['question'] = response_from_post_request['results'][0]['question']
        # question = response_from_post_request['results'][0]['question']
        global CORRECT_ANSWER
        CORRECT_ANSWER = response_from_post_request['results'][0]['correct_answer']

        answers_list = response_from_post_request['results'][0]['incorrect_answers']
        answers_list.append(response_from_post_request['results'][0]['correct_answer'])
        random.shuffle(answers_list)
        data['answers'] = answers_list

        data_to_string = json.dumps(data)
        response = json.loads(data_to_string)
    else:
        response_code_handling(response_from_post_request['response_code'])

    return response


def response_to_client(question_amount, category, difficulty, question_type):
    api_url = api_php_request(question_amount, category, difficulty, question_type)
    response_from_post_request = post_request_api(api_url)
    response = response_parser(response_from_post_request)

    return response


@app.route('/')
def home():
    return 'Hello All!'


@app.route('/question_generator', methods=['GET'])
def question_generator():
    """
    This is the GET request from the player.
    :return: question & answers to the client
    :rtype: json
    """
    global DIFFICULTY, QUESTION_TYPE, CATEGORY
    # USER_NAME = request.args.get('user')
    DIFFICULTY = request.args.get('difficulty')
    QUESTION_TYPE = request.args.get('type')
    CATEGORY = request.args.get('category')
    """
    # define question amount by category and difficulty the player has chosen
    amount = categoryQuestionCount(category, difficulty)
    """
    """
    api_url = api_php_request(QUESTION_AMOUNT, CATEGORY, DIFFICULTY, QUESTION_TYPE)
    response_from_post_request = post_request_api(api_url)
    response = response_parser(response_from_post_request)
    """
    response = response_to_client(QUESTION_AMOUNT, CATEGORY, DIFFICULTY, QUESTION_TYPE)

    return response


@app.route('/correct_answer_checker', methods=['GET'])
def correct_answer_checker():
    answer_chosen_by_the_client = request.args.get('answer')
    if answer_chosen_by_the_client == CORRECT_ANSWER:
        return 'correct'
    else:
        return 'wrong'


@app.route('/next_question', methods=['GET'])
def next_question():
    response = response_to_client(QUESTION_AMOUNT, CATEGORY, DIFFICULTY, QUESTION_TYPE)
    return response


if __name__ == '__main__':
    app.run()

# https://opentdb.com/api.php?amount=10&category=9
# https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple
# http://127.0.0.1:5000/question_generator?amount=1&category=25&difficulty=easy&type=multiple
# /question_generator?category=22&difficulty=easy&type=multiple


"""
difficulty: any, easy, medium, hard
q_type(type): any, multi, tf
number of questions(amount): right now one question
category: make a map with key for the category and val with the number associated
"""
